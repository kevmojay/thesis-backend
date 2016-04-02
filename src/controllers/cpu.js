'use strict';

  var _ = require('underscore');
  var moment = require('moment');
  var mongoose = require('mongoose');
  var CpuModel   = require('../models/cpu');

  var CpuController = {};

  //get all requests
  CpuController.index = function(req,res){
    CpuModel.find({}, function(err, result) {
      if (err) {
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  }

  CpuController.client = function(req,res){
    var clientName = req.params.client;

    CpuModel.find({client: clientName}, function(err, result) {
      if(err){
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  }

  module.exports = CpuController;
