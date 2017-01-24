var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var setupPassport = require('./passportSetup');
require('../db');

var bodyParser = require('body-parser');
var router = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api', router);
app.use(cookieParser());
app.use(session({ 
  secret: 'trainrecc',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
setupPassport(app);

var port = 3000;
app.listen(port, function(){
  console.log('App listening on port', port);
});

