const express = require('express');
const app = express();
const port = 3000;
var mongoose = require('mongoose');
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());
app.set('view engine','ejs');
app.use(session({secret:'sessionsecret'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('.app/routes.js')(app,passport);

// launch server

app.listen(port);
console.log('server started on port ' + port);