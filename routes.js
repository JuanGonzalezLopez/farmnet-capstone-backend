const express = require("express");
var bodyParser = require("body-parser");

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const Cows = require("./controllers/Cows");
const Temperatures = require("./controllers/Temperatures");
const Steps = require("./controllers/Steps");

app.use("/cows", Cows);
app.use("/temperature", Temperatures);
app.use("/steps", Steps);

module.exports = app;
