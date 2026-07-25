<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$stats = [];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id");
$stmt->execute([':id' => $user['id']]);
$stats['total_reservations'] = (int)$stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'pending'");
$stmt->execute([':id' => $user['id']]);
$stats['pending_reservations'] = (int)$stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'approved'");
$stmt->execute([':id' => $user['id']]);
$stats['approved_reservations'] = (int)$stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'occupied'");
$stmt->execute([':id' => $user['id']]);
$stats['occupied_lots'] = (int)$stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'declined'");
$stmt->execute([':id' => $user['id']]);
$stats['declined_reservations'] = (int)$stmt->fetch()['total'];

// Recent reservations
$stmt = $db->prepare("SELECT r.*, bl.lot_number, bl.section FROM reservations r INNER JOIN burial_lots bl ON r.burial_lot_id = bl.id WHERE r.client_id = :id ORDER BY r.created_at DESC LIMIT 5");
$stmt->execute([':id' => $user['id']]);
$stats['recent_reservations'] = $stmt->fetchAll();

echo json_encode($stats);
