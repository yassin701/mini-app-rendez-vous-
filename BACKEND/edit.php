<?php
require 'db.php'; // include your database connection

// قراءة البيانات من React (JSON)
$data = json_decode(file_get_contents("php://input"), true);

// تأكد أن البيانات موجودة
if (!$data || !isset($data['id'])) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit;
}

// استخراج القيم
$id = $data['id'];
$fullName = $data['full_Name'];
$email = $data['email'];
$phone = $data['phone_Num'];
$date = $data['Date'];
$time = $data['Time'];
$reason = $data['Reason_forVisit'];

// تحضير الاستعلام لمنع SQL Injection
$stmt = $conn->prepare("
    UPDATE users 
    SET full_Name=?, email=?, phone_Num=?, Date=?, Time=?, Reason_forVisit=? 
    WHERE id=?
");

$stmt->bind_param("ssssssi", $fullName, $email, $phone, $date, $time, $reason, $id);

// تنفيذ الاستعلام
if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "User updated successfully"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => $stmt->error
    ]);
}

// إغلاق الاتصال
$stmt->close();
$conn->close();
?>