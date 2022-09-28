import pymongo

databaseClient = pymongo.MongoClient("mongodb://localhost:27017")
mydb = databaseClient["BoilerBazaar"]
myCollection = mydb["User"]

query = myCollection.find({ "Major" : "Computer Science"})

for x in query:
    print(x)