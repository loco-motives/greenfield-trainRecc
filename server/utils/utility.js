const cheerio = require('cheerio');
const path = require('path');
const rp = require('request-promise');
const fs = require('fs');
const S3FS = require('s3fs');

console.log('process.env', process.env);
var s3fsImpl;
if(process.env.AWSAccessKeyId && process.env.AWSSecretKey) {
  console.log('ENV VARS FOUND');
  s3fsImpl = new S3FS('mpthrees', {
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
  });
} else {
  console.log('ENV VARS NOT FOUND');
  let aws = require('../awsKeys');
  s3fsImpl = new S3FS('mpthrees', {
    accessKeyId: aws.accessKeyId,
    secretAccessKey: aws.secretAccessKey
  });
}

s3fsImpl.create();

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
  var fileName = song + '_' + artist + '.mp3';
  var pathToMp3 = 'https://s3.amazonaws.com/mpthrees/' + fileName;

  return rp.get({ url: hypemServe + track.id + '/' + track.key, headers: headers})
    .then(scObj => {
      return rp.get(JSON.parse(scObj).url)
        .on('error', err => {
          console.log('err', err);
    }).pipe(s3fsImpl.createWriteStream(fileName));
    }).then(res => {
      return pathToMp3;
    });
};

module.exports = {
  getTracks: getTracks,
  getHypemSongPath: getHypemSongPath
};