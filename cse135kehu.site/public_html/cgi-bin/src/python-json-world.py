#!/usr/bin/python3

import json
import os

print("Cache-Control: no-cache")
print("Content-type: application/json\n")

date = os.popen('date').read().strip()
address = os.environ['REMOTE_ADDR']

message = {
    'title': 'Kevin was here - Hello, Python!',
    'heading': 'Hello, Python!',
    'message': 'This page was generated with the Python programming language',
    'time': date,
    'IP': address
}

json_message = json.dumps(message)
print(json_message)
