<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$stmt = $db->prepare("SELECT u.id as user_id, u.email, u.status, u.email_verified, u.created_at, cp.first_name, cp.middle_name, cp.last_name, cp.contact_number, cp.address FROM users u LEFT JOIN client_profiles cp ON u.id = cp.user_id WHERE u.role = 'client' ORDER BY u.created_at DESC");
$stmt->execute();
$clients = $stmt->fetchAll();

echo json_encode(['data' => $clients]);
