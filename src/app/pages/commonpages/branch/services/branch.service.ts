import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class BranchService {

  constructor( public http:Http ) { }
  LoadBranch(sessid) {
    var url = GlobalVariable.BASE_API_URL+'branchmaster/branch&sessid='+encodeURIComponent(sessid);
    var response = this.http.get(url).map(res => res.json());
    return response;
  }
  CreateBranch(branchcode,branchname,address,city,state,country,zip,phone,fax,accounttype,cfrom,cto,desc,lat,long,email,home,mobile,createdby,bilname,biladdress,bilcity,bilstate,bilcountry,bilzip,shipname1,shipaddress1,shipcity1,shipstate1,shipcountry1,shipzip1,shipname2,shipaddress2,shipcity2,shipstate2,shipcountry2,shipzip2,shipname3,shipaddress3,shipcity3,shipstate3,shipcountry3,shipzip3,shipname4,shipaddress4,shipcity4,shipstate4,shipcountry4,shipzip4,shipname5,shipaddress5,shipcity5,shipstate5,shipcountry5,shipzip5,private_description)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/createbranch&branchcode='+ encodeURIComponent(branchcode) +'&branchname='+encodeURIComponent(branchname)+'&address='+encodeURIComponent(address)+'&city='+encodeURIComponent(city)+'&state='+encodeURIComponent(state)+'&country='+encodeURIComponent(country)+'&zip='+encodeURIComponent(zip)+'&phone='+encodeURIComponent(phone)+'&fax='+encodeURIComponent(fax)+'&accounttype='+encodeURIComponent(accounttype)+'&conFrom='+encodeURIComponent(cfrom)+'&conTo='+encodeURIComponent(cto)+'&desc='+encodeURIComponent(desc)+'&lat='+encodeURIComponent(lat)+'&long='+encodeURIComponent(long)+'&email='+encodeURIComponent(email)+'&home='+encodeURIComponent(home)+'&mobile='+encodeURIComponent(mobile)+'&createdby='+encodeURIComponent(createdby)
        +'&bilname='+encodeURIComponent(bilname)+'&biladdress='+encodeURIComponent(biladdress)+'&bilcity='+encodeURIComponent(bilcity)+'&bilstate='+encodeURIComponent(bilstate)+'&bilcountry='+encodeURIComponent(bilcountry)+'&bilzip='+encodeURIComponent(bilzip)
        +'&shipname1='+encodeURIComponent(shipname1) +'&shipaddress1='+encodeURIComponent(shipaddress1)+'&shipcity1='+encodeURIComponent(shipcity1)+'&shipstate1='+encodeURIComponent(shipstate1)+'&shipcountry1='+encodeURIComponent(shipcountry1)+'&shipzip1='+encodeURIComponent(shipzip1)
        +'&shipname2='+encodeURIComponent(shipname2) +'&shipaddress2='+encodeURIComponent(shipaddress2)+'&shipcity2='+encodeURIComponent(shipcity2)+'&shipstate2='+encodeURIComponent(shipstate2)+'&shipcountry2='+encodeURIComponent(shipcountry2)+'&shipzip2='+encodeURIComponent(shipzip2)
        +'&shipname3='+encodeURIComponent(shipname3)+'&shipaddress3='+encodeURIComponent(shipaddress3)+'&shipcity3='+encodeURIComponent(shipcity3)+'&shipstate3='+encodeURIComponent(shipstate3)+'&shipcountry3='+encodeURIComponent(shipcountry3)+'&shipzip3='+encodeURIComponent(shipzip3)+'&shipname4='+encodeURIComponent(shipname4)+'&shipaddress4='+encodeURIComponent(shipaddress4)+'&shipcity4='+encodeURIComponent(shipcity4)+'&shipstate4='+encodeURIComponent(shipstate4)+'&shipcountry4='+encodeURIComponent(shipcountry4)+'&shipzip4='+encodeURIComponent(shipzip4)+'&shipname5='+encodeURIComponent(shipname5)+'&shipaddress5='+encodeURIComponent(shipaddress5)+'&shipcity5='+encodeURIComponent(shipcity5)+'&shipstate5='+encodeURIComponent(shipstate5)+'&shipcountry5='+encodeURIComponent(shipcountry5)+'&shipzip5='+encodeURIComponent(shipzip5)+'&private_description='+encodeURIComponent(private_description)
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Deleteaddress(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/deleteaddress&id='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

ViewBranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewbranch&id='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Viewbilling(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewbillingaddress&billid='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Viewshipping(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewshippingaddress&shippid='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadSitebranch(id){
    let url = GlobalVariable.BASE_API_URL+'branchmaster/loadsitebranch&id='+ encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  ViewSiteBranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/sitebranch&id='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadaccbranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/loadaccbranch&id='+ encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  Loadbncaccounts(id){
    let url = GlobalVariable.BASE_API_URL+'branchmaster/loadaccbranch&id='+ encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadZipkm(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewsamezipkim&id='+ encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  LoadZipkm1(id,dissearch)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/viewsamezipkim&id='+encodeURIComponent(id)+'&dissearch='+ encodeURIComponent(dissearch);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadGoogleMapAddress(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

    public Load_Branch_Ticket_List(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_branch_ticket_list';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }
}
