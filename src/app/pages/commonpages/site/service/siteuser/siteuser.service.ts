import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../../global/global';
@Injectable()
export class SiteuserService {

  constructor( public http: Http ) { }

  public createAccountAadmin() {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/createaccadmin';
    const response = this.http.post(url, { id: 1, name: 'sathish' }).map(res => res.json());
    return response;
  }
  public LoadContact(siteid)
  {
      const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loadalluser&sudid='+encodeURIComponent(siteid);
      const response = this.http.get(url).map(res => res.json());
      return response;
  }
    public Assignsite(form)
    {
        const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/assignsite';
        return this.http.post( url, form ).map(res  => res.json());

    }
  public createAaccountUser( formData ) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/createsiteuser';
    return this.http.post( url, formData ).map(res  => res.json());
  }
  public updateuser(FirstName, LastName, Mobile,altemail, Email, sudid, umkeyid,img,siteid,pwd,userType){
    let input = new FormData();
    input.append("file", img);
    input.append("fname", FirstName);
    input.append("lname", LastName);
    input.append("mobile", Mobile);
    input.append("email", Email);
      input.append("altemail", altemail);
    input.append("sudid", sudid);
    input.append("umkeyid", umkeyid);
    input.append("siteid", siteid);
    input.append("pwd", pwd);
    input.append("userType", userType);
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/updateuser';
    const response = this.http.post(url, input).map(res => res.json());
    return response;

  }
  public Deluser(asuid,umid, sudid,siteid){
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/deleteuser&sudid='+encodeURIComponent(sudid)+'&umkeyid='+encodeURIComponent(umid)+'&asuid='+encodeURIComponent(asuid)+'&siteid='+encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public LoadCategory() {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/category';
    const response = this.http.post(url, { 'RoleID': 3 }).map(res => res.json());
    return response;
  }
  public LoadUsers(bmkeyid) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loaduser&BM_keyid=' + encodeURIComponent(bmkeyid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  public CheckUserName(name) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/usernamecheck';
    const response = this.http.post(url, { 'userName': name }).map(res => res.json());
    return response;
  }
  public LoadUserDetails(UserID) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/userdetails';
    const response = this.http.post(url, {'userID': UserID}).map(res => res.json());
    return response;
  }
  Assignprimary(sudkeyid,siteid)
  {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/assignprimary&id=' + encodeURIComponent(sudkeyid)+'&siteid='+encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Removeprimary(sudkeyid,siteid)
  {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/removeprimary&id=' + encodeURIComponent(sudkeyid)+'&siteid='+encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadPrimaryDetails(siteid){
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loadprimary&id=' + encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    checkunique(email,id)
    {
        const url = GlobalVariable.BASE_API_URL + 'accountuser/checkunique&email='+encodeURIComponent(email)+'&id=' + encodeURIComponent(id);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
}
