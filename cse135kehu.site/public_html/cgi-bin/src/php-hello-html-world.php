<?php

header("Content-type: text/html");
header("Cache-Control: no-cache");

$now = time();
$date = date('Y-m-d', $now);
$time = date('H:i:s', $now);
$address = $_SERVER['REMOTE_ADDR'];

echo "<html>";
echo "<head>";
echo "<title>Hello PHP World</title>";
echo "</head>";
echo "<body>";
echo "<h1 align=center>Hello PHP World</h1>";
echo "<hr/>";
echo "<p>Kevin was here - Hello World</p>";
echo "<p>This page was generated with the PHP programming language</p>";
echo "<p>This program was run at: $date $time</p>";
echo "<p>Your current IP address is $address</p>";
echo "</body>";
echo "</html>";

?>
