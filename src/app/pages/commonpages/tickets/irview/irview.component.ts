import {Component, Input, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {IncidentreportService} from '../service/incidentreport.service';
import {GlobalVariable} from '../../../../global/global';
import {DOCUMENT, DomSanitizer} from '@angular/platform-browser';
import {DatacoversionService} from '../../../../global/datacoversion.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileValidatorDirective} from '../../../../customDirective/FileValidator.Directive';
import {HttpEventType} from '@angular/common/http';
declare var $;
declare var swal;
@Component({
  selector: 'app-irview',
  templateUrl: './irview.component.html',
  styleUrls: ['./irview.component.scss']
})
export class IrviewComponent implements OnInit, OnChanges {
  @Input() IR_ID;
  @ViewChild('FileUpdate') FileUpdate: ElementRef;
  @ViewChild('UploadFile') UploadFile: ElementRef;
  private FileUploadModel = undefined;
  private UploadFileDropify = undefined;
  NewFile: File;
  IR_Details_Array: any = [];
  IR_Array: any = [];
  IR_Parts_Array: any = [];
  IR_Check_List_Array: any = [];
  Attachment1: any = '';
  Attachment2: any = '';
  Attachment3: any = '';
  Attachment4: any = '';
  Attachment5: any = '';
  Attachment6: any = '';
  file1type: any;
  file2type: any;
  file3type: any;
  file4type: any;
  file5type: any;
  file6type: any;
  file1url: any;
  file2url: any;
  file3url: any;
  file4url: any;
  file5url: any;
  file6url: any;
  FileBaseUrl: any = '';
  HeroKitPartAvailable: boolean = false;
  NonHeroKitPartAvailable: boolean = false;
  NewPartAvailable: boolean = false;
  FileUpdateForm: FormGroup;
  SelectedFileIndex: any = '';
  FileUploadProgress: any = 0;
  File_Upload_Status = false;
  File_Upload_Button = true;
  userRole: any = '';
    Edit = false;
    constructor(
        private domSanitizer: DomSanitizer,
        private router: Router,
        private actRoute: ActivatedRoute,
        private irService: IncidentreportService,
        private dataConversion: DatacoversionService,
        private fb: FormBuilder,
        private _sanitizer: DomSanitizer,
        @Inject(DOCUMENT) private document: Document) {
      /* this.IR_ID = this.actRoute.snapshot.params['irID']; */
      this.FileBaseUrl = GlobalVariable.BASE_FILE_API;
      this.userRole = localStorage.getItem('urmid');
      this.FileUpdateForm = this.fb.group({
          U_file: [null, FileValidatorDirective.validate]
      });
  }

  ngOnInit() {
      this.FileUploadModel = $(this.FileUpdate.nativeElement);
      this.UploadFileDropify = $(this.UploadFile.nativeElement);
      this.UploadFileDropify.dropify();
  }

    ngOnChanges(changes: SimpleChanges): void {
        this.LoadIRDetails(this.IR_ID);
    }

  LoadIRDetails(IR_ID) {
    const URL = GlobalVariable.BASE_API_URL + 'incident_report/ir_details';
    const formDdata = new FormData();
    formDdata.append('irID', IR_ID);
    this.irService.Post(URL, formDdata).subscribe(
        data => {
            this.IR_Details_Array = data;
            this.IR_Array = data['irDetails'];
            this.IR_Parts_Array = data['partDetails'];
            console.log(this.IR_Parts_Array);
            this.IR_Parts_Array.forEach(part => {
                if (part.TRPD_Hero_Kit_Status === 'Y') {
                    this.HeroKitPartAvailable = true;
                }
                if (part.TRPD_Hero_Kit_Status === 'N') {
                    this.NonHeroKitPartAvailable = true;
                    console.log(part);
                }
                if (part.TRPD_Hero_Kit_Status === 'NIL') {
                    this.NewPartAvailable = true;
                }
            });
            this.IR_Check_List_Array = data['checkListDetails'];
            this.file1url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_One;
            this.file2url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Two;
            this.file3url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Three;
            this.file4url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Four;
            this.file5url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Five;
            this.file6url = GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Six;
            /*set attachment values*/
            this.file1type = this.IR_Array.IRM_Attachment_One.substr((this.IR_Array.IRM_Attachment_One.lastIndexOf('.') + 1));
            if (this.file1type === 'csv') {
                this.Attachment1 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file1type === 'pdf') {
                this.Attachment1 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment1 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_One);
            }
            this.file2type = this.IR_Array.IRM_Attachment_Two.substr((this.IR_Array.IRM_Attachment_One.lastIndexOf('.') + 1));
            if (this.file2type === 'csv') {
                this.Attachment2 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file2type === 'pdf') {
                this.Attachment2 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment2 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Two);
            }
            this.file3type = this.IR_Array.IRM_Attachment_Three.substr((this.IR_Array.IRM_Attachment_One.lastIndexOf('.') + 1));
            if (this.file3type === 'csv') {
                this.Attachment3 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file3type === 'pdf') {
                this.Attachment3 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment3 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Three);
            }
            this.file4type = this.IR_Array.IRM_Attachment_Four.substr((this.IR_Array.IRM_Attachment_Four.lastIndexOf('.') + 1));
            if (this.file4type === 'csv') {
                this.Attachment4 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file4type === 'pdf') {
                this.Attachment4 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment4 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Four);
            }
            this.file5type = this.IR_Array.IRM_Attachment_Five.substr((this.IR_Array.IRM_Attachment_Five.lastIndexOf('.') + 1));
            if (this.file5type === 'csv') {
                this.Attachment5 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file5type === 'pdf') {
                this.Attachment5 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment5 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Five);
            }
            this.file6type = this.IR_Array.IRM_Attachment_Six.substr((this.IR_Array.IRM_Attachment_Six.lastIndexOf('.') + 1));
            if (this.file6type === 'csv') {
                this.Attachment6 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/csv.png');
            } else if (this.file6type === 'pdf') {
                this.Attachment6 = this.domSanitizer.bypassSecurityTrustResourceUrl('assets/modules/dummy-assets/common/img/pdf.png');
            } else {
                this.Attachment6 = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API + '/uploads/incident_report/' + this.IR_Array.IRM_KeyID + '/attachment/' + this.IR_Array.IRM_Attachment_Six);
            }
        }
    );
  }

    print(): void {
        let printContents, popupWin;
        printContents = document.getElementById('ir-print-section').innerHTML;
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

    GenerateTripNumber(tripID) {
        return this.dataConversion.padLeft(tripID, '0', 5);
    }

    onNavigate(fileUrl){
        window.open(fileUrl, '_blank');
    }

    openFileUploadModel(Index){
        this.Edit = true;
        const that = this;
        setTimeout(() => {
            this.UploadFileDropify = $(this.UploadFile.nativeElement);
            this.UploadFileDropify.dropify();
            $('.dropify-clear').click();
            const drEvent = this.UploadFileDropify.data('dropify');
            drEvent.resetPreview();
            drEvent.clearElement();
        }, 1000);

        this.SelectedFileIndex = Index;
        /*this.FileUploadModel.modal();
        this.document.body.scrollTop = 0;*/
    }

    UpdateFile(formValue){
        const URL = GlobalVariable.BASE_API_URL + 'incident_report/update_existing_file';
        const fileData = this.UploadFile.nativeElement;
        if (fileData.files && fileData.files[0]) {
            this.NewFile = fileData.files[0];
        }
        const file: File = this.NewFile;
        console.log(file);
        const formData = new FormData();
        formData.append('irID', this.IR_ID);
        formData.append('fileIndex', this.SelectedFileIndex);
        formData.append('file', file, file.name);
        this.irService.Submit(URL, formData).subscribe(
            event => {
                this.File_Upload_Status = true;
                this.File_Upload_Button = false;
                if (event.type === HttpEventType.UploadProgress){
                    this.FileUploadProgress = Math.round((event.loaded / event.total) * 100);
                } else if (event.type === HttpEventType.Response) {
                    this.File_Upload_Status = false;
                    this.File_Upload_Button = true;
                    this.Edit = false;
                    let response: any;
                    response = event.body;
                    console.log(response.result);
                    if (response.result === 'success') {
                        this.LoadIRDetails(this.IR_ID);
                        swal({
                            title: 'File Updated!',
                            text: 'File Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        this.FileUploadModel.modal('hide');
                    }
                }

            }
        );
    }

    DeleteFile(index) {
        const URL = GlobalVariable.BASE_API_URL + 'incident_report/delete_ir_file';
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This file will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
            console.log('1');
                const formData: FormData = new FormData();
                formData.append('irID', that.IR_ID);
                formData.append('fileIndex', index);
                that.irService.Post(URL, formData).subscribe(
                    data => {
                        if (data['result'] === 'success'){
                            that.LoadIRDetails(that.IR_ID);
                            swal({
                                title: 'File Deleted!',
                                text: 'File Deleteds Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

    getUploadProgress(value) {
        return this._sanitizer.bypassSecurityTrustStyle('width:' + value + '%');
    }
}
