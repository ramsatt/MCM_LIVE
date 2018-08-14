import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {GlobalVariable} from '../../../../global/global';
import {IncidentreportService} from '../service/incidentreport.service';
import {SignatureFieldComponent} from '../trip/signature-field/signature-field.component';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DatacoversionService} from '../../../../global/datacoversion.service';
import {HttpEventType} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";
import { Inject} from "@angular/core";
import { DOCUMENT } from '@angular/platform-browser';
declare const $;
declare const swal;

@Component({
  selector: 'app-incidentreport',
  templateUrl: './incidentreport.component.html',
  styleUrls: ['./incidentreport.component.css']
})
export class IncidentreportComponent implements OnInit, AfterViewInit {
  IR_Form: FormGroup;
  TicketDetails: any = [];
  TicketsPartArray: any = [];
  TicktCheckListArray: any = [];
  ArrivedTime: any = '';
  TimeDifference: boolean = false;
  OnSiteDate: any;
  TicketID: any = '';
  TripID: any = '';
  TripNumber: any = '';
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
  AccountRefNumber: any = '';

  /*Technician Details*/
  TechnicianFirstName: any = '';
  TechnicianLastName: any = '';
  TechnicianEmail: any = '';
  TechnicianBranch: any = '';
  TechnicianArrivedTime: any;
  TechnicianDepartTime: any;

  /*Customer Details*/
  CustomerFirstName: any = '';
  CustomerLastName: any = '';
  CustomerEmail: any = '';
  CustomerMobile: any = '';
  CusSignedDate: any;
  CusSignedTime: any;
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

  /*SignData*/
  TechnicianSign: any;
  CustomerSign: any;
  FileBaseUrl: any = '';

  /*CheckList*/
  SelectedCheckListArray: any = [];
  TechnicianDDetails: any = [];
  userKeyId: any;
  mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  HeroKitPartAvailable: boolean = false;
  NonHeroKitPartAavailable: boolean = false;
  NewPartAvailable: boolean = false;
  UsedQtyAvailable: boolean = true;
  FilesUploadProgress: any = 0;

  constructor(private irService: IncidentreportService, private router: Router, private actRoute: ActivatedRoute, private fb: FormBuilder, private dataConversion: DatacoversionService, private _sanitizer: DomSanitizer, @Inject(DOCUMENT) private document: Document) {
    this.document.body.scrollTop = 0;
    this.TicketID = this.actRoute.snapshot.params['ticket_id'];
    this.TripID = this.actRoute.snapshot.params['trip_id'];
    this.TripNumber = this.dataConversion.padLeft(this.TripID, '0', 5);
    this.userKeyId = localStorage.getItem('umid');
  }

