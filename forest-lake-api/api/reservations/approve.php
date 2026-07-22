<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Reservation ID is required']);
    exit;
}

// Get reservation
$stmt = $db->prepare("SELECT * FROM reservations WHERE id = :id AND status = 'pending'");
$stmt->execute([':id' => $data['id']]);
$reservation = $stmt->fetch();

if (!$reservation) {
    http_response_code(404);
    echo json_encode(['message' => 'Pending reservation not found']);
    exit;
}

$db->beginTransaction();
try {
    // Update reservation
    $stmt = $db->prepare("UPDATE reservations SET status = 'approved', admin_remarks = :remarks, updated_at = NOW() WHERE id = :id");
    $stmt->execute([':remarks' => $data['admin_remarks'] ?? '', ':id' => $data['id']]);

    // Update burial lot status
    $stmt = $db->prepare("UPDATE burial_lots SET status = 'reserved', updated_at = NOW() WHERE id = :id");
    $stmt->execute([':id' => $reservation['burial_lot_id']]);

    // Decline other pending reservations for same lot
    $stmt = $db->prepare("UPDATE reservations SET status = 'declined', admin_remarks = 'Lot reserved by another client', updated_at = NOW() WHERE burial_lot_id = :lot_id AND id != :id AND status = 'pending'");
    $stmt->execute([':lot_id' => $reservation['burial_lot_id'], ':id' => $data['id']]);

    $db->commit();
    echo json_encode(['message' => 'Reservation approved']);
} catch (Exception $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['message' => 'Failed to approve reservation']);
}
