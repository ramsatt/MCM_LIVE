import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../global/global';


@Injectable()
export class LibraryService {
  constructor(public http: Http) { }
  Loadlib(){
    const url = GlobalVariable.BASE_API_URL + 'library/lib';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  lib(id){
    const url = GlobalVariable.BASE_API_URL + 'library/lib&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateLib(name, desc) {
    const url = GlobalVariable.BASE_API_URL + 'library/add&libname=' + encodeURIComponent(name) + '&desc=' + encodeURIComponent(desc);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  Dellib(id) {
    const url = GlobalVariable.BASE_API_URL + 'library/delete&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  EditLib(name, desc, id) {
    const url = GlobalVariable.BASE_API_URL + 'library/edit&libname=' + encodeURIComponent(name) + '&desc=' + encodeURIComponent(desc) + '&libid=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
