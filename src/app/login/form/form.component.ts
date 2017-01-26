import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'app-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent {
  loginUsername: string;
  loginPassword: string;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  submitLogin = () => {
    this.loginService.login(this.loginUsername, this.loginPassword)
      .subscribe(res => {
        this.loginUsername = '';
        this.loginPassword = '';
      }, err => {
        console.log('err', err)
      });
  }

    flag = () => {
        //add class fadeIn to element
        //in the css, give that class the fadeIn stuff
    }

}