var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

//configuration

mongoose.connect(configDB.url, { useMongoClient: true }); // connection database
mongoose.Promise = global.Promise;

require('./config/passport')(passport); // pass passport for configuration

// set up express

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // lire les coookies (on a besoin pour l'auth)
app.use(bodyParser()); // get information from html forms

app.set ('view engine' , 'ejs'); // ejs template

// need for passport 

app.use(session({ secret: 'samoussa' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persitent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./app/routes.js')(app, passport); // load our routes 

// launch 
app.listen(8080);
console.log('Welcome app ready');