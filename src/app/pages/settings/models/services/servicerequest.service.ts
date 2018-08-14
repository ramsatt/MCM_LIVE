import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class ServicerequestService {

  constructor( public http: Http ) { }

  GetAllRequest() {
    const url = GlobalVariable.BASE_API_URL + 'servicerequest/getallrequest';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  InsertSrRequest( reqName, reqDesc, reqDisabled ) {
    const url = GlobalVariable.BASE_API_URL + 'servicerequest/create&reqName=' + encodeURIComponent(reqName) + '&reqDesc=' + encodeURIComponent(reqDesc) + '&reqDisabled=' + encodeURIComponent(reqDisabled);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
