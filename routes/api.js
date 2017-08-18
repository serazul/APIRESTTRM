var express = require ('express');
var restful = require('node-restful');
var router = express.Router();


var info = require('../models/data');

info.methods(['get', 'put']);
info.register(router, '/data');


module.exports = router;
