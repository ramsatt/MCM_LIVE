import { Injectable } from '@angular/core';
import {GlobalVariable} from '../../../../global/global';
import {Http} from '@angular/http';
@Injectable()
export class UserService {

  constructor(public http: Http) {

  }
  Loadusers(){
    const url = GlobalVariable.BASE_API_URL + 'usermaster/viewalluser';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    Loadalldetails(urmkeyid,umkeyid)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/loadactivedetails&id=' + umkeyid+ '&urmkeyid=' + urmkeyid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    resetpwd(email)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/resetpwd&email=' + email;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    resetpwdmail(email)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/resetpwdmail&email=' + email;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
  Delete(userid,urmkeyid) {
    const url = GlobalVariable.BASE_API_URL + 'usermaster/delete&id=' + userid+ '&urmkeyid=' + urmkeyid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  deactivate(urmkeyid,userid, status) {
    const url = GlobalVariable.BASE_API_URL + 'usermaster/deactivateuser&id=' + userid + '&status=' + status+ '&urmkeyid=' + urmkeyid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadusersbyid(id) {
    const url = GlobalVariable.BASE_API_URL + 'usermaster/viewalluser&id=' + id;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadusersbycat(roleid,catid) {
      // this is for email settings user
    //const url = GlobalVariable.BASE_API_URL + 'emailcontent/user&id=' + id + '&catid=' + catid;
    const url = GlobalVariable.BASE_API_URL + 'emailcontent/ticketstatus&roleid=' + roleid + '&catid=' + catid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    Loadusername(id,sessid) {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/viewalluser&id=' + id+ '&sessid=' + sessid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
  updatepwd(id, pwd,usercatid) {
    const url = GlobalVariable.BASE_API_URL + 'usermaster/updatepwd&pwd=' + pwd + '&id=' + id+ '&usercatid=' + usercatid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    viewrole(id)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/viewrole&id=' + id;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    viewallcat(id)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/viewallcategory&id=' + id;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    checkuserprimary(urmid,umid)
    {
        const url = GlobalVariable.BASE_API_URL + 'usermaster/checkprimaryuser&urm_keyid=' + urmid+ '&um_keyid=' + umid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
//create admin users

    public createAaccountUser( formData ) {
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/createaccuser';
        return this.http.post( url, formData ).map(res  => res.json());
    }



    public CheckUserName(name) {
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/usernamecheck';
        const response = this.http.post(url, { 'userName': name }).map(res => res.json());
        return response;
    }

    public LoadUsers() {
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/loadusers';
        const response = this.http.get(url).map(res => res.json());
        return response;
    }



    public LoadUserDetails(UserID) {
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/userdetails&UserID='+encodeURIComponent(UserID);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    checkunique(email,id)
    {
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/checkunique&email='+encodeURIComponent(email)+'&id='+encodeURIComponent(id);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    public updateaccuser(FirstName, LastName, Mobile, Email, audid, umkeyid,img,accid,pwd,ticktype,userType){
        let input = new FormData();
        input.append("file", img);
        input.append("fname", FirstName);
        input.append("lname", LastName);
        input.append("mobile", Mobile);
        input.append("email", Email);
        input.append("audid", audid);
        input.append("umkeyid", umkeyid);
        input.append("accid", accid);
        input.append("pwd", pwd);
        input.append("userType", userType);
        input.append("ticktype", ticktype);
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/updateuser';
        const response = this.http.post(url, input).map(res => res.json());
        return response;

    }
    public Delaccuser(umid, audid){
        const url = GlobalVariable.BASE_API_URL + 'adminuserdetalis/deleteuser&audid='+encodeURIComponent(audid)+'&umkeyid='+encodeURIComponent(umid);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    public LoadCategory() {
        const url = GlobalVariable.BASE_API_URL + 'accountuser/category';
        const response = this.http.post(url, { 'RoleID': 1 }).map(res => res.json());
        return response;
    }
}

