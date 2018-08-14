import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from "../../../../global/global";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/timeoutWith';
import {errorHandler} from "@angular/platform-browser/src/browser";
import {catchError} from "rxjs/operators/catchError";
import {error} from "util";


@Injectable()
export class ShipmentService {

  constructor(public http: Http) { }

  LoadRequestedBranches(id){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/loadrequestedbranches&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    dirLoadRequestedBranches(id){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/dirloadrequestedbranches&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  LoadShipmentCompanies(){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentcompanies';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadParts(requestfrom,requestto,requesttype){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/loadparts&requestfrom='+requestfrom+'&requestto='+requestto+'&requesttype='+requesttype;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    LoadPartsshipments(requestfrom,requestto,requesttype,shipmentType){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/loadpartsreq&requestfrom='+requestfrom+'&requestto='+requestto+'&requesttype='+requesttype+'&shipmentType='+shipmentType;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  createShipment(form){
    return this.http.post(GlobalVariable.BASE_API_URL+'shipmentprocess/createshipment', form)
        .map(res => res.json());
  }

    createDirectShipment(form){

        /*if(form.herokitstatus=='N') // Directshipment for non herokit
        {
            return this.http.post(GlobalVariable.BASE_API_URL+'herokit/updatenonpartrequest', form)
                .map(res => res.json());
        }
        else // Directshipment for herokit
        {
            return this.http.post(GlobalVariable.BASE_API_URL+'herokit/directshipmentrequest', form)
                .map(res => res.json());
        }*/
        return this.http.post(GlobalVariable.BASE_API_URL+'herokit/directshipmentrequest', form)
            .map(res => res.json());

    }

  LoadShipments(id,fromdate,todate){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/loadshipments&id='+id+'&fromdate='+fromdate+'&todate='+todate;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    Creategr(shipmentid){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/createautogr&shipmentid='+shipmentid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  LoadShipmentrequests(id){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentrequests&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    LoadShipmentgr(id){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentgr&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  trackId(id){
    let url = 'https://www.fedex.com/trackingCal/track?data={%22TrackPackagesRequest%22:{%22appType%22:%22WTRK%22,%22appDeviceType%22:%22DESKTOP%22,%22uniqueKey%22:%22%22,%22processingParameters%22:{},%22trackingInfoList%22:[{%22trackNumberInfo%22:{%22trackingNumber%22:%22%20'+id+'%20%22,%22trackingQualifier%22:%22%22,%22trackingCarrier%22:%22%22}}]}}&action=trackpackages&locale=n_IN&version=1&format=json';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

   trackIdacc(company,id){
        //let url = 'https://www.fedex.com/trackingCal/track?data={%22TrackPackagesRequest%22:{%22appType%22:%22WTRK%22,%22appDeviceType%22:%22DESKTOP%22,%22uniqueKey%22:%22%22,%22processingParameters%22:{},%22trackingInfoList%22:[{%22trackNumberInfo%22:{%22trackingNumber%22:%22%20'+id+'%20%22,%22trackingQualifier%22:%22%22,%22trackingCarrier%22:%22%22}}]}}&action=trackpackages&locale=n_IN&version=1&format=json';
        let url = GlobalVariable.BASE_API_URL+'tracking/trackapi&id='+id+'&company='+company+'&returnType='+'1';
        let response = this.http.get(url).timeoutWith(7000, Observable.throw(new Error('Boom!'))).map(res => res.json());
        return response;
    }

  Findbranch(id){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/findbranch&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
  }

  UpdateTrack(form){
    return this.http.post(GlobalVariable.BASE_API_URL+'shipmentprocess/updatetrack', form)
        .map(res => res.json());

  }

  LoadShippedBranches(){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shippedbranches';
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  findShipmentfrom(type,receivedforid){
    let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentfrom&type='+type+'&receivedforid='+receivedforid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    loadshipments(Receivefrom,type,Receiveforid){
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipment&type='+type+'&Receivefrom='+Receivefrom+'&Receiveforid='+Receiveforid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  createGR(form){
    return this.http.post(GlobalVariable.BASE_API_URL+'shipmentprocess/creategr', form)
        .map(res => res.json());

  }

  loadshipmentsbytype(type,Receiveforid){
      let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentbytype&type='+type+'&Receivefrom='+Receiveforid;
      let response = this.http.get(url).map(res => res.json());
      return response;
  }

  createGRmultiple(form){
        return this.http.post(GlobalVariable.BASE_API_URL+'shipmentprocess/createmultiplegr', form)
            .map(res => res.json());
  }
    LoadGr(manufacturer,branch,supplier)
    {
        //let url = GlobalVariable.BASE_API_URL+'partsmaster/requestall';
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/loadgr&manufacturer='+manufacturer+'&branch='+branch+'&supplier='+supplier;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Requestbyid(id,type)
    {
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/requestbyid&id='+id+'&type='+type;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Shipmentbygrid(id)
    {
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/shipmentbygrid&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    LoadPartrequests(rpdid,partid)
    {
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/partsrequests&rpdid='+rpdid+'&partid='+partid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    cancelRequest(rpdid)
    {
        let url = GlobalVariable.BASE_API_URL+'shipmentprocess/cancelrequests&rpdid='+rpdid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }


}
