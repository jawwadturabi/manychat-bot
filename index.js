'use strict';

const line = require('@line/bot-sdk');
const express = require('express');

// create LINE SDK config from env variables
const config = {
  channelAccessToken: "YfOU5GHeOuLQ8328H12Ze7NL0V5IjNA9ayO88iKUBUeJxjoDI+hs+Ox1t9+Nwd76TpZ8c/YQMwaUlR5Zo92gEsogTlnt5fLgmRkn7oIojKw65LlqDhlTR6og8YjZgQcSGnUpDQibNh3XdaykrHyzYwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "3767de218c799e46388977a200e29164",
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

const replyText = (token, texts) => {
  texts = Array.isArray(texts) ? texts : [texts];
  return client.replyMessage(
    token,
    texts.map((text) => ({ type: 'text', text }))
  );
};
// event handler
function handleEvent(event) {
  if (event.replyToken && event.replyToken.match(/^(.)\1*$/)) {
    return console.log("Test hook recieved: " + JSON.stringify(event.message));
  }
  switch (event.type) {
    case 'join':
      return replyText(event.replyToken, `Joined ${event.source.type}`);
    // return client.replyMessage(event.replyToken, `Joined ${event.source.type}`);
    // create a echoing replyMessage message
    default:
      return replyText(event.replyToken, 'Got followed event');
    // return client.replyMessage(event.replyToken, 'Got followed event');

    // use reply API
    // return client.replyMessage(event.source.userId, echo);
  }
}
// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});