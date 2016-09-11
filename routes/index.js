var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/megasmart';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Megasmart' });
});



module.exports = router;
