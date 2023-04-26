var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var assert = require('assert');

router.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = mongodb.MongoClient;
var uri ='mongodb+srv://cesar_123:incorrect@cluster0.shpdj.mongodb.net/?retryWrites=true&w=majority';
// var uri = 'mongodb://farmNetAdmin:farmNet1875@ds113640.mlab.com:13640/farmnet';

router.post('/getAllTemp', function(req, res) {

    const {id } = req.body;

    MongoClient.connect(uri, { useNewUrlParser: true },function (err, client) {
        assert.equal(null, err);
        client.db().collection('temperatures').find({"id": id}, {_id:0}).sort( { "timestamp": -1 } ).toArray(function(err, cows) {

            assert.equal(null, err);
            client.close();
            res.send(cows);
        });
    });
});

router.post('/getTemperatures', function(req, res) {

    const {id, start, end } = req.body;

    MongoClient.connect(uri, { useNewUrlParser: true },function (err, client) {
        assert.equal(null, err);
        client.db().collection('temperatures').find({"id": id, "timestamp": {$gte: start, $lte: end}}, {_id:0}).sort( { "timestamp": 1 } ).toArray(function(err, cows) {

            assert.equal(null, err);
            client.close();
            res.send(cows);
        });
    });
});

router.post('/addTemperature', function(req, res) {

    const { id, timestamp, temperature } = req.body;

    MongoClient.connect(uri, { useNewUrlParser: true },function (err, client) {
        assert.equal(null, err);
        client.db().collection('temperatures').insertOne({"id": id, "temperature": parseInt(temperature), "timestamp": parseInt(timestamp)}, function(err, results) {
            assert.equal(null, err);
            client.close();
            res.send('added');
        });
    });
});

router.post('/deleteTemperatures', function(req, res) {

    const {id} = req.body;

    MongoClient.connect(uri, { useNewUrlParser: true },function (err, client) {
        assert.equal(null, err);
        client.db().collection('temperatures').deleteMany({ id : id }, function(err, results) {
            assert.equal(null, err);
            client.close();
            res.send('deleted');
        });
    });
});

module.exports = router;
