<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['current_password']) || empty($data['new_password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Current and new password are required']);
    exit;
}

if (!password_verify($data['current_password'], $user['password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Current password is incorrect']);
    exit;
}

if (strlen($data['new_password']) < 6) {
    http_response_code(400);
    echo json_encode(['message' => 'New password must be at least 6 characters']);
    exit;
}

$hashed = password_hash($data['new_password'], PASSWORD_DEFAULT);
$stmt = $db->prepare("UPDATE users SET password = :password, updated_at = NOW() WHERE id = :id");
$stmt->execute([':password' => $hashed, ':id' => $user['id']]);

echo json_encode(['message' => 'Password changed successfully']);
