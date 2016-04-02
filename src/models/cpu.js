'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cpuSchema = new Schema({
  time:  {
    type: Date,
    required: true
  },
  value: Number,
  type: String
});
var Cpu = mongoose.model('Cpu', cpuSchema, 'CPU');

module.exports = Cpu;
