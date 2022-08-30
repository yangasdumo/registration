const express = require('express');
const flash = require('express-flash');
const session = require('express-session');
const exphbs = require("express-handlebars");
const bodyParser = require('body-parser');
const reggie = require('./registration');


const app = express();
app.use(flash());


//database
const pgp = require('pg-promise')({});

const local_database_url = 'postgres://codex:codex123@localhost:5432/my_reg';
const connectionString = process.env.DATABASE_URL || local_database_url;

const config = {
  connectionString
}

if (process.env.NODE_ENV == "production") {
  config.ssl = {
    rejectUnauthorized: false
  }
}

app.use(session({
  secret: 'this is my longest string that is used to test my registration with routes app for browser',
  resave: false,
  saveUninitialized: true
}));

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const db = pgp(config)
const plates = reggie(db)

app.get("/", async function (req, res) {
  let output = await plates.RegNumber()
  res.render("index", {
    output
  });
});

app.post("/registration", async function (req, res) {
  let cars = req.body.reg
  if (cars == null || cars == '') {
    req.flash('message', "Please enter your registration number !!")
  }else{
    // if(registration.length === 0){
    //   var registration = await db.manyOrNone('SELECT reg_number FROM my_regnumber WHERE reg_number =$1', [reg])
    //   req.flash('message',"Registration number already exist !!")
    // }
    await plates.storesRegNumber(cars)
  }
  res.redirect("/");

});

app.post("/filtering", async function (req, res) {
  let reg = req.body.town
  let output = await plates.filteReg(reg)
  res.render("index", {
    output
  });
})

app.get("/filtering", async function (req, res) {
  let reg = req.body.town
  let output = await plates.filteReg(reg)
  res.render("index", {
    output
  });
})

app.get("/clear", async function (req, res) {
  await plates.removeData()
  req.flash('message', "All Data Has Been Cleared !!")
  res.redirect("/")

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log('App starting on port', PORT);
});