var express = require('express');
require('../db');

var bodyParser = require('body-parser');
var router = require('./routes');

var app = express();
app.use(bodyParser.json());
app.use('/api', router);

var port = 3000;
app.listen(port, function(){
    console.log('App listening on port', port);
});

