import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../../global/global';
@Injectable()
export class ShipmentcompanyService {

  constructor(public http: Http) { }
  Loadship(){
    const url = GlobalVariable.BASE_API_URL + 'shipment/ship';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  ship(id){
    const url = GlobalVariable.BASE_API_URL + 'shipment/ship&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateShip(name, shipurl) {
    const url = GlobalVariable.BASE_API_URL + 'shipment/add&shipname=' + encodeURIComponent(name) + '&shipurl=' + encodeURIComponent(shipurl);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delcompany(id) {
    const url = GlobalVariable.BASE_API_URL + 'shipment/delete&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  EditCompany(name, shipurl, id) {
    const url = GlobalVariable.BASE_API_URL + 'shipment/edit&shipname=' + encodeURIComponent(name) + '&shipurl=' + encodeURIComponent(shipurl) + '&shipid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
