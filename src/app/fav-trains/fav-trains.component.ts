import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { GetTrainsService } from '../services/get-trains.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-fav-trains',
  templateUrl: './fav-trains.component.html',
  styleUrls: ['./fav-trains.component.css']
})
export class FavTrainsComponent implements OnInit {
  public trains;

  constructor(private getTrainsService: GetTrainsService, private sanitizer: DomSanitizer ) { }

  sanitize(path) {
    return this.sanitizer.bypassSecurityTrustUrl(path);
  }

  ngOnInit() {
    this.getTrainsService.getTrains()
      .subscribe(res => {
        console.log('res.json is: ', res.json());
        this.trains = res.json();
        this.trains.forEach(trainObj => {
          trainObj.songs.forEach(songObj => {
            songObj.songSourcePath = this.sanitize(songObj.songSourcePath);
          });
        });
        console.log('this.trains:',this.trains)
      });
  }

}
