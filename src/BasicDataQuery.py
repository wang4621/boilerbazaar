import pymongo

def databaseInit():
    databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
    return databaseClient
    

databaseClient = databaseInit()
mydb = databaseClient["BoilerBazaar"]
myCollection = mydb["User"]

query = myCollection.find({ "Major" : "Computer Science"})
for x in query:
    print(x)