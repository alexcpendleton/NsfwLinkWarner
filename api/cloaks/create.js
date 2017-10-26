'use strict';

const shortid = require('shortid');
const dynamodb = require('./dynamodb');
shortid.characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const newid = shortid.generate;

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const uri = data.uri;
  if (typeof uri !== 'string' || !uri) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the Cloak item.',
    });
    return;
  }
  const maxLength = 1000;
  if(uri.length > maxLength) {
    console.error('Too long uri: ', uri);
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `Couldn't create the Cloak item. Uri must be under ${maxLength} characters.`,
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: newid(),
      uri: uri
    },
  };

  // write the todo to the database
  dynamodb.put(params, (error) => {
    // handle potential errors
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t create the Cloak item.',
      });
      return;
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
    callback(null, response);
  });
};
