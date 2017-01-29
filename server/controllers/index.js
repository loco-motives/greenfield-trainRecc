var bcrypt = require('bcryptjs'),
  rp = require('request-promise');

var userModel = require('../../db/index.js').User,
  trainModel = require('../../db').Train,
  songModel = require('../../db').Song,
  hypemCtrl = require('./hypem');

const util = require('../utils/utility');
const models = require('../models');

var train = {
  get: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    models.getFavoritedTrains(req.session.passport.user)
      .then(trains => {
        res.send(trains);
      }).catch(err => {
        res.status(500).send(err);
      });
  },
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var newTrain = {
      name: req.body.name,
      imgUrl: req.body.imgurl,
      creatorId: req.session.passport.user,
    };

    var newTrainId;
    trainModel.create(newTrain).then(createdTrain => {
      newTrainId = createdTrain.dataValues.id;
      return models.favTrain(req.body.name, req.body.imgurl, newTrainId, req.session.passport.user);
    }).then(response => models.addSong(req.body.selectedTrack, newTrainId))
      .then(response => models.addTags(req.body.tags.split(' '), newTrainId))
      .then(response => models.getFavoritedTrains(req.session.passport.user))
      .then(trains => {
      res.send(trains);
    }).catch(err => {
      console.log('err', err);
      res.status(500).send(err);
    }); 
  }
};

var tags = {
  get: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    models.getTrainsByTag(req.url.substr(req.url.indexOf('?') + 1))
      .then(trains => {
        res.send(trains);
    }).catch(err => {
      res.status(500).send(err);
    });
  },
};

var song = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    util.getHypemSongPath(req.body.track)
      .then(pathToMp3 => {
        return models.getAllSongsFromTrain(req.body.trainId).then(songs => {
          return songModel.create({
            title: req.body.track.song,
            artist: req.body.track.artist,
            songSourcePath: pathToMp3,
            trainId: req.body.trainId,
            trackNum: songs.length
          });
        });
      }).then(() => {
        return models.favTrain(req.body.name, req.body.imgurl, req.body.trainId, req.session.passport.user);
      }).then(() => {
        res.send('added song to train: ' + req.body.trainId);
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

var favTrain = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var userId = req.session.passport ? req.session.passport.user : req.body.user;
    models.favTrain(req.body.trainName, req.body.trainImg, req.body.trainId, userId)
      .then(success => {
        res.send('User successfully favorited train ' + trainName);
      }).catch(err => {
        res.status(500).send(err);
      });
  }
};

module.exports = {
  findHypemSongs: hypemCtrl.findHypemSongs,
  signup: signup,
  train: train,
  tags: tags,
  song: song,
  favTrain: favTrain
};