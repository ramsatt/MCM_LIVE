import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class EditsolutionService {

  constructor(public http: Http) { }
  Update(id, solution) {
    const url = GlobalVariable.BASE_API_URL + 'solution/update&somID=' + encodeURIComponent(id) + '&somName=' + encodeURIComponent(solution);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
