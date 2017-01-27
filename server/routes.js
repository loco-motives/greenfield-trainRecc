var router = require('express').Router();
var controller = require('./controllers');
var passport = require('passport');

router.get('/users', controller.users.get);
router.get('/signup', controller.signup.get);
router.get('/gettrainsongs', controller.train.get);

router.post('/create', controller.train.post);
router.post('/addSong', controller.song.post);
router.post('/signup', controller.signup.post);
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.post('/addtrain', controller.train.post);
router.post('/addtags', controller.tags.post);
router.post('/favplaylist', controller.favPlaylist.post);

router.post('/hypemSongs', controller.findHypemSongs.post);

router.get('/testsession', controller.testSession.get);
module.exports = router;