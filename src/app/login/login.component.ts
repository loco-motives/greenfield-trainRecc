import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import {trigger, state, animate, style, transition} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class LoginComponent implements OnInit {
  loginUsername: string;
  loginPassword: string;

  constructor() { }

  ngOnInit() {
  }
}
