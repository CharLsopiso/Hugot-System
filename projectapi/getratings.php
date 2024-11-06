<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
include 'connection.php';

// Query to get the ratings
$sql = "SELECT hugot_id, AVG(rating) AS average_rating FROM tblratings GROUP BY hugot_id";
$stmt = $conn->prepare($sql);
$stmt->execute();
$ratings = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($ratings);
?>
