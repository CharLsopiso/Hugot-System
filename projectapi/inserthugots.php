<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include 'connection.php';

$hugot = $_POST['hugot'];
$user_id = $_POST['user_id'];

$sql = "INSERT INTO tblhugots(hugot,user_id)
VALUES(:hugot,:user_id)";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":hugot", $hugot);
$stmt->bindParam(":user_id", $user_id);
$stmt->execute();

$returnValue = 0;
if ($stmt->rowCount() > 0){
    $returnValue = 1;
}


echo json_encode($returnValue);
?>