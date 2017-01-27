import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(private _http: Http) { }

  login(username, password) {
    return this._http.post('api/login', {
      username: username,
      password: password
    });
  }
}
