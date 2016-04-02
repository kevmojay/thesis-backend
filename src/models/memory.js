'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memorySchema = new Schema({
  time:  {
    type: Date,
    required: true
  },
  value: Number,
  type: String
});
var Memory = mongoose.model('Ram', memorySchema, 'ram');

module.exports = Memory;
