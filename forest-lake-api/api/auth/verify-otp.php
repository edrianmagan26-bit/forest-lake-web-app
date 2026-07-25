<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();
$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['email']) || empty($data['otp'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Email and OTP are required']);
    exit;
}

$type = $data['type'] ?? 'verification';

$stmt = $db->prepare("SELECT * FROM otp_codes WHERE email = :email AND otp = :otp AND type = :type AND expires_at > NOW()");
$stmt->execute([':email' => $data['email'], ':otp' => $data['otp'], ':type' => $type]);
$record = $stmt->fetch();

if (!$record) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid or expired OTP']);
    exit;
}

// Delete the used OTP
$stmt = $db->prepare("DELETE FROM otp_codes WHERE id = :id");
$stmt->execute([':id' => $record['id']]);

// If verification type, mark user as verified
if ($type === 'verification') {
    $stmt = $db->prepare("UPDATE users SET email_verified = 1, status = 'active' WHERE email = :email");
    $stmt->execute([':email' => $data['email']]);
}

echo json_encode(['message' => 'OTP verified', 'verified' => true]);
