<?php

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

include 'connection.php';

// Fetch all comments
$sql = "SELECT * FROM tblcomments";
$stmt = $conn->prepare($sql);
$stmt->execute();

// Fetch results
$comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

// Group comments by hugot_id
$groupedComments = [];
foreach ($comments as $comment) {
    $hugotId = $comment['hugot_id'];
    if (!isset($groupedComments[$hugotId])) {
        $groupedComments[$hugotId] = [];
    }
    $groupedComments[$hugotId][] = $comment;
}

// Return grouped comments as JSON
echo json_encode($groupedComments);

?>
