import { Injectable } from '@angular/core';
import {GlobalVariable} from "../../../global/global";
import {Http} from "@angular/http";

@Injectable()
export class EmailcontentService {

  constructor(public http: Http) { }

  loademailcontent(accid)
  {
    let url = GlobalVariable.BASE_API_URL+'emailcontent/load&accid='+accid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    loademailcontentbycat(id)
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/loadbycat&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Loadusercategory(usercategory)
    {
        const url = GlobalVariable.BASE_API_URL + 'emailcontent/loadusercatagory&catid='+encodeURIComponent(usercategory);

        const response = this.http.get(url).map(res => res.json());
        return response;
    }

  loadbyid(id)
  {
    let url = GlobalVariable.BASE_API_URL+'emailcontent/loadbyid&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  addemailcontent(form){
    return this.http.post(GlobalVariable.BASE_API_URL+'emailcontent/add', form)
    .map(res => res.json());
  }

    editemailcontent(form){
        return this.http.post(GlobalVariable.BASE_API_URL+'emailcontent/edit', form)
            .map(res => res.json());
    }

    delete(id){
        let url = GlobalVariable.BASE_API_URL+'emailcontent/delete&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  loaduserrole()
  {
    let url = GlobalVariable.BASE_API_URL+'emailcontent/userrole';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    loadrole(type)
    {
        const url = GlobalVariable.BASE_API_URL + 'emailcontent/loaduserrole&type='+type;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }

    loadticketstatus()
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/ticketstatus';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    loaduser(id)
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/user&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    loadusercat(id)
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/usercat&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    loaduserlist(role,cat,id)
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/userlist&role='+role+'&cat='+cat+'&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    loademailcontentbyrole(role)
    {
        let url = GlobalVariable.BASE_API_URL+'emailcontent/loadbyrole&role='+role;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Assignemail(form){
        return this.http.post(GlobalVariable.BASE_API_URL+'emailcontent/assignemail', form)
            .map(res => res.json());

    }

    loadaccounts()
    {
        const url = GlobalVariable.BASE_API_URL + 'emailcontent/loadaccounts';
        const response = this.http.get(url).map(res => res.json());
        return response;
    }

    Loadusersbycat(roleid,catid,accountname) {
        // this is for email settings user
        //const url = GlobalVariable.BASE_API_URL + 'emailcontent/user&id=' + id + '&catid=' + catid;
        const url = GlobalVariable.BASE_API_URL + 'emailcontent/ticketstatus&roleid=' + roleid + '&catid=' + catid+ '&accountname=' + accountname;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
}
