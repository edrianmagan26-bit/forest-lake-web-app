<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();
$token = $_GET['token'] ?? '';

if (empty($token)) {
    http_response_code(400);
    echo json_encode(['message' => 'Verification token is required']);
    exit;
}

// Find token
$stmt = $db->prepare("SELECT * FROM email_verifications WHERE token = :token");
$stmt->execute([':token' => $token]);
$verification = $stmt->fetch();

if (!$verification) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid verification link']);
    exit;
}

if ($verification['verified_at'] !== null) {
    http_response_code(400);
    echo json_encode(['message' => 'Email already verified']);
    exit;
}

if (strtotime($verification['expires_at']) < time()) {
    http_response_code(400);
    echo json_encode(['message' => 'Verification link has expired']);
    exit;
}

// Verify email
$db->beginTransaction();
try {
    $stmt = $db->prepare("UPDATE users SET email_verified = 1, status = 'active', updated_at = NOW() WHERE id = :user_id");
    $stmt->execute([':user_id' => $verification['user_id']]);

    $stmt = $db->prepare("UPDATE email_verifications SET verified_at = NOW() WHERE id = :id");
    $stmt->execute([':id' => $verification['id']]);

    $db->commit();
    echo json_encode(['message' => 'Email verified successfully! You can now log in.']);
} catch (Exception $e) {
    $db->rollBack();
    http_response_code(500);
    echo json_encode(['message' => 'Verification failed']);
}
