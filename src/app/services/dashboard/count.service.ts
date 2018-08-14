import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../global/global';


@Injectable()
export class CountService {
  constructor(public http: Http) { }
  AccountCount(formData) {
    const url = GlobalVariable.BASE_API_URL + 'count/accounts';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }
}
