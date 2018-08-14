import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
import {TicketService} from '../service/ticket.service';
import {OverviewComponent} from '../overview/overview.component';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TripoverviewComponent} from '../trip/tripoverview/tripoverview.component';
import {TripService} from '../trip/service/trip/trip.service';
import {Router} from '@angular/router';
import {AsrmService} from '../../account/accservicerequest/services/asrm.service';
import {GlobalVariable} from '../../../../global/global';
import {EditTicketService} from '../service/edit-ticket.service';
import {MenumanagementService} from '../../menumanagement/service/menumanagement.service';
import {Observable} from 'rxjs/Observable';
import {AccountsService} from '../../../../services/accounts/accounts.service';
import {interval} from 'rxjs/observable/interval';

declare const $;
declare const swal;
declare const autosize;
declare const google;
declare const jQuery: any;

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.scss']
})
export class TicketdetailsComponent implements OnInit, OnChanges {
  @Input() TicketID;
  TicketDetailsArray: any = [];
  Ticket_ID: any = '';
  Acc_ID: any = '';
  Account_Name: any = '';
  Account_Street: any = '';
  Account_City: any = '';
  Account_State: any = '';
  Account_Country: any = '';
  Account_Pincode: any = '';
  Asset_ID: any = '';
  Asset_Name: any = '';
  Asset_Serial_Number: any = '';
  Model_Name: any = '';
  Status: any = '';
  StatusCode: any = '';
  Status_Text: any = '';
  Action_Required: any = '';
  Ticket_Cteated_Date: any = '';
  Ticket_Updated_Date: any = '';
  Site_ID: any = '';
  Site_Name: any = '';
  Site_Address: any = '';
  Site_City: any = '';
  Site_State: any = '';
  Site_Country: any = '';
  Site_PinCcode: any = '';
  BranchID: any = '';
  Branch_Name: any = '';
  Branch_Address: any = '';
  Branch_City: any = '';
  Branch_State: any = '';
  Branch_Country: any = '';
  Branch_PinCode: any = '';
  TicketStatusArray: any = '';
  StatusUpdateForm: FormGroup;
  AddNotes: FormGroup;
  ExceptionListLength = '';
  TicketNotesArray: any = [];
  TicketNoteTitle: any = '';
  TicketNoteBtn: any = '';
  TicketNoteID: any = '';
  TicketNote: any = '';
  TicketSubject: any = '';
  TicketType: any = '1';
  AttachedFile: File;
  AccountRefferenceumber: any = '';
  @ViewChild('Attachment') Attachment;
  Date: any = '';
  Time: any = '';
  TripArray: Observable<any[]>;
  TripID: any = '';
  Technician: any = '';
  TechnicianID: any = '';
  Source: any = '';
  Destination: any = '';
  TripCreated: any = '';
  TripCode: any = '';
  SourceLatitude: any;
  SourceLongitude: any;
  DestinationLatitude: any;
  DestinationLongitude: any;
  TripStatusCode: any;
  TripStatus: any = '';
  TripScheduleDate: any = '';
  TripScheduleTime: any = '';
  TripTicketID: any = '';
  TRIP_Resolution: any = '';
  /*Schedule Form*/
  Schedule_Form: FormGroup;
  SheduleModelBoxBtn: any = '';
  SheduleModelBoxTitle: any = '';
  TechniciansArray: any = [];
  Asssubbuttontrips: any;
  addtrips: any;
  edittrips: any;
  deletetrips: any;
    viewbtntrips: any;
  Asssubbuttonnotes: any;
  addnotes: any;
  editnotes: any;
  deletenotes: any;
  viewbtnnotes: any;
  /*Incident Report Form*/
  IR_Form: FormGroup;
  /*Tech Delay Form*/
  WorkStatusFrom: FormGroup;
  TripDetail_Display_Status: boolean = false;
  TicketNotesCount: any = 0;
  Trip_Count: any = 0;
  TripId: any;
  IR_ID: any = '';
  Ticket_Details_Array: any = [];
  Account_Array: any = [];
  Site_Array: any = [];
  Branch_Array: any = [];
  SelectedAccountContactArray: any = [];
  SelectedSiteContactArray: any = [];
  SelectedBranchContactArray: any = [];
  S_Asset: any = [];
  ServiceRequestArray: any = [];
  SR_Details_Array: any = [];
  TripDetailsArray: any = [];
  Assigned_Part_Details_Aarray: any = [];
  SelectedTTD_ID: any = '';
  modelID: any = '';
  Service_Request_Name: any = '';
  AllServiceRequestArray: any = [];
  NewServiceRequestID: any = '';
  userRoleId: any;
  userKeyId: any;
  Ticket_Cteated_by_name: any;
  Ticket_Updated_by_name: any;
  techImage: any;
  techImagechk: any;
  /*Note Type*/
  NoteType: any[];
  userRole: any;
  FileBasePath: any = '';
  TicketDetailsLoading: boolean = false;
  TicketNotesLoading: boolean = false;
  TicketTripsLoading: boolean = false;
  /*Button Status*/
  DispatchButtonStatus: boolean = true;
  ScheduleButtonStatus: boolean = true;
  RescheduleButtonStatus: boolean = true;
  ConfirmArivalButtonStatus: boolean = true;
  WorkCompletedButtonStatus: boolean = true;
  WorkNotCompeletedButtonStatus: boolean = true;
  CreateScheduleButton: boolean = true;
    /*TicketLog*/
    TicketLogsArray: Observable<any[]>;
    /*Ticket Note Accordian*/
    TIC_ACON_Open: boolean = false;
    TIC_HISTORY_ACON_Open = false;
    TripScheduleList: any = [];
    HeroKitPartAvailable: boolean = false;
    NonHeroKitPartAavailable: boolean = false;
    NewPartAvailable: boolean = false;
    buttonSubmit: boolean = false;
    Asssubmenu: any = '';
    private refreshInterval$ = interval(1000);

