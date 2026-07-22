<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['email']) || empty($data['password']) || empty($data['role'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Email, password, and role are required']);
    exit;
}

// Find user
$stmt = $db->prepare("SELECT * FROM users WHERE email = :email AND role = :role");
$stmt->execute([':email' => $data['email'], ':role' => $data['role']]);
$user = $stmt->fetch();

if (!$user || !password_verify($data['password'], $user['password'])) {
    http_response_code(401);
    echo json_encode(['message' => 'Invalid credentials']);
    exit;
}

// Check account status
if ($user['status'] === 'inactive') {
    http_response_code(403);
    echo json_encode(['message' => 'Your account has been deactivated. Please contact administration.']);
    exit;
}

if (!$user['email_verified']) {
    http_response_code(403);
    echo json_encode(['message' => 'Please verify your email address before logging in.']);
    exit;
}

// Generate token
$token = generateToken($user['id']);
$expiresAt = date('Y-m-d H:i:s', strtotime('+7 days'));
$stmt = $db->prepare("INSERT INTO user_tokens (user_id, token, expires_at, created_at) VALUES (:user_id, :token, :expires_at, NOW())");
$stmt->execute([':user_id' => $user['id'], ':token' => $token, ':expires_at' => $expiresAt]);

// Get profile data
$userData = [
    'id' => $user['id'],
    'email' => $user['email'],
    'role' => $user['role'],
    'status' => $user['status'],
    'email_verified' => (bool)$user['email_verified'],
];

if ($user['role'] === 'client') {
    $stmt = $db->prepare("SELECT * FROM client_profiles WHERE user_id = :user_id");
    $stmt->execute([':user_id' => $user['id']]);
    $profile = $stmt->fetch();
    if ($profile) {
        $userData['first_name'] = $profile['first_name'];
        $userData['last_name'] = $profile['last_name'];
    }
}

// Log action
$stmt = $db->prepare("INSERT INTO system_logs (user_id, action, description, created_at) VALUES (:user_id, 'login', 'User logged in', NOW())");
$stmt->execute([':user_id' => $user['id']]);

echo json_encode(['token' => $token, 'user' => $userData]);
