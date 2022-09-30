import socket

s = socket.socket()
s.connect(("localhost", 8080))
s.send(bytes("hello", "utf-8"))