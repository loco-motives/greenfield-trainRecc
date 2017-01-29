import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GetTrainsService } from '../services/get-trains.service';
import { HomeComponent} from '../home/home.component';
import { ApiService } from '../services/api.service';
import { SearchTagService } from '../services/search-tag.service';
import { AddSongToTrainService} from '../services/add-song-to-train.service'

@Component({
  selector: 'app-fav-trains',
  templateUrl: './fav-trains.component.html',
  styleUrls: ['./fav-trains.component.css']
})
export class FavTrainsComponent implements OnInit {
  public trains;
  public addTrainView = [true];
  constructor(private getTrainsService: GetTrainsService, private searchTagService: SearchTagService, private apiService: ApiService,
              private addSongToTrainService: AddSongToTrainService) { }
  ngOnInit() {
    this.trains = this.apiService.trains;
    setTimeout(() => {
      this.apiService.getTrains();
    }, 200)
  }

  favTrain = idx => {
    this.apiService.favTrain(this.trains[idx]);
  }

  addSongToTrain = idx => {
    this.addSongToTrainService.trainToAddSongTo(this.trains[idx]);
  }
}
