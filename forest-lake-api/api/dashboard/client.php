<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$stats = [];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id");
$stmt->execute([':id' => $user['id']]);
$stats['total_reservations'] = $stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'pending'");
$stmt->execute([':id' => $user['id']]);
$stats['pending_reservations'] = $stmt->fetch()['total'];

$stmt = $db->prepare("SELECT COUNT(*) as total FROM reservations WHERE client_id = :id AND status = 'approved'");
$stmt->execute([':id' => $user['id']]);
$stats['approved_reservations'] = $stmt->fetch()['total'];

echo json_encode($stats);
