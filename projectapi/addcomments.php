<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'connection.php';

$comment = $_POST['comment'];
$hugot_id = $_POST['hugot_id'];

$sql = "INSERT INTO `tblcomments` (`hugot_id`,`comment`) VALUES (:hugot_id, :comment)";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":comment", $comment);
$stmt->bindParam(":hugot_id", $hugot_id);
$stmt->execute();

$returnValue = 0;
if ($stmt->rowCount() > 0){
    $returnValue = 1;
}


echo json_encode($returnValue);
?>