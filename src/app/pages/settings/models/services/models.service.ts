import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class ModelsService {

  constructor(public http: Http) { }

  /* All Models */
  LoadModels() {
    const url = GlobalVariable.BASE_API_URL + 'model/loadmodels';
    const response = this.http.get(url).map(res => res.json());
    return response;

  }

  /* Load Models Under Accounts */
  LoadAccModels(Account_ID) {
    const url = GlobalVariable.BASE_API_URL + 'model/loadaccmodel&accountID=' + encodeURIComponent(Account_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;

  }

  /* Load Single Model */
  LoadModel(Model_ID) {
    const url = GlobalVariable.BASE_API_URL + 'model/loadmodel&modelID=' + encodeURIComponent(Model_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;

  }

  /* Delete Model */
  DeleteModel(Model_ID) {

  }

  CreateMOdel(formData) {
    const url = GlobalVariable.BASE_API_URL + 'model/create';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  Create(formData, options, AccountID, ModelName, ModelDesc, Modelstatus) {
    const url = GlobalVariable.BASE_API_URL + 'model/createmodel&AccID=' + encodeURIComponent(AccountID) + '&MName=' + encodeURIComponent(ModelName) + '&MDesc=' + encodeURIComponent(ModelDesc) + '&MStatus=' + encodeURIComponent(Modelstatus);
    return this.http.post(url, formData, options)
        .map(res => res.json());
  }

}
