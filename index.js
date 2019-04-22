var express = require("express");
var app = express();

var db = require("./db.js");

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

var helloString = db.sayHello();

app.get("/hello", (req, res, next) => {
  res.json([helloString]);
});