    constructor(private ticketService: TicketService, private acc: AccountsService, private ticketOverview: OverviewComponent, private fb: FormBuilder, private trip: TripoverviewComponent, private tripService: TripService, private router: Router, private aSRM_Service: AsrmService, public edtTicket: EditTicketService, public menu: MenumanagementService) {
        this.userRoleId = localStorage.getItem('ucmid');
        this.userRole = localStorage.getItem('urmid');
        this.userKeyId = localStorage.getItem('umid');
        this.Loadnotesbuttons();
        this.Loadtripsbuttons();
        this.Loadsubmenu();
        if (this.userRole === '1') {
            this.NoteType = [{value: 1, title: 'Public'}, {value: 2, title: 'Private'}];
        } else {
            this.NoteType = [{value: 1, title: 'Public'}];
        }

        this.StatusUpdateForm = this.fb.group({
            'StatusCode': ['', Validators.required]
        });
        this.AddNotes = this.fb.group({
            'NoteType': [this.NoteType[0].value, Validators.required],
            'Subject': ['', Validators.required],
            'Notes': ['', Validators.required],
            'Attachment': [null]
        });
        this.Schedule_Form = this.fb.group({
            'Technician': ['', Validators.required],
            'Schedule_Date': ['', Validators.required],
            'Schedule_Time': ['', Validators.required],
            'Schedule_With': ['', Validators.required]
        });

        this.IR_Form = this.fb.group({
            'Ticket_SR_Status': ['', Validators.required],
            'Ticket_Status': ['', Validators.required],
            'Ticket_Reason': ['', Validators.required],
            'Sign': ['', Validators.required]
        });
        this.WorkStatusFrom = this.fb.group({
            'WorkStatusCode': ['', Validators.required]
        });
  }

    ngOnInit() {
        $(function () {
            $('.dropify').dropify();
            $('[data-toggle=tooltip]').tooltip();
            $('.datepicker-only-init').datetimepicker({
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
                format: 'LL'
            });
            $('.timepicker-init').datetimepicker({
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
                format: 'LT'
            });
        });
        this.FileBasePath = GlobalVariable.BASE_FILE_API;
  }

    ngOnChanges(changes: SimpleChanges): void {
    this.refreshInterval$.subscribe(() => {
        this.Load_Ticket_Details(this.TicketID);
        this.LoadTripList(this.TicketID);
        this.LoadTicketLog(this.TicketID);
    });

    this.DispatchButtonStatus = true;
    this.ScheduleButtonStatus = true;
    this.RescheduleButtonStatus = true;
    this.ConfirmArivalButtonStatus = true;
    this.WorkCompletedButtonStatus = true;
    this.WorkNotCompeletedButtonStatus = true;
    this.CreateScheduleButton = true;
        this.TIC_ACON_Open = false;
        this.TIC_HISTORY_ACON_Open = false;
        this.HeroKitPartAvailable = false;
        this.NonHeroKitPartAavailable = false;
        this.NewPartAvailable = false;
  }

