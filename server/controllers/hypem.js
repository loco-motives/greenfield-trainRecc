const rp = require('request-promise');
const path = require('path');
const fs = require('fs');

const util = require('../utils/utility');

const hypemCookie = 'AUTH=03%3A45dcd553c82cccb5165dfff1dfedc88f%3A1484958954%3A1245621796%3ACA-US';
const hypemHost = 'hypem.com';
const hypemSearch = 'http://hypem.com/search/';
const headers = { 'Cookie': hypemCookie, 'Host': hypemHost};

var findHypemSongs = {
  post: (req, res) => {
    console.log('Serving request for ', req.method, 'where url is ', req.url);

    var songQuery = req.body.songQuery.replace(/ /g, '%20');
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

module.exports = {
  findHypemSongs: findHypemSongs
};