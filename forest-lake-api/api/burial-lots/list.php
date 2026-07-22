<?php
require_once '../../config/cors.php';
require_once '../../config/database.php';

$db = (new Database())->getConnection();

$stmt = $db->prepare("SELECT * FROM burial_lots ORDER BY created_at DESC");
$stmt->execute();
$lots = $stmt->fetchAll();

echo json_encode(['data' => $lots]);
