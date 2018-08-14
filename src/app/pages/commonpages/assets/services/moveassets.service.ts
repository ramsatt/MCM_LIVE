import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from "../../../../global/global";

@Injectable()
export class MoveassetsService {

  constructor(public http: Http) { }

  LoadAccounts(assid){
    let url = GlobalVariable.BASE_API_URL+'assetmovelog/selectaccount&assid='+assid;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  LoadAssets(assid){
    let url = GlobalVariable.BASE_API_URL+'assetmovelog/selectassets&assid='+assid;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  CreateLog(NewSiteid,amID,sadId,ASM_KeyID,umkeyid) {
    let url = GlobalVariable.BASE_API_URL+'assetmovelog/createlog&newsiteid='+NewSiteid+'&amID='+amID+'&sadId='+sadId+'&ASM_KeyID='+ASM_KeyID+'&umkeyid='+umkeyid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadLog(assid){
    let url = GlobalVariable.BASE_API_URL+'assetmovelog/selectlog&assid='+assid;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

}
