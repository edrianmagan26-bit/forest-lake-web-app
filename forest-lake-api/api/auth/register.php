<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

// Validate required fields
$required = ['first_name', 'last_name', 'contact_number', 'email', 'address', 'password'];
foreach ($required as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['message' => "Field '{$field}' is required"]);
        exit;
    }
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid email format']);
    exit;
}

// Check duplicate email
$stmt = $db->prepare("SELECT id FROM users WHERE email = :email");
$stmt->execute([':email' => $data['email']]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['message' => 'Email already registered']);
    exit;
}

// Validate password
if (strlen($data['password']) < 6) {
    http_response_code(400);
    echo json_encode(['message' => 'Password must be at least 6 characters']);
    exit;
}

try {
    $db->beginTransaction();

    // Create user
    $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
    $stmt = $db->prepare("INSERT INTO users (email, password, role, status, email_verified, created_at, updated_at) VALUES (:email, :password, 'client', 'unverified', 0, NOW(), NOW())");
    $stmt->execute([':email' => $data['email'], ':password' => $hashedPassword]);
    $userId = $db->lastInsertId();

    // Create client profile
    $stmt = $db->prepare("INSERT INTO client_profiles (user_id, first_name, middle_name, last_name, contact_number, address, created_at, updated_at) VALUES (:user_id, :first_name, :middle_name, :last_name, :contact_number, :address, NOW(), NOW())");
    $stmt->execute([
        ':user_id' => $userId,
        ':first_name' => $data['first_name'],
        ':middle_name' => $data['middle_name'] ?? '',
        ':last_name' => $data['last_name'],
        ':contact_number' => $data['contact_number'],
        ':address' => $data['address'],
    ]);

    // Generate verification token
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', strtotime('+24 hours'));
    $stmt = $db->prepare("INSERT INTO email_verifications (user_id, token, expires_at, created_at) VALUES (:user_id, :token, :expires_at, NOW())");
    $stmt->execute([':user_id' => $userId, ':token' => $token, ':expires_at' => $expiresAt]);

    // Log action
    $stmt = $db->prepare("INSERT INTO system_logs (user_id, action, description, created_at) VALUES (:user_id, 'register', 'Client registered', NOW())");
    $stmt->execute([':user_id' => $userId]);

    $db->commit();

    // In production, send email here. For dev, return the token.
    echo json_encode([
        'message' => 'Registration successful! Please verify your email.',
        'verification_token' => $token, // Remove in production
    ]);

} catch (Exception $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['message' => 'Registration failed']);
}
