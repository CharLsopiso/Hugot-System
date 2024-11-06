<?php
    header('Content-Type: application/json');
    header("Access-Control-Allow-Origin: *");

    include 'connection.php';

    $sql = "SELECT * FROM tblhugots";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    $rs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rs);
  ?> 