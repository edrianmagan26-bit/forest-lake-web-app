<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['email']) || empty($data['new_password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Email and new password are required']);
    exit;
}

if (strlen($data['new_password']) < 6) {
    http_response_code(400);
    echo json_encode(['message' => 'Password must be at least 6 characters']);
    exit;
}

$stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
$stmt->execute([':email' => $data['email']]);
if (!$stmt->fetch()) {
    http_response_code(404);
    echo json_encode(['message' => 'User not found']);
    exit;
}

$hash = password_hash($data['new_password'], PASSWORD_DEFAULT);
$stmt = $db->prepare("UPDATE users SET password = :password, updated_at = NOW() WHERE email = :email");
$stmt->execute([':password' => $hash, ':email' => $data['email']]);

echo json_encode(['message' => 'Password reset successfully']);
