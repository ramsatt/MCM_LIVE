import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class ContractorService {

  constructor(public http: Http) { }
  findBranchall()
  {
    let url = GlobalVariable.BASE_API_URL+'contractor/viewacc';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  checkunique(id,aggtype)
  {

    let url = GlobalVariable.BASE_API_URL+'contractor/checkbranch&id=' + encodeURIComponent(id)+'&aggtype=' + encodeURIComponent(aggtype);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  scannedcopy()
  {

  }
  checkaccunique(id,aggtype)
  {

    let url = GlobalVariable.BASE_API_URL+'contractor/checkaccount&id=' + encodeURIComponent(id)+'&aggtype=' + encodeURIComponent(aggtype);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  findBranch()
  {
    let url = GlobalVariable.BASE_API_URL+'contractor/viewbnc';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  public createcontractor( formData ) {
    const url = GlobalVariable.BASE_API_URL + 'contractor/create';
    return this.http.post( url, formData ).map(res  => res.json());
  }
  public createcontractorwoaddendum(formData)
  {
    const url = GlobalVariable.BASE_API_URL + 'contractor/createwoaddend';
    return this.http.post( url, formData ).map(res  => res.json());
  }
  public createhandbook( formData ) {
    const url = GlobalVariable.BASE_API_URL + 'contractor/createhandbook';
    return this.http.post( url, formData ).map(res  => res.json());
  }
  public viewallcon(sessid,ucmid) {
    const url = GlobalVariable.BASE_API_URL + 'contractor/viewallcon&sessid=' + encodeURIComponent(sessid)+'&ucmid=' + encodeURIComponent(ucmid);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  public viewallbccon(sessid,ucmid) {
    const url = GlobalVariable.BASE_API_URL + 'contractor/viewallbnccon&sessid=' + encodeURIComponent(sessid)+'&ucmid=' + encodeURIComponent(ucmid);
    return this.http.get( url ).map(res  => res.json());
  }
}
