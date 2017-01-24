var router = require('express').Router();
var controller = require('./controllers');

router.get('/users', controller.users.get);
router.post('/signup', controller.signup.post);
router.get('/hypemSongs', controller.hypemSongs.get);

module.exports = router;