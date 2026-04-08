<?php
require 'db.php';

if (!isset($_GET['id'])) {
    echo json_encode(["message" => "ID is required"]);
    exit;
}
$id = $_GET['id'];

//query delete

$sql = "DELETE FROM USERS WHERE id = ? "; 
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()){

    echo json_encode(["message" => "deleted successfully"]);
}else{

    echo json_encode(["message" => "Error deleting user"]);
}

?>