import uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: "secretSantaGroups",
        Item:{
            groupId: uuid.v1(),
            groupName: data.name,
            createdAt: Date.now(),
            status: 0
        }
    };

    dynamoDb.put(params, (error, data) => {
        const headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
        };

        if(error) {
            const response = {
                statusCode: 500,
                headers: headers,
                body: JSON.stringify({status: false})
            };

            callback(null, response);
            return;
        }

        const response = {
            statusCode: 200,
            headers:headers,
            body: JSON.stringify(params.Item)
        };
        callback(null, response);
    });
}

