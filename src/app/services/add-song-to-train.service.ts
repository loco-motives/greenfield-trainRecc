import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AddSongToTrainService {

  private trainToAddTo;
  public addTrainView = [true];

  constructor(private _http: Http) { }

  addSong(songObj) {
    var body = {
      trainId : this.trainToAddTo.trainId,
      track: songObj
    }
    return this._http.post('/api/addsongtotrain', body);
  }

  trainToAddSongTo(train) {
    this.trainToAddTo = train;
    this.addTrainView.shift();
    this.addTrainView.push(false);
  }
}
