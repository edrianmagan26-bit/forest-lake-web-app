<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$id = $_GET['id'] ?? null;

if (!$id) {
    http_response_code(400);
    echo json_encode(['message' => 'Deceased record ID is required']);
    exit;
}

$stmt = $db->prepare("DELETE FROM deceased_info WHERE id = :id");
$stmt->execute([':id' => $id]);

echo json_encode(['message' => 'Deceased record deleted']);
