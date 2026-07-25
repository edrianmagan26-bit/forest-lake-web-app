<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';
require_once '../../config/auth.php';

$db = (new Database())->getConnection();
$user = validateToken($db);

$data = json_decode(file_get_contents("php://input"), true);

if (empty($data['id'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Deceased record ID is required']);
    exit;
}

// If client, verify they own the lot linked to this deceased record
if ($user['role'] === 'client') {
    $stmt = $db->prepare("SELECT d.burial_lot_id FROM deceased_info d INNER JOIN reservations r ON r.burial_lot_id = d.burial_lot_id WHERE d.id = :id AND r.client_id = :client_id AND r.status IN ('approved', 'occupied')");
    $stmt->execute([':id' => $data['id'], ':client_id' => $user['id']]);
    if (!$stmt->fetch()) {
        http_response_code(403);
        echo json_encode(['message' => 'You do not have access to this record']);
        exit;
    }
}

$stmt = $db->prepare("UPDATE deceased_info SET name = :name, date_of_birth = :date_of_birth, date_of_death = :date_of_death, relationship_to_client = :relationship, burial_date = :burial_date, updated_at = NOW() WHERE id = :id");
$stmt->execute([
    ':name' => $data['name'] ?? '',
    ':date_of_birth' => $data['date_of_birth'] ?: null,
    ':date_of_death' => $data['date_of_death'] ?: null,
    ':relationship' => $data['relationship_to_client'] ?? '',
    ':burial_date' => $data['burial_date'] ?: null,
    ':id' => $data['id'],
]);

echo json_encode(['message' => 'Deceased information updated']);
