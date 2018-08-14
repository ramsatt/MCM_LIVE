import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../../global/global';
@Injectable()
export class BranchuserService {


  constructor( public http: Http ) { }

  public createAccountAadmin() {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/createaccadmin';
    const response = this.http.post(url, { id: 1, name: 'sathish' }).map(res => res.json());
    return response;
  }
  public checktechnician(catid)
  {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/checktech&id=' + encodeURIComponent(catid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public createAaccountUser( formData ) {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/createbncuser';
    return this.http.post( url, formData ).map(res  => res.json());
  }

  public LoadCategory() {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/category';
    const response = this.http.post(url, { 'RoleID': 4 }).map(res => res.json());
     return response;
  }
  Assignprimary(budkeyid,bncid)
  {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/assignprimary&id=' + encodeURIComponent(budkeyid)+'&branchid='+encodeURIComponent(bncid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadPrimaryDetails(branchid){
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/loadprimary&id=' + encodeURIComponent(branchid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Removeprimary(budkeyid,branchid)
  {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/removeprimary&id=' + encodeURIComponent(budkeyid)+'&branchid='+encodeURIComponent(branchid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  public LoadUsers(bmkeyid) {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/loaduser&BM_keyid=' + encodeURIComponent(bmkeyid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  public CheckUserName(name) {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/usernamecheck';
    const response = this.http.post(url, { 'userName': name }).map(res => res.json());
     return response;
  }
  public LoadUserDetails(UserID) {
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/userdetails&userID=' + encodeURIComponent(UserID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  public updatebncuser(FirstName, LastName, Mobile,altmail, Email, sudid, umkeyid,img,siteid,pwd,userType){
    let input = new FormData();
    input.append("file", img);
    input.append("fname", FirstName);
    input.append("lname", LastName);
    input.append("mobile", Mobile);
    input.append("email", Email);
      input.append("altemail", altmail);
    input.append("sudid", sudid);
    input.append("umkeyid", umkeyid);
    input.append("siteid", siteid);
    input.append("pwd", pwd);
    input.append("userType", userType);
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/updateuser';
    const response = this.http.post(url, input).map(res => res.json());
    return response;

  }
  public Delbncuser(umid, budid){
    const url = GlobalVariable.BASE_API_URL + 'branchuserdetails/deleteuser&budid='+encodeURIComponent(budid)+'&umkeyid='+encodeURIComponent(umid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    checkunique(email,id)
    {
        const url = GlobalVariable.BASE_API_URL + 'accountuser/checkunique&email='+encodeURIComponent(email)+'&id='+encodeURIComponent(id);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
}
