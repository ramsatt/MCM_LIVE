import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SignatureFieldComponent} from '../trip/signature-field/signature-field.component';
import {IncidentreportService} from '../service/incidentreport.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {GlobalVariable} from '../../../../global/global';
import {DatacoversionService} from '../../../../global/datacoversion.service';
import {DOCUMENT} from "@angular/common";

declare const $;
declare const swal;

@Component({
  selector: 'app-editir',
  templateUrl: './editir.component.html',
  styleUrls: ['./editir.component.css']
})
export class EditirComponent implements OnInit {
    IR_ID: any;
    IR_Form: FormGroup;
    TicketDetails: any = [];
    TicketsPartArray: any = [];
    TicktCheckListArray: any = [];
    TimeDifference: boolean = false;
    ArrivedTime: any = '';
    TicketID: any = '';
    TripID: any = '';
    rowData: any;
    /*Signature Pad*/
    @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
    @ViewChildren('sigContainer') public sigContainer: QueryList<ElementRef>;
    @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;
    secondSig: SignatureFieldComponent;
    /*IR DATA*/
    ServiceRequestName: any = '';
    ManufacturerName: any = '';
    SiteName: any = '';
    BranchName: any = '';
    ModelName: any = '';
    AssetName: any = '';
    WorkOrderNumber: any = '';
    AdditionalInformation: any = '';
    JobStatus: any;
    OnSiteDate: any;
    AccountRefNumber: any = '';

    /*Technician Details*/
    TechnicianFirstName: any = '';
    TechnicianLastName: any = '';
    TechnicianEmail: any = '';
    TechnicianBranch: any = '';
    TechnicianArrivedTime: any;
    TechnicianDepartTime: any;
    TechSign: any = '';

    /*Customer Details*/
    CustomerFirstName: any = '';
    CustomerLastName: any = '';
    CustomerEmail: any = '';
    CustomerMobile: any = '';
    CusSignedDate: any;
    CusSignedTime: any;
    cusSign: any = '';
    captcha: any;
    irSubmit: any = false;
    IR_Errors: any = [];
    /*Attachment*/
    Attchment_File_One: File;
    @ViewChild('AttchmentOne') Attchment_One;
    Attchment_File_Two: File;
    @ViewChild('AttchmentTwo') Attchment_Two;
    Attchment_File_Three: File;
    @ViewChild('AttchmentThree') Attchment_Three;
    Attchment_File_Four: File;
    @ViewChild('AttchmentFour') Attchment_Four;
    Attchment_File_Five: File;
    @ViewChild('AttchmentFive') Attchment_Five;
    Attchment_File_Six: File;
    @ViewChild('AttchmentSix') Attchment_Six;
    FileOne: any;
    FileTwo: any;
    FileThree: any;
    FileFour: any;
    FileFive: any;
    FileSix: any;
    /*AttachmentExt*/
    ExtAttachment1: any = '';
    ExtAttachment2: any = '';
    ExtAttachment3: any = '';
    ExtAttachment4: any = '';
    ExtAttachment5: any = '';
    ExtAttachment6: any = '';
    /*SignData*/
    TechnicianSign: any;
    CustomerSign: any;
    TripNumber: any = '';

    /*CheckList*/
    SelectedCheckListArray: any = [];
    TechnicianDDetails: any = [];
    IRDetailsArray: any = [];
    TicketDetailsArray: any = [];
    TicketStatus: any = '';
    FileBaseUrl: any = '';
    userID: any = '';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    ResubmitStatus: any = '';
    userRole: any = '';
    HeroKitPartAvailable: boolean = false;
    NonHeroKitPartAavailable: boolean = false;
    NewPartAvailable: boolean = false;
    UsedQtyAvailable: boolean = true;

    constructor(
        private irService: IncidentreportService,
        private router: Router,
        private actRoute: ActivatedRoute,
        private fb: FormBuilder,
        private dataConversion: DatacoversionService,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.document.body.scrollTop = 0;
        this.TicketID = this.actRoute.snapshot.params['ticketID'];
        this.TripID = this.actRoute.snapshot.params['tripID'];
        if (this.actRoute.snapshot.params['resubmit']) {
            this.ResubmitStatus = this.actRoute.snapshot.params['resubmit'];
        } else {
            this.ResubmitStatus = 'NO';
        }
        this.userID = localStorage.getItem('umid');
        this.userRole = localStorage.getItem('urmid');
        this.TripNumber = this.dataConversion.padLeft(this.TripID, '0', 5);
  }

