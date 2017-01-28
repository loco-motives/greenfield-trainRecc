/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchTagService } from './search-tag.service';

describe('SearchTagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchTagService]
    });
  });

  it('should ...', inject([SearchTagService], (service: SearchTagService) => {
    expect(service).toBeTruthy();
  }));
});
