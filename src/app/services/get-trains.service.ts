import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GetTrainsService {

  constructor(private _http: Http) { }

  getTrains() {
    return this._http.get('api/trains');
  }

}