  ngOnInit() {
      this.FileBaseUrl = GlobalVariable.BASE_FILE_API;
      $(() => {
          const drEvent = $('.dropify').dropify();
          // called when you click on the "remove" button
          drEvent.on('dropify.beforeClear', function (event, element) {
              // do something
          });
          // called after the Dropify is clear
          drEvent.on('dropify.afterClear', function (event, element) {
              // do something
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
              format: 'LL',
              maxDate: 'now'
          });
      });
      const URL = GlobalVariable.BASE_API_URL + 'incident_report/load_ir_details_for_edit';
      const irData = new FormData();
      irData.append('ticketID', this.TicketID);
      irData.append('tripID', this.TripID);
      this.irService.Post(URL, irData).subscribe(irDetails => {
          this.IRDetailsArray = irDetails['irDetails'];
          this.TicketsPartArray = irDetails['irPartDetails'];
          this.TicketsPartArray.forEach(part => {
              if (part.TRPD_Hero_Kit_Status === 'Y') {
                  this.HeroKitPartAvailable = true;
              }
              if (part.TRPD_Hero_Kit_Status === 'N') {
                  this.NonHeroKitPartAavailable = true;
              }
              if (part.TRPD_Hero_Kit_Status === 'NIL') {
                  this.NewPartAvailable = true;
              }
          });
          this.TicktCheckListArray = irDetails['irCheckListDetails'];
          this.TicketDetailsArray = irDetails['tripDetails'];
          this.IR_ID = this.IRDetailsArray.IRM_KeyID;
          this.TicketID = this.IRDetailsArray.IRM_TM_KeyID;
          this.TripID = this.IRDetailsArray.IRM_TRIP_KeyID;
          this.TicketStatus = this.TicketDetailsArray.TRIP_Status;
          this.ServiceRequestName = this.IRDetailsArray.IRM_Service_Request;
          this.AccountRefNumber = this.IRDetailsArray.IM_ACC_Ref_Number;
          this.ManufacturerName = this.IRDetailsArray.IRM_Account_Name;
          this.SiteName = this.IRDetailsArray.IRM_Site_Name;
          this.BranchName = this.IRDetailsArray.IRM_Branch_Name;
          this.ModelName = this.IRDetailsArray.IRM_Model_Name;
          this.AssetName = this.IRDetailsArray.IRM_Asset_Name;
          this.WorkOrderNumber = this.IRDetailsArray.IRM_Work_Order_No;
          this.TechnicianFirstName = this.IRDetailsArray.IRM_Technician_First_Name;
          this.TechnicianLastName = this.IRDetailsArray.IRM_Technician_Last_Name;
          this.TechnicianEmail = this.IRDetailsArray.IRM_Technician_Email;
          this.TechnicianBranch = this.IRDetailsArray.IRM_Technician_Branch;
          this.TechnicianArrivedTime = this.IRDetailsArray.IRM_Technician_Arrived_Time;
          this.TechnicianDepartTime = this.IRDetailsArray.IRM_Technician_Departed_Time;
          this.TechSign = this.IRDetailsArray.IRM_Technician_Signature;
          this.JobStatus = this.IRDetailsArray.IRM_Job_Status;
          this.AdditionalInformation = this.IRDetailsArray.IRM_Aditional_Info;
          this.CustomerFirstName = this.IRDetailsArray.IRM_Customer_First_Name;
          this.CustomerLastName = this.IRDetailsArray.IRM_Customer_Last_Name;
          this.OnSiteDate = this.IRDetailsArray.IRM_OnSite_Date;
          this.CustomerEmail = this.IRDetailsArray.IRM_Customer_Email;
          this.CustomerMobile = this.IRDetailsArray.IRM_Customer_Mobile;
          this.CusSignedDate = this.IRDetailsArray.IRM_Customer_Signed_Date;
          this.CusSignedTime = this.IRDetailsArray.IRM_Customer_Signed_Time;
          this.cusSign = this.IRDetailsArray.IRM_Customer_Signature;
          this.ExtAttachment1 = this.IRDetailsArray.IRM_Attachment_One;
          this.ExtAttachment2 = this.IRDetailsArray.IRM_Attachment_Two;
          this.ExtAttachment3 = this.IRDetailsArray.IRM_Attachment_Three;
          this.ExtAttachment4 = this.IRDetailsArray.IRM_Attachment_Four;
          this.ExtAttachment5 = this.IRDetailsArray.IRM_Attachment_Five;
          this.ExtAttachment6 = this.IRDetailsArray.IRM_Attachment_Six;
          if (this.IRDetailsArray.IRM_Attachment_One !== '') {
              this.FileOne = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_One;
          }
          if (this.IRDetailsArray.IRM_Attachment_Two !== '') {
              this.FileTwo = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_Two;
          }
          if (this.IRDetailsArray.IRM_Attachment_Three !== '') {
              this.FileThree = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_Three;
          }
          if (this.IRDetailsArray.IRM_Attachment_Four !== '') {
              this.FileFour = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_Four;
          }
          if (this.IRDetailsArray.IRM_Attachment_Five !== '') {
              this.FileFive = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_Five;
          }
          if (this.IRDetailsArray.IRM_Attachment_Six !== '') {
              this.FileSix = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_ID + '/attachment/' + this.IRDetailsArray.IRM_Attachment_Six;
          }
      });
  }

