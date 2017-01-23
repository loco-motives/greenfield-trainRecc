var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
require('../db');

var bodyParser = require('body-parser');
var router = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use('/api', router);
app.use(cookieParser());
app.use(session({ 
    secret: 'trainrecc',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());

var port = 3000;
app.listen(port, function(){
    console.log('App listening on port', port);
});

