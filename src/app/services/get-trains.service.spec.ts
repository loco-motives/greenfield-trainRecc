/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetTrainsService } from './get-trains.service';

describe('GetTrainsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTrainsService]
    });
  });

  it('should ...', inject([GetTrainsService], (service: GetTrainsService) => {
    expect(service).toBeTruthy();
  }));
});
