import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, Output, EventEmitter} from '@angular/core';
import {TsrmService} from '../service/tsrm.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileValidatorDirective} from '../../../../customDirective/FileValidator.Directive';
import { AsrmService } from '../../account/accservicerequest/services/asrm.service';
import { GlobalVariable } from '../../../../global/global';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import {ActivatedRoute} from "@angular/router";
import {HttpEventType} from "@angular/common/http";
import {DomSanitizer} from "@angular/platform-browser";

declare const $;
declare const swal;
declare const NProgress;

@Component({
  selector: 'app-srdetails',
  templateUrl: './srdetails.component.html',
  styleUrls: ['./srdetails.component.scss']
})
export class SrdetailsComponent implements OnInit, OnChanges {
  @Input() TicketID;
  @Input() ServiceRequestID;
  @Input() ModelID;
  @Input() AccountID;
  @Input() KICount: number = 0;
  @Input() SolCount: number = 0;
  @Output('updateKICount') KIChange: EventEmitter<number> = new EventEmitter<number>();
  @Output('updateSolCount') SolChange: EventEmitter<number> = new EventEmitter<number>();
  /*KnownIssues*/
  KnownIssuesArray: any = [];
  AssignedKnownIssuesArray: any = [];
  UnAssignedKnownIssueArray: any = [];
  AssignKIForm: FormGroup;
  KI_Form: FormGroup;
  SelectedKIArray: any = [];
  unassignKIForm: FormGroup;
  SelectedUKIArray: any = [];
  kiScltID: any = '';
  TKIM_ID: any = '';
  KISelectAllValue: boolean = false;
  /* Solution */
  SolutionArray: any = [];
  AssignedSolutionArray: any = [];
  UnAssignedSolutionArray: any = [];
  SelectedASOLArray: any = [];
  SelectedUSOLArray: any = [];
  AssignSOLForm: FormGroup;
  SOL_Form: FormGroup;
  UnAssignSOLForm: FormGroup;
  TSOM_ID: any = '';
  ASOM_ID: any = '';
  SOLSelectAllValue: boolean = false;
  /*Parts*/
  PartsArray: any = [];
  AssignedPartsArray: any = [];
  UnAssignedPartsArray: any = [];
  SelectedAPARTSArray: any = [];
  SelectedUPARTSArray: any = [];
  AssignPartsForm: FormGroup;
  UnassignedPartsForm: FormGroup;
  PartSelectAllValue: boolean = false;
  /*Instructions*/
  InstructionArray: any = [];
  AssignedInstructionArray: any = [];
  SelectedAInstructionArray: any = [];
  AssignINSForm: FormGroup;
  INS_Form: FormGroup;
  @ViewChild('INS_File') INS_File;
  INS_Upload_File: File;
    InsSelectAllValue: boolean = false;
    DocumentUploadProgress: any = 0;
    Document_Upload_Status = false;
    Document_Create_Button_Status = true;
  /*Images*/
  ImagesArray: any = [];
  AssignedImagesArray: any = [];
  SelectedAImagesArray: any = [];
  AImageForm: FormGroup;
  INS_PDF_Form: FormGroup;
  @ViewChild('INS_PDF') Ins_Pdf;
  InsPDF_File: File;
    ImageSelectAllValue: boolean = false;
    ImageUploadProgress: any = 0;
    Image_Upload_Status = false;
    Image_Create_Button_Status = true;
  /*Video*/
  VideoArray: any = [];
  AssignedVideoArray: any = [];
  SelectedAVideoArray: any = [];
  AVideoForm: FormGroup;
  Gen_Ins_PDF_Form: FormGroup;
  GenPDF_File: File;
  @ViewChild('GEN_INS_PDF') Gen_Ins_Pdf;
    VideoSelectAllValue: boolean = false;
    VideoUploadProgress: any = 0;
    Video_Upload_Status = false;
    Video_Create_Button_Status = true;
  /*Search*/
  SER_SEL_KI_Name: any;
  FileBasePath: any = '';
    TicketType: any = '';
    TripID: any = '';


    constructor(private tsrm: TsrmService, private fb: FormBuilder, private asrm: AsrmService, private create: CreateComponent, private edtComponent: EditComponent, private aRoute: ActivatedRoute, private _sanitizer: DomSanitizer) {
        if (this.aRoute.snapshot.params['type']) {
            this.TicketType = this.aRoute.snapshot.params['type'];
        } else {
            this.TicketType = 'NEW';
        }
        this.TripID = this.aRoute.snapshot.params['tripID'];
        console.log(this.TripID);
    /*KnownIssue*/
    const assignedKI_Array = [];
    this.AssignKIForm = this.fb.group({
        akiList: this.fb.array(assignedKI_Array)
    });
    this.KI_Form = this.fb.group({
        'kiName': ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
    });
      const unassignKI_Array = [];
      this.unassignKIForm = this.fb.group({
          uKIList: this.fb.array(unassignKI_Array)
      });
      /*Solutions*/
      const assignedSOL_Array = [];
      this.AssignSOLForm = this.fb.group({
          asolList: this.fb.array(assignedSOL_Array)
      });
      this.SOL_Form = this.fb.group({
          'solName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
      });
      const unassignSOL_Array = [];
      this.UnAssignSOLForm = this.fb.group({
          uSOLList: this.fb.array(unassignSOL_Array)
      });
      /*Parts*/
      const assignedPARTS_Array = [];
      this.AssignPartsForm = this.fb.group({
          aPARTList: this.fb.array(assignedPARTS_Array)
      });

      const unassignedPARTS_Array = [];
      this.UnassignedPartsForm = this.fb.group({
          uPARTList: this.fb.array(unassignedPARTS_Array)
      });
      /*Instructions*/
      const assignedINS_Array = [];
      this.AssignINSForm = this.fb.group({
          aINSList: this.fb.array(assignedINS_Array)
      });
      this.INS_Form = this.fb.group({
          'InsName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
          'InsDesc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
          'InsFile': [null, FileValidatorDirective.validate],
      });
      /*Images*/
      const assignedImage_Array = [];
      this.AImageForm = this.fb.group({
          aIMGList: this.fb.array(assignedImage_Array)
      });
      this.INS_PDF_Form = this.fb.group({
          'InsPdfName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
          'InsPDFStatus': ['NO', Validators.required],
          'InsPDF_File': [null, FileValidatorDirective.validate]
      });
      /*Videos*/
      const assignedVideo_Array = [];
      this.AVideoForm = this.fb.group({
          aVIDEOList: this.fb.array(assignedVideo_Array)
      });
      this.Gen_Ins_PDF_Form = this.fb.group({
          'GenPDFName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
          'GenPDF_File': [null, FileValidatorDirective.validate]
      });
  }

