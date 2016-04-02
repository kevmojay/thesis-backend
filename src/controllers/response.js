'use strict';

  var _ = require('underscore');
  var moment = require('moment');
  var mongoose = require('mongoose');
  var ResponseModel   = require('../models/response');

  var ResponseController = {};

  //get all requests
  ResponseController.index = function(req,res){
    ResponseModel.find({}, function(err, result) {
      if (err) {
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  };

  ResponseController.client = function(req,res){
    var clientName = req.params.client;

    ResponseModel.find({client: clientName}, function(err, result) {
      if(err){
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  }

  module.exports = ResponseController;
