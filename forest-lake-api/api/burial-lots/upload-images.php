<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

if (empty($_FILES['images']) || empty($_POST['lot_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Images and lot_id are required']);
    exit;
}

$lotId = $_POST['lot_id'];
$imageType = $_POST['image_type'] ?? 'photo';

// Validate lot exists
$stmt = $db->prepare("SELECT id FROM burial_lots WHERE id = :id");
$stmt->execute([':id' => $lotId]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['message' => 'Burial lot not found']);
    exit;
}

$uploadDir = '../../uploads/lots/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
$uploaded = [];
$files = $_FILES['images'];
$fileCount = is_array($files['name']) ? count($files['name']) : 1;

// Get current max sort order
$stmt = $db->prepare("SELECT COALESCE(MAX(sort_order), 0) as max_order FROM lot_images WHERE burial_lot_id = :lot_id");
$stmt->execute([':lot_id' => $lotId]);
$sortOrder = (int)$stmt->fetch()['max_order'];

for ($i = 0; $i < $fileCount; $i++) {
    $name = is_array($files['name']) ? $files['name'][$i] : $files['name'];
    $tmpName = is_array($files['tmp_name']) ? $files['tmp_name'][$i] : $files['tmp_name'];
    $type = is_array($files['type']) ? $files['type'][$i] : $files['type'];
    $size = is_array($files['size']) ? $files['size'][$i] : $files['size'];

    if (!in_array($type, $allowedTypes)) continue;
    if ($size > 10 * 1024 * 1024) continue; // 10MB max

    $ext = pathinfo($name, PATHINFO_EXTENSION);
    $filename = 'lot_' . $lotId . '_' . time() . '_' . $i . '.' . $ext;
    $filePath = $uploadDir . $filename;

    if (move_uploaded_file($tmpName, $filePath)) {
        $imagePath = '/uploads/lots/' . $filename;
        $sortOrder++;
        $stmt = $db->prepare("INSERT INTO lot_images (burial_lot_id, image_path, image_type, sort_order, created_at) VALUES (:lot_id, :path, :type, :order, NOW())");
        $stmt->execute([':lot_id' => $lotId, ':path' => $imagePath, ':type' => $imageType, ':order' => $sortOrder]);
        $uploaded[] = $imagePath;

        // Set first image as the lot's main image
        if (count($uploaded) === 1) {
            $stmt = $db->prepare("UPDATE burial_lots SET image = :image, image_type = :type, updated_at = NOW() WHERE id = :id AND (image IS NULL OR image = '')");
            $stmt->execute([':image' => $imagePath, ':type' => $imageType, ':id' => $lotId]);
        }
    }
}

if (empty($uploaded)) {
    http_response_code(400);
    echo json_encode(['message' => 'No valid images were uploaded']);
    exit;
}

echo json_encode(['message' => count($uploaded) . ' image(s) uploaded successfully', 'images' => $uploaded]);
