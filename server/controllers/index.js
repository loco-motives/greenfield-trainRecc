var bcrypt = require('bcryptjs'),
  request = require('request'),
  rp = require('request-promise'),
  path = require('path'),
  fs = require('fs'),
  cheerio = require('cheerio'),
  userModel = require('../../db/index.js').User;

const cookie = 'AUTH=03%3A000d0b26b966b36b95373839c8f21625%3A1485214124%3A1756308662%3ACA-US; __qca=P0-2125807484-1485216636861; notice20161220=true; _okdetect=%7B%22token%22%3A%2214852167662810%22%2C%22proto%22%3A%22http%3A%22%2C%22host%22%3A%22hypem.com%22%7D; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1485216766765%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ok=8642-858-10-6552; __utmt=1; __utma=1717032.322492649.1485216636.1485216636.1485216636.1; __utmb=1717032.21.9.1485218179897; __utmc=1717032; __utmz=1717032.1485216636.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _oklv=1485218203086%2CQaD8qpM5q5i8MGBZ2t6JN5YvCXO00ERA; olfsk=olfsk33434417706229236; wcsid=QaD8qpM5q5i8MGBZ2t6JN5YvCXO00ERA; hblid=yGEeJmSNoKgcyBc02t6JN5YvCX00EROo';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';

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

var hypemSongs = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);
    var songQuery = req.body.songQuery.replace(/ /g, '%20');
    var songDescriptions = [];

    rp.get(hypemSearch + songQuery + '/1')
      .then(htmlSearch => {
        let $ = cheerio.load(htmlSearch);
        let $tracks = $('.section-player');
        let $artistTitleElements = $('.section-player .track_name .artist');
        let $songTitleElements = $('.section-player .track_name .base-title');
        // console.log($songDivs);
        // console.log($temp.text())
        // let tracks = $('.tools .haarp-play-ctrl');
        // console.log('tracks', tracks);
        for(var i = 0; i < $tracks.length; i++) {
          // console.log($songDivs[i].parent.attribs.title);
          songDescriptions.push({title: $artistTitleElements[i].attribs.title});
          console.log($songTitleElements[i].parent.attribs.title);
          songDescriptions[i].artist = $songTitleElements[i].parent.attribs.title;
        }
        console.log('songDescriptions', songDescriptions);
        res.send($('body').html());
      }).catch(err => {
        console.log('err', err);
        res.send(err);
        return;
      });

    // rp.get({
    //   url: 'http://hypem.com/serve/source/27b06/6310ff7d0a2a4dee37e7549e3a7b2772?_=1485218201001',
    //   headers: {
    //     'Cookie': cookie,
    //     'Host': hypemHost,
    //   }
    // }).then(scObj => {
    //   let url = JSON.parse(scObj).url;
    //   return rp.get(url)
    //     .on('error', err => {
    //       console.log('err', err);
    //       res.send(err);
    //     }).pipe(fs.createWriteStream(path.join(__dirname, '../../mp3s/') + 'temp.mp3'));
    // }).then(scMp3 => {
    //   res.send('song created');
    // }).catch(err => {
    //   console.log('err', err);
    //   res.send(err);
    // });
  }
};

module.exports = {
  users: users,
  signup: signup,
  hypemSongs: hypemSongs
};