var router = require('express').Router();
var controller = require('./controllers');

router.get('/users', controller.users.get);
router.post('/signup', signupController.signup.post);

module.exports = router;