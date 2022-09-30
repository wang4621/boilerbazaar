"""
    This file contains functions to initialize, and the main execution 
    path of the server
"""
import pymongo
import http.server

class Handler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        print("POST")
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        print(post_body)

    def do_GET(self):
        print("GET")

#connects server to database
def connectToDatabase():
    databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
    return databaseClient
    
#TODO: initializes server
def serverInit():    
    server = http.server.HTTPServer(('', 8080), Handler)
    server.serve_forever()

databaseClient = connectToDatabase()
mydb = databaseClient["BoilerBazaar"]
myCollection = mydb["User"]

#TODO implement concurrency to accept multiple connections
serverInit()