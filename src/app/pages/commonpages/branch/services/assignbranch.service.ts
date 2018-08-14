import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class AssignbranchService {

  constructor(public http: Http) { }
  LoadAllBranch(id, search) {
    const url = GlobalVariable.BASE_API_URL + 'branchmaster/branch&id=' + encodeURIComponent(id) + '&search=' + encodeURIComponent(search);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadBranch(id) {
    const url = GlobalVariable.BASE_API_URL + 'branchmaster/branch&id=' + encodeURIComponent(id);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  ViewPrimaryBranch(id) {
    const url = GlobalVariable.BASE_API_URL + 'branchmaster/assignbranch&id=' + encodeURIComponent(id);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  ViewSecondaryBranch(id){
    const url = GlobalVariable.BASE_API_URL + 'branchmaster/viewsecbranch&id=' + encodeURIComponent(id);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  DeleteBranch(id){
    let url = GlobalVariable.BASE_API_URL+'branchmaster/deleteprimary&id='+encodeURIComponent(id);

    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  Viewsamezipbranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewsamezip&id='+encodeURIComponent(id);

    let response = this.http.get(url).map(res => res.json());
    return response;
  }

}
