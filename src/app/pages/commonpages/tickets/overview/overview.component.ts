import {Component, OnInit, ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {TicketService} from '../service/ticket.service';
import {AccountsService} from '../../../../services/accounts/accounts.service';

declare var $;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, AfterViewInit {
  TicketsArray: any = [];
  ScltTicketID: any = '';
  Search: any;
  TicketStatusArray: any[];
    Asssubmenu: any;
    sessid: any;
  @ViewChild('DateFrom') public DateFrom: ElementRef;
  @ViewChild('DateTo') public DateTo: ElementRef;
  @ViewChild('Status') public Status: ElementRef;
    userID: any = '';
    TicketCount: any;
    status: any = 0;
    period: any = 1;
    TicketsLoadStatus: boolean = false;

  constructor(public router: Router, public ticketService: TicketService, public acc: AccountsService) {
      this.userID = localStorage.getItem('umid');
  }

  ngOnInit() {
      this.Loadsubmenu();
      this.GetAll_Ticket_Status();
      this.Get_All_Submited_Ticket_List();
      $(function () {
      $('#DateFrom').datetimepicker({
        widgetPositioning: {
          horizontal: 'left'
        },
        icons: {
          time: 'fa fa-clock-o',
          date: 'fa fa-calendar',
          up: 'fa fa-arrow-up',
          down: 'fa fa-arrow-down',
          previous: 'fa fa-arrow-left',
          next: 'fa fa-arrow-right'
        },
        format: 'MM/D/Y'
      });
      $('#DateTo').datetimepicker({
          widgetPositioning: {
              horizontal: 'left'
          },
          icons: {
              time: 'fa fa-clock-o',
              date: 'fa fa-calendar',
              up: 'fa fa-arrow-up',
              down: 'fa fa-arrow-down',
              previous: 'fa fa-arrow-left',
              next: 'fa fa-arrow-right'
          },
          format: 'MM/D/Y',
          useCurrent: false
      });
      $('#DateFrom').on('dp.change', function (e) {
          $('#DateTo').data('DateTimePicker').minDate(e.date);
      });
      $('#DateTo').on('dp.change', function (e) {
          $('#DateFrom').data('DateTimePicker').maxDate(e.date);
      });
          /* $('.selectpicker').selectpicker();*/
          /*$('.select2').select2();*/
    });
  }

  ngAfterViewInit(): void {

  }

    Navication(link) {
    this.router.navigate([link]);
  }

    Get_All_Submited_Ticket_List() {
        this.TicketsLoadStatus = true;
        const formData = new FormData();
        formData.append('userID', this.userID);
        formData.append('status', this.status);
        formData.append('period', this.period);
    this.ticketService.Get_All_Submited_Ticket_List(formData).subscribe(
        data => {
            this.TicketsLoadStatus = false;
            this.TicketsArray = data;
            this.TicketCount = data.length;
        }
    );
  }

    SelectedTicket(TicketID) {
    this.ScltTicketID = TicketID;
  }

    GetTicketListByDate() {
    const formData = new FormData();
    formData.append('StartDate', this.DateFrom.nativeElement.value);
    formData.append('EndDate', this.DateTo.nativeElement.value);
    formData.append('userID', this.userID);
    formData.append('status', this.status);
    this.ticketService.Load_Ticket_List_By_Date(formData).subscribe(
        data => {
            this.TicketsArray = data;
            this.TicketCount = data.length;
        }
    );
  }

    Loadsubmenu() {
        this.acc.Loadmenu(5).subscribe(
            data => {
                this.Asssubmenu = data;
            }
        );
    }

  GetTodayTickets() {
      this.period = 2;
      this.Get_All_Submited_Ticket_List();
  }

  GetThisWeekTicket() {
      this.period = 3;
      this.Get_All_Submited_Ticket_List();
  }

  GetThisMonthTicket() {
      this.period = 4;
      this.Get_All_Submited_Ticket_List();
  }

  GetAllTicket() {
      this.period = 1;
      this.Get_All_Submited_Ticket_List();
  }

    getStyle(value) {
        if (value > 30 && value > 0) {
            return 'green';
        } else if (value < 30 && value > 0) {
            return '#FF5733';
        } else {
            return 'red';
        }
    }

    ActiveTicketColor(ticketID) {
        if (ticketID === this.ScltTicketID) {
            return '#EAE8E7';
        }
    }

    ActiveTicketTextColor(ticketID) {
        if (ticketID === this.ScltTicketID) {
            return '#000000';
        }
    }

    getTodayBackground(selected) {
        if (selected === 2) {
            return '#3C3F47';
        }
    }

    getWeekBackground(selected) {
        if (selected === 3) {
            return '#3C3F47';
        }
    }

    getMonthBackground(selected) {
        if (selected === 4) {
            return '#3C3F47';
        }
    }

    getAllBackground(selected) {
        if (selected === 1) {
            return '#3C3F47';
        }
    }

    GetAll_Ticket_Status() {
        this.ticketService.Get_All_Status().subscribe(status => {
            this.TicketStatusArray = status;
        });
    }

    GetTicketsbyStatus(value): void {
        this.status = value;
        this.Get_All_Submited_Ticket_List();
    }
}
