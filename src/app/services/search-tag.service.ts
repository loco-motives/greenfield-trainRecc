import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchTagService {

  constructor(public _http: Http) { }

  submitTagSearch(inputTag) {
    return this._http.get('api/trainsbytag?' + inputTag);
  }

}
