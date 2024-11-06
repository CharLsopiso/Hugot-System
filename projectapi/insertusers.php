<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'connection.php';

$fullname = $_POST['fullname'];
$username = $_POST['username'];
$password = $_POST['password'];

$sql = "INSERT INTO tblusers(user_fullname, user_username, user_password)
VALUES(:fullname, :username, :password)";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":fullname", $fullname);
$stmt->bindParam(":username", $username);
$stmt->bindParam(":password", $password);
$stmt->execute();

$returnValue = 0;
if ($stmt->rowCount() > 0){
    $returnValue = 1;
}


echo json_encode($returnValue);
?>