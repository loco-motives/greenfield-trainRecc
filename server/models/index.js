const sequelize = require('../../db').sequelize;
const trainModel = require('../../db').Train;
const songModel = require('../../db').Song;
const userModel = require('../../db').User;
const tagModel = require('../../db').Tag;
const userFavModel = require('../../db').UserFav;

const util = require('../utils/utility');

var getAllSongsFromTrain = trainId => {
  return songModel.findAll({
    where: {
      trainId: trainId
    }
  });
};

var getFavoritedTrains = userId => {
  return userFavModel.findAll({
    where: {
      userId: userId
    }
  }).then(trains => {
    return Promise.all(
      trains.map(train => {
        return songModel.findAll({
          where: {
            trainId: train.dataValues.trainId
          }
        }).then(songs => {
          train.songs = songs.map(song => {
            return {
              title: song.title,
              artist: song.artist,
              songSourcePath: song.songSourcePath
            };
          });
          return {
            songs: train.songs,
            trainName: train.trainName,
            trainImg: train.trainImg
          };
        });
      })
    );
  });
};

var favTrain = (trainName, trainImg, trainId, userId) => {
  return userFavModel.create({
      userId: userId,
      trainId: trainId,
      trainImg: trainImg,
      trainName: trainName
    });
};

var addSong = (track, trainId, pending = false) => {
  return util.getHypemSongPath(track)
    .then(pathToMp3 => {
      return getAllSongsFromTrain(trainId)
        .then(songs => {
          return songModel.create({
            title: track.song,
            artist: track.artist,
            pending: pending,
            playCount: 0,
            songSourcePath: pathToMp3,
            trainId: trainId,
            trackNum: songs.length
          });
        });
    });
};

var addTags = (tags, trainId) => {
  console.log('tags', tags);
  return;
  return Promise.all(
    tags.map(tag => {
      return tagModel.create({
        text: tag
      }).then(createdTag => {
        console.log('createdTag', createdTag.dataValues.id);

        return sequelize.query('INSERT INTO TrainTag (trainId, tagId) value (?, ?)',{
          replacements : [trainId.toString(), createdTag.dataValues.id.toString()], type: sequelize.QueryTypes.INSERT
        });
      });
    })
  );
};

module.exports = {
  getAllSongsFromTrain: getAllSongsFromTrain,
  addTags: addTags,
  getFavoritedTrains: getFavoritedTrains,
  favTrain: favTrain,
  addSong: addSong
};