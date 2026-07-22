<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
$data = json_decode(file_get_contents("php://input"), true);

$stmt = $db->prepare("UPDATE client_profiles SET first_name = :first_name, middle_name = :middle_name, last_name = :last_name, contact_number = :contact_number, address = :address, updated_at = NOW() WHERE user_id = :user_id");
$stmt->execute([
    ':first_name' => $data['first_name'] ?? '',
    ':middle_name' => $data['middle_name'] ?? '',
    ':last_name' => $data['last_name'] ?? '',
    ':contact_number' => $data['contact_number'] ?? '',
    ':address' => $data['address'] ?? '',
    ':user_id' => $user['id'],
]);

echo json_encode(['message' => 'Profile updated successfully']);
