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

// Check if lot has available slots
$stmt = $db->prepare("SELECT max_slots FROM burial_lots WHERE id = :id");
$stmt->execute([':id' => $reservation['burial_lot_id']]);
$lot = $stmt->fetch();
$maxSlots = $lot ? (int)$lot['max_slots'] : 8;

$stmt = $db->prepare("SELECT COUNT(*) as count FROM reservations WHERE burial_lot_id = :lot_id AND status IN ('approved', 'occupied')");
$stmt->execute([':lot_id' => $reservation['burial_lot_id']]);
$approvedCount = (int)$stmt->fetch()['count'];

if ($approvedCount >= $maxSlots) {
    http_response_code(400);
    echo json_encode(['message' => 'No available slots in this lot']);
    exit;
}

$db->beginTransaction();
try {
    // Update reservation status
    $stmt = $db->prepare("UPDATE reservations SET status = 'approved', admin_remarks = :remarks, updated_at = NOW() WHERE id = :id");
    $stmt->execute([':remarks' => $data['admin_remarks'] ?? '', ':id' => $data['id']]);

    // If all slots are now taken, mark lot as occupied
    if (($approvedCount + 1) >= $maxSlots) {
        $stmt = $db->prepare("UPDATE burial_lots SET status = 'occupied', updated_at = NOW() WHERE id = :id");
        $stmt->execute([':id' => $reservation['burial_lot_id']]);

        // Decline remaining pending reservations for this lot
        $stmt = $db->prepare("UPDATE reservations SET status = 'declined', admin_remarks = 'All slots have been filled', updated_at = NOW() WHERE burial_lot_id = :lot_id AND id != :id AND status = 'pending'");
        $stmt->execute([':lot_id' => $reservation['burial_lot_id'], ':id' => $data['id']]);
    }

    $db->commit();
    echo json_encode(['message' => 'Reservation approved']);
} catch (Exception $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['message' => 'Failed to approve reservation']);
}