    Load_Ticket_Details(tic_id) {
        this.TicketDetailsLoading = true;
    const formData: FormData = new FormData();
    formData.append('ticketID', tic_id);
    this.ticketService.Get_Ticket_Details(formData).subscribe(
        data => {
            this.TicketDetailsLoading = false;
            this.TicketDetailsArray = data;
            this.Ticket_ID = data.NewTicketID;
            this.Acc_ID = data.AM_KeyID;
            this.Account_Name = data.AM_Name;
            this.Account_Street = data.AM_Address;
            this.Account_City = data.AM_City;
            this.Account_State = data.AM_State;
            this.Account_Country = data.AM_Country;
            this.Account_City = data.AM_City;
            this.Account_Pincode = data.AM_Zip;
            this.Asset_ID = data.ASM_KeyID;
            this.Asset_Name = data.ASM_Asset_Name;
            this.Asset_Serial_Number = data.ASM_Serial_No;
            this.Model_Name = data.MM_Model_Name;
            this.modelID = data.MM_KeyID;
            this.Status = data.TM_Status_Text;
            this.Status_Text = data.TM_Status_Text;
            this.StatusCode = data.TM_Ticket_Status;
            this.Action_Required = data.TSM_Action_Required;
            this.Ticket_Cteated_Date = data.TM_TimeStamp;
            this.Ticket_Updated_Date = data.TM_ModTimeStamp;
            this.Ticket_Cteated_by_name = data.cteateUser;
            this.Ticket_Updated_by_name = data.updateUser;
            this.Site_ID = data.SM_KeyID;
            this.Site_Name = data.SM_SiteName;
            this.Site_Address = data.SM_Address;
            this.Site_City = data.SM_City;
            this.Site_State = data.SM_State;
            this.Site_Country = data.SM_Country;
            this.Site_PinCcode = data.SM_Zip;
            this.BranchID = data.BM_KeyID;
            this.Branch_Name = data.BM_Branch_Name;
            this.Branch_Address = data.BM_Address;
            this.Branch_City = data.BM_City;
            this.Branch_State = data.BM_State;
            this.Branch_Country = data.BM_Country;
            this.Branch_PinCode = data.BM_Zip;
            this.AccountRefferenceumber = data.TM_Account_Ref_Number;
        }
    );

    this.Get_All_Ticket_Notes(this.TicketID);
  }

    public Preview_Ticket_Info(tripID) {
        this.HeroKitPartAvailable = false;
        this.NonHeroKitPartAavailable = false;
        this.NewPartAvailable = false;
        $('#Preview').modal();
        const formData = new FormData();
        formData.append('tripID', tripID);
        formData.append('ticketID', this.TicketID);
        this.ticketService.Preview_Ticket_Trip(formData).subscribe(
            data => {
                this.Ticket_Details_Array = data;
                this.TripDetailsArray = this.Ticket_Details_Array['Trip_Details'];
                this.Account_Array = this.Ticket_Details_Array['Account_details'];
                this.Site_Array = this.Ticket_Details_Array['Site_details'];
                this.Branch_Array = this.Ticket_Details_Array['Branch_details'];
                this.SelectedAccountContactArray = this.Ticket_Details_Array['Account_contacts'];
                this.SelectedSiteContactArray = this.Ticket_Details_Array['Site_contacts'];
                this.SelectedBranchContactArray = this.Ticket_Details_Array['Branch_contacts'];
                this.S_Asset = this.Ticket_Details_Array['Asset_details'];
                this.ServiceRequestArray = this.Ticket_Details_Array['Service_Request_Details'];
                this.SR_Details_Array = this.Ticket_Details_Array['Known_Issue']['Known_Issue'];
                this.Assigned_Part_Details_Aarray = this.Ticket_Details_Array['Assigned_Part_Details'];
                this.Assigned_Part_Details_Aarray.forEach(part => {
                    if (part.HeroKit === 'Y') {
                        this.HeroKitPartAvailable = true;
                    }
                    if (part.HeroKit === 'N') {
                        this.NonHeroKitPartAavailable = true;
                    }
                    if (part.HeroKit === 'NIL') {
                        this.NewPartAvailable = true;
                    }
                });
            }
        );
    }

    GetContactColClass(role) {
        if (role === '1') {
            return 'col-lg-4';
        } else if (role === '2') {
            return 'col-lg-6';
        } else if (role === '3') {
            return 'col-lg-12';
        } else if (role === '4') {
            return 'col-lg-12';
        } else if (role === '7') {
            return 'col-lg-12';
        }
  }

    public Dispatch(ttdID, tripID) {
        this.DispatchButtonStatus = false;
        const that = this;
        $(() => {
            swal({
                    title: 'Are you sure?',
                    text: 'This ticket will go to next level for process!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-success',
                    confirmButtonText: 'Dispatch',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: true,
                    closeOnCancel: true
                },
                (isConfirm) => {
                    if (isConfirm) {
                        const formData: FormData = new FormData();
                        formData.append('ticketID', that.TicketID);
                        formData.append('tripID', tripID);
                        formData.append('ttdID', ttdID);
                        formData.append('userKeyId', that.userKeyId);
                        that.ticketService.Dispatch(formData).subscribe(
                            data => {
                                if (data.result === 'success') {
                                    that.DispatchButtonStatus = true;
                                    that.Load_Ticket_Details(that.TicketID);
                                    that.ticketOverview.Get_All_Submited_Ticket_List();
                                    that.LoadTripList(that.TicketID);
                                    that.LoadTicketLog(that.TicketID);
                                    that.Alert_Swal('Dispatched!', 'Ticket has been dispatched.', 'success', 'btn-success');
                                    that.ticketService.Dispatch_Mail(formData).subscribe();
                                }
                            }
                        );
                    } else {
                        that.DispatchButtonStatus = true;
                        that.Alert_Swal('Cancelled', 'Dispatch process canceled.', 'error', 'btn-danger');
                    }
                });
        });
  }

