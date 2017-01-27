const sequelize = require('../../db').sequelize;
const trainModel = require('../../db').Train;
const songModel = require('../../db').Song;
const userModel = require('../../db').User;
const tagModel = require('../../db').Tag;
const userFavModel = require('../../db').UserFav;

var getAllSongsFromTrain = trainId => {
  return songModel.findAll({
    where: {
      trainId: trainId
    }
  });
};

var getFavoritedTrains = userId => {
  console.log('userId', userId);
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
          var trainObj = {
            songs: train.songs,
            trainName: train.trainName,
            trainImg: train.trainImg
          };
          return trainObj;
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

var addTags = (tags, trainId) => {
  console.log('tags', tags);

  return Promise.all(
    tags.map(tag => {
      return tagModel.create({
        text: tag
      }).then(createdTag => {
        console.log('createdTag', createdTag.dataValues.id);

        // sequelize.query("INSERT INTO TrainTag (trainId, tagId) VALUES (" + trainId.toString() + ', ' + createdTag.dataValues.id.toString())
        //   .spread(function(results, metadata) {
        //     // Results will be an empty array and metadata will contain the number of affected rows.
        //     console.log('results', results);
        //     console.log('metadata', metadata);
        //   });

        // trainModel.addTag({
        //   where: {
        //     tagId: createdTag.dataValues.id
        //   }
        // }).then(createdSomething => {
        //   console.log('createdSomething', createdSomething);
        // });
      });
    })
  );
  //   answers.map(oneAnswer => {
  //     return models.Solution.findOrCreate({
  //       where: {
  //         name: oneAnswer,
  //         LibraryId: LibId
  //       },
  //       defaults: {
  //         name: oneAnswer,
  //         length: [...oneAnswer].length,
  //         LibraryId: LibId
  //       }
  //     });
  //   })
  // )
};

module.exports = {
  getAllSongsFromTrain: getAllSongsFromTrain,
  addTags: addTags,
  getFavoritedTrains: getFavoritedTrains,
  favTrain: favTrain
};