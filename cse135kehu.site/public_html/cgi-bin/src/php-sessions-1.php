<?php
// Start PHP session
session_start();

// Get the username from the session or the POST data
if (isset($_POST['username'])) {
  $_SESSION['username'] = $_POST['username'];
}
$name = $_SESSION['username'];

// Set a cookie with the session ID
setcookie('PHPSESSID', session_id());

// Output HTML
echo "<html>";
echo "<head>";
echo "<title>PHP Sessions</title>";
echo "</head>";
echo "<body>";

echo "<h1>PHP Sessions Page 1</h1>";

if ($name) {
  echo "<p><b>Name:</b> $name";
} else {
  echo "<p><b>Name:</b> You do not have a name set</p>";
}
echo "<br/><br/>";
echo "<a href=\"/cgi-bin/src/php-sessions-2.php\">Session Page 2</a><br/>";
echo "<a href=\"/php-cgiform.html\">PHP CGI Form</a><br />";
echo "<form style=\"margin-top:30px\" action=\"/cgi-bin/src/php-destroy-session.php\" method=\"get\">";
echo "<button type=\"submit\">Destroy Session</button>";
echo "</form>";

echo "</body>";
echo "</html>";
?>
