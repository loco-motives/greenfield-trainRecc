var bcrypt = require('bcryptjs'),
  rp = require('request-promise');

var userModel = require('../../db/index.js').User,
  userModel = require('../../db/index.js').User,
  trainModel = require('../../db').Train,
  songModel = require('../../db').Song;

var users = {
  get: function(req, res){
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    res.send('got');
  }
};

var train = {
  post: (req, res) => {
    var name = req.body.name;
    var imgUrl = req.body.imgurl;
    var creatorId = req.session.passport.user;

    var newTrain = {
      name: name,
      likeCount: 0, 
      imgUrl: imgUrl,
      maxTracks: null,
      creatorId: creatorId,
      conductorId: creatorId
    };

    trainModel.create(newTrain).then( () => {
      console.log('train created');
      res.redirect('/');
    });
  }
};

var song = {
  post: (req, res) => {
    rp.get('/api/getTrainSongs?' + req.body.trainId)
      .then( trainRes => {
        var newSong = {
          title: req.body.title,
          pending: req.body.pending,
          playCount: 0,
          songSourcePath: req.body.songSourcePath,
          trainId: req.body.trainId,
          trackNum: trainRes.numOfSongs
        };

        songModel.create(newSong).then( () => {
          console.log('song created');
          res.redirect('/');
        });
      });
  }
};

var signup = {
  get: function(req, res){
      res.render('/signup');
  },
  post: function(req, res){
    console.log('req.body object is: ', req.body);
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password) {
      req.flash('error', 'Please fill out all fields');
      res.redirect('signup');
    }

    var salt = bcrypt.genSaltSync(10);
    var hashedPassword = bcrypt.hashSync(password, salt);

    var newUser = {
      username: username,
      salt: salt,
      password: hashedPassword
    };

    userModel.create(newUser).then( () => {
      console.log('user created');
      res.redirect('/');
      }).catch( (err) => {
      req.flash('error', 'Please choose a different username');
      res.redirect('/signup');
    });
  }
};

module.exports = {
  findHypemSongs: require('./hypem').findHypemSongs,
  getHypemSong: require('./hypem').getHypemSong,
  users: users,
  signup: signup,
  train: train
};