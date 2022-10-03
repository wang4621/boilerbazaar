"""
    This file contains functions to manage request related to the sell operation
"""
import pymongo

#TODO: implement
def newListing(dbClient, listing):
    dbClient.insert_one(listing).inserted_id

#TODO: implement
def updateListing():
    print()

#TODO: implement
def deleteListing():
    print()