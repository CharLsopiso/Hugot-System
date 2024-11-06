<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include 'connection.php';

$hugot_id = $_POST['hugot_id'];
$rating = $_POST['rating'];

// Check if hugot_id and rating are provided
if (!isset($hugot_id) || !isset($rating)) {
    echo json_encode(0);
    exit;
}

// Insert or update rating
$sql = "INSERT INTO tblratings (hugot_id, rating) VALUES (:hugot_id, :rating)
        ON DUPLICATE KEY UPDATE rating = VALUES(rating)";

$stmt = $conn->prepare($sql);
$stmt->bindParam(":hugot_id", $hugot_id);
$stmt->bindParam(":rating", $rating);
$stmt->execute();

$returnValue = 0;
if ($stmt->rowCount() > 0) {
    $returnValue = 1;
}

echo json_encode($returnValue);
?>
