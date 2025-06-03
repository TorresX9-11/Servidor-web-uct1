<?php
$host = "localhost";
$db = "emanuel_torres_db1";
$user = "emanuel_torres";
$pass = "emanuel_torres2025";
// $host = "localhost";
// $db = "portafolio_db";
// $user = "root";
// $pass = "";

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
  die("Error de conexión: " . $conn->connect_error);
}
?>