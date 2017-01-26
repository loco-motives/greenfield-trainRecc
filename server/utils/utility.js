const cheerio = require('cheerio');

var getTracks = html => {
  let $ = cheerio.load(html);
  return JSON.parse($('#displayList-data').remove().html()).tracks;
};

module.exports = {
  getTracks: getTracks
};