const env = require('dotenv');

if(env) {
    env.load();
}


const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const users = require('./users');

const BootBot = require('bootbot');

var yahooFinance = require('yahoo-finance');

const bot = new BootBot({
  accessToken: process.env.PAGE_TOKEN,
  verifyToken: process.env.VERIFY_TOKEN,
  appSecret: process.env.APP_SECRET
});

bot.on('message', (payload, chat) => {
  const text = payload.message.text;

  yahooFinance.quote({
    symbol: text,
    modules: [ 'price' ] // see the docs for the full list 
  }, function (err, quotes) {
    
    if(err) {
      chat.say(`Sorry we didn't find any data about ${text} stock`);
      return;
    }

    chat.say(`The current price for ${text} is $${quotes.price.regularMarketPrice}`);
  });

});

bot.on('postback:GET_STARTED', (payload, chat) => {
    chat.say("Hi there welcome to Bot a Stock your stockmarket bot helper!");
    chat.say("To get started type the name of the stock and you'll get the current price");
});

bot.start();

mongoose.connect(process.env.DB_URI);

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to ' + process.env.DB_URI);
});
