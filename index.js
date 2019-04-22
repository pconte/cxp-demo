var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db.js");

var app = express();
app.use(express.static('public'));
app.use(bodyParser());

var searches = ['string1', 'string2', 'string3'];

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
  res.render("index.html");
});

var helloString = db.sayHello();

app.get("/hello", (req, res, next) => {
  res.json([helloString]);
});

app.get("/api/searches", (req, res, next) => {
  res.json(searches);
});

app.post("/api/search", (req, res, next) => {
  var searchString = req.body.searchString;
  
  searches.push(searchString);
  res.json(searches);
});