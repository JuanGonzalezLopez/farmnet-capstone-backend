const app = require("./routes");
const express = require("express");

// http module
var http = require("http").Server(app);

var port = 9000;

http.listen(port);

console.log("listening in port:", port);
