import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class EditknownissueService {

  constructor(public http: Http) { }

  Update(KI_ID, KI_Name) {
    const url = GlobalVariable.BASE_API_URL + 'knownissue/update&kiID=' + encodeURIComponent(KI_ID) + '&kiName=' + encodeURIComponent(KI_Name);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
