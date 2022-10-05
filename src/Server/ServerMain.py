"""
    This file contains functions to initialize, and the main execution 
    path of the server
"""
import pymongo
import http.server
import Sell
import json

#connects server to database
databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
db = databaseClient["BoilerBazaar"]
Listings = db["Listings"]
Users = db["User"]

class Handler(http.server.BaseHTTPRequestHandler):
    #new/update listing, send messages, etc
    def do_POST(self):
        print("POST")
        #TODO: switch cases to determine the required operation
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        listing = post_body
        print(listing)        

    #searching, receive messages, etc
    def do_GET(self):
        print("GET")
    
def serverInit():    
    server = http.server.HTTPServer(('', 8080), Handler)
    server.serve_forever()

#TODO implement concurrency to accept multiple connections
serverInit()