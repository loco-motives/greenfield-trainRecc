const cheerio = require('cheerio');
const path = require('path');
const rp = require('request-promise');
const fs = require('fs');

const hypemCookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemServe = 'http://hypem.com/serve/source/';
const headers = { 'Cookie': hypemCookie, 'Host': hypemHost};

var getTracks = html => {
  let $ = cheerio.load(html);
  let tracks = JSON.parse($('#displayList-data').remove().html()).tracks;
  return tracks.map(track => {
    return {id: track.id, key: track.key, artist: track.artist, song: track.song};
  });
};

var getHypemSongPath = track => {
  var song = track.song.replace(/ /g, '_');
  var artist = track.artist.replace(/ /g, '_');
  var pathToMp3 = path.join(__dirname, '../../mp3s/') + song + '_' + artist + '.mp3';

  return rp.get({ url: hypemServe + track.id + '/' + track.key, headers: headers})
    .then(scObj => {
      return rp.get(JSON.parse(scObj).url)
        .on('error', err => {
          console.log('err', err);
        }).pipe(fs.createWriteStream(pathToMp3));
    }).then(res => {
      return pathToMp3;
    });
};

module.exports = {
  getTracks: getTracks,
  getHypemSongPath: getHypemSongPath
};