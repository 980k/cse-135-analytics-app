#!/usr/bin/python3

import os
import urllib.parse

print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# print HTML file top
print("""
<!DOCTYPE html>
<html>
<head>
<title>GET Request Echo</title>
</head>
<body>
<h1 align="center">Get Request Echo</h1>
<hr>
""")

# The Query String is simply an environment variable
query_string = os.environ.get("QUERY_STRING", "")

# Parse the Query String into a dictionary
query_dict = urllib.parse.parse_qs(query_string)

# Print out the Query String
for key, values in query_dict.items():
    print(f"<b>{key}:</b> {values[0]}<br/>\n")

# Print the HTML file bottom
print("</body></html>")
