import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class ValuelistService {

  constructor(public http: Http) { }
  Loadtechcer() {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techcer';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  tech(id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techcer&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateTech(status) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/add&tickstatus=' + encodeURIComponent(status);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Deltech(id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/delete&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Edittech(status, id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/edit&tickstatus=' + encodeURIComponent(status) + '&tickid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadtechexp(){
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techexp';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  techexp(id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techexp&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateTechexp(status) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/addexp&tickstatus=' + encodeURIComponent(status);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Deltechexp(id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/deleteexp&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Edittechexp(status, id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/editexp&tickstatus=' + encodeURIComponent(status) + '&tickid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadtechsec(){
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techsec';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  techsec(id){
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/techsec&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateTechsec(status) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/addsec&tickstatus=' + encodeURIComponent(status);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Deltechsec(id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/deletesec&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Edittechsec(status, id) {
    const url = GlobalVariable.BASE_API_URL + 'techniciancertification/editsec&tickstatus=' + encodeURIComponent(status) + '&tickid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
