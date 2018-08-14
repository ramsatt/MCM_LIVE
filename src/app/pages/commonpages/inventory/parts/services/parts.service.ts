import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from "../../../../../global/global";
@Injectable()
export class PartsService {

  constructor(public http: Http) { }
  CreateParts(partname, mfgpartnumber, model, internalcost, price, internalnotes, description, img,createdby) {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/createparts&partname='+encodeURIComponent(partname)+'&mfgpartnumber='+encodeURIComponent(mfgpartnumber)+'&model='+encodeURIComponent(model)+'&internalcost='+encodeURIComponent(internalcost)+'&price='+encodeURIComponent(price)+'&internalnotes='+encodeURIComponent(internalnotes)+'&description='+encodeURIComponent(description)+'&img='+encodeURIComponent(img)+'&createdby='+encodeURIComponent(createdby);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadParts(){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/part';
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  deactivatepart(id,status)
  {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/activateaccpart&id='+encodeURIComponent(id)+'&status='+encodeURIComponent(status);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
    deleteaccpart(partid,accid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/deleteaccpart&partid='+encodeURIComponent(partid)+'&accid='+encodeURIComponent(accid);
        let response = this.http.get(url).map(res => res.json());
        return response;
    }
  EditParts(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/part&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  updateParts( partname, mfgpartnumber, model, internalcost, price, internalnotes, description, img, id ) {
    let input = new FormData();
    input.append("file", img);
    input.append("partname", partname);
    input.append("mfgpartnumber", mfgpartnumber);
    input.append("model", model);
    input.append("internalcost", internalcost);
    input.append("price", price);
    input.append("internalnotes", internalnotes);
    input.append("description", description);
    input.append("pm_id", id);


   // let url = GlobalVariable.BASE_API_URL+'partsmaster/updateparts&partname='+ encodeURIComponent(partname)+'&mfgpartnumber='+encodeURIComponent(mfgpartnumber)+'&model='+encodeURIComponent(model)+'&internalcost='+encodeURIComponent(internalcost)+'&price='+encodeURIComponent(price)+'&internalnotes='+encodeURIComponent(internalnotes)+'&description='+encodeURIComponent(description)+'&img='+encodeURIComponent(img)+'&pm_id='+encodeURIComponent(id);
   // let response = this.http.get(url).map(res => res.json());
    //return response;
    const url = GlobalVariable.BASE_API_URL + 'partsmaster/updateparts';
    const response = this.http.post(url, input).map(res => res.json());
    return response;
  }
  DelParts(id) {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/deleteparts&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadallparts(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewallparts&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;


  }
  Assignpart(form)
  {
    //let url = GlobalVariable.BASE_API_URL+'partsmaster/assignpart&id='+id+'&pm_id='+pm_id+'&kit='+kit+'&qty='+qty+'&repl='+repl;
   // let response = this.http.get(url).map(res => res.json());
    //return response;
      return this.http.post(GlobalVariable.BASE_API_URL+'partsmaster/assignpart', form)
          .map(res => res.json());
  }
  Assignedparts(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewassignedpart&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  Assignedpartshk(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewassignedparthk&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  Assignedpartsnhk(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewassignedpartnhk&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  viewsupplier(){
    let url = GlobalVariable.BASE_API_URL+'suppliermaster/supplier';
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  Assignedsuppliers(id)
  {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewassignedsupplier&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadallsupplier(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewallsuppliers&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;


  }
    /*Assignsupplier(id,pm_id,qnty)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/assignsupplier&id='+id+'&pm_id='+pm_id+'&qnty='+qnty;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }*/

  Assignsupplier(form)
  {
    return this.http.post(GlobalVariable.BASE_API_URL+'partsmaster/assignsupplier', form)
        .map(res => res.json());
  }

  Loadallbncparts(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewallbncparts&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;


  }
  UpdatenonPartrequest(form){

    /*return this.http.post(GlobalVariable.BASE_API_URL+'herokit/updatenonpartrequest', form)
        .map(res => res.json());*/
    return this.http.post(GlobalVariable.BASE_API_URL+'herokit/createmultipartrequest', form)
        .map(res => res.json());

  }
  UpdatenonheroPartrequest(form){

    return this.http.post(GlobalVariable.BASE_API_URL+'herokit/updatenonpartrequest', form)
     .map(res => res.json());
    //return this.http.post(GlobalVariable.BASE_API_URL+'herokit/createmultipartrequest', form)
      //  .map(res => res.json());
  }

  Assignbncpart(form)
  {
    //let url = GlobalVariable.BASE_API_URL+'partsmaster/assignbncpart&id='+id+'&pm_id='+pm_id;
    //let response = this.http.get(url).map(res => res.json());
    //return response;
    return this.http.post(GlobalVariable.BASE_API_URL+'partsmaster/assignbncpart', form)
        .map(res => res.json());
  }
  Assignedbncparts(id){
    let url = GlobalVariable.BASE_API_URL+'partsmaster/viewassignedbncpart&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
}
  Assignedbranchpopupparts(type,bncid,old){
    let url = GlobalVariable.BASE_API_URL+'herokit/viewassignedbranchpart&bncid='+bncid+  '&type=' + encodeURIComponent(type)+  '&oldid=' + encodeURIComponent(old);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadGoogleMapAddress(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  partbncaccsuplist(partid,branchid,type){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewnonaccsuppbnc&partid=' + encodeURIComponent(partid) +  '&bncid=' + encodeURIComponent(branchid)+ '&type=' + encodeURIComponent(type);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

    updateRepl(qty,rpdid)
    {
        let url = GlobalVariable.BASE_API_URL+'partsmaster/updatesupct&qty='+qty+'&rpdid='+rpdid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  updateReplAcc(qty,rpdid,herokit,qnttype,hktype,pmid)
  {
    let url = GlobalVariable.BASE_API_URL+'partsmaster/updatereplacc&qty='+qty+'&rpdid='+rpdid+'&herokit='+herokit+'&qnttype='+qnttype+'&hktype='+hktype+'&pmid='+pmid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
}
