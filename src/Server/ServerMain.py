"""
    This file contains functions to initialize, and the main execution 
    path of the server
"""
import pymongo

#connects server to database
def connectToDatabase():
    databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
    return databaseClient
    
#TODO: initializes server
def serverInit():    
    print("initializing server")

databaseClient = connectToDatabase()
mydb = databaseClient["BoilerBazaar"]
myCollection = mydb["User"]

query = myCollection.find({ "Major" : "Computer Science"})
for x in query:
    print(x)