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

$type = $data['type'] ?? 'verification'; // verification or reset

// Delete old OTPs for this email
$stmt = $db->prepare("DELETE FROM otp_codes WHERE email = :email AND type = :type");
$stmt->execute([':email' => $data['email'], ':type' => $type]);

// Store new OTP (expires in 15 minutes)
$stmt = $db->prepare("INSERT INTO otp_codes (email, otp, type, expires_at) VALUES (:email, :otp, :type, DATE_ADD(NOW(), INTERVAL 15 MINUTE))");
$stmt->execute([':email' => $data['email'], ':otp' => $data['otp'], ':type' => $type]);

echo json_encode(['message' => 'OTP stored']);
