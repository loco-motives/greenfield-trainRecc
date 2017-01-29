import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  getRelevantSongs(songQuery) {
    return this._http.post('/api/hypemSongs', {songQuery: songQuery});
  }

  addSong(track) {
    return this._http.post('/api/getHypemSongPath', {track: track})
  }

  userSubmitsTrain(trainInfo): Observable<any> {
    return this._http.post('/api/addtrain', trainInfo).map(x => x.json());
  }
}
