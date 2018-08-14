import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';


@Injectable()
export class EditaccountService {

  constructor(public http: Http) {

  }

  EditAccount(id, accounename, address, city, state, country, zip, phone, mobile, home_phone, fax, accounttype, cfrom, cto, desc, lat, long) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/editaccount&id=' + encodeURIComponent(id) + '&accountname=' + encodeURIComponent(accounename) + '&address=' + encodeURIComponent(address) + '&city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state) + '&country=' + encodeURIComponent(country) + '&zip=' + encodeURIComponent(zip) + '&phone=' + encodeURIComponent(phone) + '&fax=' + encodeURIComponent(fax) + '&accounttype=' + encodeURIComponent(accounttype) + '&conFrom=' + encodeURIComponent(cfrom) + '&conTo=' + encodeURIComponent(cto) + '&desc=' + encodeURIComponent(desc) + '&lat=' + encodeURIComponent(lat) + '&long=' + encodeURIComponent(long) + '&mobile=' + encodeURIComponent(mobile) + '&home=' + encodeURIComponent(home_phone);
    const response = this.http.get(url).map(res => res.json());

    return response;

  }

  Delete(id) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/deleteaccount&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadGoogleMapAddrss(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
