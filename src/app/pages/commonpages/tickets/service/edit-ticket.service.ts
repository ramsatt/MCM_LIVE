import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class EditTicketService {

  constructor(private http: Http) { }

  public createNewTrip(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/create_trip';
    return this.http.post(Url, formData).map(res => res.json());
    }

  public createNewTrip_Mail(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/create_trip_mail';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Account_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_account_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Assign_Account_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/assign_account_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Site_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_site_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Assign_Site_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/assign_site_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Branch_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_branch_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Assign_Branch_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/assign_branch_contact';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Service_Request(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_service_request';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Assign_Service_Request(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/assign_service_request';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Load_Branch_Contact(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/load_branch_contacts';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Agreement(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_agreement';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Problem_Description(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_problem_desc';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Remove_Parts(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/remove_all_parts';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Update_Problem_Descrption(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/problem_description_update';
    return this.http.post(Url, formData).map(res => res.json());
  }

  public Assign_Parts(formData) {
    const Url = GlobalVariable.BASE_API_URL + 'edit_ticket/assign_parts';
    return this.http.post(Url, formData).map(res => res.json());
  }
}
