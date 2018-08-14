import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../global/global';

@Injectable()
export class AccountsService {

  constructor( public http: Http) { }

  LoadAccounts() {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/accounts';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadAccountslist(umkeyid,urmid) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/accountslist&umkeyid=' + encodeURIComponent(umkeyid)+ '&urmid=' + encodeURIComponent(urmid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

    LoadAccounts_byUsers(formData) {
        const url = GlobalVariable.BASE_API_URL + 'accountmaster/accounts';
        const response = this.http.post(url, formData).map(res => res.json());
        return response;
    }

  CreateAccount(accounename, address, city, state, country, zip, phone, mobile, home_phone, fax, accounttype, cfrom, cto, desc, lat, long, userID) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/createaccount&accountname=' + encodeURIComponent(accounename) + '&address=' + encodeURIComponent(address) + '&city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state) + '&country=' + encodeURIComponent(country) + '&zip=' + encodeURIComponent(zip) + '&phone=' + encodeURIComponent(phone) + '&fax=' + encodeURIComponent(fax) + '&accounttype=' + encodeURIComponent(accounttype) + '&conFrom=' + encodeURIComponent(cfrom) + '&conTo=' + encodeURIComponent(cto) + '&desc=' + encodeURIComponent(desc) + '&lat=' + encodeURIComponent(lat) + '&long=' + encodeURIComponent(long) + '&mobile=' + encodeURIComponent(mobile) + '&home=' + encodeURIComponent(home_phone) + '&userID=' + encodeURIComponent(userID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  AccountOverview(id) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/accountview&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSites(id) {
    const url = GlobalVariable.BASE_API_URL + 'accountmaster/acountsites&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadAssets(id){
    const url = GlobalVariable.BASE_API_URL + 'assets/viewaccassets&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadGoogleMapAddrss(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  public Load_Account_Ticket_List(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_account_ticket_list';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }
  Loadmenu(id) {
    let sessid = localStorage.getItem('ucmid');
    const url = GlobalVariable.BASE_API_URL + 'menuassignment/loadsubmenu&id=' + encodeURIComponent(id)+ '&sessionid=' + encodeURIComponent(sessid);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadAccountBranch(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'accountmaster/get_all_account_branch';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  DeleteImage(accId){
    let url = GlobalVariable.BASE_API_URL+'accountmaster/deleteimage&accId='+accId;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }
}
