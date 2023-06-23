<?php
// Print HTTP header
header("Cache-Control: no-cache");
header("Content-type: text/html");

// Print HTML file top
echo <<<END
<!DOCTYPE html>
<html>
  <head>
    <title>General Request Echo</title>
  </head>
  <body>
    <h1 align="center">General Request Echo</h1>
    <hr>
END;

// HTTP Protocol, HTTP Method, and the Query String are all environment variables
echo "<p><b>Request Method:</b> $_SERVER[REQUEST_METHOD]</p>";
echo "<p><b>Protocol:</b> $_SERVER[SERVER_PROTOCOL]</p>";
echo "<p><b>Query:</b> $_SERVER[QUERY_STRING]</p>";

// Read in the message body from standard input
$form_data = file_get_contents('php://input');
echo "<p><b>Message Body:</b> $form_data</p>";

// Print the HTML file bottom
echo "</body></html>";
?>
