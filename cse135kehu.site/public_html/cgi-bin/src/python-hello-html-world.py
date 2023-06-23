#!/usr/bin/python3

import os

print("Cache-Control: no-cache")
print("Content-type: text/html\n")
print("<html>")
print("<head>")
print("<title>Hello, Python!</title>")
print("</head>")
print("<body>")

print("<h1>Kevin was here - Hello, Python!</h1>")
print("<p>This page was generated with the Python programming langauge</p>")

date = os.popen('date').read().strip()
print("<p>Current Time: {}</p>".format(date))

# IP Address is an environment variable when using CGI
address = os.environ['REMOTE_ADDR']
print("<p>Your IP Address: {}</p>".format(address))

print("</body>")
print("</html>")
