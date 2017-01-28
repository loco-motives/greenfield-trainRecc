import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AddSongToTrainService {

  constructor(private _http: Http) { }

  addSong(songObj, trainId) {
    var body = {};
    body.trainId = trainId;
    body.songTitle = songObj.song;
    body.songId = songObj.id;
    body.songKey = song.key;
    body.songArtist = songObj.artist;
    //what was songImg again?
    return _http.post('/api/addsongtotrain', body);
  }

}
