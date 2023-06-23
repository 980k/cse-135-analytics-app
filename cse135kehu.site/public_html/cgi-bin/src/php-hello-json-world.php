<?php

header("Content-type: application/json");
header("Cache-Control: no-cache");

$date = date('Y-m-d');
$address = $_SERVER['REMOTE_ADDR'];

$response = array(
    "message" => "Hello World from PHP!",
    "date" => "Today's date is $date",
    "ipAddress" => "$address"
);

echo json_encode($response);

?>
