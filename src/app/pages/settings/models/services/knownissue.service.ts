import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class KnownissueService {

  constructor( public http: Http ) { }

  Create(Issue, SR_ID) {
    const url = GlobalVariable.BASE_API_URL + 'knownissue/create&srID=' + encodeURIComponent(SR_ID) + '&kiName=' + encodeURIComponent(Issue);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetAll() {
    const url = GlobalVariable.BASE_API_URL + 'knownissue/getall';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetAll_SR_KI(srID)
  {
    const url = GlobalVariable.BASE_API_URL + 'knownissue/getreqissue&srID=' + encodeURIComponent(srID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }


}
