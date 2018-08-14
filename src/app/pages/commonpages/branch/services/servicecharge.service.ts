import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from "../../../../global/global";


declare var  $;

@Injectable()
export class ServicechargeService {

  constructor(public http: Http) { }

  ListServicecharges(branchID){
    let url = GlobalVariable.BASE_API_URL+'servicechargedetails/list&branchID='+encodeURIComponent(branchID);
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    ListServicechargesbranch(branchID){
        let url = GlobalVariable.BASE_API_URL+'servicechargedetails/listall&branchID='+branchID;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    Listbranchsc(branchID,agreementid){
        let url = GlobalVariable.BASE_API_URL+'servicechargedetails/listbranchsc&branchID='+branchID+'&agmID='+agreementid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  ServiceCharge(BASCD_Fee_Type,BASCD_Labour_Fees,BASCD_Travel_Fees_Type,BASCD_Travel_Fees,BASCD_Parking_Fees,BASCD_Miscellaneous,AASCD_KeyID,brid,umkeyid){
    let url = GlobalVariable.BASE_API_URL+'servicechargedetails/servicecharge&BASCD_Fee_Type='+encodeURIComponent(BASCD_Fee_Type)+'&BASCD_Labour_Fees='+encodeURIComponent(BASCD_Labour_Fees)
        +'&BASCD_Travel_Fees_Type='+BASCD_Travel_Fees_Type+'&BASCD_Travel_Fees='+BASCD_Travel_Fees+'&BASCD_Parking_Fees='+BASCD_Parking_Fees+'&BASCD_Miscellaneous='+BASCD_Miscellaneous+'&AASCD_KeyID='+AASCD_KeyID+'&brid='+brid+'&umkeyid='+umkeyid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    UpdateServicecharge(formServiceCharge,options){
        return this.http.post(GlobalVariable.BASE_API_URL+'servicechargedetails/servicecharge', formServiceCharge, options)
            .map(res => res.json());

    }

    agreementCharge(id){
        let url = GlobalVariable.BASE_API_URL+'servicechargedetails/viewagreementcharge&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

    UpdateAgreementcharge(formAgreement){
        return this.http.post(GlobalVariable.BASE_API_URL+'servicechargedetails/updateagreementcharge', formAgreement)
            .map(res => res.json());

    }

}
