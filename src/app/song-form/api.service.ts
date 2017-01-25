import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  getRelevantSongs(songQuery) {
    return this._http.post('/api/hypemSongs', {songQuery: songQuery});
  }
}
