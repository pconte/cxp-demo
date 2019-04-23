var express = require("express");
var bodyParser = require("body-parser");
var db = require("./db.js");
var articles = require("./articles.js");

var app = express();
app.use(express.static('public'));
app.use(bodyParser());

var searches = [];

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
  res.render("index.html");
});

app.post("/api/search", (req, res, next) => {
  var searchString = req.body.searchString;
  
  searches.push(searchString);
  res.json({
    'searches': searches,
    'searchString': searchString,
    'tags': [],
    'results': []
  });
});