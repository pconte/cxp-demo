var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./db.js");
var articles = require("./data/articles.js");
var tags = require("./data/tags.js");

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

app.get("/api/suggestions", (req, res, next) => {
  // console.log(req.query);
  // var searchString = req.query.search;
  // TODO: use the incomplete search string to intelligently derive suggestions
  // from the previously memoized searches.

  var counts = {};
  searches.forEach(function (search) {
    counts[search] = counts[search] ? counts[search] + 1 : 1;
  });

  var suggestions = searches.filter(function (search, index, self) {
    return self.indexOf(search) === index;
  }).map(function (suggestion) {
    return {
      'suggestion': suggestion,
      'count': counts[suggestion]
    }
  });

  res.json({
    'suggestions': suggestions
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