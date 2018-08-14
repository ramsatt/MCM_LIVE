import { Injectable } from '@angular/core';
import { Http , Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class EditmodelService {

  constructor(public http: Http) { }

  UpdateModel(formData) {
    const url = GlobalVariable.BASE_API_URL + 'model/edit';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  update(formData, options, AccountID, modelID, ModelName, ModelDesc, Modelstatus) {
    const url = GlobalVariable.BASE_API_URL + 'model/updatemodel&AccID=' + encodeURIComponent(AccountID) + '&MName=' + encodeURIComponent(ModelName) + '&MDesc=' + encodeURIComponent(ModelDesc) + '&MStatus=' + encodeURIComponent(Modelstatus) + '&MID=' + encodeURIComponent(modelID);
    return this.http.post(url, formData, options)
        .map(res => res.json());
  }

  DeleteModel(ModelID) {
    const url = GlobalVariable.BASE_API_URL + 'model/delete&modelID=' + encodeURIComponent(ModelID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
