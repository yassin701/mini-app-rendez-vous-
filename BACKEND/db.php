<?php
 header('Access-Control-Allow-Origin: http://localhost:5173');
 header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
 header('Access-Control-Allow-Headers: Content-Type');
 header('Content-Type: application/json');

 $host = 'localhost';
 $user = 'root';
 $pass = '';
 $db = 'rendez-vous';

 $conn = new mysqli($host, $user, $pass, $db);

 if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
 }

?>