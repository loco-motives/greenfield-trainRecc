var router = require('express').Router();
var controller = require('./controllers');
var passport = require('passport');
var path = require('path');

router.get('/media/play.svg', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/media/play.svg'));
});
router.get('/media/spinner.svg', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/media/spinner.svg'));
});
router.get('/media/volume.svg', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/media/volume.svg'));
});
router.get('/media/pause.svg', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/media/pause.svg'));
});

router.get('/users', controller.users.get);
router.get('/signup', controller.signup.get);
router.get('/trains', controller.train.get);
router.get('/logout', (req, res) => {
    console.log('logged user out');
    req.logout();
});
router.post('/create', controller.train.post);
// router.post('/addSong', controller.song.post);
router.post('/signup', controller.signup.post);
router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/login/signup',
    failureFlash: true
}));

router.post('/hypemSongs', controller.findHypemSongs.post);
router.post('/getHypemSong', controller.getHypemSong.post);

module.exports = router;