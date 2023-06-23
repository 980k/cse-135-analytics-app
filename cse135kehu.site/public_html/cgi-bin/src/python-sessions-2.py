#!/usr/bin/python3

import os

# Headers
print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# Body - HTML
print("<html>")
print("<head><title>Python Sessions</title></head>")
print("<body>")
print("<h1>Python Sessions Page 2</h1>")
print("<table>")

if "HTTP_COOKIE" in os.environ and os.environ["HTTP_COOKIE"] != "destroyed":
    print("<tr><td>Cookie:</td><td>{}</td></tr>".format(os.environ["HTTP_COOKIE"]))
else:
    print("<tr><td>Cookie:</td><td>None</td></tr>")

print("</table>")

# Links for other pages
print("<br />")
print('<a href="/cgi-bin/src/python-sessions-1.py">Session Page 1</a>')
print("<br />")
print('<a href="/python-cgiform.html">Python CGI Form</a>')
print("<br /><br />")

# Destroy Cookie button
print('<form action="/cgi-bin/src/python-destroy-session.py" method="get">')
print("<button type=\"submit\">Destroy Session</button>")
print("</form>")

print("</body>")
print("</html>")
