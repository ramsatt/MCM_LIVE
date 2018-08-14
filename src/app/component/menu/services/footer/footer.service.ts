import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";

@Injectable()
export class FooterService {

  constructor( public http: Http ) { }

  LoadFooterInfo() {
    const url = GlobalVariable.BASE_API_URL+'generalsettings/genral';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
