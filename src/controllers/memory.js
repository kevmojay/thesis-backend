'use strict';

  var _ = require('underscore');
  var moment = require('moment');
  var mongoose = require('mongoose');
  var MemoryModel   = require('../models/memory');

  var MemoryController = {};

  //get all requests
  MemoryController.index = function(req,res){
    MemoryModel.find({}, function(err, result) {
      if (err) {
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  };

  MemoryController.client = function(req,res){
    var clientName = req.params.client;

    MemoryModel.find({client: clientName}, function(err, result) {
      if(err){
        console.log('Request index blew up!');
        return res.status(500).json({error: err.message});
      }
      res.json(result);
    });
  }

  //store a request and emit result
  MemoryController.store = function(req, res) {
    var currentMoment=moment();
      //Gets all form data and forces requestTime to the current time
      var memoryFields = _.extend(
        _.pick(
          req.body,
          'type',
          'value'),
          {'time': currentMoment}
      );

      var memory = new MemoryModel(memoryFields);

      memory.save(function(err, result) {
        if (err) {
          console.log('Request store blew up!');

          return res.status(500).json({error: err.message});
        }
        res.json(result);
      }); // end of request.save
  };// end of RequestController.store

  module.exports = MemoryController;
