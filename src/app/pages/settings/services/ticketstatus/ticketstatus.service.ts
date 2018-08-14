import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {GlobalVariable} from '../../../../global/global';


@Injectable()
export class TicketstatusService {


  constructor(public http: Http) { }
  Load_All_Status(){
    const url = GlobalVariable.BASE_API_URL + 'ticketstatus/get_all_status';
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  Load_Ticket_Status_Details(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticketstatus/get_status_details';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  Create_Status(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticketstatus/add';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  Deltick(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticketstatus/delete';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

  Update_Status(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticketstatus/update_ticket_status';
    const response = this.http.post(url, formData).map(res => res.json());
    return response;
  }

}
