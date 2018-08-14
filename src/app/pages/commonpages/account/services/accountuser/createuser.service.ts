import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../../global/global';

@Injectable()
export class CreateuserService {

  constructor( public http: Http ) { }

  public createAccountAadmin() {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/createaccadmin';
    const response = this.http.post(url, { id: 1, name: 'sathish' }).map(res => res.json());
    return response;
  }

  Removeprimary(audkeyid, accid) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/removeprimary&id=' + encodeURIComponent(audkeyid) + '&accid=' + encodeURIComponent(accid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public createAaccountUser( formData ) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/createaccuser';
    return this.http.post( url, formData ).map(res  => res.json());
  }

  public LoadCategory() {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/category';
    const response = this.http.post(url, { 'RoleID': 2 }).map(res => res.json());
    return response;
  }

  public CheckUserName(name) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/usernamecheck';
    const response = this.http.post(url, { 'userName': name }).map(res => res.json());
    return response;
  }

  public LoadUsers(AccounntID) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/loadusers&id=' + encodeURIComponent(AccounntID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public LoadContacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/load_account_contacts';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  public LoadUserDetails(UserID) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/userdetails';
    const response = this.http.post(url, {'userID': UserID}).map(res => res.json());

    return response;
  }
  checkunique(email, id) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/checkunique&email=' + encodeURIComponent(email) + '&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public updateaccuser(FirstName, LastName, Mobile, altemail, Email, audid, umkeyid, img, accid, pwd, userType) {
    const input = new FormData();
    input.append('file', img);
    input.append('fname', FirstName);
    input.append('lname', LastName);
    input.append('mobile', Mobile);
    input.append('email', Email);
      input.append('altemail', altemail);
    input.append('audid', audid);
    input.append('umkeyid', umkeyid);
    input.append('accid', accid);
    input.append('pwd', pwd);
    input.append('userType', userType);
    const url = GlobalVariable.BASE_API_URL + 'accountuser/updateuser';
    const response = this.http.post(url, input).map(res => res.json());
    return response;
  }

  public Delaccuser(umid, audid){
    const url = GlobalVariable.BASE_API_URL + 'accountuser/deleteuser&audid=' + encodeURIComponent(audid) + '&umkeyid=' + encodeURIComponent(umid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Assignprimary(userid, acckeyid) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/assignprimary&userid=' + encodeURIComponent(userid) + '&accid=' + encodeURIComponent(acckeyid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadPrimaryDetails(accid) {
    const url = GlobalVariable.BASE_API_URL + 'accountuser/loadprimary&id=' + encodeURIComponent(accid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
