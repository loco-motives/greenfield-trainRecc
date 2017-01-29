import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { GetTrainsService } from '../services/get-trains.service';
import { HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-fav-trains',
  templateUrl: './fav-trains.component.html',
  styleUrls: ['./fav-trains.component.css']
})
export class FavTrainsComponent implements OnInit {

  @Input() homeComponent: HomeComponent;
  public trains;

  constructor(private getTrainsService: GetTrainsService) { }
  ngOnInit() {
    setTimeout(() => {
    this.getTrainsService.getTrains()
      .subscribe(res => {
        console.log('res.json is: ', res.json());
        this.trains = res.json();
        console.log('this.trains:',this.trains)
      });
    }, 200)
  }
}
