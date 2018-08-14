import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVariable } from '../../../../../../global/global';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class TripService {

  constructor(public http: Http) { }

  public Get_All_Trip(formData): Observable<any> {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_trip_list';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public CreateTrip(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create_trip';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Get_Branch_Technicians(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_branch_technician_list';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }
  public Get_Technicians(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_technician_list';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Create_Schedule(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create_trip_schedule';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

    public Create_Re_Schedule(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create_trip_re_schedule';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

  public Create_Schedule_Mail(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create_trip_schedule_mail';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Get_Trip_Details(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_trip_details';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public StartTrip(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/start_trip';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Traffic_Delay(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/trip_tech_delay';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Tech_Reached(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/trip_tech_reached';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Tech_Reached_Mail(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/trip_tech_reached_mail';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public WorkStausUpdate(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_work_status';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Save_IR_Report(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/incident_report';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Send_IR_Report_mail(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/incident_report_mail';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Get_IR_KeyID(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ir_id';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

    public workCompleted(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/work_completed';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public workCompleted_Mail(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/work_completed_mail';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public workNotCompleted(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/work_not_completed';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public workNotCompleted_Mail(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/work_not_completed_mail';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

}