    public Decline() {
        const that = this;
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
                function (isConfirm) {
                    if (isConfirm) {
                        that.Alert_Swal('Declined!', 'Ticket has been declined.', 'success', 'btn-success');
                    } else {
                        that.Alert_Swal('Cancelled', 'Decline process canceled.', 'error', 'btn-danger');
                    }
                });
        });
    }

    public UpdateTicketStatusModal(TTD_ID) {
        this.SelectedTTD_ID = TTD_ID;
        this.LoadAllTicketStatus(this.TicketID);
        $(function () {
            $('#Status_Update').modal();
        });
    }

    public LoadAllTicketStatus(TicketID) {
        const formData = new FormData();
        formData.append('ticketID', TicketID);
        this.ticketService.GetTicketStatusList(formData).subscribe(
            data => {
                this.TicketStatusArray = data;
                this.ExceptionListLength = this.TicketStatusArray.length;
            }
        );

    }

    Status_Submit(value) {
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('statusCode', value.StatusCode);
        formData.append('TTD_ID', this.SelectedTTD_ID);
        formData.append('userKeyId', this.userKeyId);
        formData.append('tripID', this.TripID);

        this.ticketService.UpdateExceptionStatus(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    $('#Status_Update').modal('hide');
                    this.Load_Ticket_Details(this.TicketID);
                    this.LoadTripList(this.TicketID);
                    this.ticketOverview.Get_All_Submited_Ticket_List();
                    this.Alert_Swal('Updated!', 'Ticket status has been updated.', 'success', 'btn-success');
                }
            }
        );
    }

    CreateTicketNoteModal() {
        this.AddNotes.reset();
        this.TicketNoteTitle = 'Create Note';
        this.TicketNoteBtn = 'Submit';
        this.techImagechk = '';
        this.buttonSubmit = false;
        $(() => {
            const ta = document.querySelector('textarea');
            // assign autosize to ta
            autosize(ta);
            // remove autosize from ta
            const evt = document.createEvent('Event');
            evt.initEvent('autosize:destroy', true, false);
            ta.dispatchEvent(evt);
            autosize($('#ticket_note_text'));
            $('#Ticket_Note').modal();
            $('.dropify-clear').click();
        });
    }

    UpdateTicketNoteModal(TN_ID) {
        this.buttonSubmit = false;
        $(function () {
            $('.dropify-clear').click();
        });
        this.TicketNoteTitle = 'Update Note';
        this.TicketNoteBtn = 'Update';
        const formData: FormData = new FormData();
        formData.append('noteID', TN_ID);
        this.ticketService.Get_Ticket_Note_Details(formData).subscribe(
            data => {
                this.TicketNoteID = data.TN_KeyID;
                this.TicketNote = data.TN_Notes;
                this.TicketSubject = data.TN_Subject;
                this.TicketType = data.TN_Notes_User_Role;
                this.techImage = GlobalVariable.BASE_FILE_API + 'uploads/ticket_notes/' + data.TN_TM_KeyID + '/' + data.TN_Attachment;
                this.techImagechk = data.TN_Attachment;

                this.AddNotes = this.fb.group({
                    'NoteType': [this.TicketType, Validators.required],
                    'Subject': [this.TicketSubject, Validators.required],
                    'Notes': [this.TicketNote, Validators.required],
                    'Attachment': [null]
                });
                $(function () {
                    $('#View_Notes').modal('hide');
                    $('#Ticket_Note').modal();
                    autosize($('#ticket_note_text'));
                });
            }
        );
    }

    SaveTicketNotes(value) {
        this.buttonSubmit = true;
        if (this.TicketNoteBtn === 'Submit') {
            const FileData = this.Attachment.nativeElement;
            if (FileData.files && FileData.files[0]) {
                this.AttachedFile = FileData.files[0];
            }
            const AttachmentFile: File = this.AttachedFile;
            const formData: FormData = new FormData();
            formData.append('notes', value.Notes);
            formData.append('ticketID', this.TicketID);
            formData.append('subject', value.Subject);
            formData.append('type', value.NoteType);
            formData.append('userRoleId', this.userRoleId);
            formData.append('userKeyId', this.userKeyId);
            if (value.Attachment !== null) {
                formData.append('ticket_Note_File', AttachmentFile, AttachmentFile.name);
            }
            this.ticketService.Create_Ticket_Notes(formData).subscribe(
                data => {
                    if (data.result === 'success') {
                        this.Get_All_Ticket_Notes(this.TicketID);
                        this.ticketOverview.Get_All_Submited_Ticket_List();
                        $('#Ticket_Note').modal('hide');
                        this.Preview_Note_Modal();
                        this.Alert_Swal('Note Created!', 'Ticket note has been created.', 'success', 'btn-success');
                    }
                }
            );
        } else if (this.TicketNoteBtn === 'Update') {
            if (value.Attachment === null) {
                const formData: FormData = new FormData();
                formData.append('noteID', this.TicketNoteID);
                formData.append('notes', value.Notes);
                formData.append('ticketID', this.TicketID);
                formData.append('subject', value.Subject);
                formData.append('type', value.NoteType);
                formData.append('userRoleId', this.userRoleId);
                formData.append('userKeyId', this.userKeyId);
                this.ticketService.Update_Ticket_Note(formData).subscribe(
                    data => {
                        $('#Ticket_Note').modal('hide');
                        this.Get_All_Ticket_Notes(this.TicketID);
                        this.ticketOverview.Get_All_Submited_Ticket_List();
                        if (data.result === 'success') {
                            this.Alert_Swal('Note Updated!', 'Ticket note has been updated.', 'success', 'btn-success');
                        }
                    }
                );
            } else {
                const FileData = this.Attachment.nativeElement;
                if (FileData.files && FileData.files[0]) {
                    this.AttachedFile = FileData.files[0];
                }
                const AttachmentFile: File = this.AttachedFile;
                const formData: FormData = new FormData();
                formData.append('noteID', this.TicketNoteID);
                formData.append('notes', value.Notes);
                formData.append('ticketID', this.TicketID);
                formData.append('subject', value.Subject);
                formData.append('type', value.NoteType);
                formData.append('userRoleId', this.userRoleId);
                formData.append('userKeyId', this.userKeyId);
                formData.append('ticket_Note_File', AttachmentFile, AttachmentFile.name);
                this.ticketService.Update_Ticket_Note(formData).subscribe(
                    data => {
                        $('#Ticket_Note').modal('hide');
                        this.Get_All_Ticket_Notes(this.TicketID);
                        if (data.result === 'success') {
                            this.Alert_Swal('Note Updated!', 'Ticket note has been updated.', 'success', 'btn-success');
                        }
                    }
                );
            }
        }
    }

    Preview_Note_Modal() {
        $(function () {
            $('#View_Notes').modal();
        });
    }

    Get_All_Ticket_Notes(TicketID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TicketID);
        formData.append('userRole', this.userRole);
        this.ticketService.Get_Ticket_Notes(formData).subscribe(
            data => {
                this.TicketNotesArray = data;
                this.TicketNotesCount = this.TicketNotesArray.length;
            }
        );
    }

    Delete_Ticket_Note(TN_ID, TicketID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This ticket note will not be able to recover in future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                const formData = new FormData();
                formData.append('noteID', TN_ID);
                formData.append('ticketID', that.TicketID);
                formData.append('userID', that.userKeyId);
                that.ticketService.Delete_Ticket_Note(formData).subscribe(
                    data => {
                        if (data.result === 'success') {
                            that.Get_All_Ticket_Notes(TicketID);
                            that.ticketOverview.Get_All_Submited_Ticket_List();
                            that.Alert_Swal('Note Deleted!', 'Ticket note has been deleted.', 'success', 'btn-success');
                        }
                    }
                );
            });
    }

    ShowAccountModal() {
        $(function () {
            $('#AccountModal').modal();
        });
    }

    ShowSiteModal() {
        $(function () {
            $('#SiteModal').modal();
        });
    }

    ShowBranchModal() {
        $(function () {
            $('#BranchModal').modal();
        });
    }

    ShowAssetModal() {
        $(function () {
            $('#AssetModal').modal();
        });
    }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('print-section').innerHTML;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin.document.open();
        popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <link rel="stylesheet" href="https://rcc.mcmservice.com/assets/modules/core/common/core.cleanui.css">
          <link rel="stylesheet" href="https://rcc.mcmservice.com/assets/modules/themes/common/themes.cleanui.css">
          <link rel="stylesheet" href="https://rcc.mcmservice.com/assets/modules/vendors/bootstrap/bootstrap.css">
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
        );
        popupWin.document.close();
    }

    Navigation(link) {
        this.router.navigate([link]);
    }

    LoadTripList(TicketID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', TicketID);
        this.tripService.Get_All_Trip(formData).subscribe(
            data => {
                this.TripArray = data;
                this.Service_Request_Name = this.TripArray[0].TSRM_Name;
                this.TripArray.subscribe(result => {
                    this.Trip_Count = result.length;
                });
                this.TripDetail_Display_Status = false;
                this.TripId = this.TripArray[this.Trip_Count - 1].TRIP_KeyID;
            }
        );
    }

    CreateTrip() {
        const that = this;
        swal({
                title: 'Do you want to create a new trip?',
                text: 'You may change ticket informations on new trip.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-danger',
                cancelButtonText: 'No',
                confirmButtonClass: 'btn-success',
                confirmButtonText: 'Yes',
                closeOnConfirm: true
            },
            function (isConfirm) {
                if (isConfirm) {
                    const formData = new FormData();
                    formData.append('ticketID', that.Ticket_ID);
                    formData.append('userKeyId', that.userKeyId);
                    that.edtTicket.createNewTrip(formData).subscribe(result => {
                        if (result.result === 'success') {
                            that.Navigation('tickets/edit/' + that.TicketID + '/' + result.tripID);
                            that.edtTicket.createNewTrip_Mail(formData).subscribe();
                        }
                    });
                } else {
                }
            });
    }

    Edit_Trip_IR(IR_ID) {
        const that = this;
        $(() => {
            $('#IR_List').modal('hide');
            that.Navigation('tickets/edit_ir/' + IR_ID);
        });
    }

    Edit_Ticket(tripID) {
        this.Navigation('tickets/edit_ticket/' + this.TicketID + '/' + tripID + '/' + 'EDIT');
    }

    Trip_Details(TripCode) {
        this.TripDetail_Display_Status = true;
        this.TripID = TripCode;
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Get_Trip_Details(formData).subscribe(
            data => {
                $(function () {
                    $('#Trip_Details').modal();
                });
                this.TripTicketID = data.TRIP_TM_KeyID;
                this.TripCode = data.Trip_New_Code;
                this.Technician = data.Tech_Name;
                this.Source = data.TRIP_Source;
                this.Destination = data.TRIP_Destination;
                this.TripCreated = data.TRIP_TimeStamp;
                this.SourceLatitude = data.TRIP_Source_Latitude;
                this.SourceLongitude = data.TRIP_Source_Longitude;
                this.DestinationLatitude = data.TRIP_Destination_Latitude;
                this.DestinationLongitude = data.TRIP_Destination_Longitude;
                this.TripStatusCode = data.TRIP_Status;
                this.TripStatus = data.TSM_Status;
                this.TripScheduleDate = data.TRIP_Shedule_Date;
                this.TripScheduleTime = data.TRIP_Scheduled_Time;
                this.TechnicianID = data.Tech_ID;
                this.TRIP_Resolution = data.TRIP_Resolution;
            }
        );
    }

    SaveSchedule(value) {
        this.ScheduleButtonStatus = false;
        this.CreateScheduleButton = false;
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        formData.append('ticketID', this.TicketID);
        formData.append('ttdID', this.SelectedTTD_ID);
        formData.append('techID', value.Technician);
        formData.append('date', value.Schedule_Date);
        formData.append('time', value.Schedule_Time);
        formData.append('scheduleWith', value.Schedule_With);
        formData.append('userKeyId', this.userKeyId);
        $(function () {
            $('#ScheduleModalBox').modal('hide');
        });
        if (this.SheduleModelBoxBtn === 'Create') {
            this.tripService.Create_Schedule(formData).subscribe(
                data => {
                    if (data.result === 'success') {
                        this.ScheduleButtonStatus = true;
                        this.CreateScheduleButton = true;
                        this.LoadTripList(this.TicketID);
                        this.Load_Ticket_Details(this.TicketID);
                        this.LoadTicketLog(this.TicketID);
                        this.ticketOverview.Get_All_Submited_Ticket_List();
                        this.Schedule_Form.reset();
                        this.Alert_Swal('Trip Scheduled!', 'Trip has been scheduled.', 'success', 'btn-success');
                        this.tripService.Create_Schedule_Mail(formData).subscribe();
                    }
                }
            );
        } else if (this.SheduleModelBoxBtn === 'Re-Schedule') {
            this.tripService.Create_Re_Schedule(formData).subscribe(
                data => {
                    if (data.result === 'success') {
                        this.ScheduleButtonStatus = true;
                        this.CreateScheduleButton = true;
                        this.LoadTripList(this.TicketID);
                        this.LoadTicketLog(this.TicketID);
                        this.Load_Ticket_Details(this.TicketID);
                        this.ticketOverview.Get_All_Submited_Ticket_List();
                        this.Schedule_Form.reset();
                        this.Alert_Swal('Trip Re-scheduled!', 'Trip has been re-scheduled.', 'success', 'btn-success');
                        this.tripService.Create_Schedule_Mail(formData).subscribe();
                    }
                }
            );
        }
    }

    CreateSchedule(TripID, TTD_ID) {
        this.TripID = TripID;
        this.SelectedTTD_ID = TTD_ID;
        this.SheduleModelBoxBtn = 'Create';
        this.SheduleModelBoxTitle = 'Create Schedule';
        this.LoadTechnicians(this.TicketID);
        $(function () {
            $('#ScheduleModalBox').modal();
        });
    }

    LoadTechnicians(Ticket_ID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        this.tripService.Get_Branch_Technicians(formData).subscribe(
            data => {
                this.TechniciansArray = data;
            }
        );
    }

    ReScheduleTrip(TripID, TTD_ID) {
        this.Schedule_Form.reset();
        this.TripID = TripID;
        this.SelectedTTD_ID = TTD_ID;
        this.SheduleModelBoxBtn = 'Re-Schedule';
        this.SheduleModelBoxTitle = 'Re-Schedule';
        this.LoadTechnicians(this.TicketID);
        $(function () {
            $('#ScheduleModalBox').modal();
        });
    }

    Tech_Delay_Model() {
        $(function () {
            $('#Tech_Delay').modal();
        });
    }

    Tech_Reached(tripID, TTD_ID) {
        this.ConfirmArivalButtonStatus = false;
        this.TripID = tripID;
        this.SelectedTTD_ID = TTD_ID;
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('tripID', this.TripID);
        formData.append('ttdID', this.SelectedTTD_ID);
        formData.append('userKeyId', this.userKeyId);
        this.tripService.Tech_Reached(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.ConfirmArivalButtonStatus = true;
                    this.Load_Ticket_Details(this.TicketID);
                    this.LoadTripList(this.TicketID);
                    this.LoadTicketLog(this.TicketID);
                    this.ticketOverview.Get_All_Submited_Ticket_List();
                    this.Alert_Swal('Status Updated', 'Ticket and Trip status was updated.', 'success', 'btn-success');
                    this.tripService.Tech_Reached_Mail(formData).subscribe();
                }
            }
        );
    }

    WorkCompleted(TripID, TTD_ID) {
        this.WorkCompletedButtonStatus = false;
        this.WorkNotCompeletedButtonStatus = false;
        this.TripID = TripID;
        this.SelectedTTD_ID = TTD_ID;
        const formData = new FormData();
        formData.append('tripID', TripID);
        formData.append('ticketID', this.TicketID);
        formData.append('ttdID', TTD_ID);
        formData.append('userKeyId', this.userKeyId);
        this.tripService.workCompleted(formData).subscribe(
            data => {
                this.Load_Ticket_Details(this.TicketID);
                this.LoadTripList(this.TicketID);
                this.LoadTicketLog(this.TicketID);
                this.WorkCompletedButtonStatus = true;
                this.WorkNotCompeletedButtonStatus = true;
                this.ticketOverview.Get_All_Submited_Ticket_List();
                this.Alert_Swal('Status Updated', 'Ticket and Trip status was updated.', 'success', 'btn-success');
                this.tripService.workCompleted_Mail(formData).subscribe();
            }
        );
    }

    WorkNotCompleted(TripID, TTD_ID) {
        this.WorkNotCompeletedButtonStatus = false;
        this.WorkCompletedButtonStatus = false;
        this.TripID = TripID;
        this.SelectedTTD_ID = TTD_ID;
        const formData = new FormData();
        formData.append('tripID', TripID);
        formData.append('ticketID', this.TicketID);
        formData.append('ttdID', TTD_ID);
        formData.append('userKeyId', this.userKeyId);
        this.tripService.workNotCompleted(formData).subscribe(
            data => {
                this.WorkNotCompeletedButtonStatus = true;
                this.WorkCompletedButtonStatus = true;
                this.Load_Ticket_Details(this.TicketID);
                this.LoadTripList(this.TicketID);
                this.LoadTicketLog(this.TicketID);
                this.ticketOverview.Get_All_Submited_Ticket_List();
                this.Alert_Swal('Status Updated', 'Ticket and Trip status was updated.', 'success', 'btn-success');
                this.tripService.workNotCompleted_Mail(formData).subscribe();
            }
        );
    }

    Update_Work_Status(value) {
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        formData.append('statusCode', value.WorkStatusCode);
        this.tripService.WorkStausUpdate(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.Trip_Details(this.TripID);
                    $('#Work_Status_Modal_Box').modal('hide');
                    this.ticketOverview.Get_All_Submited_Ticket_List();
                    this.LoadTripList(this.TicketID);
                    this.Alert_Swal('Status Updated', 'Ticket and Trip status was updated.', 'success', 'btn-success');
                }
            }
        );
    }

    Save_Incident_Report(value) {
        const formData: FormData = new FormData();
        formData.append('signImage', value.Sign);
        formData.append('tripID', this.TripID);
        formData.append('status', value.Ticket_SR_Status);
        formData.append('reason', value.Ticket_Reason);
        this.tripService.Save_IR_Report(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.Trip_Details(this.TripID);
                    this.LoadTicketLog(this.TicketID);
                    this.ticketOverview.Get_All_Submited_Ticket_List();
                    this.Alert_Swal('Status Updated', 'Ticket and Trip status was updated.', 'success', 'btn-success');
                    this.Send_Incident_Report_Mail();
                    $(function () {
                        $('#IRModalBox').modal('hide');
                    });
                }
            }
        );
    }

    /*Signature Pad*/
    Send_Incident_Report_Mail() {
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Send_IR_Report_mail(formData).subscribe();
    }

    openIRDetails() {
        $(function () {
            $('#IR_List').modal();
        });
    }

    GetIR_ID(tripID) {
        const formData = new FormData();
        formData.append('tripID', tripID);
        formData.append('ticketID', this.TicketID);
        this.tripService.Get_IR_KeyID(formData).subscribe(
            data => {
                this.IR_ID = data.IRM_KeyID;
                $(function () {
                    $('#IR_List').modal();
                });
            }
        );
    }

    ShowServiceRequestModel() {
        this.LoadServiceRequest(this.Acc_ID, this.modelID);
        $(function () {
            $('#Service_Request_Modal').modal();
        });
    }

    public LoadServiceRequest(Acc_ID, Model_ID) {
        $(function () {
            $('#Service_Request_Table').dataTable().fnDestroy();
        });
        this.aSRM_Service.LoadASR(Acc_ID, Model_ID).subscribe(
            data => {
                this.AllServiceRequestArray = data;
                setTimeout(function () {
                    $('#Service_Request_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

    AssignServiceRequest(A_S_R) {
        const formData: FormData = new FormData();
        formData.append('asrmID', A_S_R.ASRM_KeyID);
        formData.append('ticketID', this.TicketID);
        this.ticketService.Assign_Service_Request(formData).subscribe(
            data => {
                this.NewServiceRequestID = data.TSRD_ID;
                this.tripService.CreateTrip(formData).subscribe(
                    newdata => {
                        let response: any;
                        response = newdata;
                        if (response.result === 'success') {
                            $('#Service_Request_Modal').modal('hide');
                            this.Open_SR_Details_Modal();
                            this.LoadTripList(this.TicketID);
                            this.Load_Ticket_Details(this.TicketID);
                        }
                    }
                );
            }
        );
    }

    public DeleteTrip(tripID) {
        const that = this;
        const formData = new FormData();
        formData.append('tripID', tripID);
        formData.append('ticketID', that.TicketID);
        formData.append('userID', that.userKeyId);
        $(function () {
            swal({
                    title: 'Do you want to delete this trip?',
                    text: 'This trip will be deleted!',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function () {
                    that.ticketService.Delete_Trip(formData).subscribe(
                        data => {
                            if (data.result === 'success') {
                                that.LoadTripList(that.TicketID);
                                that.ticketOverview.Get_All_Submited_Ticket_List();
                                that.LoadTicketLog(that.TicketID);
                                that.Alert_Swal('Deleted!', 'Trip has been deleted', 'success', 'btn-success');
                            }
                        }
                    );
                });
        });
    }

    Open_SR_Details_Modal() {
        $(function () {
            $('#Service_Request_Details_Modal').modal();
        });
    }

    Close_SR_Details_Model() {
        $(function () {
            $('#Service_Request_Details_Modal').modal('hide');
        });
        this.Alert_Swal('Trip created.', 'Your Service Request Change will be reflected in new trip.', 'success', 'btn-success');
    }

    Loadtripsbuttons() {
        this.menu.Loadbutton(5, 741, this.userRoleId).subscribe(
            data => {
                this.Asssubbuttontrips = data;
                this.addtrips = this.Asssubbuttontrips[0].MA_Add;
                this.edittrips = this.Asssubbuttontrips[0].MA_Edit;
                this.deletetrips = this.Asssubbuttontrips[0].MA_Delete;
                this.viewbtntrips = this.Asssubbuttontrips[0].MA_View;
            },
        );
    }

    Loadnotesbuttons() {
        this.menu.Loadbutton(5, 740, this.userRoleId).subscribe(
            data => {
                this.Asssubbuttonnotes = data;
                this.addnotes = this.Asssubbuttonnotes[0].MA_Add;
                this.editnotes = this.Asssubbuttonnotes[0].MA_Edit;
                this.deletenotes = this.Asssubbuttonnotes[0].MA_Delete;
                this.viewbtnnotes = this.Asssubbuttonnotes[0].MA_View;
            },
        );
    }

    LoadTicketLog(TICKET_ID) {
        const formData = new FormData();
        formData.append('ticketID', TICKET_ID);
        this.ticketService.LoadTicketLogs(formData).subscribe(logs => {
            this.TicketLogsArray = logs;
        }, (err) => {
        }, () => {
        });
    }

    CollapseNotes() {
        if (this.TIC_ACON_Open === false) {
            this.TIC_ACON_Open = true;
        } else if (this.TIC_ACON_Open === true) {
            this.TIC_ACON_Open = false;
        }
    }

    CollapseHistory() {
        if (this.TIC_HISTORY_ACON_Open === false) {
            this.TIC_HISTORY_ACON_Open = true;
        } else if (this.TIC_HISTORY_ACON_Open === true) {
            this.TIC_HISTORY_ACON_Open = false;
        }
    }

    Alert_Swal(title, text, type, btnClass) {
        $(() => {
            swal({
                title: title,
                text: text,
                type: type,
                confirmButtonClass: btnClass,
                timer: 3000,
            });
        });
    }

    getStyle(ACTIVE) {
        console.log('status' + ACTIVE);
        if (ACTIVE === 'Y') {
            return 'backround-color: ##1A5276; color: #ffffff';
        } else {
            return '';
        }

    }
    Loadsubmenu() {
        this.acc.Loadmenu(5).subscribe(
            data => {
                this.Asssubmenu = data;
                let i:any='';

                for(i=0;i<=this.Asssubmenu.length;i++) {
                    if (this.Asssubmenu[i].SUB_Name == 'Overview') {

                        $(function () {
                            $("#overviewshow").show();
                        })

                    }
                    if (this.Asssubmenu[i].SUB_Name == 'Trips') {

                        $(function () {
                            $("#tripshow").show();
                        })

                    }
                    if (this.Asssubmenu[i].SUB_Name == 'Notes') {
                        $(function () {
                            $("#noteshow").show();
                        })

                    }

                }




            }
        );

    }

}
