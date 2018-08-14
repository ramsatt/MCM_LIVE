import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../../../global/global';


@Injectable()
export class HerokitService {

  constructor(public http: Http) { }
  Loadhero() {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/hero';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  hero(id) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/hero&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  edithero(id){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/hero&editid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Createhero(id, name) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/add&id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Deltick(id) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/delete&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Edittick(name, id, acc_id) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/edit&name=' + encodeURIComponent(name) + '&heroid=' + encodeURIComponent(id) + '&accid=' + encodeURIComponent(acc_id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  viewheropart(id, accid) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewassignpartlist&id=' + encodeURIComponent(id)  + '&acc_id=' + encodeURIComponent(accid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  viewherobncpart(id)
  {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewassignpartlist&id=' + encodeURIComponent(id) ;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  /*Assignparts(id, name){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/assignpart&id=' + encodeURIComponent(id) + '&name=' + encodeURIComponent(name);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }*/
  Assignparts(form){

    return this.http.post(GlobalVariable.BASE_API_URL+'herokit/assignpart', form).map(res => res.json());
  }

  viewheroassignedpart(id) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewaccassignedpart&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  viewheroaccassignedpart(id,bmid) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewassignedpart&id=' + encodeURIComponent(id)+ '&bmid=' + encodeURIComponent(bmid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delheroassignedpart(id) {
    const url = GlobalVariable.BASE_API_URL + 'herokit/delheroassignedpart&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delheroassignedbnc(id) {
    const url = GlobalVariable.BASE_API_URL + 'herokit/delheroassignedbnc&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadallbnckit(accid, id){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewallbnchero&acc_id=' + encodeURIComponent(accid) + '&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Assignbnckit(id, pm_id) {
    const url =  GlobalVariable.BASE_API_URL + 'herokit/assignbnchero&id=' + encodeURIComponent(id) + '&pm_id=' + encodeURIComponent(pm_id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Assignedbnckit(id){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewassignedbnchero&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;

  }
  partbncaccsuplist(partid,herokitid,branchid,type){
    const url =  GlobalVariable.BASE_API_URL + 'herokit/viewaccsuppbnc&partid=' + encodeURIComponent(partid) + '&heroid=' + encodeURIComponent(herokitid)+ '&bncid=' + encodeURIComponent(branchid)+ '&type=' + encodeURIComponent(type);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