  ngOnInit() {
      this.LoadSelecteKnownIssue();
      this.LoadAllSolutions();
      this.Load_TIC_Parts_All();
      this.Load_Ins_List_All();
      this.Load_All_Images();
      this.Load_Video_List_All();
      $(() => {
          $('.dropify').dropify();
      });
      this.FileBasePath = GlobalVariable.BASE_FILE_API;
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.LoadSelecteKnownIssue();
      this.LoadAllSolutions();
      this.Load_TIC_Parts_All();
      this.Load_Ins_List_All();
      this.Load_All_Images();
      this.Load_Video_List_All();
  }

  /*OpenKnownIssueModel*/
  ShowKnownIssueModal() {
    $(function () {
        $('#KnownIssue').modal();
    });
    this.Load_TIC_KI_UnAssignList();
    this.LoadAssignedKnownIssues();
  }

  /*CloseKnownIssueModel*/
  CloseKnownIssueModal() {
      this.KI_Form.reset();
      $(function () {
          $('#KnownIssue').modal('hide');
      });
  }

  /*LoadAssignedKnownIssues*/
  get akiList(): FormArray {
        return this.AssignKIForm.get('akiList') as FormArray;
    };

  LoadAssignedKnownIssues() {
    const formData = new FormData();
    formData.append('ticket_ID', this.TicketID);
    this.tsrm.Load_Acc_SR_KI(formData).subscribe(
        data => {
          this.AssignedKnownIssuesArray = data;
            const assignedKI_Array = [];
            for (const aki of this.AssignedKnownIssuesArray) {
                assignedKI_Array.push(this.fb.group({
                    isChosen: false,
                    AKIM_Name: aki.AKIM_Known_Issue,
                    AKIM_ID: aki.AKIM_KeyID,
                    KIM_ID: aki.AKIM_KIM_KeyID
                }));
            }
            this.AssignKIForm = this.fb.group({
                akiList: this.fb.array(assignedKI_Array)
            });

        }
    );
  }

  KISelectAll($event) {
      this.KISelectAllValue = !this.KISelectAllValue;
      const assignedKI_Array = [];
      for (const aki of this.AssignedKnownIssuesArray) {
          assignedKI_Array.push(this.fb.group({
              isChosen: this.KISelectAllValue,
              AKIM_Name: aki.AKIM_Known_Issue,
              AKIM_ID: aki.AKIM_KeyID,
              KIM_ID: aki.AKIM_KIM_KeyID
          }));
      }
      this.AssignKIForm = this.fb.group({
          akiList: this.fb.array(assignedKI_Array)
      });
  }

