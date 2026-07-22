<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

// Delete token
$headers = getallheaders();
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';
preg_match('/Bearer\s+(.+)/', $authHeader, $matches);
$token = $matches[1] ?? '';

$stmt = $db->prepare("DELETE FROM user_tokens WHERE token = :token");
$stmt->execute([':token' => $token]);

echo json_encode(['message' => 'Logged out successfully']);
