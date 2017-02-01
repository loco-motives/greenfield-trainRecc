var router = require('express').Router();
var controller = require('./controllers');
var passport = require('passport');
var path = require('path');

router.get('/signup', controller.signup.get);
router.get('/trains', controller.train.get);
router.get('/gettrainsongs', controller.train.get);
router.get('/trainsbytag', controller.tags.get);

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

router.get('/css/audio.css', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/css/bootstrap.css'));
});
router.get('/css/bootstrap.css', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/css/bootstrap.css'));
});
router.get('/css/bootstrap.min.css', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/css/bootstrap.min.css'));
});
router.get('/css/simple-sidebar.css', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/css/simple-sidebar.css'));
});

router.get('/logout', (req, res) => {
    console.log('logged user out');
    req.logout();
});

router.post('/addsongtotrain', controller.song.post);
router.post('/addtrain', controller.train.post);
router.post('/favtrain', controller.favTrain.post);
router.post('/hypemSongs', controller.findHypemSongs.post);
router.post('/signup', controller.signup.post);
router.post('/login', (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
        res.status(400);
        return res.send('false'); 
    }

    req.logIn(user, (err) => {
      if (err) { return next(err); }
      return res.send(user);
    });

  })(req, res, next);

});


module.exports = router;