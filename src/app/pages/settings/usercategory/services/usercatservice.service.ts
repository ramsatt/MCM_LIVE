import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class UsercatserviceService {

  constructor(public http: Http) { }
  Createcat(uid,ucat)
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/add&id='+encodeURIComponent(uid)+ '&ucat=' + encodeURIComponent(ucat);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  viewcat()
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/view';

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  catdetails(id)
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/viewdetails&id='+encodeURIComponent(id);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Updatecat(id,ucmname)
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/update&id='+encodeURIComponent(id)+ '&ucat=' + encodeURIComponent(ucmname);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delcat(id)
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/delete&id='+encodeURIComponent(id);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  checkunique(role,cat)
  {
    const url = GlobalVariable.BASE_API_URL + 'usercategory/uniquecat&role='+encodeURIComponent(role)+ '&cat=' + encodeURIComponent(cat);

    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
