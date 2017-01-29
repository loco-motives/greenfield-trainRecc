import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  redirectUrl: string;

  login() {
    this.isLoggedIn = true;
  }

  logout(){
    this.isLoggedIn = false;
  }

}
