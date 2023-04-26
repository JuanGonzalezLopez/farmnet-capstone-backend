var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var assert = require("assert");

router.use(bodyParser.urlencoded({ extended: true }));

var MongoClient = mongodb.MongoClient;
var uri ='mongodb+srv://cesar_123:incorrect@cluster0.shpdj.mongodb.net/?retryWrites=true&w=majority';
// var uri = "mongodb://farmNetAdmin:farmNet1875@ds113640.mlab.com:13640/farmnet";

router.post("/getCows", function(req, res) {
  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client
      .db('data')
      .collection("cows")
      .find({}, { _id: 0 })
      .toArray(function(err, cows) {
        assert.equal(null, err);
        client.close();
        res.send(cows);
      });
  });
});

router.post("/getCow", function(req, res) {
  const { id } = req.body;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client
      .db()
      .collection("cows")
      .find({ id: id }, { _id: 0 })
      .toArray(function(err, cows) {
        assert.equal(null, err);
        client.close();
        res.send(cows);
      });
  });
});

router.post("/addCow", function(req, res) {
  const { name, age, breed, category, cycle, id, labels } = req.body;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client
      .db()
      .collection("cows")
      .insertOne(
        {
          name: name,
          id: id,
          age: age,
          breed: breed,
          category: category,
          cycle: cycle,
          labels: labels
        },
        function(err, results) {
          assert.equal(null, err);
          client.close();
          res.send("added");
        }
      );
  });
});

router.post("/updateCow", function(req, res) {
  const { name, age, breed, category, cycle, id, labels } = req.body;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client
      .db()
      .collection("cows")
      .updateOne(
        { id: id },
        {
          $set: {
            name: name,
            id: id,
            age: age,
            breed: breed,
            category: category,
            cycle: cycle,
            labels: labels
          }
        },
        function(err, results) {
          assert.equal(null, err);
          client.close();
          res.send("edited");
        }
      );
  });
});

router.post("/deleteCow", function(req, res) {
  const { id } = req.body;

  MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client
      .db()
      .collection("cows")
      .deleteOne({ id: id }, function(err, results) {
        assert.equal(null, err);
        client.close();
        res.send("deleted");
      });
  });
});

module.exports = router;
