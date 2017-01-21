var router = require('express').Router();
var controller = require('./controllers');

router.get('/users', controller.users.get);

module.exports = router;