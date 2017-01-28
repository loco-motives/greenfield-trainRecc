import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AddSongToTrainService {

  constructor(private _http: Http) { }

  addSong(songObj, trainId) {
    var body = {

    trainId : trainId,
    songTitle : songObj.song,
    songId : songObj.id,
    songKey : songObj.key,
    songArtist : songObj.artist
    }

    return this._http.post('/api/addsongtotrain', body);
  }

}
