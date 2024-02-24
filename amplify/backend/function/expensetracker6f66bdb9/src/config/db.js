const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const docClient = new DynamoDBClient({
  region: "us-east-1",
});

module.exports = docClient;
