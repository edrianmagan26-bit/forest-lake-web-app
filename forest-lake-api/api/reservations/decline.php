<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);
requireRole($user, 'admin');

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Reservation ID is required']);
    exit;
}

$stmt = $db->prepare("UPDATE reservations SET status = 'declined', admin_remarks = :remarks, updated_at = NOW() WHERE id = :id AND status = 'pending'");
$stmt->execute([':remarks' => $data['admin_remarks'] ?? '', ':id' => $data['id']]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(['message' => 'Pending reservation not found']);
    exit;
}

echo json_encode(['message' => 'Reservation declined']);
