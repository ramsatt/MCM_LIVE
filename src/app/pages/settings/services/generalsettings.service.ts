import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../global/global';


@Injectable()
export class GeneralsettingsService {

  constructor(public http: Http) { }
  loadgeneral() {
    const url = GlobalVariable.BASE_API_URL + 'generalsettings/genral';
    const response = this.http.get(url).map(res => res.json());
    return response;

  }
  Updategenset(formData) {
    const url = GlobalVariable.BASE_API_URL + 'generalsettings/upgen';
    return this.http.post( url, formData ).map(res  => res.json());

  }

}
