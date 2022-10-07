import json
import boto3

s3 = boto3.resource('s3')

def lambda_handler(event, context):
    # TODO implement
    s3_path = event['listingID'] + "/"
    count = int(event['count'])
    for i in range(count):
        file_name = "image" + str(i)
        lambda_path = "/tmp/" + file_name
        with open(lambda_path, 'w+') as file:
            file.write(event[file_name])
            file.close()
        file_name += '.txt'
        s3.meta.client.upload_file(lambda_path, 'buckettostoretestdata',
            s3_path + file_name)
    return {
        'statusCode': 200,
        'body': json.dumps('Upload Success!')
    }
