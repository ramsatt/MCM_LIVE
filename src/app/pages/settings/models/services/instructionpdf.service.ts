import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class InstructionpdfService {

  constructor( public http: Http ) { }

  Create(formData, options, SOM_ID, PDF_Name, PDFPrimary) {
    const url = GlobalVariable.BASE_API_URL + 'inspdf/create&SOM_ID=' + encodeURIComponent(SOM_ID) + '&Name=' + encodeURIComponent(PDF_Name) + '&Primary=' + encodeURIComponent(PDFPrimary);
    return this.http.post(url, formData, options)
        .map(response => response.json()).catch(error => Observable.throw(error.json()));
  }

  GetAll(SOM_ID) {
    const url = GlobalVariable.BASE_API_URL + 'inspdf/getall&somID=' + encodeURIComponent(SOM_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
}
