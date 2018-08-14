import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';



@Injectable()
export class EditsiteService {

  constructor( public http: Http ) { }

  EditSite(id, sitename, address, city, state, country, zip, phone, fax, confirm, desc, lat, long, accno, mobile, home,contact) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/editsite&id=' + encodeURIComponent(id) + '&sitename=' + encodeURIComponent(sitename) + '&address=' + encodeURIComponent(address) + '&city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state) + '&country=' + encodeURIComponent(country) + '&zip=' + encodeURIComponent(zip) + '&phone=' + encodeURIComponent(phone) + '&fax=' + encodeURIComponent(fax) + '&isconfirm=' + encodeURIComponent(confirm) + '&desc=' + encodeURIComponent(desc) + '&lat=' + encodeURIComponent(lat) + '&long=' + encodeURIComponent(long) + '&accno=' + encodeURIComponent(accno) + '&mobile=' + encodeURIComponent(mobile) + '&home=' + encodeURIComponent(home)+ '&contact=' + encodeURIComponent(contact);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteSite(id) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/deletesite&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  AssignSite(AccID, SiteID) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/assignsite&accID=' + encodeURIComponent(AccID) + '&siteID=' + encodeURIComponent(SiteID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadGoogleMapAddress(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
