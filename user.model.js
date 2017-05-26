const mongoose = require('mongoose');

const User = new mongoose.Schema({
  fbid: {type: String, required: true, unique: true},
  name: {type: String, required: true},
  stocks: [String]
});

module.exports = mongoose.model('User', User);