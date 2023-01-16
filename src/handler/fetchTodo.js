const AWS = require("aws-sdk");

const fetchtodo = async (event) => {

  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters

  let todo;
  try {
    const results = await dynamodb.get({
      TableName: "TodoTable",
      key: { id }
    }).promise();
    todo = results.Item;
  } catch (err) {
    console.log(err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
  };
};

module.exports = {
  handler: fetchtodo
}