import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";
@Injectable ()
export class AssignsecbranchService {

  constructor(public http: Http) { }
  CreatesecBranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/assignsecbranch&id='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  AssignsecBranch(id,bm_id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/assignsecbranch&id='+encodeURIComponent(id)+'&bm_id='+encodeURIComponent(bm_id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  ViewSecondaryBranch()
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/createsecbranch&id='+1;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  MakePrimary(id,bm_id){
    let url = GlobalVariable.BASE_API_URL+'branchmaster/makeprimary&sbd_id='+encodeURIComponent(id)+'&bm_id='+encodeURIComponent(bm_id);
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
}
