'use strict';

var express = require('express');
var controller = require('../controllers/cpu');
var router = express.Router();


  router.get('/', controller.index); // get all memory
  router.get('/client/:client', controller.client);

  // update fields of user with id :id
  //router.put('/id/:id', controller.updateById);

  module.exports = router;
