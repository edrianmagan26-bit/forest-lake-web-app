<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$stmt = $db->prepare("SELECT cp.* FROM client_profiles cp WHERE cp.user_id = :user_id");
$stmt->execute([':user_id' => $user['id']]);
$profile = $stmt->fetch();

if (!$profile) {
    echo json_encode(['profile' => ['first_name' => '', 'middle_name' => '', 'last_name' => '', 'contact_number' => '', 'address' => '']]);
    exit;
}

echo json_encode(['profile' => $profile]);
