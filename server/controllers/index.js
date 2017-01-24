var bcrypt = require('bcryptjs'),
  request = require('request'),
  rp = require('request-promise'),
  path = require('path'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  userModel = require('../../db/index.js').User;

const cookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';
const hypemServe = 'http://hypem.com/serve/source/';

var users = {
  get: function(req, res){
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    res.send('got');
  }
};

var signup = {
  // get: function(req, res){
  //     res.render('/signup');
  // }
  post: function(req, res){
    console.log('req.body object is: ', req.body);
    var username = req.body.username;
    var password = req.body.password;

    if(!username || !password) {
      req.flash('error', 'Please fill out all fields');
      // res.redirect('signup');
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
  }). catch( (err) => {
      req.flash('error', 'Please choose a different username');
      // res.redirect('/signup');
    });
  }
};

var findHypemSongs = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    var songQuery = req.body.songQuery.replace(/ /g, '%20');
    var trackTitle;
    var headers = { 'Cookie': cookie, 'Host': hypemHost};

    rp.get({ url: hypemSearch + songQuery + '/1/', headers: headers})
      .then(html => {
        let $ = cheerio.load(html);
        let tracks = JSON.parse($('#displayList-data').remove().html()).tracks;
        trackTitle = tracks[0].song.replace(/ /g, '_');

        return rp.get({ url: hypemServe + tracks[0].id + '/' + tracks[0].key, headers: headers });
      }).then(scObj => {
        return rp.get(JSON.parse(scObj).url)
          .on('error', err => {
            console.log('err', err);
            res.send(err);
          }).pipe(fs.createWriteStream(path.join(__dirname, '../../mp3s/') + trackTitle + '.mp3'));
      }).then(successRes => {
        res.send('success creating mp3 file');
      }).catch(err => {
        console.log('err', err);
        res.send(err);
      });
  }
};

module.exports = {
  users: users,
  signup: signup,
  findHypemSongs: findHypemSongs
};