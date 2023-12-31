#!/usr/bin/python3

import os
import sys

print("Cache-Control: no-cache")
print("Content-type: text/html\n")

# print HTML file top
print('''<!DOCTYPE html>
<html><head><title>General Request Echo</title>
</head><body><h1 align="center">General Request Echo</h1>
<hr>''')

# HTTP Protocol, HTTP Method, and the Query String are all environment variables
print("<p><b>HTTP Protocol:</b> " + os.environ['SERVER_PROTOCOL'] + "</p>")
print("<p><b>HTTP Method:</b> " + os.environ['REQUEST_METHOD'] + "</p>")
print("<p><b>Query String:</b> " + os.environ['QUERY_STRING'] + "</p>")

# NOTE: Although the Query String is an environment variable, the Message Body
# must be read in from the Standard Input with any language using CGI.
if os.environ['REQUEST_METHOD'] == "POST":
    content_length = int(os.environ['CONTENT_LENGTH'])
    post_data = sys.stdin.read(content_length)
    print("<p><b>Message Body:</b> " + post_data + "</p>")

# Print the HTML file bottom
print("</body></html>")
