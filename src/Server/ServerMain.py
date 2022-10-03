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
    def do_POST(self):
        print("POST")
        #TODO: switch cases to determine the required operation
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len).decode("utf-8")
        listing = json.loads(post_body)
        Sell.newListing(Listings, listing)
        self.send_header("Access-Control-Allow-Origin", self.client_address)
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        print("GET")
    
def serverInit():    
    server = http.server.HTTPServer(('', 8080), Handler)
    print("init complete")
    server.serve_forever()
    print("serving")

#TODO implement concurrency to accept multiple connections
serverInit()