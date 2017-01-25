import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule} from '@angular/router';
 
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SongFormComponent } from './song-form/song-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SongFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([{
        path: '', component: HomeComponent
      }, {
        path: 'songForm', component: SongFormComponent
      }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
