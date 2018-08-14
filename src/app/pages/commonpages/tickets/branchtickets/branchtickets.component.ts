import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TicketService } from '../service/ticket.service';
declare var $;

@Component({
  selector: 'app-branchtickets',
  templateUrl: './branchtickets.component.html',
  styleUrls: ['./branchtickets.component.scss']
})
export class BranchticketsComponent implements OnInit {
    BranchID: any = [];
    TicketsArray: any = [];
    ScltTicketID: any = '';
  constructor(public router: Router, public actRoute: ActivatedRoute, private ticketService: TicketService) {
      this.BranchID = this.actRoute.snapshot.params['id'];
  }

  ngOnInit() {
      this.Load_Branch_Ticket_List(this.BranchID);
  }

  Load_Branch_Ticket_List(BranchID){
      const formData: FormData = new FormData();
      formData.append('branchID', BranchID);
      this.ticketService.Load_Branch_Ticket_List(formData).subscribe(
          data => {
              this.TicketsArray = data;
          }
      );
  }

  SelectedTicket(TicketID){
      this.ScltTicketID = TicketID;
  }


}
