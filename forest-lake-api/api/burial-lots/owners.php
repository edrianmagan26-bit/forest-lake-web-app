<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();

$lotId = $_GET['lot_id'] ?? null;

if (!$lotId) {
    http_response_code(400);
    echo json_encode(['message' => 'Lot ID is required']);
    exit;
}

// Get owners (clients with approved/occupied reservations for this lot)
$stmt = $db->prepare("
    SELECT r.id as reservation_id, r.serial_number, r.status as reservation_status,
           cp.first_name, cp.last_name, cp.contact_number
    FROM reservations r
    INNER JOIN client_profiles cp ON r.client_id = cp.user_id
    WHERE r.burial_lot_id = :lot_id AND r.status IN ('approved', 'occupied')
    ORDER BY r.created_at ASC
");
$stmt->execute([':lot_id' => $lotId]);
$owners = $stmt->fetchAll();

// Get deceased info per reservation
foreach ($owners as &$owner) {
    $stmt = $db->prepare("SELECT * FROM deceased_info WHERE reservation_id = :reservation_id ORDER BY created_at ASC");
    $stmt->execute([':reservation_id' => $owner['reservation_id']]);
    $owner['deceased'] = $stmt->fetchAll();
}

echo json_encode(['data' => $owners]);
