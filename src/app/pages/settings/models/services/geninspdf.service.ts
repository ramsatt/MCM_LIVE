import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class GeninspdfService {

  constructor(public http: Http) { }

  Create(formData, options, Som_ID, Name) {
    const url = GlobalVariable.BASE_API_URL + 'geninspdf/create&somID=' + encodeURIComponent(Som_ID) + '&Name=' + encodeURIComponent(Name);
    return this.http.post(url, formData, options)
        .map(response => response.json()).catch(error => Observable.throw(error.json()));
  }

  GetALL(Som_ID) {
    const url = GlobalVariable.BASE_API_URL + 'geninspdf/getall&somID=' + encodeURIComponent(Som_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
