import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";

@Injectable ()
export class RequestService {

  constructor(public http: Http) { }

  findBranch(PartsID,Type,Branchid,herokittype)
  {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/findbranch&partid='+PartsID+'&type='+Type+'&branchid='+Branchid+'&herokittype='+herokittype;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    branchinfo(id)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/branchinfo&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    setLocation(type,id,lat,lon)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/setlocation&type='+type+'&id='+id+'&lat='+lat+'&lon='+lon;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    findBranchall(Type,Branchid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/findbranchall&type='+Type+'&branch='+Branchid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  createRequest(type,tobranch,qty,oldbrid,partid,herokit,herokitid,herokitstatus)
  {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/createrequest&type='+type+'&tobranch='+tobranch+'&qty='+qty+'&oldbrid='+oldbrid
        +'&herokit='+herokit+'&partid='+partid+'&herokitid='+herokitid+'&herokitstatus='+herokitstatus;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    findRaisedrequest(PartsID,Type)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/findbranch&id='+PartsID+'&type='+Type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    raisedRequest(id)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/raisedrequest&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    receivedRequest(id,type)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/receivedrequest&id='+id+'&type='+type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    LoadRequest(manufacturer,branch,supplier,umkeyid,ucmkeyid)
    {
        //let url = GlobalVariable.BASE_API_URL+'partsmaster/requestall';
        let url = GlobalVariable.BASE_API_URL+'partsmaster/requestall&manufacturer='+manufacturer+'&branch='+branch+'&supplier='+supplier+'&umkeyid='+umkeyid+'&ucmkeyid='+ucmkeyid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    LoadRequestparts()
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/requestallparts';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Requestbyid(id,type)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/requestbyid&id='+id+'&type='+type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Requestpartsbyid(id,type)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/requestpartsbyid&id='+id+'&type='+type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    loadpartInfo(Branchid,type,herokitstatus,oldid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/findparts&branchid='+Branchid+'&type='+type+'&herokitstatus='+herokitstatus+'&oldid='+oldid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    UpdatePartrequest(form){
        return this.http.post(GlobalVariable.BASE_API_URL+'partsmaster/updatepartrequest', form)
            .map(res => res.json());

    }
    Partrequest(form){
        /*return this.http.post(GlobalVariable.BASE_API_URL+'herokit/createmultipartrequest', form)
         .map(res => res.json());*/
        return this.http.post(GlobalVariable.BASE_API_URL+'herokit/updatenonpartrequest', form)
            .map(res => res.json());

    }


    UpdateRequest(form){
        return this.http.post(GlobalVariable.BASE_API_URL+'partsmaster/updaterequest', form)
            .map(res => res.json());

    }

    updateQuantity(qty,rpdid,rpmid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/updatequantity&qty='+qty+'&rpdid='+rpdid+'&rpmid='+rpmid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    findherokit(id,requesttype,branchid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/findherokit&id='+id+'&requesttype='+requesttype+'&branchid='+branchid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }
    findherokitparts(id,requesttype,requestto,requestfrom)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/findherokitparts&herokitid='+id+'&requesttype='+requesttype+'&requestfrom='+requestfrom+'&requestto='+requestto;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    updateRepl(qty,rpdid,herokit,qnttype)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/updaterepl&qty='+qty+'&rpdid='+rpdid+'&herokit='+herokit+'&qnttype='+qnttype;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Loadbrhrkparts()
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/loadbrhrkparts';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Loadbrparts()
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/loadbrparts';
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    branchinfobyid(id)
    {
        let url = GlobalVariable.BASE_API_URL+'branchmaster/viewbranch&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    deletePartassigned(bhdId,bmId,pmId,Type){
        let url = GlobalVariable.BASE_API_URL+'partsmaster/deleteassignedparts&bhdId='+bhdId+'&bmId='+bmId+'&pmId='+pmId+'&Type='+Type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

}
