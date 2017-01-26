var bcrypt = require('bcryptjs'),
  request = require('request'),
  rp = require('request-promise'),
  path = require('path'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  userModel = require('../../db/index.js').User,
  trainModel = require('../../db').Train,
  songModel = require('../../db').Song;

const hypemCookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';
const hypemServe = 'http://hypem.com/serve/source/';

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
        let $ = cheerio.load(html);
        tracks = JSON.parse($('#displayList-data').remove().html()).tracks;
        trackTitle = tracks[0].song.replace(/ /g, '_');
        artist = tracks[0].artist.replace(/ /, '_');

        return rp.get({ url: hypemServe + tracks[0].id + '/' + tracks[0].key, headers: headers });
      }).then(scObj => {
        return rp.get(JSON.parse(scObj).url)
          .on('error', err => {
            console.log('err', err);
            res.send(err);
          }).pipe(fs.createWriteStream(path.join(__dirname, '../../mp3s/') + trackTitle + '_' + artist + '.mp3'));
      }).then(successRes => {
        res.send(tracks.slice(0, 3));
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
  train: train
};