  Update(Status) {
      /*Getting Attachment Data*/
      /*File One*/
      const ATM_File_One = this.Attchment_One.nativeElement;
      if (ATM_File_One.files && ATM_File_One.files[0]) {
          this.Attchment_File_One = ATM_File_One.files[0];
      }
      const FileOne: File = this.Attchment_File_One;
      /*File Two*/
      const ATM_File_Two = this.Attchment_Two.nativeElement;
      if (ATM_File_Two.files && ATM_File_Two.files[0]) {
          this.Attchment_File_Two = ATM_File_Two.files[0];
      }
      const FileTwo: File = this.Attchment_File_Two;

      /*File Three*/
      const ATM_File_Three = this.Attchment_Three.nativeElement;
      if (ATM_File_Three.files && ATM_File_Three.files[0]) {
          this.Attchment_File_Three = ATM_File_Three.files[0];
      }
      const FileThree: File = this.Attchment_File_Three;

      /*File One*/
      const ATM_File_Four = this.Attchment_Four.nativeElement;
      if (ATM_File_Four.files && ATM_File_Four.files[0]) {
          this.Attchment_File_Four = ATM_File_Four.files[0];
      }
      const FileFour: File = this.Attchment_File_Four;

      /*File Five*/
      const ATM_File_Five = this.Attchment_Five.nativeElement;
      if (ATM_File_Five.files && ATM_File_Five.files[0]) {
          this.Attchment_File_Five = ATM_File_Five.files[0];
      }
      const FileFive: File = this.Attchment_File_Five;

      /*File Six*/
      const ATM_File_Six = this.Attchment_Six.nativeElement;
      if (ATM_File_Six.files && ATM_File_Six.files[0]) {
          this.Attchment_File_Six = ATM_File_Six.files[0];
      }
      const FileSix: File = this.Attchment_File_Six;
      this.IR_Errors = [];
      if (this.AdditionalInformation === '') {
          this.IR_Errors.push({ErrorMsg: 'On site note Required'});
      }
      /*if (typeof this.JobStatus === 'undefined') {
       this.IR_Errors.push({ErrorMsg: 'Job Status Required'});
       }
       if (this.TechnicianFirstName === '') {
       this.IR_Errors.push({ErrorMsg: 'Technician First Name Required'});
       }
       if (this.TechnicianLastName === '') {
       this.IR_Errors.push({ErrorMsg: 'Technician First Name Required'});
       }
       if (this.TechnicianEmail === '') {
       this.IR_Errors.push({ErrorMsg: 'Technician Email Name Required'});
       }
       if (this.TechnicianBranch === '') {
       this.IR_Errors.push({ErrorMsg: 'Technician Branch Required'});
       }*/
      if (typeof this.TechnicianArrivedTime === 'undefined' || this.TechnicianArrivedTime.length === 0) {
          this.IR_Errors.push({ErrorMsg: 'Technician arrival time required'});
      }
      if (typeof this.TechnicianDepartTime === 'undefined' || this.TechnicianDepartTime.length === 0) {
          this.IR_Errors.push({ErrorMsg: 'Technician departure time required'});
      }
      /*if (this.CustomerFirstName === '') {
       this.IR_Errors.push({ErrorMsg: 'Customer First Name Required'});
       }
       if (this.CustomerLastName === '') {
       this.IR_Errors.push({ErrorMsg: 'Customer Last Name Required'});
       }
       if (this.CustomerEmail === '') {
       this.IR_Errors.push({ErrorMsg: 'Customer Email Required'});
       }
       if (this.CustomerMobile === '') {
       this.IR_Errors.push({ErrorMsg: 'Customer Mobile Number Required'});
       }
       if (typeof this.CusSignedDate === 'undefined') {
       this.IR_Errors.push({ErrorMsg: 'Customer Signed Date Required'});
       }
       if (typeof this.CusSignedTime === 'undefined') {
       this.IR_Errors.push({ErrorMsg: 'Customer Signed Time Required'});
       }
       if (typeof this.TechnicianSign === 'undefined') {
       this.IR_Errors.push({ErrorMsg: 'Technician Signature Required'});
       }
       if (typeof this.CustomerSign === 'undefined' && this.CustomerSign === []) {
       this.IR_Errors.push({ErrorMsg: 'Customer Signature Required'});
       }*/
      if (this.TechnicianArrivedTime === this.TechnicianDepartTime) {
          this.IR_Errors.push({ErrorMsg: 'Technician arrival time and technician departure time is same'});
      }
      if ((typeof this.TechnicianArrivedTime !== 'undefined') && (typeof this.TechnicianDepartTime !== 'undefined')) {
          if (this.TechnicianArrivedTime.length !== 0 && this.TechnicianDepartTime.length !== 0) {
              this.TimeDifference = this.dataConversion.TimeDifference(this.TechnicianArrivedTime, this.TechnicianDepartTime);
              if (this.TimeDifference === false) {
                  this.IR_Errors.push({ErrorMsg: 'Technician arrival and departure time not valid'});
              }
      }
      }
      if (typeof this.OnSiteDate === 'undefined' || this.OnSiteDate.length === 0) {
          this.IR_Errors.push({ErrorMsg: 'On Site Date Required'});
      }
      /*FormData*/
      const formData = new FormData();
      formData.append('irID', this.IR_ID);
      formData.append('ticketID', this.TicketID);
      formData.append('ticketID', this.TicketID);
      formData.append('tripID', this.TripID);
      formData.append('accountName', this.ManufacturerName);
      formData.append('siteName', this.SiteName);
      formData.append('branchName', this.BranchName);
      formData.append('modelName', this.ModelName);
      formData.append('assetName', this.AssetName);
      formData.append('serviceRequest', this.ServiceRequestName);
      formData.append('workOrderNumber', this.WorkOrderNumber);
      formData.append('additionalInfo', this.AdditionalInformation);
      formData.append('jobStatus', this.JobStatus);
      formData.append('technicianFirstName', this.TechnicianFirstName);
      formData.append('technicianLastName', this.TechnicianLastName);
      formData.append('technicianEmail', this.TechnicianEmail);
      formData.append('technicianBranch', this.TechnicianBranch);
      formData.append('onSiteDate', this.OnSiteDate);
      if (typeof this.TechnicianArrivedTime === 'undefined') {
          formData.append('technicianArrivedTime', '');
      } else {
          formData.append('technicianArrivedTime', this.TechnicianArrivedTime);
      }
      if (typeof this.TechnicianDepartTime === 'undefined') {
          formData.append('technicianDepartTime', '');
      } else {
          formData.append('technicianDepartTime', this.TechnicianDepartTime);
      }
      formData.append('customerFirstName', this.CustomerFirstName);
      formData.append('customerLastName', this.CustomerLastName);
      formData.append('customerEmail', this.CustomerEmail);
      formData.append('customerMobile', this.CustomerMobile);
      if (typeof this.CusSignedDate === 'undefined') {
          formData.append('customerSignDate', '');
      } else {
          formData.append('customerSignDate', this.CusSignedDate);
      }
      formData.append('customerMobile', this.CustomerMobile);
      if (typeof this.CusSignedTime === 'undefined') {
          formData.append('customerSignTime', '');
      } else {
          formData.append('customerSignTime', this.CusSignedTime);
      }
      formData.append('accRefNo', this.AccountRefNumber);
      formData.append('workStatus', Status);
      formData.append('ticketsParts', JSON.stringify(this.TicketsPartArray));
      formData.append('ckeckList', JSON.stringify(this.TicktCheckListArray));
      formData.append('Attachment1', this.ExtAttachment1);
      formData.append('Attachment2', this.ExtAttachment2);
      formData.append('Attachment3', this.ExtAttachment3);
      formData.append('Attachment4', this.ExtAttachment4);
      formData.append('Attachment5', this.ExtAttachment5);
      formData.append('Attachment6', this.ExtAttachment6);
      formData.append('userID', this.userID);
      if (this.Attchment_One.nativeElement.value !== '') {
          formData.append('attachementOne', FileOne, FileOne.name);
      }
      if (this.Attchment_Two.nativeElement.value !== '') {
          formData.append('attachementTwo', FileTwo, FileTwo.name);
      }
      if (this.Attchment_Three.nativeElement.value !== '') {
          formData.append('attachementThree', FileThree, FileThree.name);
      }
      if (this.Attchment_Four.nativeElement.value !== '') {
          formData.append('attachementFour', FileFour, FileFour.name);
      }
      if (this.Attchment_Five.nativeElement.value !== '') {
          formData.append('attachementFive', FileFive, FileFive.name);
      }
      if (this.Attchment_Six.nativeElement.value !== '') {
          formData.append('attachementSix', FileSix, FileSix.name);
      }
      if (this.IR_Errors.length === 0) {
          if (Status === 'CLOSE' || Status === 'NEW') {
              const PartRequestURL = GlobalVariable.BASE_API_URL + 'ir_part_request/create_part_request';
              const PartData = new FormData();
              PartData.append('ticketID', this.TicketID);
              PartData.append('tripID', this.TripID);
              PartData.append('partData', JSON.stringify(this.TicketsPartArray));
              this.irService.Post(PartRequestURL, PartData).subscribe();
          }
          const URL = GlobalVariable.BASE_API_URL + 'incident_report/update_ir';
      this.irService.Post(URL, formData).subscribe(result => {
          if (result['result'] === 'success' && result['status'] === 'CLOSED') {
              this.router.navigate(['tickets/overview']);
              const IrMail = new FormData();
              IrMail.append('irmID', this.IR_ID);
              IrMail.append('ticketID', this.TicketID);
              $(function () {
                  swal({
                      title: 'Ticket Closed',
                      text: 'Current ticket closed and inventory updated.',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              });
              const Close_Mail = GlobalVariable.BASE_API_URL + 'incident_report/close_mail';
              this.irService.Post(Close_Mail, IrMail).subscribe();
          } else if (result['result'] === 'success' && result['status'] === 'NEW') {
              const formData = new FormData();
              formData.append('ticketID', this.TicketID);
              formData.append('userKeyId', this.userID);
              const New_Mail = GlobalVariable.BASE_API_URL + 'edit_ticket/create_trip_mail';
              this.irService.Post(New_Mail, formData).subscribe();
              this.router.navigate(['tickets/edit/' + this.TicketID + '/' + result['tripID']]);
              $(function () {
                  swal({
                      title: 'New Trip Created',
                      text: 'Current Trip closed and a new trip initiated.',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              });

          } else if (result['result'] === 'success' && result['status'] === 'RESUBMIT') {
              this.router.navigate(['tickets/overview']);
              $(function () {
                  swal({
                      title: 'IR Re-Submitted',
                      text: 'Incident report re-submitted by the technician.',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              });
          }
      });
      } else {
          $(() => {
              $('#IR_Error').modal();
          });
      }
  }

  public UsedQtyError(used, req) {
    if (Number(used) > Number(req)) {
      return true;
    } else {
      return false;
    }
  }

    UsedQuantityValidation(UsedQty, CurrentStock) {
        if (parseInt(CurrentStock) >= parseInt(UsedQty)) {
            this.UsedQtyAvailable = true;
        } else if (parseInt(CurrentStock) < parseInt(UsedQty)) {
            this.UsedQtyAvailable = false;
            this.Alert_Notification('font-icon font-icon-warning', 'Out Of Stock', 'Stock not available in the inventory', 'danger');
        }
    }

    Alert_Notification(icon, title, message, type) {
        $.notify({
            icon: icon,
            title: '<strong>' + title + '</strong><br>',
            message: message
        }, {
            type: type
        });
    }
}
