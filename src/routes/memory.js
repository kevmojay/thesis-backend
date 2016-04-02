'use strict';

var express = require('express');
var controller = require('../controllers/memory');
var router = express.Router();


  router.get('/', controller.index); // get all memory

  router.get('/client/:client', controller.client);

  router.post('/', controller.store); // create new memory

  // update fields of user with id :id
  //router.put('/id/:id', controller.updateById);

  module.exports = router;
