import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { ApiService } from './services/api.service';
import { LoginComponent } from './login/login.component';
import { FormComponent } from './login/form/form.component';
import { SignupComponent } from './login/signup/signup.component';
import { SignupService} from './login/signup/signup.service';
import { LoginService } from './login/form/login.service';
import { SearchComponent } from './search/search.component';
import { FavTrainsComponent } from './fav-trains/fav-trains.component';
import { GetTrainsService } from './services/get-trains.service';
import { HomeService } from './home/home.service';
import { AddSongToTrainService } from './services/add-song-to-train.service';
import { SearchTagService} from './services/search-tag.service';
import { SearchpageComponent } from './searchpage/searchpage.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormComponent,
    SignupComponent,
    LoginComponent,
    SearchComponent,
    FavTrainsComponent,
    SearchpageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent, children: [
        { path: 'form', component: FormComponent },
        { path: 'signup', component: SignupComponent}
      ]},
      { path: 'favtrains', component: FavTrainsComponent },
      { path: 'search', component: SearchpageComponent}
    ]),
    MaterialModule.forRoot()
  ],
  providers: [ApiService, SignupService, LoginService, GetTrainsService, HomeService, AddSongToTrainService, SearchTagService],
  bootstrap: [AppComponent]
})
export class AppModule { }
