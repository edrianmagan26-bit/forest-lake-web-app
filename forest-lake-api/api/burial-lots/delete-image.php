<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$id = $_GET['id'] ?? '';
if (empty($id)) {
    http_response_code(400);
    echo json_encode(['message' => 'Image ID is required']);
    exit;
}

// Get image info
$stmt = $db->prepare("SELECT * FROM lot_images WHERE id = :id");
$stmt->execute([':id' => $id]);
$image = $stmt->fetch();

if (!$image) {
    http_response_code(404);
    echo json_encode(['message' => 'Image not found']);
    exit;
}

// Delete file
$filePath = '../../' . ltrim($image['image_path'], '/');
if (file_exists($filePath)) {
    unlink($filePath);
}

// Delete from database
$stmt = $db->prepare("DELETE FROM lot_images WHERE id = :id");
$stmt->execute([':id' => $id]);

// If this was the main image, set next one or clear
$stmt = $db->prepare("SELECT image_path, image_type FROM lot_images WHERE burial_lot_id = :lot_id ORDER BY sort_order ASC LIMIT 1");
$stmt->execute([':lot_id' => $image['burial_lot_id']]);
$next = $stmt->fetch();

if ($next) {
    $stmt = $db->prepare("UPDATE burial_lots SET image = :image, image_type = :type, updated_at = NOW() WHERE id = :id");
    $stmt->execute([':image' => $next['image_path'], ':type' => $next['image_type'], ':id' => $image['burial_lot_id']]);
} else {
    $stmt = $db->prepare("UPDATE burial_lots SET image = NULL, image_type = 'photo', updated_at = NOW() WHERE id = :id");
    $stmt->execute([':id' => $image['burial_lot_id']]);
}

echo json_encode(['message' => 'Image deleted']);
