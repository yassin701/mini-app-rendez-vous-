<?php

require 'db.php';

// ✅ Get all users
$sql = "SELECT * FROM users ORDER BY id DESC";
$result = $conn->query($sql);

$users = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// ✅ Return JSON
echo json_encode([
    "status" => "success",
    "data" => $users
]);

$conn->close();
?>