import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';

@Injectable()
export class TicketService {

  constructor(public http: Http) { }

  public CreateTicket(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public UpdateAccount(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/accountupdate';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public UpdateAccountRefNumber(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_acc_ref_num';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public UpdateSite(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/siteupdate';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public UpdateBranch(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/branchupdate';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public UpdateAsset(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/assetupdate';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public LoadAsset(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/load_all_asset';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Remove_Acc_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/remove_acc_con';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Remove_Site_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/remove_site_con';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Assign_Branch_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/assign_branch_con';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Assign_Tech_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/assign_tech_contact';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Remove_Branch_Contact(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/remove_branch_con';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Assign_Service_Request(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_ser_req';
    const response = this.http.post(URL, formData).map(res => res.json());
    return response;
  }

  public Load_Agreements(formData){
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_agreement';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Primary_Account_Site_Contact(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_site_account_primary_user';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Primary_Site_Contact(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_site_primary_user';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Primary_Branch_Contact(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_branch_primary_user';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Update_Acc_Ref(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'edit_ticket/update_acc_ref_num';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Site_Contacts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_site_users';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Branch_Hero_Kit_Parts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_hero_kit_parts';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Ticket_Parts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/ticket_part_list';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Ticket_Parts_Edit(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'edit_ticket/ticket_part_list';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Branch_Non_Hero_Kit_Parts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_non_hero_kit_parts';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Load_Ticket_Required_Parts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ticket_required_parts';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Update_Problem_Description(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_problem_desc';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Update_Agreement(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_agreement';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Assign_parts(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/assign_parts';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

    public CheckCustomKnownIssues(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/custom_known_issues';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public CheckCustomKnownIssuesEdit(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/custom_known_issues_edit';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
  }

  public Assign_Other_Recipient(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/save_other_recipient';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Assign_Branch_Recipient(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/save_branch_recipient';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Preview_Ticket(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_sr_preview';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

    public Preview_Ticket_Edit(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_sr_preview_edit';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
  }

    public Preview_Ticket_Trip(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/mailpreview';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Preview_Ticket_Edit_Trip(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/mailpreview_edit';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

  public Submit_Ticket(Ticket_ID) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/send_mail&ticketID=' + Ticket_ID;
      const response = this.http.get(URL).map(res => res.json());
      return response;
  }

    public Raise_Part_request(postData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticket_part_request/new_ticket_request';
        return this.http.post(URL, postData).map(res => res.json());
    }

    public Raise_Part_request_edit(postData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticket_part_request/edit_ticket_request';
        return this.http.post(URL, postData).map(res => res.json());
    }

  public Submit_Ticket_Mail(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/new_ticket_mail';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Get_All_Submited_Ticket_List(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ticket_list';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

  public Get_Ticket_Details(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ticket_details';
      const response = this.http.post(URL, formData).map(res => res.json());
      return response;
  }

    public Dispatch_Mail(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/dispatch_mail';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Dispatch(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/dispatch';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Decline(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ticket_details';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Load_Account_Ticket_List(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_account_ticket_list';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Load_Branch_Ticket_List(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_branch_ticket_list';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Load_Ticket_List_By_Date(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_ticket_by_date';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public GetTicketStatusList(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/load_all_ticket_status';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public UpdateExceptionStatus(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/change_tic_exception_status';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Get_Today_Ticket() {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_today_ticket';
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    public Get_Week_Ticket() {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_week_ticket';
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    public Get_Month_Ticket() {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_month_ticket';
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    public Create_Ticket_Notes(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/create_ticket_notes';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Get_Ticket_Notes(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_all_ticket_notes';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Get_Ticket_Note_Details(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_tic_note_details';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Update_Ticket_Note(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/update_tic_note';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Delete_Ticket_Note(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/delete_tic_note';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Cancel_Ticket(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/cancel_ticket';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Get_Active_Tickets() {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_active_tickets';
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    public Delete_Trip(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/delete_trip';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Part_Request_HeroKit(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/part_request_hero_kit';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Part_Request_Non_HeroKit(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/part_request_non_hero_kit';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Ticket_Part_Request(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'partsmaster/createticketrequest';
        const response = this.http.post(URL, formData).map(res => res.json());
        return response;
    }

    public Get_All_Status() {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/get_all_ticket_status';
        const response = this.http.get(URL).map(res => res.json());
        return response;
    }

    public LoadTicketLogs(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'log/load_ticket_logs';
        return this.http.post(URL, formData).map(res => res.json());
    }

    public TripScheduleList(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'ticketmaster/Trip_schedule_list';
        return this.http.post(URL, formData).map(res => res.json());
    }
}
