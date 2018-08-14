import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class EditservicerequestService {

  constructor( public http: Http ) { }

  UpdateSerRequest( reqName, reqDesc, reqDisabled, reqID ) {
    const url = GlobalVariable.BASE_API_URL + 'servicerequest/update&reqName=' + encodeURIComponent(reqName) + '&reqDesc=' + encodeURIComponent(reqDesc) + '&reqDisabled=' + encodeURIComponent(reqDisabled) + '&reqID=' + encodeURIComponent(reqID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
