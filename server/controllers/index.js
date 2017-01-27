var bcrypt = require('bcryptjs'),
  rp = require('request-promise');

var userModel = require('../../db/index.js').User,
  userModel = require('../../db/index.js').User,
  trainModel = require('../../db').Train,
  songModel = require('../../db').Song,
  userFavModel = require('../../db').UserFav,
  hypemCtrl = require('./hypem');

const util = require('../utils/utility');
const models = require('../models');

var users = {
  get: function(req, res){
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    res.send('users get');
  }
};

var train = {
  get: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    res.send('train get');
  },
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    var newTrain = {
      name: req.body.name,
      likeCount: 0,
      imgUrl: req.body.imgurl,
      maxTracks: -1,
      creatorId: req.session.passport.user,
      conductorId: req.session.passport.user
    };

    var newTrainId;
    trainModel.create(newTrain).then(createdTrain => {
      newTrainId = createdTrain.dataValues.id;
      return models.favTrain(req.body.name, req.body.imgurl, newTrainId, req.session.passport.user);
    }).then(response => {
      return rp.post({url: 'http://localhost:3000/api/addsong', form: {track: req.body.selectedTrack, trainId: newTrainId}});
    }).then(response => {
      return models.addTags(req.body.tags.split(' '));
    }).then(response => {
      return models.getFavoritedTrains(req.session.passport.user);
    }).then(trains => {
      res.send(trains);
    }).catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    }); 
  }
};

var tags = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    console.log('req.body', req.body);
    res.send('tags post');
  }
};

var song = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    util.getHypemSongPath(req.body.track)
      .then(pathToMp3 => {
        models.getAllSongsFromTrain(req.body.trainId)
          .then(songs => {
            songModel.create({
              title: req.body.track.song,
              artist: req.body.track.artist,
              pending: !!req.body.pending,
              playCount: 0,
              songSourcePath: pathToMp3,
              trainId: req.body.trainId,
              trackNum: songs.length
            }).then(createdSong => {
              res.send('song POST');
            }).catch(err => {
              res.status(500).send(err);
            });
          });
      }).catch(err => {
        res.send('err', err);
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

var favPlaylist = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var userId = req.session.passport ? req.session.passport.user : req.body.user;
    userFavModel.create({
      userId: userId,
      trainId: req.body.trainId
    }).then(createdUserFav => {
      res.send('favPlaylist POST');
    }).catch(err => {
      res.status(500).send(err);
    });
  }
};

var testSession = {
  get: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    console.log('req.session', req.session);
    res.send('testSession GET');
  }
};

module.exports = {
  findHypemSongs: hypemCtrl.findHypemSongs,
  users: users,
  signup: signup,
  train: train,
  tags: tags,
  testSession: testSession,
  favPlaylist: favPlaylist,
  song: song
};