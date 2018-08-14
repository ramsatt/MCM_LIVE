import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import {GlobalVariable} from "../../../../../global/global";

@Injectable()
export class SupplierserviceService {

  constructor(public http:Http) { }
  CreateSupplier(suppliername,address,city,state,country,zip,phone,email,desc,lat,lon,mobile,home,createdby)
  {
    let url = GlobalVariable.BASE_API_URL+'suppliermaster/createsupplier&suppliername='+encodeURIComponent(suppliername)+'&address='+encodeURIComponent(address)+'&city='+encodeURIComponent(city)+'&state='+encodeURIComponent(state)+'&country='+encodeURIComponent(country)+'&zip='+encodeURIComponent(zip)+'&phone='+encodeURIComponent(phone)+'&email='+encodeURIComponent(email)+'&desc='+encodeURIComponent(desc)+'&lat='+encodeURIComponent(lat)+'&lan='+encodeURIComponent(lon)+'&mobile='+encodeURIComponent(mobile)+'&home='+encodeURIComponent(home)+'&createdby='+encodeURIComponent(createdby);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSupplier(){
    let url = GlobalVariable.BASE_API_URL+'suppliermaster/supplier';
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  EditSuppliers(id) {
    let url = GlobalVariable.BASE_API_URL + 'suppliermaster/supplier&id=' + id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  editSupplier(suppliername,address,city,state,country,zip,phone,email,desc,supid,lat,lon,mobile,home)
  {
    let url =GlobalVariable.BASE_API_URL + 'suppliermaster/editsupplier&suppliername='+encodeURIComponent(suppliername)+'&address='+encodeURIComponent(address)+'&city='+encodeURIComponent(city)+'&state='+encodeURIComponent(state)+'&country='+encodeURIComponent(country)+'&zip='+encodeURIComponent(zip)+'&phone='+encodeURIComponent(phone)+'&email='+encodeURIComponent(email)+'&desc='+encodeURIComponent(desc)+'&supid='+encodeURIComponent(supid)+'&lat='+encodeURIComponent(lat)+'&lan='+encodeURIComponent(lon)+'&mobile='+encodeURIComponent(mobile)+'&home='+encodeURIComponent(home);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Delsuppliers(id)
  {
    let url = GlobalVariable.BASE_API_URL + 'suppliermaster/delete&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
  LoadGoogleMapAddress(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
