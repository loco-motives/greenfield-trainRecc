import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SignupService {

  constructor(private _http: Http) { }

  signUp(username, password) {
    return this._http.post('/api/signup', {
      username: username,
      password: password
    });
  }
}
