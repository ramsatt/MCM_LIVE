import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class SiteService {

  constructor( public http: Http ) { }

  LoadSites() {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/sites';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

    LoadSitesbyUser(formData) {
        const url = GlobalVariable.BASE_API_URL + 'sitemaster/sites';
        const response = this.http.post(url, formData).map(res => res.json());
        return response;
    }

  CreateSite(accountID, sitename, address, city, state, country, zip, phone, fax, confirm, desc, lat, long, accno, mobile, home, contact, userID) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/createsite&accID=' + encodeURIComponent(accountID) + '&sitename=' + encodeURIComponent(sitename) + '&address=' + encodeURIComponent(address) + '&city=' + encodeURIComponent(city) + '&state=' + encodeURIComponent(state) + '&country=' + encodeURIComponent(country) + '&zip=' + encodeURIComponent(zip) + '&phone=' + encodeURIComponent(phone) + '&fax=' + encodeURIComponent(fax) + '&isconfirm=' + encodeURIComponent(confirm) + '&desc=' + encodeURIComponent(desc) + '&lat=' + encodeURIComponent(lat) + '&long=' + encodeURIComponent(long) + '&accno=' + encodeURIComponent(accno) + '&mobile=' + encodeURIComponent(mobile) + '&home=' + encodeURIComponent(home) + '&contact=' + encodeURIComponent(contact) + '&userID=' + userID;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSinglesite(id) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/sitedetail&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadAssets(id){
    const url = GlobalVariable.BASE_API_URL + 'assets/viewsiteassets&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadUnassignSite(id) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/loadunassignsite&id=' + encodeURIComponent(id);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSiteAccounts(SiteID) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/siteaccountdetails&siteID=' + encodeURIComponent(SiteID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadSiteBranches(SiteID) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/sitebranchdetails&siteID=' + encodeURIComponent(SiteID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadMapdata(siteID, Aaccount, Site, Branch) {
    const url = GlobalVariable.BASE_API_URL + 'sitemaster/mapdata&SiteID=' + encodeURIComponent(siteID) + '&account=' + encodeURIComponent(Aaccount) + '&site=' + encodeURIComponent(Site) + '&branch=' + encodeURIComponent(Branch);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadGoogleMapAddress(address) {
   
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+address;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  deleteSiteAcc(sadId, Accid, SiteID){
      const url = GlobalVariable.BASE_API_URL + 'sitemaster/deletesadbyid&sadId=' + sadId + '&Accid=' + Accid + '&SiteID=' + SiteID;
      const response = this.http.get(url).map(res => res.json());
  return response;
}

  deleteSiteBrn(sbdId, brKeyid, SiteID){
      const url = GlobalVariable.BASE_API_URL + 'sitemaster/deletesbdbyid&sbdId=' + sbdId + '&brKeyid=' + brKeyid + '&SiteID=' + SiteID;
      const response = this.http.get(url).map(res => res.json());
    return response;
  }

  deleteSiteAsst(asmId){
      const url = GlobalVariable.BASE_API_URL + 'sitemaster/deleteasmbyid&asmId=' + asmId;
      const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Updatestatus(siteid,status){
    let url = GlobalVariable.BASE_API_URL+'sitemaster/updatestatus&siteid='+siteid+ '&status=' + status;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

}
