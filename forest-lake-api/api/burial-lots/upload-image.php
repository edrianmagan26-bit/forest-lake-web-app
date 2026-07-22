<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

if (empty($_FILES['image']) || empty($_POST['lot_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Image file and lot_id are required']);
    exit;
}

$lotId = $_POST['lot_id'];
$imageType = $_POST['image_type'] ?? 'photo'; // 'photo' or '360'

// Validate lot exists
$stmt = $db->prepare("SELECT id FROM burial_lots WHERE id = :id");
$stmt->execute([':id' => $lotId]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['message' => 'Burial lot not found']);
    exit;
}

// Validate file
$file = $_FILES['image'];
$allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo json_encode(['message' => 'Only JPG, PNG, and WEBP images are allowed']);
    exit;
}

if ($file['size'] > 10 * 1024 * 1024) { // 10MB max
    http_response_code(400);
    echo json_encode(['message' => 'Image must be less than 10MB']);
    exit;
}

// Create uploads directory
$uploadDir = '../../uploads/lots/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

// Generate unique filename
$ext = pathinfo($file['name'], PATHINFO_EXTENSION);
$filename = 'lot_' . $lotId . '_' . time() . '.' . $ext;
$filePath = $uploadDir . $filename;

if (!move_uploaded_file($file['tmp_name'], $filePath)) {
    http_response_code(500);
    echo json_encode(['message' => 'Failed to upload image']);
    exit;
}

// Update database
$imageUrl = '/uploads/lots/' . $filename;
$stmt = $db->prepare("UPDATE burial_lots SET image = :image, image_type = :image_type, updated_at = NOW() WHERE id = :id");
$stmt->execute([':image' => $imageUrl, ':image_type' => $imageType, ':id' => $lotId]);

echo json_encode(['message' => 'Image uploaded successfully', 'image' => $imageUrl]);
