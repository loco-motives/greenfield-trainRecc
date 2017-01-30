import { Component, OnInit, OnChanges } from '@angular/core';
import { HomeService } from './home.service';
import { ApiService } from '../services/api.service';
import { SearchTagService } from '../services/search-tag.service';
import { AddSongToTrainService} from '../services/add-song-to-train.service'
import { ApplicationRef } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private homeService: HomeService, 
              private apiService: ApiService, 
              private searchTagService: SearchTagService,
              private addSongToTrainService: AddSongToTrainService,
              private applicationRef: ApplicationRef,
              private authService: AuthService
              ) { }

  songToSearch: string;
  trainName: string;
  trainImgPath: string;
  trainTags: string;
  tagSearch: string;
  message: "text";


  public songResults = [];
  public searchResults = [];
  public songToPlay = '';
  public displayAudioTag = false;
  public selectedTrack = {
    song: 'Select your song below',
    ph: ''
  };
  public trains = [];
  public testForGabe = true;
  public listrendered = true;
  public recommendedTrack = '';
  public addTrainView = this.addSongToTrainService.addTrainView;

  ngOnInit() {
  }

  search () {
    this.apiService.submitTagSearch(this.tagSearch);
  }

  logout() {
    this.authService.isLoggedIn = false;
    this.homeService.logout().subscribe(res => {
      console.log('logged out');
    });
  }

  searchForSong = () => {
    this.apiService.getRelevantSongs(this.songToSearch).subscribe(res => {
      this.songToSearch = '';
      this.songResults = res.json();
    }, err => {
      console.log('err', err);
    });
  }

  firstSongInTrain = idx => {
    this.selectedTrack = this.songResults[idx];
    this.selectedTrack.ph = ':';
  }

  createTrain = () => {
    var opts = {
      selectedTrack: this.selectedTrack,
      name: this.trainName,
      imgurl: this.trainImgPath,
      tags: this.trainTags
    }
    console.log('opts', opts);
    this.apiService.userSubmitsTrain(opts);
    this.displayLoadingGif();
  }

  displayLoadingGif() {
    this.listrendered = !this.listrendered;
    setTimeout( () => {
      this.listrendered = !this.listrendered;
    }, 5000)
  }

  getFavTrains = () => {
     this.apiService.getTrains();
  }

  trackToRecommend = idx => {
    this.recommendedTrack = this.songResults[idx];
  }

  returnToTrains() {
    this.addSongToTrainService.returnTrainView();
    this.addTrainView = this.addSongToTrainService.addTrainView;
  }

  recommendTrack = () => {
    this.addSongToTrainService.addSong(this.recommendedTrack).subscribe(res => {
      this.search();
      // this.displayLoadingGif()
    }, err => {
      console.log('err', err);
    })
  }
}
