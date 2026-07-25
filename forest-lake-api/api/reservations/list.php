<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$isAdmin = ($_GET['role'] ?? '') === 'admin' && $user['role'] === 'admin';

if ($isAdmin) {
    $stmt = $db->prepare("SELECT r.*, bl.lot_number, bl.section, bl.block, bl.max_slots, CONCAT(cp.first_name, ' ', cp.last_name) as client_name FROM reservations r INNER JOIN burial_lots bl ON r.burial_lot_id = bl.id LEFT JOIN client_profiles cp ON r.client_id = cp.user_id ORDER BY r.created_at DESC");
    $stmt->execute();
} else {
    $stmt = $db->prepare("SELECT r.*, bl.lot_number, bl.section, bl.block, bl.max_slots FROM reservations r INNER JOIN burial_lots bl ON r.burial_lot_id = bl.id WHERE r.client_id = :client_id ORDER BY r.created_at DESC");
    $stmt->execute([':client_id' => $user['id']]);
}

echo json_encode(['data' => $stmt->fetchAll()]);
