#!/usr/bin/python3
import cgi

print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# print HTML file top
print("""
<!DOCTYPE html>
<html>
<head>
<title>POST Request Echo</title>
</head>
<body>
<h1 align="center">POST Request Echo</h1>
<hr>
""")

form = cgi.FieldStorage()

print("<b>Message Body:</b><br>")
print("<ul>")

# Print out the form data
for field in form.keys():
    value = form[field].value
    print("<li>{0} = {1}</li>".format(field, value))

print("</ul>")
# Print the HTML file bottom
print("</body></html>")
