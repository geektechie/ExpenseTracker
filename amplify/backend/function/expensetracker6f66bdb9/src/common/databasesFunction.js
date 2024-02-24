const { ScanCommand } = require("@aws-sdk/client-dynamodb");
const db = require("../config/db");

const getDataById = async (tableName, id) => {
    const getParams = new ScanCommand({
        TableName: tableName,
        FilterExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": {
                S: id.toString(),
            },
        },
    });
    const currentData = await db.send(getParams);
    return currentData.Items?.[0] || null;
};



module.exports = { getDataById };
