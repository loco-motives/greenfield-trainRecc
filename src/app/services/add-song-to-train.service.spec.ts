/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddSongToTrainService } from './add-song-to-train.service';

describe('AddSongToTrainService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddSongToTrainService]
    });
  });

  it('should ...', inject([AddSongToTrainService], (service: AddSongToTrainService) => {
    expect(service).toBeTruthy();
  }));
});
