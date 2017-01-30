import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ApiService {

  constructor(private _http: Http) { }

  trains = [];

  getRelevantSongs(songQuery) {
    return this._http.post('/api/hypemSongs', {songQuery: songQuery});
  }

  addSong(track) {
    return this._http.post('/api/getHypemSongPath', {track: track})
  }

  userSubmitsTrain(trainInfo) {
    this._http.post('/api/addtrain', trainInfo)
      .map(x => x.json())
      .subscribe(res => {
        console.log('res', res);
      }, err => {
        console.log('err', err);
      })
  }

  getTrains() {
    this._http.get('api/trains').subscribe(res => {
      this.trains.splice(0, this.trains.length);
      res.json().forEach(train => {
        this.trains.push(train);
      })
      console.log('this.trains', this.trains);
    }, err => {
      console.log('err', err);
    });
  }

  submitTagSearch(inputTag) {
    this._http.get('api/trainsbytag?' + inputTag).subscribe(res => {
      this.trains.splice(0, this.trains.length);
      res.json().forEach(train => {
        this.trains.push(train);
      });
    }, err => {
      console.log('err', err);
    })
  }

  favTrain(train) {
     return this._http.post('/api/favtrain', {
      trainName: train.trainName,
      trainImg: train.trainImg,
      trainId: train.trainId
    }).subscribe(res => {
       console.log('res', res);
    }, err => {
      console.log('err', err);
    });;

  }
}
