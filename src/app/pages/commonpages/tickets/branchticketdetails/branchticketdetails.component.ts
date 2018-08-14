import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TicketService } from '../service/ticket.service';
declare var $;
declare var swal;


@Component({
  selector: 'app-branchticketdetails',
  templateUrl: './branchticketdetails.component.html',
  styleUrls: ['./branchticketdetails.component.scss']
})
export class BranchticketdetailsComponent implements OnInit, OnChanges {
    @Input() TicketID;
    TicketDetailsArray: any = [];
    Ticket_ID: any = '';
    Account_Name: any = '';
    Account_Street: any = '';
    Account_City: any = '';
    Account_State: any = '';
    Account_Country: any = '';
    Account_Pincode: any = '';
    Asset_Name: any = '';
    Asset_Serial_Number: any = '';
    Model_Name: any = '';
    Status: any = '';
    Ticket_Cteated_Date: any = '';
    Site_Name: any = '';
    Site_Address: any = '';
    Site_City: any = '';
    Site_State: any = '';
    Site_Country: any = '';
    Site_PinCcode: any = '';
    Branch_Name: any = '';
    Branch_Address: any = '';
    Branch_City: any = '';
    Branch_State: any = '';
    Branch_Country: any = '';
    Branch_PinCode: any = '';
    ticketPreviewData: any;
  constructor(private ticketService: TicketService) { }

  ngOnInit() {
  }
    ngOnChanges(changes: SimpleChanges): void {
        this.Load_Ticket_Details(this.TicketID);
    }

    Load_Ticket_Details(tic_id) {
        const formData: FormData = new FormData();
        formData.append('ticketID', tic_id);
        this.ticketService.Get_Ticket_Details(formData).subscribe(
            data => {
                this.TicketDetailsArray = data;
                this.Ticket_ID = data.TM_Internal_Reference_No;
                this.Account_Name = data.AM_Name;
                this.Account_Street = data.AM_Address;
                this.Account_City = data.AM_City;
                this.Account_State = data.AM_State;
                this.Account_Country = data.AM_Country;
                this.Account_City = data.AM_City;
                this.Account_Pincode = data.AM_Zip;
                this.Asset_Name = data.ASM_Asset_Name;
                this.Asset_Serial_Number = data.ASM_Serial_No;
                this.Model_Name = data.MM_Model_Name;
                this.Status = data.TSLM_Status;
                this.Ticket_Cteated_Date = data.TM_TimeStamp;
                this.Site_Name = data.SM_SiteName;
                this.Site_Address = data.SM_Address;
                this.Site_City = data.SM_City;
                this.Site_State = data.SM_State;
                this.Site_Country = data.SM_Country;
                this.Site_PinCcode = data.SM_Zip;
                this.Branch_Name = data.BM_Branch_Name;
                this.Branch_Address = data.BM_Address;
                this.Branch_City = data.BM_City;
                this.Branch_State = data.BM_State;
                this.Branch_Country = data.BM_Country;
                this.Branch_PinCode = data.BM_Zip;
            }
        );
    }

    public Preview_Ticket_Info() {
        $('#Preview').modal();
        this.ticketService.Preview_Ticket(this.TicketID).subscribe(
            data => {
                this.ticketPreviewData = data;
                $(function () {
                    $('#TestTEst').html(data);
                });
            }
        );
    }

    public Dispatch(){
        const that = this;
        $(function () {
            swal({
                    title: 'Are you sure?',
                    text: 'This ticket will go to next level for process!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-success',
                    confirmButtonText: 'Dispatch',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const formData: FormData = new FormData();
                        formData.append('ticketID', that.TicketID);
                        that.ticketService.Dispatch(formData).subscribe(
                            data => {
                                if (data.result === 'success') {
                                    that.Load_Ticket_Details(that.TicketID);
                                    swal({
                                        title: 'Dispatched!',
                                        text: 'Ticket has been dispatched.',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                }
                            }
                        );
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: 'Dispatch process canceled.',
                            type: 'error',
                            confirmButtonClass: 'btn-danger'
                        });
                    }
                });
        });
    }

    public Decline(){
        $(function () {
            swal({
                    title: 'Are you sure?',
                    text: 'This ticket will be declined!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'Decline',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        swal({
                            title: 'Declined!',
                            text: 'Ticket has been declined.',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: 'Decline process canceled.',
                            type: 'error',
                            confirmButtonClass: 'btn-danger'
                        });
                    }
                });
        });
    }

}
