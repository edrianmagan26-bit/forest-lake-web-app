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
    echo json_encode(['message' => 'Lot ID is required']);
    exit;
}

// Check if lot has active reservations
$stmt = $db->prepare("SELECT id FROM reservations WHERE burial_lot_id = :id AND status IN ('pending', 'approved')");
$stmt->execute([':id' => $id]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['message' => 'Cannot delete lot with active reservations']);
    exit;
}

$stmt = $db->prepare("DELETE FROM burial_lots WHERE id = :id");
$stmt->execute([':id' => $id]);

echo json_encode(['message' => 'Burial lot deleted']);
