<?php
// Simple token-based auth using PHP sessions stored as tokens
function generateToken($userId) {
    return bin2hex(random_bytes(32));
}

function validateToken($db) {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!preg_match('/Bearer\s+(.+)/', $authHeader, $matches)) {
        http_response_code(401);
        echo json_encode(['message' => 'Unauthorized']);
        exit;
    }

    $token = $matches[1];
    $stmt = $db->prepare("SELECT u.* FROM users u INNER JOIN user_tokens ut ON u.id = ut.user_id WHERE ut.token = :token AND ut.expires_at > NOW()");
    $stmt->execute([':token' => $token]);
    $user = $stmt->fetch();

    if (!$user) {
        http_response_code(401);
        echo json_encode(['message' => 'Unauthorized']);
        exit;
    }

    return $user;
}

function requireRole($user, $role) {
    if ($user['role'] !== $role) {
        http_response_code(403);
        echo json_encode(['message' => 'Forbidden']);
        exit;
    }
}
