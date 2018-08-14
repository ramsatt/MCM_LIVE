import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../../../global/global';


declare var  $;

@Injectable()
export class AgreementService {

  constructor(public http: Http) { }

  CreateAgrement(AGM_Agreement_Name, AGM_EffectiveDate, AGM_EndDate, AGM_Renewal_AlertDate, AGM_Holiday_Include, AGM_WorkingHours_StartTime_Hours,AGM_WorkingHours_StartTime_Minutes,AGM_WorkingHours_StartTime_Sessions, AGM_WorkingHours_EndTime_Hours,AGM_WorkingHours_EndTime_Minutes,AGM_WorkingHours_EndTime_Sessions, AGM_OneWeek_Response_Service,AGM_Response_Time_Hours,AGM_Response_Time_Minutes,AGM_Service_Request,AGM_SameDay_Service_Request,AGM_AM_KeyID,AGM_Renewal_Years,AGM_Auto_Renewal,AGM_ASM_KeyID,umkeyid) {
    let url = GlobalVariable.BASE_API_URL+'agreement/create&AGM_Agreement_Name='+encodeURIComponent(AGM_Agreement_Name)+
        '&AGM_EffectiveDate='+AGM_EffectiveDate +'&AGM_EndDate='+AGM_EndDate+'&AGM_Renewal_AlertDate='+AGM_Renewal_AlertDate+
        '&AGM_Holiday_Include='+AGM_Holiday_Include+'&AGM_WorkingHours_StartTime_Hours='+AGM_WorkingHours_StartTime_Hours+
        '&AGM_WorkingHours_StartTime_Minutes='+AGM_WorkingHours_StartTime_Minutes+'&AGM_WorkingHours_StartTime_Sessions='+AGM_WorkingHours_StartTime_Sessions+
        '&AGM_WorkingHours_EndTime_Hours='+AGM_WorkingHours_EndTime_Hours+'&AGM_OneWeek_Response_Service='+AGM_OneWeek_Response_Service+
        '&AGM_WorkingHours_EndTime_Minutes='+AGM_WorkingHours_EndTime_Minutes+'&AGM_WorkingHours_EndTime_Sessions='+AGM_WorkingHours_EndTime_Sessions+
        '&AGM_Response_Time='+AGM_Response_Time_Hours+'&AGM_Response_Time_Minutes='+AGM_Response_Time_Minutes+
        '&AGM_SameDay_Service_Request='+AGM_SameDay_Service_Request+'&AGM_Service_Request='+AGM_Service_Request+'&AGM_AM_KeyID='+AGM_AM_KeyID+'&AGM_Renewal_Years='+AGM_Renewal_Years+'&AGM_Auto_Renewal='+AGM_Auto_Renewal+'&AGM_ASM_KeyID='+AGM_ASM_KeyID+'&umkeyid='+umkeyid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

    UpdateAgrement(AGM_KeyID,AGM_Agreement_Name, AGM_EffectiveDate, AGM_EndDate, AGM_Renewal_AlertDate, AGM_Holiday_Include, AGM_WorkingHours_StartTime_Hours,AGM_WorkingHours_StartTime_Minutes,AGM_WorkingHours_StartTime_Sessions, AGM_WorkingHours_EndTime_Hours,AGM_WorkingHours_EndTime_Minutes,AGM_WorkingHours_EndTime_Sessions, AGM_OneWeek_Response_Service,AGM_Response_Time_Hours,AGM_Response_Time_Minutes,AGM_Service_Request,AGM_SameDay_Service_Request,AGM_Renewal_Years,AGM_Auto_Renewal,AGM_IsActive,umkeyid) {
        let url = GlobalVariable.BASE_API_URL+'agreement/updateagreement&AGM_Agreement_Name='+encodeURIComponent(AGM_Agreement_Name)+
            '&AGM_EffectiveDate='+AGM_EffectiveDate +'&AGM_EndDate='+AGM_EndDate+'&AGM_Renewal_AlertDate='+AGM_Renewal_AlertDate+
            '&AGM_Holiday_Include='+AGM_Holiday_Include+'&AGM_WorkingHours_StartTime_Hours='+AGM_WorkingHours_StartTime_Hours+
            '&AGM_WorkingHours_StartTime_Minutes='+AGM_WorkingHours_StartTime_Minutes+'&AGM_WorkingHours_StartTime_Sessions='+AGM_WorkingHours_StartTime_Sessions+
            '&AGM_WorkingHours_EndTime_Hours='+AGM_WorkingHours_EndTime_Hours+'&AGM_OneWeek_Response_Service='+AGM_OneWeek_Response_Service+
            '&AGM_WorkingHours_EndTime_Minutes='+AGM_WorkingHours_EndTime_Minutes+'&AGM_WorkingHours_EndTime_Sessions='+AGM_WorkingHours_EndTime_Sessions+
            '&AGM_Response_Time='+AGM_Response_Time_Hours+'&AGM_Response_Time_Minutes='+AGM_Response_Time_Minutes+
            '&AGM_SameDay_Service_Request='+AGM_SameDay_Service_Request+'&AGM_Service_Request='+AGM_Service_Request+'&AGM_KeyID='+AGM_KeyID+'&AGM_Renewal_Years='+AGM_Renewal_Years+'&AGM_Auto_Renewal='+AGM_Auto_Renewal+'&AGM_IsActive='+AGM_IsActive+'&umkeyid='+umkeyid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    UpdateTickets(formTickets){
      //console.log(formTickets);
        return this.http.post(GlobalVariable.BASE_API_URL+'agreement/updateticketstatus', formTickets)
            .map(res => res.json());

    }

    UpdateAgreementcharge(formAgreement){
        return this.http.post(GlobalVariable.BASE_API_URL+'agreement/updateagreementcharge', formAgreement)
            .map(res => res.json());

    }

    UpdateServicecharge(formServiceCharge,options){
        //console.log(formServiceCharge);
        return this.http.post(GlobalVariable.BASE_API_URL+'agreement/updateservicecharge', formServiceCharge, options)
            .map(res => res.json());

    }

  LoadTickets(id){
    let url = GlobalVariable.BASE_API_URL+'agreement/tickets&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

    LoadTicketsorderby(id){
        let url = GlobalVariable.BASE_API_URL+'agreement/ticketsorderby&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

    ViewTickets(id){
        let url = GlobalVariable.BASE_API_URL+'agreement/viewtickets&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

  timeDiff(startHour,startMinute,startSession,endHour,endMinute,endSession){
        let url = GlobalVariable.BASE_API_URL+'agreement/timediff&startHour='+startHour+'&startMinute='+startMinute
            +'&startSession='+startSession+'&endHour='+endHour+'&endMinute='+endMinute+'&endSession='+endSession;
        let response = this.http.get(url).map(res => res.json());
        return response;
  }

  LoadService(amid,aggid){
    $(function(){
      $('#CreateModel').modal();
    });

    let url = GlobalVariable.BASE_API_URL+'agreement/modelservice&amid='+amid+'&aggid='+aggid;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

  EditAgreement(id){
    let url = GlobalVariable.BASE_API_URL+'agreement/update&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

    viewAgreement(accid){
        let url = GlobalVariable.BASE_API_URL+'agreement/agreementlist&accid='+accid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    viewAgreementasset(asstid){
        let url = GlobalVariable.BASE_API_URL+'agreement/assetagreementlist&asstid='+asstid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

  CreateServicecharge(servicecharegeid,agreementid,accountid,umkeyid) {

    $('#CreateModel').modal('hide');

    let url = GlobalVariable.BASE_API_URL+'agreement/createservicecharge&servicecharegeid='+servicecharegeid+
        '&agreementid='+agreementid+'&accountid='+accountid+'&umkeyid='+umkeyid;
    let response = this.http.get(url).map(res => res.json());
    return response;
  }

  LoadServicecharge(id){
    let url = GlobalVariable.BASE_API_URL+'agreement/viewservicecharge&id='+id;
    let response = this.http.get(url).map(res => res.json());
    return response;

  }

    agreementCharge(id){
        let url = GlobalVariable.BASE_API_URL+'agreement/viewagreementcharge&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

    addTickets(form){
        $('#TicketStatus').modal('hide');
        return this.http.post(GlobalVariable.BASE_API_URL+'agreement/addtickets', form)
            .map(res => res.json());

    }

    findSite(id)
    {
        let url = GlobalVariable.BASE_API_URL+'assets/loadsites&id='+id;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    findasset(siteID,accID)
    {
        let url = GlobalVariable.BASE_API_URL+'assets/loadsiteassetlist&siteID='+siteID+'&accID='+accID;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    checkasset(asstid)
    {
        let url = GlobalVariable.BASE_API_URL+'assets/findasset&asstid='+asstid;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

    deleteticketstatus(ticketid){
        let url = GlobalVariable.BASE_API_URL+'agreement/deleteticketstatus&ticketid='+ticketid;
        let response = this.http.get(url).map(res => res.json());
        return response;

    }

    deleteAgreement(agmId){
        let url = GlobalVariable.BASE_API_URL+'agreement/deletebyid&agmId='+agmId;
        let response = this.http.get(url).map(res => res.json());
        return response;
    }

}
