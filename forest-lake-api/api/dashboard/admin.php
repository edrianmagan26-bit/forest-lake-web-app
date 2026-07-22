<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$stats = [];

// Client counts
$stmt = $db->query("SELECT COUNT(*) as total FROM users WHERE role = 'client'");
$stats['total_clients'] = $stmt->fetch()['total'];

$stmt = $db->query("SELECT COUNT(*) as total FROM users WHERE role = 'client' AND status = 'active'");
$stats['active_clients'] = $stmt->fetch()['total'];

$stmt = $db->query("SELECT COUNT(*) as total FROM users WHERE role = 'client' AND status = 'inactive'");
$stats['inactive_clients'] = $stmt->fetch()['total'];

// Lot counts
$stmt = $db->query("SELECT COUNT(*) as total FROM burial_lots");
$stats['total_lots'] = $stmt->fetch()['total'];

$stmt = $db->query("SELECT COUNT(*) as total FROM burial_lots WHERE status = 'available'");
$stats['available_lots'] = $stmt->fetch()['total'];

$stmt = $db->query("SELECT COUNT(*) as total FROM burial_lots WHERE status = 'reserved'");
$stats['reserved_lots'] = $stmt->fetch()['total'];

$stmt = $db->query("SELECT COUNT(*) as total FROM burial_lots WHERE status = 'occupied'");
$stats['occupied_lots'] = $stmt->fetch()['total'];

// Reservation counts
$stmt = $db->query("SELECT COUNT(*) as total FROM reservations WHERE status = 'pending'");
$stats['pending_reservations'] = $stmt->fetch()['total'];

echo json_encode($stats);
