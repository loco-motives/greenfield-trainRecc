const moment = require('moment');

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
  var mp3path;
  return util.getHypemSongPath(track)
    .then(pathToMp3 => {
      mp3path = pathToMp3;
      return getAllSongsFromTrain(trainId);
    }).then(songs => {
      return songModel.create({
        title: track.song,
        artist: track.artist,
        pending: pending,
        playCount: 0,
        songSourcePath: mp3path,
        trainId: trainId,
        trackNum: songs.length
      });
    });
};

var addTags = (tags, trainId) => {
  return Promise.all(
    tags.map(tag => {
      return tagModel.create({
        text: tag
      }).then(createdTag => {
        let currDate = moment().format();
        currDate = currDate.replace('T', ' ').substr(0, currDate.lastIndexOf('-'))
        return sequelize.query('INSERT INTO TrainTag (trainId, tagId, createdAt, updatedAt) value (?, ?, ?, ?)', {
          replacements : [trainId.toString(), createdTag.dataValues.id.toString(), currDate, currDate],
          type: sequelize.QueryTypes.INSERT
        });
      });
    })
  );
};

var getTrainsByTag = tagName => {
  return tagModel.findAll({
    where: {
      text: tagName
    }
  }).then(tags => {
    return Promise.All(
      tags.map(tag => {
        let tagId = tag.dataValues.id;
        return sequelize.query('SELECT * FROM TrainTag WHERE (tagId) value (?)', {
          replacements: [tagId], type: sequelize.QueryTypes.SELECT
        }).then(trainTag => {
          return trainModel.findOne({
            where: {
              id: trainTag.dataValues.trainId
            }
          }).then(train => {
            return songModel.findAll({
              where: {
                trainId: train.dataValues.id
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
                trainName: train.dataValues.trainName,
                trainImg: train.dataValues.trainImg
              };
            });
          });
        });
      })
    );
  });
};

module.exports = {
  getAllSongsFromTrain: getAllSongsFromTrain,
  addTags: addTags,
  getFavoritedTrains: getFavoritedTrains,
  favTrain: favTrain,
  addSong: addSong,
  getTrainsByTag: getTrainsByTag
};