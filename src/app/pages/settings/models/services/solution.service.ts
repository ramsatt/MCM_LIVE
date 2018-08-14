import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class SolutionService {

  constructor(public http: Http) { }

  GetAll() {
    const url = GlobalVariable.BASE_API_URL + 'solution/getall';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  GetIssueSol(KI_ID) {
    const url = GlobalVariable.BASE_API_URL + 'solution/getissuesol&kiID=' + encodeURIComponent(KI_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Create(KI_ID, SOM_Name) {
    const url = GlobalVariable.BASE_API_URL + 'solution/create&kiID=' + encodeURIComponent(KI_ID) + '&somName=' + encodeURIComponent(SOM_Name);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Parts(id) {
    const url = GlobalVariable.BASE_API_URL + 'solution/parts&kiID=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  AssignedParts(id) {
    const url = GlobalVariable.BASE_API_URL + 'solution/assignedparts&somID=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  AassignPart(sol_id, part_id) {
    const url = GlobalVariable.BASE_API_URL + 'solution/assignpart&somID=' + encodeURIComponent(sol_id) + '&pID=' + encodeURIComponent(part_id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