  SubmitAssignedKnownIssue() {
      const items = this.AssignKIForm.value;
      this.SelectedKIArray = items.akiList.filter(ki => ki.isChosen).map(ki => { return { AKIM_Name: ki.AKIM_Name, AKIM_ID: ki.AKIM_ID, KIM_ID: ki.KIM_ID}; });
      this.SelectedKIArray.forEach(
          ki => {
            const formData = new FormData();
            formData.append('tsrdID', this.ServiceRequestID);
            formData.append('akiID', ki.AKIM_ID);
            this.tsrm.Assign_TIC_KI(formData).subscribe(
                data => {
                    if (data['result'] === 'success') {
                      this.LoadSelecteKnownIssue();
                      this.LoadAllSolutions();
                      this.Load_TIC_Parts_All();
                      this.Load_Ins_List_All();
                      this.Load_All_Images();
                      this.Load_Video_List_All();
                      this.create.Load_Tickets_Parts();
                      this.edtComponent.Load_Tickets_Parts();
                  }
                }
            );
          }
      );
      this.CloseKnownIssueModal();
      swal({
          title: 'Selected!',
          text: 'Known Issue selected successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
  }

  Assign_KI() {
        const items = this.unassignKIForm.value;
        this.SelectedUKIArray = items.uKIList.filter(ki => ki.isChosen).map(ki => { return { AKIM_Name: ki.AKIM_Name, AKIM_ID: ki.AKIM_KeyID, KIM_ID: ki.KIM_KeyID}; });
         this.SelectedUKIArray.forEach(
            ki => {
                const formData = new FormData();
                formData.append('tsrdID', this.ServiceRequestID);
                formData.append('akiID', ki.AKIM_ID);
                this.tsrm.Assign_TIC_KI(formData).subscribe(
                    data => {
                        if (data['result'] === 'success') {
                            this.LoadSelecteKnownIssue();
                        }
                    }
                );
            }
        );
        this.CloseKnownIssueModal();
        swal({
            title: 'Selected!',
            text: 'Known Issue selected successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
    }

  LoadSelecteKnownIssue() {
          const formData: FormData = new FormData();
          formData.append('tsrdID', this.ServiceRequestID);
          this.tsrm.Load_TIC_KI(formData).subscribe(
              data => {
                  this.KnownIssuesArray = data;
                  this.KIChange.emit(this.KnownIssuesArray.length);
              }
          );
  }

  Save_Acc_KI(value) {
      const formData: FormData = new FormData();
      formData.append('issue', value.kiName);
      formData.append('TSRD_ID', this.ServiceRequestID);
      this.tsrm.Create_TIC_KI(formData).subscribe(
          data => {
              let response: any;
              response = data;
              if (response.result === 'success') {
                  this.CloseKnownIssueModal();
                  this.LoadSelecteKnownIssue();
                  this.KI_Form.reset();
                  swal({
                      title: 'Created!',
                      text: 'Known Issue Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
  }

  Selected_KI(value) {
      this.kiScltID = value.TKIM_AKIM_KeyID;
      this.TKIM_ID = value.TKIM_KeyID;
  }

  get uKIList(): FormArray {
        return this.unassignKIForm.get('uKIList') as FormArray;
    };

  Load_TIC_KI_UnAssignList() {
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('modelID', this.ModelID);
        formData.append('accountID', this.AccountID);
        this.tsrm.Load_TIC_KI_UnAssign_List(formData).subscribe(
            data => {
                this.UnAssignedKnownIssueArray = data;
                const unassignKI_Array = [];
                for (const uki of this.UnAssignedKnownIssueArray) {
                    unassignKI_Array.push(this.fb.group({
                        isChosen: true,
                        AKIM_Name: uki.AKIM_Known_Issue,
                        AKIM_KeyID: uki.AKIM_KeyID,
                        KIM_KeyID: uki.AKIM_KIM_KeyID
                    }));
                }
                this.unassignKIForm = this.fb.group({
                    uKIList: this.fb.array(unassignKI_Array)
                });
            }
        );
    }

  Delete_Acc_KI(KI_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This known issue will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                const formData: FormData = new FormData();
                formData.append('tkimID', KI_ID);
                formData.append('ticketID', that.TicketID);
                formData.append('tripID', that.TripID);
                if (that.TicketType === 'EDIT') {
                    that.tsrm.Delete_TIC_KI_Edit(formData).subscribe(
                        data => {
                            let response: any;
                            response = data;
                            if (response.result === 'success') {
                                that.LoadSelecteKnownIssue();
                                that.LoadAllSolutions();
                                that.Load_TIC_Parts_All();
                                that.Load_Ins_List_All();
                                that.Load_All_Images();
                                that.Load_Video_List_All();
                                that.create.Load_Tickets_Parts();
                                that.edtComponent.Load_Tickets_Parts();
                                that.kiScltID = '';
                                that.TKIM_ID = '';
                                that.TSOM_ID = '';
                                that.ASOM_ID = '';
                                swal({
                                    title: 'Deleted!',
                                    text: 'Known issue deleted successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                        }
                    );
                } else {
                    that.tsrm.Delete_TIC_KI(formData).subscribe(
                        data => {
                            let response: any;
                            response = data;
                            if (response.result === 'success') {
                                that.LoadSelecteKnownIssue();
                                that.LoadAllSolutions();
                                that.Load_TIC_Parts_All();
                                that.Load_Ins_List_All();
                                that.Load_All_Images();
                                that.Load_Video_List_All();
                                that.create.Load_Tickets_Parts();
                                that.edtComponent.Load_Tickets_Parts();
                                that.kiScltID = '';
                                that.TKIM_ID = '';
                                that.TSOM_ID = '';
                                that.ASOM_ID = '';
                                swal({
                                    title: 'Deleted!',
                                    text: 'Known issue deleted successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                        }
                    );
                }
            });
    }

  ActiveKIColor(Ki_ID) {
      if (Ki_ID === this.TKIM_ID) {
            return '#dfe4ed';
        }
  }

  ActiveKITextColor(Ki_ID) {
      if (Ki_ID === this.kiScltID) {
            return '#000000';
      }
  }

  /*Solutions*/
  ShowSolutionModal() {
      if (this.TKIM_ID !== ''){
          this.Load_Acc_KI_Solutions(this.kiScltID);
          $(function () {
              $('#Solutions').modal();
          });
      } else {
          $.notify({
              title: '<strong>Known Issue Not Selected.</strong><br>',
              message: 'Please select a known issue.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      }
    }

  CloseSolutionModal() {
      this.SOL_Form.reset();
      $(function () {
          $('#Solutions').modal('hide');
      });
  }

  get asolList(): FormArray {
        return this.AssignSOLForm.get('asolList') as FormArray;
  };

  Load_ACC_Solutions() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_TIC_ACC_SOL(formData).subscribe(
          data => {
              this.AssignedSolutionArray = data;
              const unassignSOL_Array = [];
              for (const ASOL of this.AssignedSolutionArray) {
                  unassignSOL_Array.push(this.fb.group({
                      isChosen: true,
                      ASOM_NAME: ASOL.ASOM_Solution,
                      ASOM_ID: ASOL.ASOM_KeyID,
                      SOM_ID: ASOL.ASOM_SOM_KeyID,
                      TKIM_ID: this.TKIM_ID
                  }));
              }
              this.AssignSOLForm = this.fb.group({
                  asolList: this.fb.array(unassignSOL_Array)
              });
      }
      );
  }

  Load_Acc_KI_Solutions(AKIM_ID) {
      this.asrm.Load_ASR_SOL(AKIM_ID).subscribe(solutions => {
          this.AssignedSolutionArray = solutions;
          const unassignSOL_Array = [];
          for (const ASOL of this.AssignedSolutionArray) {
              unassignSOL_Array.push(this.fb.group({
                  isChosen: false,
                  ASOM_NAME: ASOL.ASOM_Solution,
                  ASOM_ID: ASOL.ASOM_KeyID,
                  SOM_ID: ASOL.ASOM_SOM_KeyID,
                  TKIM_ID: ASOL.TKIM_KeyID
              }));
          }
          this.AssignSOLForm = this.fb.group({
              asolList: this.fb.array(unassignSOL_Array)
          });
      });
  }

    SOLSelectAll($event) {
      this.SOLSelectAllValue = !this.SOLSelectAllValue;
        const unassignSOL_Array = [];
        for (const ASOL of this.AssignedSolutionArray) {
            unassignSOL_Array.push(this.fb.group({
                isChosen: this.SOLSelectAllValue,
                ASOM_NAME: ASOL.ASOM_Solution,
                ASOM_ID: ASOL.ASOM_KeyID,
                SOM_ID: ASOL.ASOM_SOM_KeyID,
                TKIM_ID: ASOL.TKIM_KeyID
            }));
        }
        this.AssignSOLForm = this.fb.group({
            asolList: this.fb.array(unassignSOL_Array)
        });
    }

  LoadAllSolutions() {
      const formData = new FormData();
      formData.append('tsrmID', this.ServiceRequestID);
      this.tsrm.Load_TIC_SOL_ALL(formData).subscribe(
          data => {
              this.SolutionArray = data;
              this.SolChange.emit(this.SolutionArray.length);
          }
      );
  }

  SubmitAssignedSOL() {
      const items = this.AssignSOLForm.value;
      this.SelectedASOLArray = items.asolList.filter(sol => sol.isChosen).map(sol => { return { ASOM_ANME: sol.ASOM_NAME, ASOM_ID: sol.ASOM_ID, SOM_ID: sol.SOM_ID, TKIM_ID: sol.TKIM_ID}; });
      this.SelectedASOLArray.forEach(
          sol => {
              const formData = new FormData();
              formData.append('tkimID', this.TKIM_ID);
              formData.append('asomID', sol.ASOM_ID);
              this.tsrm.Assign_TIC_SOL(formData).subscribe(
                  data => {
                      if (data['result'] === 'success') {
                          this.LoadAllSolutions();
                          this.Load_TIC_Parts_All();
                          this.Load_Ins_List_All();
                          this.Load_All_Images();
                          this.Load_Video_List_All();
                          this.create.Load_Tickets_Parts();
                          this.edtComponent.Load_Tickets_Parts();
                      }
                  }
              );
          }
      );
      swal({
          title: 'Selected!',
          text: 'Troubleshoot selected successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
      this.CloseSolutionModal();
  }

  Save_Acc_SOL(value) {
            const formData = new FormData();
            formData.append('tkimID', this.TKIM_ID);
            formData.append('solution', value.solName);
            this.tsrm.Create_TIC_SOL(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.CloseSolutionModal();
                        this.LoadAllSolutions();
                        this.SOL_Form.reset();
                        swal({
                            title: 'Created!',
                            text: 'Troubleshoot Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
    }

  SelectedSOL(value) {
      this.TSOM_ID = value.TSOM_KeyID;
      this.ASOM_ID = value.TSOM_ASOM_KeyID;
  }

  ActiveSOLColor(ASOM_ID) {
      if (ASOM_ID === this.TSOM_ID) {
          return '#dfe4ed';
      }
  }

  ActiveSOLTextColor(ASOM_ID) {
      if (ASOM_ID === this.ASOM_ID) {
          return '#000000';
      }
  }

  Delete_Acc_SOL(SOL_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Troubleshoot will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                const formData: FormData = new FormData();
                formData.append('tsomID', SOL_ID);
                that.tsrm.Delete_TIC_SOL(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.LoadAllSolutions();
                            that.Load_TIC_Parts_All();
                            that.Load_Ins_List_All();
                            that.Load_All_Images();
                            that.Load_Video_List_All();
                            that.create.Load_Tickets_Parts();
                            that.edtComponent.Load_Tickets_Parts();
                            that.TSOM_ID = '';
                            that.ASOM_ID = '';
                            swal({
                                title: 'Deleted!',
                                text: 'Troubleshoot Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
  }

  /*Parts*/
  ShowPartModal() {
      if (this.TSOM_ID !== '') {
          this.Load_Acc_Sol_Parts(this.ASOM_ID);
          this.Load_Acc_Sol_Un_Assigned_part_List(this.AccountID, this.ASOM_ID);
          $(() => {
              $('#Parts').modal();
          });
      } else {
          $.notify({
              title: '<strong>Troubleshoot Not Selected.</strong><br>',
              message: 'Please select a Troubleshoot.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      }

      /*this.Load_Acc_Assigned_Parts();*/
  }

  ClosePartModal() {
      $(() => {
          $('#Parts').modal('hide');
      });
      this.Load_Acc_Assigned_Parts();
  }

  get aPARTList(): FormArray {
      return this.AssignPartsForm.get('aPARTList') as FormArray;
  };

  Load_Acc_Assigned_Parts() {
      const formData = new FormData();
      formData.append('tsrmID', this.ServiceRequestID);
      this.tsrm.Load_TIC_ACC_Assigned_Parts(formData).subscribe(
          data => {
              this.AssignedPartsArray = data;
              const assignedPARTS_Array = [];
              for (const APART of this.AssignedPartsArray) {
                  assignedPARTS_Array.push(this.fb.group({
                      isChosen: false,
                      APART_NAME: APART.PM_Part_Name,
                      APART_ID: APART.PM_KeyID,
                      ATSOM_ID: APART.TSOM_KeyID,
                      APART_IMAGE: APART.PM_Part_Image_Path
                  }));
              }
              this.AssignPartsForm = this.fb.group({
                  aPARTList: this.fb.array(assignedPARTS_Array)
              });
          }
      );
  }

  Load_Acc_Sol_Parts(ASOM_ID) {
      this.asrm.Load_ASR_Part(ASOM_ID).subscribe(parts => {
          this.AssignedPartsArray = parts;
          const assignedPARTS_Array = [];
          for (const APART of this.AssignedPartsArray) {
              assignedPARTS_Array.push(this.fb.group({
                  isChosen: false,
                  APART_NAME: APART.PM_Part_Name,
                  APART_ID: APART.PM_KeyID,
                  ATSOM_ID: APART.TSOM_KeyID,
                  APART_IMAGE: APART.PM_Part_Image_Path
              }));
          }
          this.AssignPartsForm = this.fb.group({
              aPARTList: this.fb.array(assignedPARTS_Array)
          });
          }
      );
  }

    PartSelectAll($event) {
        this.PartSelectAllValue = !this.PartSelectAllValue;
        const assignedPARTS_Array = [];
        for (const APART of this.AssignedPartsArray) {
            assignedPARTS_Array.push(this.fb.group({
                isChosen: this.PartSelectAllValue,
                APART_NAME: APART.PM_Part_Name,
                APART_ID: APART.PM_KeyID,
                ATSOM_ID: APART.TSOM_KeyID,
                APART_IMAGE: APART.PM_Part_Image_Path
            }));
        }
        this.AssignPartsForm = this.fb.group({
            aPARTList: this.fb.array(assignedPARTS_Array)
        });
    }

  get uPARTList(): FormArray {
        return this.UnassignedPartsForm.get('uPARTList') as FormArray;
    };

  Load_Acc_Sol_Un_Assigned_part_List(ACC_ID, ASOM_ID) {
      this.asrm.Load_UnAssigned_ASR_Part(ACC_ID, ASOM_ID).subscribe(parts => {
          this.UnAssignedPartsArray = parts;
          const unassignedPARTS_Array = [];
          for (const UPART of this.UnAssignedPartsArray) {
              unassignedPARTS_Array.push(this.fb.group({
                  isChosen: false,
                  APART_NAME: UPART.PM_Part_Name,
                  APART_ID: UPART.PM_KeyID,
                  ATSOM_ID: this.TSOM_ID,
                  APART_IMAGE: UPART.PM_Part_Image_Path
              }));
          }
          this.UnassignedPartsForm = this.fb.group({
              uPARTList: this.fb.array(unassignedPARTS_Array)
          });
      });
  }

  Load_TIC_Parts_All() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_TIC_Parts_All(formData).subscribe(data => {
          this.PartsArray = data;
      });
  }

  SubmitSelectedParts() {
      const items = this.AssignPartsForm.value;
      this.SelectedAPARTSArray = items.aPARTList.filter(part => part.isChosen).map(part => { return {APART_NAME : part.APART_NAME, APART_ID: part.APART_ID, ATSOM_ID: part.ATSOM_ID, APART_IMAGE: part.APART_IMAGE}; });
      this.SelectedAPARTSArray.forEach(part => {
          const formData = new FormData();
          formData.append('tsomID', this.TSOM_ID);
          formData.append('pmID', part.APART_ID);
          this.tsrm.Assign_TIC_Parts(formData).subscribe(response => {
              if (response['result'] === 'success') {
                  this.Load_TIC_Parts_All();
                  this.create.Load_Tickets_Parts();
                  this.edtComponent.Load_Tickets_Parts();
              }
          });
      });
      swal({
          title: 'Selected!',
          text: 'Parts selected successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
      this.ClosePartModal();
  }

  SubmitSelectedUAParts() {
        const items = this.UnassignedPartsForm.value;
        this.SelectedUPARTSArray = items.uPARTList.filter(part => part.isChosen).map(part => { return {APART_NAME : part.APART_NAME, APART_ID: part.APART_ID, ATSOM_ID: part.ATSOM_ID, APART_IMAGE: part.APART_IMAGE}; });
        this.SelectedUPARTSArray.forEach(part => {
            const formData = new FormData();
            formData.append('tsomID', this.TSOM_ID);
            formData.append('pmID', part.APART_ID);
            this.tsrm.Assign_TIC_Parts(formData).subscribe(response => {
                if (response['result'] === 'success') {
                    this.Load_TIC_Parts_All();
                    this.create.Load_Tickets_Parts();
                    this.edtComponent.Load_Tickets_Parts();
                }
            });
        });
        swal({
            title: 'Selected!',
            text: 'Parts selected successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
        this.ClosePartModal();
    }

  RemovePart(PartID) {
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        formData.append('pmID', PartID);
        formData.append('tripID', this.TripID);
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Part will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                that.tsrm.Remove_TIC_Parts(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_TIC_Parts_All();
                            that.create.Load_Tickets_Parts();
                            that.edtComponent.Load_Tickets_Parts();
                            swal({
                                title: 'Deleted!',
                                text: 'Part Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

  /*Instruction*/
  ShowInstructionModal() {
      if (this.TSOM_ID !== '') {
          this.Load_Acc_Sol_INS(this.ASOM_ID);
          this.INS_Form.reset();
          $(function () {
              $('.dropify-clear').click();
              let drEvent = $('.dropify').dropify();
              drEvent = drEvent.data('dropify');
              drEvent.resetPreview();
              drEvent.clearElement();
              $('#Instruction').modal();
          });
      } else {
          $.notify({
              title: '<strong>Troubleshoot Not Selected.</strong><br>',
              message: 'Please select a Troubleshoot.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      }
  }

  CloseInstructionModal() {
      this.INS_Form.reset();
      $(function () {
          $('#Instruction').modal('hide');
      });
      this.Load_Acc_Assigned_INS();
  }

  get aINSList(): FormArray {
        return this.AssignINSForm.get('aINSList') as FormArray;
    };

  Load_Acc_Assigned_INS() {
        const formData = new FormData();
        formData.append('tsrdID', this.ServiceRequestID);
        this.tsrm.Load_ACC_Assigned_INS(formData).subscribe(instructions => {
            this.AssignedInstructionArray = instructions;
            const assignedINS_Array = [];
            for (const aINS of this.AssignedInstructionArray) {
                assignedINS_Array.push(this.fb.group({
                    isChosen: true,
                    AINS_NAME: aINS.AIM_Name,
                    AINS_ID: aINS.AIM_KeyID,
                    TSOM_ID: aINS.TSOM_KeyID,
                    AINS_PDF_PATH: aINS.AIM_PDF_File
                }));
            }
            this.AssignINSForm = this.fb.group({
                aINSList: this.fb.array(assignedINS_Array)
            });
        });
    }

  Load_Acc_Sol_INS(ASOM_ID) {
      this.asrm.Load_ASR_INS(ASOM_ID).subscribe(instructions => {
          this.AssignedInstructionArray = instructions;
          const assignedINS_Array = [];
          for (const aINS of this.AssignedInstructionArray) {
              assignedINS_Array.push(this.fb.group({
                  isChosen: false,
                  AINS_NAME: aINS.AIM_Name,
                  AINS_ID: aINS.AIM_KeyID,
                  TSOM_ID: aINS.TSOM_KeyID,
                  AINS_PDF_PATH: aINS.AIM_PDF_File
              }));
          }
          this.AssignINSForm = this.fb.group({
              aINSList: this.fb.array(assignedINS_Array)
          });
      });
  }

    INSSelectAll($event) {
        this.InsSelectAllValue = !this.InsSelectAllValue;
        const assignedINS_Array = [];
        for (const aINS of this.AssignedInstructionArray) {
            assignedINS_Array.push(this.fb.group({
                isChosen: this.InsSelectAllValue,
                AINS_NAME: aINS.AIM_Name,
                AINS_ID: aINS.AIM_KeyID,
                TSOM_ID: aINS.TSOM_KeyID,
                AINS_PDF_PATH: aINS.AIM_PDF_File
            }));
        }
        this.AssignINSForm = this.fb.group({
            aINSList: this.fb.array(assignedINS_Array)
        });
    }

  Load_Ins_List_All() {
        const formData = new FormData();
        formData.append('tsrdID', this.ServiceRequestID);
        this.tsrm.Load_TIC_INS_ALL(formData).subscribe(instructions => {
            this.InstructionArray = instructions;
        });
    }

  Submit_Selected_INS() {
        const items = this.AssignINSForm.value;
        this.SelectedAInstructionArray = items.aINSList.filter(ins => ins.isChosen).map(ins => { return {AINS_NAME : ins.AINS_NAME, AINS_ID: ins.AINS_ID, TSOM_ID: ins.TSOM_ID, AINS_PDF_PATH: ins.AINS_PDF_PATH}; });
        this.SelectedAInstructionArray.forEach(instruction => {
            const formData = new FormData();
            formData.append('tsomID', this.TSOM_ID);
            formData.append('ainsID', instruction.AINS_ID);
            this.tsrm.Assign_TIC_INS(formData).subscribe(response => {
                if (response['result'] === 'success') {
                    this.Load_Ins_List_All();
                }
            });
        });
        swal({
            title: 'Selected!',
            text: 'Document assigned successfully',
            type: 'success',
            confirmButtonClass: 'btn-success'
        });
        this.CloseInstructionModal();
    }

  Save_ASR_INS(value) {
        const PDF = this.INS_File.nativeElement;
        if (PDF.files && PDF.files[0]) {
            this.INS_Upload_File = PDF.files[0];
        }
        const genPDFFile: File = this.INS_Upload_File;
            let Desc;
            if (value.InsDesc === null) {
                Desc = '';
            } else {
                Desc = value.InsDesc;
            }
            const formData = new FormData();
            formData.append('instruction', value.InsName);
            formData.append('description', Desc);
            formData.append('insFile', genPDFFile);
            formData.append('tsomID', this.TSOM_ID);
            this.tsrm.Create_TIC_INS(formData).subscribe(
                event => {
                    this.Document_Upload_Status = true;
                    this.Document_Create_Button_Status = false;
                    if (event.type === HttpEventType.UploadProgress) {
                        this.DocumentUploadProgress = Math.round((event.loaded / event.total) * 100);
                    } else if (event.type === HttpEventType.Response) {
                        this.Document_Upload_Status = false;
                        this.Document_Create_Button_Status = true;
                        let response: any;
                        response = event.body;
                        if (response.result === 'success') {
                            this.Load_Ins_List_All();
                            this.INS_Form.reset();
                            this.CloseInstructionModal();
                            swal({
                                title: 'Created!',
                                text: 'Document Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                }
            );
    }

  Delete_Acc_INS(INS_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This document will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                const formData: FormData = new FormData();
                formData.append('tinsID', INS_ID);
                that.tsrm.Delete_TIC_INS(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_Ins_List_All();
                            swal({
                                title: 'Deleted!',
                                text: 'Document Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
  }

  /*Images*/
  ShowImageModal() {
      if (this.TSOM_ID !== '') {
          this.Load_ACC_SOL_Images(this.ASOM_ID);
          this.INS_PDF_Form.reset();
          $(() => {
              $('.dropify-clear').click();
              let drEvent = $('.dropify').dropify();
              drEvent = drEvent.data('dropify');
              drEvent.resetPreview();
              drEvent.clearElement();
              $('#Images').modal();
          });
      } else {
          $.notify({
              title: '<strong>Troubleshoot Not Selected.</strong><br>',
              message: 'Please select a Troubleshoot.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      }
  }

  CloseImageModal() {
      this.INS_PDF_Form.reset();
      $(() => {
          $('#Images').modal('hide');
      });
      this.LoadAccImageList();
  }

  get aIMGList(): FormArray {
      return this.AImageForm.get('aIMGList') as FormArray;
  };

  LoadAccImageList() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_ACC_INS_PDF(formData).subscribe(images => {
          this.AssignedImagesArray = images;
          const assignedImage_Array = [];
          for (const aIMG of this.AssignedImagesArray) {
              assignedImage_Array.push(this.fb.group({
                  isChosen: true,
                  AIMG_NAME: aIMG.AIPDFM_Name,
                  AIMG_ID: aIMG.AIPDFM_KeyID,
                  TSOM_ID: aIMG.TSOM_KeyID,
                  AIMG_PATH: aIMG.AIPDFM_PDF_PATH
              }));
          }
          this.AImageForm = this.fb.group({
              aIMGList: this.fb.array(assignedImage_Array)
          });
      });
  }

  Load_ACC_SOL_Images(ASOM_ID) {
      this.asrm.Load_ASR_INS_PDF(ASOM_ID).subscribe(images => {
          this.AssignedImagesArray = images;
          const assignedImage_Array = [];
          for (const aIMG of this.AssignedImagesArray) {
              assignedImage_Array.push(this.fb.group({
                  isChosen: false,
                  AIMG_NAME: aIMG.AIPDFM_Name,
                  AIMG_ID: aIMG.AIPDFM_KeyID,
                  TSOM_ID: aIMG.TSOM_KeyID,
                  AIMG_PATH: aIMG.AIPDFM_PDF_PATH
              }));
          }
          this.AImageForm = this.fb.group({
              aIMGList: this.fb.array(assignedImage_Array)
          });
      });
  }

    ImageSelectAll($event) {
        this.ImageSelectAllValue = !this.ImageSelectAllValue;
        const assignedImage_Array = [];
        for (const aIMG of this.AssignedImagesArray) {
            assignedImage_Array.push(this.fb.group({
                isChosen: this.ImageSelectAllValue,
                AIMG_NAME: aIMG.AIPDFM_Name,
                AIMG_ID: aIMG.AIPDFM_KeyID,
                TSOM_ID: aIMG.TSOM_KeyID,
                AIMG_PATH: aIMG.AIPDFM_PDF_PATH
            }));
        }
        this.AImageForm = this.fb.group({
            aIMGList: this.fb.array(assignedImage_Array)
        });
    }

  SubmitAIMGSelectedList() {
      const items = this.AImageForm.value;
      this.SelectedAImagesArray = items.aIMGList.filter(img => img.isChosen).map(img => { return {AIMG_NAME : img.AIMG_NAME, AIMG_ID: img.AIMG_ID, TSOM_ID: img.TSOM_ID, AIMG_PATH: img.AIMG_PATH}; });
      this.SelectedAImagesArray.forEach(image => {
          const formData = new FormData();
          formData.append('tsomID', this.TSOM_ID);
          formData.append('ipdfID', image.AIMG_ID);
          this.tsrm.Assign_TIC_INS_PDF(formData).subscribe(response => {
              if (response['result'] === 'success') {
                  this.Load_All_Images();
              }
          });
      });
      swal({
          title: 'Selected!',
          text: 'Image selected successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
      this.CloseImageModal();
  }

  Load_All_Images() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_ACC_INS_PDF_All(formData).subscribe(images => {
          this.ImagesArray = images;
      });
  }

  ASR_INS_PDF_Save(value) {
        const PDF = this.Ins_Pdf.nativeElement;
        if (PDF.files && PDF.files[0]) {
            this.InsPDF_File = PDF.files[0];
        }
        const pdfFile: File = this.InsPDF_File;
            const formData: FormData = new FormData();
            formData.append('tsomID', this.TSOM_ID);
            formData.append('name', value.InsPdfName);
            formData.append('status', value.InsPDFStatus);
            formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            this.tsrm.Create_TIC_INS_PDF(formData).subscribe(
                event => {
                    this.Image_Upload_Status = true;
                    this.Image_Create_Button_Status = false;
                    if (event.type === HttpEventType.UploadProgress) {
                        this.ImageUploadProgress = Math.round((event.loaded / event.total) * 100);
                    } else if (event.type === HttpEventType.Response) {
                        this.Image_Upload_Status = false;
                        this.Image_Create_Button_Status = true;
                        let response: any;
                        response = event.body;
                        if (response.result === 'success') {
                            this.Load_All_Images();
                            this.INS_PDF_Form.reset();
                            this.CloseImageModal();
                            swal({
                                title: 'Created!',
                                text: 'Image Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                }
            );
    }

  Delete_TIC_INS_PDF(IPDF_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This image will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                const formData: FormData = new FormData();
                formData.append('tins_pdf_ID', IPDF_ID);
                that.tsrm.Delete_TIC_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_All_Images();
                            swal({
                                title: 'Deleted!',
                                text: 'Image Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }

  /*Videos*/
  ShowVideoModal() {
      if (this.TSOM_ID !== '') {
          this.Load_Acc_Sol_Video(this.ASOM_ID);
          this.Gen_Ins_PDF_Form.reset();
          $(() => {
              $('.dropify-clear').click();
              let drEvent = $('.dropify').dropify();
              drEvent = drEvent.data('dropify');
              drEvent.resetPreview();
              drEvent.clearElement();
              $('#Videos').modal();
          });
      } else {
          $.notify({
              title: '<strong>Troubleshoot Not Selected.</strong><br>',
              message: 'Please select a Troubleshoot.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      }
  }

  CloseVideoModal() {
      this.Gen_Ins_PDF_Form.reset();
      $(() => {
          $('#Videos').modal('hide');
      });
      this.Load_ACC_Video_List();
  }

  get aVIDEOList(): FormArray {
      return this.AVideoForm.get('aVIDEOList') as FormArray;
  };

  Load_ACC_Video_List() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_ACC_GEN_INS_PDF(formData).subscribe(videos => {
          this.AssignedVideoArray = videos;
          const assignedVideo_Array = [];
          for (const aVID of this.AssignedVideoArray) {
              assignedVideo_Array.push(this.fb.group({
                  isChosen: true,
                  AVID_NAME: aVID.AGGIPDF_Name,
                  AVID_ID: aVID.AGIPDF_KeyID,
                  TSOM_ID: aVID.TSOM_KeyID,
                  AVID_PATH: aVID.AGGIPDF_PDF_PATH
              }));
          }
          this.AVideoForm = this.fb.group({
              aVIDEOList: this.fb.array(assignedVideo_Array)
          });
      });
  }

  Load_Acc_Sol_Video(ASOM_ID) {
      this.asrm.Load_ASR_GEN_INS_PDF(ASOM_ID).subscribe(videos => {
          this.AssignedVideoArray = videos;
          const assignedVideo_Array = [];
          for (const aVID of this.AssignedVideoArray) {
              assignedVideo_Array.push(this.fb.group({
                  isChosen: false,
                  AVID_NAME: aVID.AGGIPDF_Name,
                  AVID_ID: aVID.AGIPDF_KeyID,
                  TSOM_ID: aVID.TSOM_KeyID,
                  AVID_PATH: aVID.AGGIPDF_PDF_PATH
              }));
          }
          this.AVideoForm = this.fb.group({
              aVIDEOList: this.fb.array(assignedVideo_Array)
          });
      });
  }

    VideoSelectAll($event) {
        this.VideoSelectAllValue = !this.VideoSelectAllValue;
        const assignedVideo_Array = [];
        for (const aVID of this.AssignedVideoArray) {
            assignedVideo_Array.push(this.fb.group({
                isChosen: this.VideoSelectAllValue,
                AVID_NAME: aVID.AGGIPDF_Name,
                AVID_ID: aVID.AGIPDF_KeyID,
                TSOM_ID: aVID.TSOM_KeyID,
                AVID_PATH: aVID.AGGIPDF_PDF_PATH
            }));
        }
        this.AVideoForm = this.fb.group({
            aVIDEOList: this.fb.array(assignedVideo_Array)
        });
    }

  SubmitSelectedAVideosList() {
      const items = this.AVideoForm.value;
      this.SelectedAVideoArray = items.aVIDEOList.filter(video => video.isChosen).map(video => { return {AVID_NAME : video.AVID_NAME, AVID_ID: video.AVID_ID, TSOM_ID: video.TSOM_ID, AVID_PATH: video.AVID_PATH}; });
      this.SelectedAVideoArray.forEach(video => {
          const formData = new FormData();
          formData.append('tsomID', this.TSOM_ID);
          formData.append('GPDF_ID', video.AVID_ID);
          this.tsrm.Assign_TIC_GEN_INS_PDF(formData).subscribe(response => {
              if (response['result'] === 'success') {
                  this.Load_Video_List_All();
              }
          });
      });
      swal({
          title: 'Selected!',
          text: 'Video selected successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
      this.CloseVideoModal();
  }

  Load_Video_List_All() {
      const formData = new FormData();
      formData.append('tsrdID', this.ServiceRequestID);
      this.tsrm.Load_TIC_GEN_INS_PDF_ALL(formData).subscribe(videos => {
          this.VideoArray = videos;
      });
  }

  Save_ASR_GEN_INS_PDF(value) {
            const PDF = this.Gen_Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.GenPDF_File = PDF.files[0];
            }
            const genPDFFile: File = this.GenPDF_File;
            const formData: FormData = new FormData();
            formData.append('tsomID', this.TSOM_ID);
            formData.append('name', value.GenPDFName);
            formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
            this.tsrm.Create_TIC_GEN_INS_PDF(formData).subscribe(
                event => {
                    this.Video_Upload_Status = true;
                    this.Video_Create_Button_Status = false;
                    if (event.type === HttpEventType.UploadProgress) {
                        this.VideoUploadProgress = Math.round((event.loaded / event.total) * 100);
                    } else if (event.type === HttpEventType.Response) {
                        this.Video_Upload_Status = false;
                        this.Video_Create_Button_Status = true;
                        let response: any;
                        response = event.body;
                        if (response.result === 'success') {
                            this.Load_Video_List_All();
                            this.Gen_Ins_PDF_Form.reset();
                            this.CloseVideoModal();
                            swal({
                                title: 'Created!',
                                text: 'Video Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                }
            );
    }

  Delete_TIC_GEN_INS_PDF(GPDF_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This video will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                const formData: FormData = new FormData();
                formData.append('TGEN_INS_PDF_ID', GPDF_ID );
                that.tsrm.Remove_TIC_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_Video_List_All();
                            swal({
                                title: 'Deleted!',
                                text: 'Video Deleted Successfully',
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
