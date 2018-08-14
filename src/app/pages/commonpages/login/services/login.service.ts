import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class LoginService {

  constructor(public http: Http) { }
  login(credentials) {
    const url = GlobalVariable.BASE_API_URL + 'usermaster/login';
    const response = this.http.post(url, credentials).map(res => res.json());
    return response;
  }

}
