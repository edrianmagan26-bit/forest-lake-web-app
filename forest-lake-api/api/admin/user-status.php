<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['user_id']) || empty($data['status'])) {
    http_response_code(400);
    echo json_encode(['message' => 'User ID and status are required']);
    exit;
}

$allowed = ['active', 'inactive'];
if (!in_array($data['status'], $allowed)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid status']);
    exit;
}

$stmt = $db->prepare("UPDATE users SET status = :status, updated_at = NOW() WHERE id = :id AND role = 'client'");
$stmt->execute([':status' => $data['status'], ':id' => $data['user_id']]);

// Log
$stmt = $db->prepare("INSERT INTO system_logs (user_id, action, description, created_at) VALUES (:user_id, 'status_change', :desc, NOW())");
$stmt->execute([':user_id' => $user['id'], ':desc' => "Changed user {$data['user_id']} status to {$data['status']}"]);

echo json_encode(['message' => "Account {$data['status']} successfully"]);
