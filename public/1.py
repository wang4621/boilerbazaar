import json
import boto3
def lambda_handler(event, context):
    # read listingID from event
    listingID = event['listingID']
    # get listing from dynamodb
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('boilerbazaar.listing')
    response = table.get_item(
        Key={
            'listingID': listingID
        }
    )
    listing = response['Item']
    # modify listing
    listing["sold"] = "true"
    # update listing in dynamodb
    response = table.put_item(
        Item=listing
    )
    # Get sellerID from listing
    sellerID = listing['sellerID']
    # get seller from dynamodb
    table = dynamodb.Table('boilerbazaar.profile')
    response = table.get_item(
        Key={
            'puid': sellerID
        }
    )
    seller = response['Item']
    # Increment seller's sold count
    seller['sell'] = seller['sell'] + 1
    # update seller in dynamodb
    response = table.put_item(
        Item=seller
    )
    # return 200
    return {
        'statusCode': 200,
    }
 