  ngOnInit() {
    this.FileBaseUrl = GlobalVariable.BASE_FILE_API;
    this.Load_Ticket_Details();
    this.Load_Ticket_Part_Details();
    this.Load_CheckList();
    this.Load_Technician_Details();
    $(() => {
      $('.dropify').dropify();
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
  }

  Load_Ticket_Details() {
    const formData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('tripID', this.TripID);
    const URL = GlobalVariable.BASE_API_URL + 'incident_report/get_ticket_details';
    this.irService.Post(URL, formData).subscribe(
        data => {
          this.TicketDetails = data;
          this.ServiceRequestName = this.TicketDetails['TSRM_Name'];
          this.ManufacturerName = this.TicketDetails['AM_Name'];
          this.SiteName = this.TicketDetails['SM_SiteName'];
          this.ModelName = this.TicketDetails['MM_Model_Name'];
          this.AssetName = this.TicketDetails['ASM_Asset_Name'];
          this.BranchName = this.TicketDetails['BM_Branch_Name'];
          this.WorkOrderNumber = this.dataConversion.padLeft(this.TicketDetails['TTD_TM_KeyID'], '0', 5);
          this.AccountRefNumber = this.TicketDetails['TTD_Account_Ref_Number'];
        }
    );
  }

  Load_Technician_Details() {
    const formData = new FormData();
    formData.append('tripID', this.TripID);
    const URL = GlobalVariable.BASE_API_URL + 'incident_report/get_technician_detail';
    this.irService.Post(URL, formData).subscribe(
        data => {
          this.TechnicianFirstName = data['UM_First_Name'];
          this.TechnicianLastName = data['UM_Last_Name'];
          this.TechnicianEmail = data['UM_EmailID'];
          this.TechnicianBranch = this.BranchName;
        }
    );
  }

  public beResponsive() {
    this.size(this.sigContainer.first, this.sigs.first);
    this.size(this.sigContainer1.first, this.secondSig);
  }

  public size(container: ElementRef, sig: SignatureFieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(5, 5, 5)');
    this.sigs.last.signaturePad.set('penColor', 'rgb(5, 5, 5)');
    this.sigs.first.signaturePad.clear();
    this.sigs.last.signaturePad.clear();
    /*clearing is needed to set the background colour*/
  }

  public ngAfterViewInit() {
    this.secondSig = this.sigs.find((sig, index) => index === 1);
    this.beResponsive();
    this.setOptions();
  }

  Load_Ticket_Part_Details() {
    const formData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('tripID', this.TripID);
    const URL = GlobalVariable.BASE_API_URL + 'incident_report/get_ticket_parts';
    this.irService.Post(URL, formData).subscribe(
        data => {
          this.TicketsPartArray = data;
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
        }
    );
  }

  Load_CheckList() {
    const formData = new FormData();
    formData.append('ticketID', this.TicketID);
    formData.append('tripID', this.TripID);
    const URL = GlobalVariable.BASE_API_URL + 'incident_report/get_ticket_check_list';
    this.irService.Post(URL, formData).subscribe(
        data => {
          this.TicktCheckListArray = data;
        }
    );
  }

  submitIR() {
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
     this.IR_Errors.push({ErrorMsg: 'Technician Last Name Required'});
     }
     if (this.TechnicianEmail === '') {
     this.IR_Errors.push({ErrorMsg: 'Technician Email Required'});
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
     if (typeof this.CusSignedDate === 'undefined' || this.CusSignedDate.length === 0) {
     this.IR_Errors.push({ErrorMsg: 'Customer Signed Date Required'});
     }
     if (typeof this.CusSignedTime === 'undefined' || this.CusSignedTime.length === 0) {
     this.IR_Errors.push({ErrorMsg: 'Customer Signed Time Required'});
     }
     if (typeof this.TechnicianSign === 'undefined' || this.TechnicianSign.length === 0) {
     this.IR_Errors.push({ErrorMsg: 'Technician Signature Required'});
     }
     if (typeof this.CustomerSign === 'undefined' || this.CustomerSign.length === 0) {
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
    let formData = new FormData();
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
    formData.append('userKeyId', this.userKeyId);

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
    formData.append('technicianSign', this.TechnicianSign);
    formData.append('customerSign', this.CustomerSign);
    console.log(formData);
    if (this.IR_Errors.length === 0) {
      this.irSubmit = true;
      const URL = GlobalVariable.BASE_API_URL + 'incident_report/save_report';
      const iRMailURL = GlobalVariable.BASE_API_URL + 'incident_report/ir_mail';
      console.log(formData);
      this.irService.Submit(URL, formData).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.FilesUploadProgress = Math.round((event.loaded / event.total) * 100);
              console.log(this.FilesUploadProgress);
            } else if (event.type === HttpEventType.Response){
              this.irSubmit = false;
              let data: any;
              data = event.body;
              if (data['result'] === 'success') {
                this.irSubmit = false;
                const IRM_ID = data['IRM_KeyID'];
                const irData = new FormData();
                irData.append('ticketID', this.TicketID);
                irData.append('irmID', IRM_ID);
                this.SelectedCheckListArray.forEach(item => {
                  const CheckListData = new FormData();
                  CheckListData.append('incidentReportID', IRM_ID);
                  CheckListData.append('clcmKeyID', item.CLM_CLCM_KeyID);
                  CheckListData.append('clmKeyID', item.CLM_KeyID);
                  CheckListData.append('desc', item.CLM_Check_List_Description);
                  const CheckListURL = GlobalVariable.BASE_API_URL + 'incident_report/checklist_data_save';
                  this.irService.Post(CheckListURL, CheckListData).subscribe();
                });
                const PartURL = GlobalVariable.BASE_API_URL + 'incident_report/save_part_details';
                const PartDetail = new FormData();
                PartDetail.append('incidentReportID', IRM_ID);
                PartDetail.append('ticketID', this.TicketID);
                PartDetail.append('tripID', this.TripID);
                PartDetail.append('partDetails', JSON.stringify(this.TicketsPartArray));
                this.irService.Post(PartURL, PartDetail).subscribe(partData => {
                      this.router.navigate(['tickets/overview']);
                      $(function () {
                        swal({
                          title: 'Incident report Created',
                          text: 'Incident report created successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                        });
                      });
                    }
                );
                this.irService.Post(iRMailURL, irData).subscribe();
              }
            }
          }
      );
    } else {
      $(() => {
        $('#IR_Error').modal();
      });
    }
  }

  SelectCheckList(irArray, event) {
    let selectedCategory: any;
    selectedCategory = this.SelectedCheckListArray.find(x => x.CLM_KeyID === irArray.CLM_KeyID);

    if (selectedCategory) {
      const index: number = this.SelectedCheckListArray.indexOf(irArray);
      if (index !== -1) {
        this.SelectedCheckListArray.splice(index, 1);
      }
    } else {
      this.SelectedCheckListArray.push(irArray);
    }
  }

  public resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
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

  getUploadProgress(value) {
    return this._sanitizer.bypassSecurityTrustStyle('width:' + value + '%');
  }
}
