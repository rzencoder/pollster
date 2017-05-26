'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
  owner: String,
  question: String,
  options: [{
    option: String,
    votes: Number
  }]
});

module.exports = mongoose.model('Poll', Poll);
