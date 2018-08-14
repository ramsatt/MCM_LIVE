import { Injectable } from '@angular/core';
import { Http }  from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from "../../../../global/global";


@Injectable()
export class UpdatebranchService {

  constructor(public http:Http) { }
  UpdateBranch(id,branchcode,branchname,address,city,state,country,zip,phone,fax,accounttype,confrom,conto,description,latitude,longitude,email,home,mobile,biladdress,bilcity,bilstate,bilcountry,bilzip,bilname,shipname1,shipaddress1,shipcity1,shipstate1,shipcountry1,shipzip1,shipaddress2,shipcity2,shipstate2,shipcountry2,shipzip2,shipname2,shipname3,shipaddress3,shipcity3,shipstate3,shipcountry3,shipzip3,shipaddress4,shipcity4,shipstate4,shipcountry4,shipzip4,shipname4,shipname5,shipaddress5,shipcity5,shipstate5,shipcountry5,shipzip5,bilid,shipid1,shipid2,shipid3,shipid4,shipid5,private_description)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/updatebranch&id='+encodeURIComponent(id)+'&branchcode='+encodeURIComponent(branchcode)+'&branchname='+encodeURIComponent(branchname)+'&address='+encodeURIComponent(address)+'&city='+encodeURIComponent(city)+'&state='+encodeURIComponent(state)+'&country='+encodeURIComponent(country)+'&zip='+encodeURIComponent(zip)+'&phone='+encodeURIComponent(phone)+'&fax='+encodeURIComponent(fax)+'&accounttype='+encodeURIComponent(accounttype)+'&conFrom='+encodeURIComponent(confrom)+'&conTo='+encodeURIComponent(conto)+'&desc='+encodeURIComponent(description)+'&lat='+encodeURIComponent(latitude)+'&long='+encodeURIComponent(longitude)+'&email='+encodeURIComponent(email)+'&home='+encodeURIComponent(home)+'&mobile='+encodeURIComponent(mobile) +'&biladdress='+encodeURIComponent(biladdress)+'&bilcity='+encodeURIComponent(bilcity)+'&bilstate='+encodeURIComponent(bilstate)+'&bilcountry='+encodeURIComponent(bilcountry)+'&bilzip='+encodeURIComponent(bilzip)+'&bilname='+encodeURIComponent(bilname)
        +'&shipaddress1='+encodeURIComponent(shipaddress1)+'&shipcity1='+encodeURIComponent(shipcity1)+'&shipstate1='+encodeURIComponent(shipstate1)+'&shipcountry1='+encodeURIComponent(shipcountry1)+'&shipzip1='+encodeURIComponent(shipzip1)+'&shipname1='+encodeURIComponent(shipname1)
        +'&shipaddress2='+encodeURIComponent(shipaddress2)+'&shipcity2='+encodeURIComponent(shipcity2)+'&shipstate2='+encodeURIComponent(shipstate2)+'&shipcountry2='+encodeURIComponent(shipcountry2)+'&shipzip2='+encodeURIComponent(shipzip2)+'&shipname2='+encodeURIComponent(shipname2)
        +'&shipaddress3='+encodeURIComponent(shipaddress3)+'&shipcity3='+encodeURIComponent(shipcity3)+'&shipstate3='+encodeURIComponent(shipstate3)+'&shipcountry3='+encodeURIComponent(shipcountry3)+'&shipzip3='+encodeURIComponent(shipzip3)+'&shipname3='+encodeURIComponent(shipname3)+'&shipaddress4='+encodeURIComponent(shipaddress4)+'&shipcity4='+encodeURIComponent(shipcity4)+'&shipstate4='+encodeURIComponent(shipstate4)+'&shipcountry4='+encodeURIComponent(shipcountry4)+'&shipzip4='+encodeURIComponent(shipzip4)+'&shipname4='+encodeURIComponent(shipname4)
        +'&shipaddress5='+encodeURIComponent(shipaddress5)+'&shipcity5='+encodeURIComponent(shipcity5)+'&shipstate5='+encodeURIComponent(shipstate5)+'&shipcountry5='+encodeURIComponent(shipcountry5)+'&shipzip5='+encodeURIComponent(shipzip5)+'&shipname5='+encodeURIComponent(shipname5)+'&bilid='+encodeURIComponent(bilid)+'&shipid1='+encodeURIComponent(shipid1)+'&shipid2='+encodeURIComponent(shipid2)+'&shipid3='+encodeURIComponent(shipid3)+'&shipid4='+encodeURIComponent(shipid4)+'&shipid5='+encodeURIComponent(shipid5)+'&private_description='+encodeURIComponent(private_description);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
  DeleteBranch(id)
  {
    let url = GlobalVariable.BASE_API_URL+'branchmaster/deletebranch&id='+encodeURIComponent(id);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }
    Activate(id,val)
    {
        let url = GlobalVariable.BASE_API_URL+'branchmaster/activatebranch&id='+encodeURIComponent(id)+'&val='+encodeURIComponent(val);
        let response = this.http.get(url).map(res => res.json());
        return response;
    }
  LoadBranch() {
    var url = GlobalVariable.BASE_API_URL+'branchmaster/branch';
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadGoogleMapAddress(city) {
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + city;
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
