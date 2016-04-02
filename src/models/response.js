'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var responseSchema = new Schema({
  time:  {
    type: Date,
    required: true
  },
  value: Number,
  type: String
});
var Response = mongoose.model('Response', responseSchema, 'metric_curl');

module.exports = Response;
