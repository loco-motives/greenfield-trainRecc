var router = require('express').Router();
var controller = require('./controllers');
var passport = require('passport');

router.get('/users', controller.users.get);
router.post('/signup', controller.signup.post);
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: true
}));

module.exports = router;