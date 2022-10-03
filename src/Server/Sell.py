"""
    This file contains functions to manage request related to the sell operation
"""
import pymongo

#TODO: implement
def newListing(dbClient, listing):
    return dbClient.insert_one(listing).acknowledged

#TODO: implement
def updateListing():
    print()

#TODO: implement
def deleteListing():
    print()