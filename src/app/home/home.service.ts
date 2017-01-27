import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HomeService {

  constructor(private _http: Http) { }

  logout() {
    return this._http.get('api/logout');
  }
}
