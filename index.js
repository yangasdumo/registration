const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');

const app = express();

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


app.get("/", function (req, res) {
  res.render("index", {

  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});