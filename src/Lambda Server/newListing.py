import boto3
import json

client = boto3.client('dynamodb')

def lambda_handler(event, context):
    #print(event['sellerid'])
    try:
        data = client.put_item(
            TableName='boilerbazaar.listing',
            Item={
                'listingID': {
                    'S': event['listing']
                },
                'sellerID': {
                    'S': event['sellerID']
                },
                'title': {
                    'S': event['title']
                },
                'isbn': {
                    'S': event['isbn']
                },
                'author': {
                    'S': event['author']
                },
                'edition': {
                    'N': event['edition']
                },
                'price': {
                    'N': event['price']
                },
                'condition': {
                    'S': event['condition']
                },
                'description': {
                    'S': event['description']
                }
            }
        )
    except:
        return {
            'statusCode': 500,
            'body': json.dumps('Something went wrong.')
        }
    return {
        'statusCode': 201,
        'body': json.dumps('Success!')
    }
