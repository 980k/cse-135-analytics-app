<?php
// print HTML header
header("Cache-Control: no-cache");
header("Content-type: text/html");
echo "<html><head><title>GET Request Echo</title></head>";
echo "<body><h1 align=center>Get Request Echo</h1><hr/>";

// Get Query String from environment variable
$queryString = getenv('QUERY_STRING');

// Print Query String label
echo "<b>Query String:</b> $queryString<br />\n";

// Parse Query String
parse_str($queryString, $queryArray);

// Print Query String variables
foreach ($queryArray as $key => $value) {
  echo "<b>$key:</b> $value<br />\n";
}

// print HTML footer
echo "</body></html>";
?>
