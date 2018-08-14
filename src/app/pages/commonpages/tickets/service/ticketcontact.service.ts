import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';
@Injectable()
export class TicketcontactService {

  constructor(public http: Http) { }

  Ticket_Email_Status(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_email_status_list';
    return this.http.post(url, formData).map( res => res.json());
  }

  Ticket_Site_Email_Status() {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_site_email_status_list';
    return this.http.get(url).map( res => res.json());
  }

  Ticket_Account_Contacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_all_acc_contact_list';
    return this.http.post(url, formData).map( res => res.json());
  }

  Ticket_Site_Contacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_all_site_contact_list';
    return this.http.post(url, formData).map( res => res.json());
  }

  Create_Account_Contact(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/create_acc_contact';
    return this.http.post(url, formData).map( res => res.json());
  }

  Create_Site_Contact(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/create_site_contact';
    return this.http.post(url, formData).map( res => res.json());
  }

  LoadSiteCategory() {
    const url = GlobalVariable.BASE_API_URL + 'siteuserdetails/category';
    return this.http.post(url, { 'RoleID': 3 }).map(res => res.json());
  }

  LoadAccountContacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_account_contacts';
    return this.http.post(url, formData).map(res => res.json());
  }

  LoadAccountTicketContacts(formData) {
      const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_account_ticket_contacts';
    return this.http.post(url, formData).map(res => res.json());
  }

  LoadSiteContacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_site_contacts';
    return this.http.post(url, formData).map(res => res.json());
  }

  LoadSiteTicketContacts(formData) {
    const url = GlobalVariable.BASE_API_URL + 'ticket_contact/get_site_ticket_contacts';
    return this.http.post(url, formData).map(res => res.json());
  }

  Assign_ACC_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_contact/assign_acc_con';
    return this.http.post(URL, formData).map(res => res.json());
  }

  public Assign_Site_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_contact/assign_site_con';
    return this.http.post(URL, formData).map(res => res.json());
  }
}
