var bcrypt = require('bcryptjs'),
  request = require('request'),
  rp = require('request-promise'),
  path = require('path'),
  fs = require('fs');

var userModel = require('../../db/index.js').User,
  util = require('../utils/utility');
  fs = require('fs'),
  cheerio = require('cheerio'),
  userModel = require('../../db/index.js').User,
  trainModel = require('../../db').Train,
  songModel = require('../../db').Song;

const hypemCookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';
const hypemServe = 'http://hypem.com/serve/source/';
const headers = { 'Cookie': hypemCookie, 'Host': hypemHost};

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
    }

    trainModel.create(newTrain).then( () => {
      console.log('train created');
      res.redirect('/');
    });
  }
}

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
        }

        songModel.create(newSong).then( () => {
          console.log('song created');
          res.redirect('/');
        });
      });
  }
}

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

var findHypemSongs = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var songQuery = req.body.songQuery.replace(/ /g, '%20');
    var headers = { 'Cookie': hypemCookie, 'Host': hypemHost};
    var trackTitle;
    var artist;
    var tracks;
    rp.get({ url: hypemSearch + songQuery + '/1/', headers: headers})
      .then(html => {
        let tracks = util.getTracks(html);
        res.send(tracks.slice(0, 3));
      }).catch(err => {
        console.log('err', err);
        res.send(err);
      });
  }
};

var getHypemSong = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var track = req.body.track;
    var song = track.song.replace(/ /g, '_');
    var artist = track.artist.replace(/ /g, '_');
    var pathToMp3 = path.join(__dirname, '../../mp3s/') + song + '_' + artist + '.mp3';

    rp.get({ url: hypemServe + track.id + '/' + track.key, headers: headers})
      .then(scObj => {
        return rp.get(JSON.parse(scObj).url)
          .on('error', err => {
            console.log('err', err);
            res.send(err);
          }).pipe(fs.createWriteStream(pathToMp3));
      }).then(successRes => {
        res.send({pathToMp3: pathToMp3});
      }).catch(err => {
        console.log('err', err);
        res.send(err);
      });
  }
};

module.exports = {
  users: users,
  signup: signup,
  findHypemSongs: findHypemSongs,
  getHypemSong: getHypemSong,
  train: train
};