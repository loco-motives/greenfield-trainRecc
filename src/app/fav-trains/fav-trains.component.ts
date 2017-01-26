import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GetTrainsService } from '../services/get-trains.service';
@Component({
  selector: 'app-fav-trains',
  templateUrl: './fav-trains.component.html',
  styleUrls: ['./fav-trains.component.css']
})
export class FavTrainsComponent implements OnInit {
  public trains;

  constructor(private getTrainsService: GetTrainsService ) { }

  ngOnInit() {
    this.getTrainsService.getTrains()
      .subscribe(res => {
        this.trains = res;
      });
  }

}
