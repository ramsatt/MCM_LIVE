import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../../global/global';

@Injectable()
export class AccuserService {

  constructor( public http: Http) { }
  public LoadUsers(AccounntID) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loadaccusers&AccountID=' + encodeURIComponent(AccounntID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
    LoadContact(siteid)
    {
        const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loadallaccusers&siteid=' + encodeURIComponent(siteid);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    public Delaccuser(assid,umkeyid,scltaudid,siteid){
        const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/deleteaccuser&assid=' + encodeURIComponent(assid)+ '&umid=' + encodeURIComponent(umkeyid)+ '&siteid=' + encodeURIComponent(siteid)+ '&audid=' + encodeURIComponent(scltaudid);
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    Assignaccount(form)
    {
        const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/assignaccusers';
        return this.http.post( url, form ).map(res  => res.json());

    }
  public LoadUserDetails(UserID,siteid) {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/accuserdetails&userid=' + encodeURIComponent(UserID)+ '&sitid=' + encodeURIComponent(siteid);
      const response = this.http.get(url).map(res => res.json());
      return response;
  }
  Assignprimary(userid,acckeyid,siteid)
  {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/assignaccprimary&userid=' + encodeURIComponent(userid)+ '&accid=' + encodeURIComponent(acckeyid)+ '&siteid=' + encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Removeprimary(acckeyid,siteid)
  {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/removeaccprimary&id=' + encodeURIComponent(acckeyid)+'&siteid='+encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadPrimaryDetails(siteid){
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/loadaccprimary&id=' + encodeURIComponent(siteid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}

