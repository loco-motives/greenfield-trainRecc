import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class SearchTagService {

  constructor(public _http: Http) { }

  submitTagSerch(inputTag) {
    return _http.get('api/gettrainsbytag?' + inputTag);
  }

}
