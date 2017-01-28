import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { GetTrainsService } from '../../services/get-trains.service';


@Component({
    selector: 'app-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent {
  loginUsername: string;
  loginPassword: string;
  public trains;

  constructor(private loginService: LoginService, private getTrainsService: GetTrainsService) { }

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

      this.getTrainsService.getTrains()
        .subscribe(res => {
        console.log('res.json is: ', res.json());
        this.trains = res.json();
      });
      

  }
  
    flag = () => {
        //add class fadeIn to element
        //in the css, give that class the fadeIn stuff
    }

}