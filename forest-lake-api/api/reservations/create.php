<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'client');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['burial_lot_id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Burial lot ID is required']);
    exit;
}

// Check lot is available
$stmt = $db->prepare("SELECT * FROM burial_lots WHERE id = :id");
$stmt->execute([':id' => $data['burial_lot_id']]);
$lot = $stmt->fetch();

if (!$lot) {
    http_response_code(404);
    echo json_encode(['message' => 'Burial lot not found']);
    exit;
}

if ($lot['status'] !== 'available') {
    http_response_code(400);
    echo json_encode(['message' => 'This lot is not available for reservation']);
    exit;
}

// Check if user already has pending reservation for this lot
$stmt = $db->prepare("SELECT id FROM reservations WHERE client_id = :client_id AND burial_lot_id = :lot_id AND status = 'pending'");
$stmt->execute([':client_id' => $user['id'], ':lot_id' => $data['burial_lot_id']]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['message' => 'You already have a pending reservation for this lot']);
    exit;
}

// Check if another client has pending/approved reservation for this lot
$stmt = $db->prepare("SELECT id FROM reservations WHERE burial_lot_id = :lot_id AND status IN ('pending', 'approved')");
$stmt->execute([':lot_id' => $data['burial_lot_id']]);
if ($stmt->fetch()) {
    http_response_code(400);
    echo json_encode(['message' => 'This lot already has an active reservation']);
    exit;
}

$stmt = $db->prepare("INSERT INTO reservations (client_id, burial_lot_id, reservation_date, status, created_at, updated_at) VALUES (:client_id, :lot_id, NOW(), 'pending', NOW(), NOW())");
$stmt->execute([':client_id' => $user['id'], ':lot_id' => $data['burial_lot_id']]);

echo json_encode(['message' => 'Reservation request submitted']);
