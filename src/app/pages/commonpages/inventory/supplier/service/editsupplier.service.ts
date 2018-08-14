import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {GlobalVariable} from "../../../../../global/global";


@Injectable()
export class EditsupplierService {

  constructor(public http:Http) { }
  EditSuppliers(id){
    let url =  GlobalVariable.BASE_API_URL+'suppliermaster/supplier&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

}
