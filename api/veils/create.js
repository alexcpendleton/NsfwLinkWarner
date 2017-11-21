'use strict';

const shortid = require('shortid');
const dynamodb = require('./dynamodb');
shortid.characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const newid = shortid.generate;

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  console.error("event body:",JSON.stringify(event.body));
  const unsafeUri = data.unsafeUri;
  if (typeof unsafeUri !== 'string' || !unsafeUri) {
    console.error('Validation Failed', data, unsafeUri);
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*"
      },
      body: 'Couldn\'t create the veil item.'
    });
    return;
  }
  const maxLength = 1000;
  if (unsafeUri.length > maxLength) {
    console.error('Too long uri: ', unsafeUri);
    callback(null, {
      statusCode: 400,
      headers: {
        'Content-Type': 'text/plain',
        "Access-Control-Allow-Origin": "*"
      },
      body: `Couldn't create the veil item. unsafeUri must be under ${maxLength} characters.`
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: newid(),
      unsafeUri: unsafeUri
    }
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.log("Error creating veil: ", error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: {
          'Content-Type': 'text/plain',
          "Access-Control-Allow-Origin": "*"
        },
        body: `Couldn't create the veil item. ${error} `
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
      headers: {
        "Access-Control-Allow-Origin": "*" // Required for CORS support to work
      }
    };
    callback(null, response);
  });
};
