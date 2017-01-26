import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-create-train',
  templateUrl: './create-train.component.html',
  styleUrls: ['./create-train.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.Default
})
export class CreateTrainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
