<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();

$lotId = $_GET['lot_id'] ?? '';
if (empty($lotId)) {
    http_response_code(400);
    echo json_encode(['message' => 'lot_id is required']);
    exit;
}

$stmt = $db->prepare("SELECT * FROM lot_images WHERE burial_lot_id = :lot_id ORDER BY sort_order ASC");
$stmt->execute([':lot_id' => $lotId]);
$images = $stmt->fetchAll();

echo json_encode(['data' => $images]);
