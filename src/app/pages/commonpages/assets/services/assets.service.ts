import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class AssetsService {

  constructor( public http:Http) { }
  Loadallaccsite(id,umkeyid,urmid){
    const url = GlobalVariable.BASE_API_URL+'assets/loadsites&id='+id+'&umkeyid='+umkeyid+'&urmid='+urmid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Createass(name,model,sno,siteid,assfrom,assto,assidn,AGMID,umkeyid){
    const url = GlobalVariable.BASE_API_URL+'assets/create&name='+name+'&model='+model+'&sno='+sno+'&siteid='+siteid+'&assfrom='+assfrom+'&assto='+assto+'&assidn='+assidn+'&AGMID='+AGMID+'&umkeyid='+umkeyid;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadallaccmodel(id)
    {
      const url = GlobalVariable.BASE_API_URL+'assets/loadmodels&id='+id;
      const response = this.http.get(url).map(res => res.json());
      return response;
    }
    LoadAssets(umkeyid,urmid)
    {
        const url = GlobalVariable.BASE_API_URL+'assets/assets&umkeyid='+umkeyid+'&urmid='+urmid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    LoadAllserial(id){
        let url = GlobalVariable.BASE_API_URL+'assets/loadallserial&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }
    Editass(id){
        let url = GlobalVariable.BASE_API_URL+'assets/assets&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }
    Loadsiteasset(id,accid) {
        const url = GlobalVariable.BASE_API_URL+'assets/siteassetdetail&id='+id+'&accid='+accid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    Updateass(name,assfrom,assto,assiden,assid,AGMID,umkeyid){
        const url = GlobalVariable.BASE_API_URL+'assets/update&name='+name+'&assfrom='+assfrom+'&assto='+assto+'&assid='+assiden+'&asskeyid='+assid+'&AGMID='+AGMID+'&umkeyid='+umkeyid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }
    Deleteass(id)
    {
        let url = GlobalVariable.BASE_API_URL+'assets/deleteass&id='+encodeURIComponent(id);
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    LoadSiteAssets(Site_ID, Account_ID) {
        const URL = GlobalVariable.BASE_API_URL + 'assets/loadsiteasset&siteID=' + Site_ID + '&accID=' + Account_ID;
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    Loadagreements(accid) {
        const url = GlobalVariable.BASE_API_URL+'agreement/agreementlist&accid='+accid;
        const response = this.http.get(url).map(res => res.json());
        return response;
    }

    Updatestatus(assetid,status){
        let url = GlobalVariable.BASE_API_URL+'assets/updatestatus&assetid='+assetid+ '&status=' + status;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

}
