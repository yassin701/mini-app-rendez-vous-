<?php

require 'db.php';

// قراءة data من React (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// نخدو القيم
$fullName = $data['full_Name'];
$email = $data['email'];
$phone = $data['phone_Num'];
$date = $data['Date'];
$time = $data['Time'];
$reason = $data['Reason_forVisit'];

// prepare query (مهم للحماية)
$stmt = $conn->prepare("INSERT INTO users (full_Name, email, phone_Num, Date, Time, Reason_forVisit) VALUES (?, ?, ?, ?, ?, ?)");

$stmt->bind_param("ssssss", $fullName, $email, $phone, $date, $time, $reason);

// execute
if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Appointment created successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>