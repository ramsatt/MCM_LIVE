import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class RemoveTicketDetailsService {

  constructor(public http: Http) { }

  /*Delete Ticket*/
  public Remove_ticket(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_ticket';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Account*/
  public Remove_tic_account(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_account';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Site*/
  public Remove_tic_site(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_site';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Branch*/
  public Remove_tic_branch(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_branch';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Asset*/
  public Remove_tic_asset(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_asset';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Agreement*/
  public Remove_tic_agreement(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_agreement';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Agreement*/
  public Remove_tic_problem_desc(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_problem_desc';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Account Contact All*/
  public Remove_tic_acc_con_all(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_acc_con_all';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Account Contact Single*/
  public Remove_tic_acc_con_single(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_acc_con_single';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Site Contact All*/
  public Remove_tic_site_con_all(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_site_con_all';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Site Contact Single*/
  public Remove_tic_site_con_single(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_site_con_single';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Branch Contact All*/
  public Remove_tic_branch_con_all(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_branch_con_all';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Branch Contact Single*/
  public Remove_tic_branch_con_single(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_branch_con_single';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Part All*/
  public Remove_tic_part_all(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_part_all';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Part Single*/
  public Remove_tic_part_single(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_part_single';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Email Recipients*/
  public Remove_other_recipient(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_other_recipient';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Branch Email Recipients All*/
  public Remove_branch_recipient_all(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_branch_recipient_all';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Branch Email Recipients Single*/
  public Remove_branch_recipient_single(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_branch_recipient_single';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  /*Delete Service request*/
  public Remove_Service_Request(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticket_details_remove/remove_tic_service_request';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

}
