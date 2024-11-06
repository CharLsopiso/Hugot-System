<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'connection.php';

$username = $_GET['username'];
$password = $_GET['password'];


$sql = "SELECT * FROM tblusers
WHERE user_username = :username AND user_password = :password";
$stmt = $conn->prepare($sql);
$stmt->bindParam(":username", $username);
$stmt->bindParam(":password", $password);
$stmt->execute();

$rs = $stmt->fetchAll(PDO::FETCH_ASSOC);


echo json_encode($rs);
?>