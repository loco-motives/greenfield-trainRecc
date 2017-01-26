const rp = require('request-promise');
const path = require('path');
const fs = require('fs');

const util = require('../utils/utility');

const hypemCookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';
const hypemServe = 'http://hypem.com/serve/source/';
const headers = { 'Cookie': hypemCookie, 'Host': hypemHost};

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
  findHypemSongs: findHypemSongs,
  getHypemSong: getHypemSong
};