import Sell
import pymongo
import json

text = "{\"title\": \"test\", \"isbn\": \"123456\", \"author\": \"test\", \"edition\": \"1\", \"price\": \"100\", \"description\": \"\"}"
jsonFile = json.loads(text)
databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
db = databaseClient["BoilerBazaar"]
Listings = db["Listings"]
Sell.newListing(Listings, jsonFile)