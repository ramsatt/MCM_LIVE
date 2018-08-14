import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';


@Component({
  selector: 'app-accounttickets',
  templateUrl: './accounttickets.component.html',
  styleUrls: ['./accounttickets.component.scss']
})
export class AccountticketsComponent implements OnInit {
    AccountID: any = '';
    TicketsArray: any = [];
    ScltTicketID: any = '';

  constructor(public router: Router, public actRoute: ActivatedRoute, private ticketService: TicketService) {
      this.AccountID = this.actRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.Load_Account_Ticket_List(this.AccountID);
  }

  Load_Account_Ticket_List(AccountID){
    const formData: FormData = new FormData();
    formData.append('accountID', AccountID);
    this.ticketService.Load_Account_Ticket_List(formData).subscribe(
        data => {
          this.TicketsArray = data;
        }
    );
  }

    SelectedTicket(TicketID){
        this.ScltTicketID = TicketID;
    }


}
