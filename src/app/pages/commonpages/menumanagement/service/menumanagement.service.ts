import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class MenumanagementService {

  constructor(public http: Http) { }
  Loadmenu()
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/primarymenu';

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadsubmenu(ucmid,id)
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/viewsubmenu&id='+encodeURIComponent(id)+ '&ucmid=' + encodeURIComponent(ucmid);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadcheckmenu(ucmid,id)
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/viewsubmenu1&id='+encodeURIComponent(id)+ '&ucmid=' + encodeURIComponent(ucmid);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  updatemenu(form){

    return this.http.post(GlobalVariable.BASE_API_URL+'menuassignment/assignmenu', form)
        .map(res => res.json());
  }
  LoadMainenu(pid)
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/loadprimarymenu&primaryid='+encodeURIComponent(pid);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadbutton(menuid,submenuid,ucmid)
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/viewbutton&menuid='+encodeURIComponent(menuid)+ '&submenuid=' + encodeURIComponent(submenuid)+ '&ucmid=' + encodeURIComponent(ucmid);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loaduserrorle()
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/loaduserrole';

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadusercategory(usercategory)
  {
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/loadusercatagory&catid='+encodeURIComponent(usercategory);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadchildmenu(menuid,child)
  {
    let sessid=localStorage.getItem('ucmid');

    const url = GlobalVariable.BASE_API_URL + 'menuassignment/loadsubmenu&id='+encodeURIComponent(menuid)+ '&child=' + encodeURIComponent(child)+ '&sessionid=' + encodeURIComponent(sessid);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
