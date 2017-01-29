import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { GetTrainsService } from '../../services/get-trains.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

export class FormComponent {
  loginUsername: string;
  loginPassword: string;
  public trains;

  constructor(private loginService: LoginService, private getTrainsService: GetTrainsService, private router: Router) { }

  ngOnInit() {
  }

  

  submitLogin = () => {
    this.loginService.login(this.loginUsername, this.loginPassword)
      .subscribe(res => {
        this.loginUsername = '';
        this.loginPassword = '';
        console.log('res from login is: ', res);
        console.log('res.status from login is: ', res.status);
        this.router.navigateByUrl('');
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