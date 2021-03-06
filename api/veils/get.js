'use strict';

const dynamodb = require('./dynamodb');

module.exports.get = (event, context, callback) => {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  // fetch todo from the database
  dynamodb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 
          'Content-Type': 'text/plain' ,
          "Access-Control-Allow-Origin" : "*"
        },
        body: 'Couldn\'t fetch the veil item.',
      });
      return;
    }

    const output = Object.assign({}, result.Item, {
      showAds: true
    });
    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(output),
      headers: {
        "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
      },
    };
    callback(null, response);
  });
};
