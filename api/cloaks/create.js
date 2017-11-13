'use strict';

const shortid = require('shortid');
const dynamodb = require('./dynamodb');
shortid.characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const newid = shortid.generate;

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  const unsafeUrl = data.unsafeUrl;
  if (typeof unsafeUrl !== 'string' || !unsafeUrl) {
    console.error('Validation Failed');
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Couldn\'t create the veil item.',
    });
    return;
  }
  const maxLength = 1000;
  if(unsafeUrl.length > maxLength) {
    console.error('Too long uri: ', unsafeUrl);
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: `Couldn't create the veil item. unsafeUrl must be under ${maxLength} characters.`,
    });
    return;
  }

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: newid(),
      unsafeUri: unsafeUrl
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
        body: 'Couldn\'t create the veil item.',
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
