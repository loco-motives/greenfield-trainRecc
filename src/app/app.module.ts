import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SongFormComponent } from './song-form/song-form.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent} from './login/login.component';

import { ApiService } from './song-form/api.service';
import { SignupService} from './signup/signup.service';
import { LoginService } from './login/login.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongFormComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
        path: '', component: HomeComponent
      }, {
        path: 'songForm', component: SongFormComponent
      }, {
        path: 'signUp', component: SignupComponent
      }, {
        path: 'login', component: LoginComponent
      }])
  ],
  providers: [ApiService, SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
