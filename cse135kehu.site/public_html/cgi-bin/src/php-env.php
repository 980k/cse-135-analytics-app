<?php

// print HTML header
header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>Environment Variables</title></head>";
echo "<body><h1 align=center>Environment Variables</h1><hr/>";

echo "<ul>"; // start unordered list

foreach ($_SERVER as $key => $value) {
  echo "<li>$key = $value</li>"; // print each variable and its value as a list item
}

echo "</ul>"; // end unordered list

// print HTML footer
echo "</body></html>";


?>