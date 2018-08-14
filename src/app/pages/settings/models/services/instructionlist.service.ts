import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class InstructionlistService {

  constructor( public http: Http ) { }

  Create(SOM_ID, IML_Name, ILM_Desc) {
    const url = GlobalVariable.BASE_API_URL + 'inslist/create&somID=' + encodeURIComponent(SOM_ID) + '&imlName=' + encodeURIComponent(IML_Name) + '&imlDesc=' + encodeURIComponent(ILM_Desc);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetAllInsList(SOM_ID) {
    const url = GlobalVariable.BASE_API_URL + 'inslist/getinslist&somID=' + encodeURIComponent(SOM_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
