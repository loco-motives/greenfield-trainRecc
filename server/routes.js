var router = require('express').Router();
var controller = require('./controllers');
var passport = require('passport');

router.get('/users', controller.users.get);
router.post('/signup', controller.signup.post);
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: true
}));
=======
router.post('/hypemSongs', controller.hypemSongs.post);
>>>>>>> Start on parsing each song from user search
=======
router.post('/hypemSongs', controller.findHypemSongs.post);
>>>>>>> Download most relevant song when user inputs song search query

module.exports = router;