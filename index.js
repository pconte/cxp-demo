var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./db.js");
var articles = require("./models/articles.js");
var tags = require("./models/tags.js");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser());
//app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

var searches = [];

app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/", (req, res, next) => {
  res.render("index");
});

app.get("/api/tags", (req, res, next) => {
  res.json({
    'tags': tags
  });
});

app.post("/api/search", (req, res, next) => {
  var searchString = req.body.searchString;
  
  searches.push(searchString);
  res.json({
    'searches': searches,
    'searchString': searchString,
    'tags': [],
    'results': articles
  });
});