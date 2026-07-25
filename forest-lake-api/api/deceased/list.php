<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();

$lotId = $_GET['lot_id'] ?? null;
$reservationId = $_GET['reservation_id'] ?? null;

if ($lotId) {
    $stmt = $db->prepare("SELECT * FROM deceased_info WHERE burial_lot_id = :lot_id ORDER BY created_at DESC");
    $stmt->execute([':lot_id' => $lotId]);
} elseif ($reservationId) {
    $stmt = $db->prepare("SELECT * FROM deceased_info WHERE reservation_id = :reservation_id ORDER BY created_at DESC");
    $stmt->execute([':reservation_id' => $reservationId]);
} else {
    $stmt = $db->prepare("SELECT d.*, bl.lot_number, bl.section FROM deceased_info d INNER JOIN burial_lots bl ON d.burial_lot_id = bl.id ORDER BY d.created_at DESC");
    $stmt->execute();
}

echo json_encode(['data' => $stmt->fetchAll()]);
