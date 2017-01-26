import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-song-form',
  templateUrl: './song-form.component.html',
  styleUrls: ['./song-form.component.css']
})
export class SongFormComponent implements OnInit {
  songToSearch: string;

  public songResults = [];
  public songToPlay = '';
  public displayAudioTag = false;

  constructor(public apiService: ApiService) { }

  ngOnInit() {
  }

  searchForSong = () => {
    this.apiService.getRelevantSongs(this.songToSearch).subscribe(res => {
      this.songToSearch = '';
      this.songResults = res.json();
    }, err => {
      console.log('err', err);
    });;
  }

  addSong = idx => {
    this.apiService.addSong(this.songResults[idx]).subscribe(res => {
      this.displayAudioTag = true;
      this.songToPlay = res.json().pathToMp3;

      // var audio = new Audio();
      // audio.src = res.json().pathToMp3;
      // audio.load();
      // audio.play();
    }, err => {
      console.log('err', err);
    })
  }
}
