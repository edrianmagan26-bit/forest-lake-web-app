<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$id = $_GET['id'] ?? '';
if (empty($id)) {
    http_response_code(400);
    echo json_encode(['message' => 'Reservation ID is required']);
    exit;
}

$stmt = $db->prepare("SELECT r.*, bl.lot_number, bl.section, bl.block, bl.latitude, bl.longitude, CONCAT(cp.first_name, ' ', cp.last_name) as client_name FROM reservations r INNER JOIN burial_lots bl ON r.burial_lot_id = bl.id LEFT JOIN client_profiles cp ON r.client_id = cp.user_id WHERE r.id = :id");
$stmt->execute([':id' => $id]);
$reservation = $stmt->fetch();

if (!$reservation) {
    http_response_code(404);
    echo json_encode(['message' => 'Reservation not found']);
    exit;
}

// Clients can only see their own reservations
if ($user['role'] === 'client' && $reservation['client_id'] != $user['id']) {
    http_response_code(403);
    echo json_encode(['message' => 'Forbidden']);
    exit;
}

echo json_encode(['data' => $reservation]);
