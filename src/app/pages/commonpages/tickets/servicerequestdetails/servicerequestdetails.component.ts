import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TsrmService} from '../service/tsrm.service';
import {FileValidatorDirective} from '../../../../customDirective/FileValidator.Directive';
import { CreateComponent } from '../create/create.component';
declare var $;
declare var swal;

@Component({
  selector: 'app-servicerequestdetails',
  templateUrl: './servicerequestdetails.component.html',
  styleUrls: ['./servicerequestdetails.component.scss']
})
export class ServicerequestdetailsComponent implements OnInit, OnChanges {
  @Input() TicketID;
  @Input() ServiceRequestID;
  @Input() AccountID;
  @Input() ModelID;
  KIMselectedRow: Number;
  KIMClickedRow: Function;
  SOMselectedRow: Number;
  SOMClickedRow: Function;

  /*Known Issues*/
  KnownIssuesArray: any = [];
  KI_Form: FormGroup;
  ASR_KI_Modal_Title: any = '';
  ASR_KI_Modal_Btn: any = '';
  kiScltID: any = '';
  KIM_ID: any = '';
  AKIM_ID: any = '';
  kiName: any = '';
  UnassignKIStaus: Boolean;
  UnassignKnownIssueArray: any = [];
  unassignKIForm: FormGroup;
  SelectedKIList = [];

  /*Solutions*/
  SolutionArray: any = [];
  SOL_Form: FormGroup;
  ASR_SOL_Modal_Title: any = '';
  ASR_SOL_Modal_Btn: any = '';
  solScltID: any = '';
  UnassignSOLStaus: Boolean;
  SOM_ID: any = '';
  ASOM_ID: any = '';
  solName: any = '';
  UnassignSolutionArray: any = [];
  unassignSOLForm: FormGroup;
  SelectedSOLList = [];

  /*Parts*/
  PartsArray: any = [];
  UnassignPartsArray: any = [];
  SelectedPartArray: any = [];

  /*Instruction*/
  InstructionArray: any = [];
  INS_Form: FormGroup;
  ASR_INS_Modal_Title: any = '';
  ASR_INS_Modal_Btn: any = '';
  UnassignInstructionAarray: any = [];
  InsName: any = '';
  InsDesc: any = '';
  TINS_ID: any = '';
  AINS_ID: any = '';
  INS_ID: any = '';
  UnassignINSStaus: boolean;
  unassignINSForm: FormGroup;
  SelectedINSList = [];

  /*Instruction PDF*/
  InstructionPDFArray: any = [];
  UnassignInstructionPDFArray: any = [];
  INS_PDF_Form: FormGroup;
  ASR_INS_PDF_Modal_Title: any = '';
  ASR_INS_PDF_Modal_Btn: any = '';
  InsPdfName: any = '';
  InsPDFStatus: any = '';
  ASR_INS_PDF_Assign_Status: boolean;
  TINS_PDF_ID: any = '';
  AINS_PDF_ID: any = '';
  INS_PDF_ID: any = '';
  @ViewChild('INS_PDF') Ins_Pdf;
  InsPDF_File: File;
    unassignImageForm: FormGroup;
    SelectedImageList = [];

  /*General Instruction PDF*/
  GeneralInsPDFArray: any = [];
  Gen_Ins_PDF_Form: FormGroup;
  ASR_GEN_INS_PDF_Modal_Title: any = '';
  ASR_GEN_INS_PDF_Modal_Btn: any = '';
  UnassignGenPDF: any = [];
  GenPDFName: any = '';
  GenPDF_File: File;
  ASR_GEN_INS_PDF_Assign_Status: boolean;
  GEN_INS_PDF_ID: any = '';
  AGEN_INS_PDF_ID: any = '';
  TGEN_INS_PDF_ID: any = '';
  @ViewChild('GEN_INS_PDF') Gen_Ins_Pdf;
    unassignVideoForm: FormGroup;
    SelectedVideoList = [];



  constructor(private tsrmService: TsrmService, private fb: FormBuilder, public createComponent: CreateComponent) {
      /* KnownIssue */
      this.KIMClickedRow = function(index){
          this.KIMselectedRow = index;
      };
      /* Solutions */
      this.SOMClickedRow = function(index){
          this.SOMselectedRow = index;
      };
    this.KI_Form = this.fb.group({
      'kiName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
    });

      const unassignKI_Array = [];
      this.unassignKIForm = this.fb.group({
          uKIList: this.fb.array(unassignKI_Array)
      });

    this.SOL_Form = this.fb.group({
      'solName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
    });

      const unassignSOL_Array = [];
      this.unassignSOLForm = this.fb.group({
          uSOLList: this.fb.array(unassignSOL_Array)
      });

    this.INS_Form = this.fb.group({
      'InsName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'InsDesc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
    });

      const unassignINS_Array = [];
      this.unassignINSForm = this.fb.group({
          uINSList: this.fb.array(unassignINS_Array)
      });

    this.INS_PDF_Form = this.fb.group({
      'InsPdfName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'InsPDFStatus': ['NO', Validators.required],
      'InsPDF_File': [null, FileValidatorDirective.validate]
    });

      const unassignImage_Array = [];
      this.unassignImageForm = this.fb.group({
          uimageList: this.fb.array(unassignImage_Array)
      });

    this.Gen_Ins_PDF_Form = this.fb.group({
      'GenPDFName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'GenPDF_File': [null, FileValidatorDirective.validate]
    });

      const unassignVideo_Array = [];
      this.unassignVideoForm = this.fb.group({
          uvideoList: this.fb.array(unassignVideo_Array)
      });

      $(function () {
          $('#Part_Unassign_List_Table').DataTable();
      });
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Load_TIC_KI(this.ServiceRequestID);
  }

  /*KnownIssues*/
  Load_TIC_KI(TSRD_ID) {
    const formData: FormData = new FormData();
    formData.append('tsrdID', TSRD_ID);
    this.tsrmService.Load_TIC_KI(formData).subscribe(
        data => {
          this.KnownIssuesArray = data;
        }
    );
  }

  get uKIList(): FormArray {
      return this.unassignKIForm.get('uKIList') as FormArray;
  };

  Load_TIC_KI_UnAssignList(TSRD_ID) {
        const formData: FormData = new FormData();
        formData.append('tsrdID', TSRD_ID);
        this.tsrmService.Load_TIC_KI_UnAssign_List(formData).subscribe(
            data => {
                this.UnassignKnownIssueArray = data;
                const unassignKI_Array = [];
                for (const uki of this.UnassignKnownIssueArray) {
                    unassignKI_Array.push(this.fb.group({
                        isChosen: false,
                        KIM_Name: uki.KIM_Known_Issue,
                        KIM_KeyID: uki.KIM_KeyID
                    }));
                }
                this.unassignKIForm = this.fb.group({
                    uKIList: this.fb.array(unassignKI_Array)
                });
            }
        );
  }

  Assign_KI() {
      const items = this.unassignKIForm.value;
      this.SelectedKIList = items.uKIList.filter(x => x.isChosen).map(x => { return { name: x.KIM_Name, id: x.KIM_KeyID}; });
      this.SelectedKIList.forEach(
          KI => {
              const formData: FormData = new FormData();
              formData.append('tsrdID', this.ServiceRequestID);
              formData.append('kiID', KI.id);
              formData.append('modelID', this.ModelID);
              formData.append('accID', this.AccountID);
              this.tsrmService.Assign_TIC_KI(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          this.Load_TIC_KI(this.ServiceRequestID);
                          this.Load_TIC_KI_UnAssignList(this.ServiceRequestID);
                      }
                  }
              );
          }
      );

      swal({
          title: 'Assigned!',
          text: 'Known Issue Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });

  }

  Show_TIC_KI_CreateModel(){
    this.ASR_KI_Modal_Title = 'Create Known Issue';
    this.ASR_KI_Modal_Btn = 'Create';
    this.UnassignKIStaus = true;
    this.Load_TIC_KI_UnAssignList(this.ServiceRequestID);
    $(function () {
      $('#KnownIssue').modal();
    });
  }

  Hide_Acc_KI_Modal_Hide() {
      $(function () {
          $('#KnownIssue').modal('hide');
          $('#KIForm').trigger('reset');
      });
  }

  Show_ACC_KI_Edit_Modal(KI_ID) {
    this.ASR_KI_Modal_Title = 'Update Known Issue';
    this.ASR_KI_Modal_Btn = 'Update';
    this.UnassignKIStaus = false;
    const formData: FormData = new FormData();
    formData.append('tkimID', KI_ID);
    this.tsrmService.Load_TIC_KI_Details(formData).subscribe(
        data => {
            this.KIM_ID = data['TKIM_KIM_KeyID'];
            this.AKIM_ID = data['TKIM_AKIM_KeyID'];
            this.kiScltID = data['TKIM_KeyID'];
            this.kiName = data['TKIM_Known_Issue'];
          this.KI_Form = this.fb.group({
              'kiName': [this.kiName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
          });
          $(function () {
            $('#KnownIssue').modal();
          });
        }
    );
  }

  Save_Acc_KI(value) {
    if (this.ASR_KI_Modal_Btn === 'Create') {
      const formData: FormData = new FormData();
      formData.append('issue', value.kiName);
      formData.append('TSRD_ID', this.ServiceRequestID);
      this.tsrmService.Create_TIC_KI(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Hide_Acc_KI_Modal_Hide();
                        this.Load_TIC_KI(this.ServiceRequestID);
                        swal({
                            title: 'Created!',
                            text: 'Known Issue Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.ASR_KI_Modal_Btn === 'Update') {
            const formData: FormData = new FormData();
            formData.append('issue', value.kiName);
            formData.append('TKIM_ID', this.kiScltID);
            formData.append('AKIM_ID', this.AKIM_ID);
            formData.append('KIM_ID', this.KIM_ID);

            this.tsrmService.Update_TIC_KI(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Hide_Acc_KI_Modal_Hide();
                        this.Load_TIC_KI(this.ServiceRequestID);
                        swal({
                            title: 'Updated!',
                            text: 'Known Issue Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
    }
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
      that.tsrmService.Delete_TIC_KI(formData).subscribe(
          data => {
              let response: any;
              response = data;
              if (response.result === 'success') {
                that.Load_TIC_KI(that.ServiceRequestID);
                that.kiScltID = '';
                that.SolutionArray = [];
                that.solScltID = '';
                that.PartsArray = [];
                that.InstructionArray = [];
                that.InstructionPDFArray = [];
                that.GeneralInsPDFArray = [];
                swal({
                    title: 'Deleted!',
                    text: 'Known Issue Deleted Successfully',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                });
              }
          }
      );
    });
  }

  /*Solutions*/
  Load_TIC_Solutions(TKIM_ID) {
    this.kiScltID = TKIM_ID;
    const formData: FormData = new FormData();
    formData.append('tkimID', TKIM_ID);
    this.tsrmService.Load_TIC_SOL(formData).subscribe(
        data => {
          this.SolutionArray = data;
        }
    );
  }

    get uSOLList(): FormArray {
        return this.unassignSOLForm.get('uSOLList') as FormArray;
    };

  Load_TIC_Solutions_UnAssign_List(TKIM_ID) {
        const formData: FormData = new FormData();
        formData.append('tkimID', TKIM_ID);
        this.tsrmService.Load_TIC_SOL_UnAssign_List(formData).subscribe(
            data => {
                this.UnassignSolutionArray = data;
                const unassignSOL_Array = [];
                for (const usol of this.UnassignSolutionArray) {
                    unassignSOL_Array.push(this.fb.group({
                        isChosen: false,
                        SOM_Name: usol.SOM_Solution,
                        SOM_KeyID: usol.SOM_KeyID
                    }));
                }
                this.unassignSOLForm = this.fb.group({
                    uSOLList: this.fb.array(unassignSOL_Array)
                });
            }
        );
    }

  Assign_Acc_Sol() {
      const items = this.unassignSOLForm.value;
      this.SelectedSOLList = items.uSOLList.filter(x => x.isChosen).map(x => { return { name: x.SOM_Name, id: x.SOM_KeyID}; });
      this.SelectedSOLList.forEach(
          SOL => {
              const formData: FormData = new FormData();
              formData.append('tkimID', this.kiScltID);
              formData.append('SOL_ID', SOL.id);
              this.tsrmService.Assign_TIC_SOL(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          this.Load_TIC_Solutions(this.kiScltID);
                          this.Load_TIC_Solutions_UnAssign_List(this.kiScltID);
                      }
                  }
              );
          }
      );

      $(function () {
          $('#Solutions').modal('hide');
      });
      swal({
          title: 'Assigned!',
          text: 'Solution Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
    }

  Show_TIC_SOM_Create_Modal() {
      if ( this.kiScltID === '') {
          $.notify({
              title: '<strong>Known Issue Not Selected.</strong><br>',
              message: 'Please select a known issue.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.ASR_SOL_Modal_Title = 'Create Solution';
          this.ASR_SOL_Modal_Btn = 'Create';
          this.UnassignSOLStaus = true;
          this.Load_TIC_Solutions_UnAssign_List(this.kiScltID);
          $(function () {
              $('#Solutions').modal();
          });
      }
  }

  Show_Acc_Sol_Edit_Modal(SOL_ID) {
      this.solScltID = SOL_ID;
      this.ASR_SOL_Modal_Title = 'Update Solution';
      this.ASR_SOL_Modal_Btn = 'Update';
      this.UnassignSOLStaus = false;
      const formData: FormData = new FormData();
      formData.append('tsomID', SOL_ID);
      this.tsrmService.Load_TIC_SOL_Details(formData).subscribe(
          data => {
              this.solName = data['TSOM_Solution'];
              this.SOM_ID = data['TSOM_SOM_KeyID'];
              this.ASOM_ID = data['TSOM_ASOM_KeyID'];
              this.SOL_Form = this.fb.group({
                  'solName': [this.solName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
              });
              $(function () {
                  $('#Solutions').modal();
              });
          }
      );

  }

  Hide_Acc_Sol_Modal() {
    $(function () {
      $('#Solutions').modal('hide');
      $('#SOLForm').trigger('reset');
    });
  }

  Save_Acc_SOL(value) {
      if (this.ASR_SOL_Modal_Btn === 'Create') {
          const formData = new FormData();
          formData.append('tkimID', this.kiScltID);
          formData.append('solution', value.solName);
          this.tsrmService.Create_TIC_SOL(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response.result === 'success') {
                      this.Hide_Acc_Sol_Modal();
                      this.Load_TIC_Solutions(this.kiScltID);
                      swal({
                          title: 'Created!',
                          text: 'Solution Created Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
              );
      } else if (this.ASR_SOL_Modal_Btn === 'Update') {
          const formData = new FormData();
          formData.append('tsomID', this.solScltID);
          formData.append('asomID', this.ASOM_ID);
          formData.append('somID', this.SOM_ID);
          formData.append('solution', value.solName);
          this.tsrmService.Update_TIC_SOL(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response.result === 'success') {
                      this.Hide_Acc_Sol_Modal();
                      this.Load_TIC_Solutions(this.kiScltID);
                      swal({
                          title: 'Updated!',
                          text: 'Solution Updated Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
      }
  }

  Delete_Acc_SOL(SOL_ID) {
    const that = this;
    swal({
            title: 'Are you sure?',
            text: 'This Solution will not be able to recover this future!',
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
      that.tsrmService.Delete_TIC_SOL(formData).subscribe(
          data => {
            let response: any;
            response = data;
            if (response.result === 'success') {
              that.Load_TIC_Solutions(that.kiScltID);
              that.PartsArray = [];
              that.InstructionArray = [];
              that.InstructionPDFArray = [];
              that.GeneralInsPDFArray = [];
              swal({
                  title: 'Deleted!',
                  text: 'Solution Deleted Successfully',
                  type: 'success',
                  confirmButtonClass: 'btn-success'
              });
            }
          }
      );
    });
  }

  /*Parts*/
  Load_TIC_Parts(TSOM_ID) {
      this.solScltID = TSOM_ID;
      const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_Parts(formData).subscribe(
        data => {
          this.PartsArray = data;
        }
    );
  }

  Load_TIC_Parts_UnAssin_List(TSOM_ID) {
        $(function () {
            $('#Part_Unassign_List_Table').dataTable().fnDestroy();
        });
        const formData: FormData = new FormData();
        formData.append('tsomID', TSOM_ID);
        this.tsrmService.Load_TIC_Parts_UnAssign_List(formData).subscribe(
            data => {
                this.UnassignPartsArray = data;
                setTimeout(function () {
                    $('#Part_Unassign_List_Table').DataTable(
                        {
                            paging: true,
                            searching: true,
                            order: [[ 0, 'asc']]
                        }
                    );
                }, 1000);
            }
        );
    }

  Assign_ASR_Part() {
      this.SelectedPartArray.forEach(
          data => {
              const formData: FormData = new FormData();
              formData.append('tsomID', this.solScltID);
              formData.append('pmID', data.partID);
              this.tsrmService.Assign_TIC_Parts(formData).subscribe(
                  new_data => {
                      let response: any;
                      response = new_data;
                      if (response.result === 'success') {
                          this.Load_TIC_Parts(this.solScltID);
                          this.createComponent.Load_Tickets_Parts();
                      }
                  }
              );
          }
      );
      this.SelectedPartArray = [];
      this.HidePartModal();
      swal({
          title: 'Assigned!',
          text: 'Parts Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
    }

  ShowPartModal() {
      this.Load_TIC_Parts_UnAssin_List(this.solScltID);
      if (this.solScltID === '') {
          $.notify({
              title: '<strong>Solution Not Selected.</strong><br>',
              message: 'Please select a solution.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {

          $(function () {
              $('#Parts_Modal').modal();
          });
      }
  }

  HidePartModal(){
      $(function () {
          $('#Parts_Modal').modal('hide');
      });
  }

  RemovePart(PartID) {
      const formData: FormData = new FormData();
      formData.append('tsomID', this.solScltID);
      formData.append('pmID', PartID);
      this.tsrmService.Remove_TIC_Parts(formData).subscribe();
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
              that.tsrmService.Remove_TIC_Parts(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          that.Load_TIC_Parts(that.solScltID);
                          that.createComponent.Load_Tickets_Parts();
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
  Load_TIC_INS(TSOM_ID) {
    const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_INS(formData).subscribe(
        data => {
          this.InstructionArray = data;
        }
    );
  }

  Assign_ASR_INS() {
      const items = this.unassignINSForm.value;
      this.SelectedINSList = items.uINSList.filter(x => x.isChosen).map(x => { return { name: x.INS_Name, id: x.INS_KeyID}; });
      this.SelectedINSList.forEach(
          INS => {
              const formData: FormData = new FormData();
              formData.append('tsomID', this.solScltID);
              formData.append('insID', INS.id);
              this.tsrmService.Assign_TIC_INS(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.Load_TIC_INS(this.solScltID);
                          this.Load_TIC_INS_UnAssign_List(this.solScltID);
                      }
                  }
              );
          }
      );

      $(function () {
          $('#Instruction_Modal').modal('hide');
      });
      swal({
          title: 'Assigned!',
          text: 'Instruction Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
    }

    get uINSList(): FormArray {
        return this.unassignINSForm.get('uINSList') as FormArray;
    };

  Load_TIC_INS_UnAssign_List(TSOM_ID) {
    const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_INS_UnAssign_List(formData).subscribe(
        data => {
          this.UnassignInstructionAarray = data;

            const unassignINS_Array = [];
            for (const uins of this.UnassignInstructionAarray) {
                unassignINS_Array.push(this.fb.group({
                    isChosen: false,
                    INS_Name: uins.ILM_Name,
                    INS_KeyID: uins.ILM_KeyID
                }));
            }
            this.unassignINSForm = this.fb.group({
                uINSList: this.fb.array(unassignINS_Array)
            });
        }
    );
  }

  Show_Instruction_Edit_Modal(TINS_ID) {
      this.ASR_INS_Modal_Title = 'Update Instruction';
      this.ASR_INS_Modal_Btn = 'Update';
      this.UnassignINSStaus = false;
      const formData: FormData = new FormData();
      formData.append('tinsID', TINS_ID);
      this.tsrmService.Load_TIC_INS_Details(formData).subscribe(
          data => {
              this.INS_ID = data['TIM_IM_KeyID'];
              this.AINS_ID = data['TIM_AIM_KeyID'];
              this.TINS_ID = data['TIM_KeyID'];
              this.InsName = data['TIM_Name'];
              this.InsDesc = data['TIM_Description'];
              this.INS_Form = this.fb.group({
                    'InsName': [this.InsName,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsDesc': [this.InsDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                });
              $(function () {
                  $('#Instruction_Modal').modal();
              });
          }
      );
  }

  Show_TIC_INS_Create_Modal() {
    this.ASR_INS_Modal_Title = 'Create Instruction';
    this.ASR_INS_Modal_Btn = 'Create';
    this.UnassignINSStaus = true;
    this.Load_TIC_INS_UnAssign_List(this.solScltID);
    $(function () {
      $('#Instruction_Modal').modal();
    });
  }

  Hide_ASR_INS_Modal() {
    $(function () {
      $('#Instruction_Modal').modal('hide');
      $('#INSForm').trigger('reset');
    });
  }

  Save_ASR_INS(value) {
        if (this.ASR_INS_Modal_Btn === 'Create') {
            let Desc;
            if (value.InsDesc === null) {
                Desc = '';
            } else {
                Desc = value.InsDesc;
            }
            const formData = new FormData();
            formData.append('instruction', value.InsName);
            formData.append('description', Desc);
            formData.append('tsomID', this.solScltID);
            this.tsrmService.Create_TIC_INS(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Hide_ASR_INS_Modal();
                        this.Load_TIC_INS(this.solScltID);
                        swal({
                            title: 'Created!',
                            text: 'Instruction Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        } else if (this.ASR_INS_Modal_Btn === 'Update') {
            const formData = new FormData();
            formData.append('instruction', value.InsName);
            formData.append('description', value.InsDesc);
            formData.append('tinsID', this.TINS_ID);
            formData.append('ainsID', this.AINS_ID);
            formData.append('insID', this.INS_ID);
            this.tsrmService.Update_TIC_INS(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Hide_ASR_INS_Modal();
                        this.Load_TIC_INS(this.solScltID);
                        swal({
                            title: 'Updated!',
                            text: 'Instruction Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        }
    }

  Delete_Acc_INS(INS_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This instruction will not be able to recover this future!',
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
                that.tsrmService.Delete_TIC_INS(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_TIC_INS(that.solScltID);
                            swal({
                                title: 'Deleted!',
                                text: 'Instruction Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }


  /*Instruction PDF*/
  Load_TIC_INS_PDF(TSOM_ID) {
    const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_INS_PDF(formData).subscribe(
        data => {
          this.InstructionPDFArray = data;
        }
    );
  }

  Load_TIC_INS_PDF_UnAssign_List(TSOM_ID) {
      const formData: FormData = new FormData();
      formData.append('tsomID', TSOM_ID);
      this.tsrmService.Load_TIC_INS_PDF_UnAssign_List(formData).subscribe(
          data => {
              this.UnassignInstructionPDFArray = data;
          }
      );
  }

  Assign_ASR_INS_PDF() {
      const items = this.unassignImageForm.value;
      this.SelectedImageList = items.uimageList.filter(x => x.isChosen).map(x => { return { name: x.Image_Name, id: x.Image_KeyID}; });
      this.SelectedImageList.forEach(
          image => {
              const formData = new FormData();
              formData.append('tsomID', this.solScltID);
              formData.append('ipdfID', image.id);
              this.tsrmService.Assign_TIC_INS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.Load_TIC_INS_PDF(this.solScltID);
                          this.Load_TIC_INS_PDF_UnAssign_List(this.solScltID);
                      }
                  }
              );
          }
      );

      $(function () {
          $('#Ins_PDF_Modal').modal('hide');
      });
      swal({
          title: 'Assigned!',
          text: 'Image Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
    }

  Show_TIC_INS_PDF_Create_Modal() {
    this.INS_PDF_Form = this.fb.group({
      'InsPdfName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'InsPDFStatus': ['NO', Validators.required],
      'InsPDF_File': [null, FileValidatorDirective.validate]
    });
    this.ASR_INS_PDF_Modal_Title = 'Create Image';
    this.ASR_INS_PDF_Modal_Btn = 'Create';
    this.ASR_INS_PDF_Assign_Status = true;
    this.Load_TIC_INS_PDF_UnAssign_List(this.solScltID);
    $(function () {
      $('#Ins_PDF_Modal').modal();
      $('.dropify').dropify();
    });
  }

  Show_TIC_INS_PDF_Edit_Modal(insPDF_ID) {
        this.ASR_INS_PDF_Modal_Title = 'Update Image';
        this.ASR_INS_PDF_Modal_Btn = 'Update';
        this.ASR_INS_PDF_Assign_Status = false;
        const formData: FormData = new FormData();
        formData.append('tins_pdf_id', insPDF_ID);
        this.tsrmService.Load_TIC_INS_PDF_Details(formData).subscribe(
            data => {
                this.INS_PDF_ID = data['TIPDFM_IPDFM_KeyID'];
                this.AINS_PDF_ID = data['TIPDFM_AIPDFM_KeyID'];
                this.TINS_PDF_ID = data['TIPDFM_KeyID'];
                this.InsPdfName = data['TIPDFM_Name'];
                this.InsPDFStatus = data['TIPDFM_Primary'];
                if (this.InsPDFStatus === 'Y') {
                    this.InsPDFStatus = 'YES';
                } else if (this.InsPDFStatus === 'N') {
                    this.InsPDFStatus = 'NO';
                }
                this.INS_PDF_Form = this.fb.group({
                    'InsPdfName': [this.InsPdfName,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsPDFStatus': [this.InsPDFStatus, Validators.required],
                    'InsPDF_File': [null]
                });
                $(function () {
                    $('#Ins_PDF_Modal').modal();
                    $('.dropify').dropify();
                });
            }
        );
    }

  Hide_ASR_INS_PDF_Modal() {
    $(function () {
      $('#Ins_PDF_Modal').modal('hide');
      $('#INSPDFForm').trigger('reset');
      $('.dropify-clear').click();
      let drEvent = $('.dropify').dropify();
      drEvent = drEvent.data('dropify');
      drEvent.resetPreview();
      drEvent.clearElement();
    });
  }

  ASR_INS_PDF_Save(value) {
        const PDF = this.Ins_Pdf.nativeElement;
        if (PDF.files && PDF.files[0]) {
            this.InsPDF_File = PDF.files[0];
        }
        const pdfFile: File = this.InsPDF_File;
        if (this.ASR_INS_PDF_Modal_Btn === 'Create') {
            const formData: FormData = new FormData();
            formData.append('tsomID', this.solScltID);
            formData.append('name', value.InsPdfName);
            formData.append('status', value.InsPDFStatus);
            formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            this.tsrmService.Create_TIC_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_TIC_INS_PDF(this.solScltID);
                        this.Hide_ASR_INS_PDF_Modal();
                        swal({
                            title: 'Created!',
                            text: 'Image Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );

        } else if (this.ASR_INS_PDF_Modal_Btn === 'Update') {
            const formData: FormData = new FormData();
            if (value.InsPDF_File === null) {
                formData.append('tsomID', this.solScltID);
                formData.append('ins_pdf_ID', this.INS_PDF_ID);
                formData.append('ains_pdf_ID', this.AINS_PDF_ID);
                formData.append('tins_pdf_ID', this.TINS_PDF_ID);
                formData.append('name', value.InsPdfName);
                formData.append('status', value.InsPDFStatus);
            } else {
                formData.append('tsomID', this.solScltID);
                formData.append('ins_pdf_ID', this.INS_PDF_ID);
                formData.append('ains_pdf_ID', this.AINS_PDF_ID);
                formData.append('tins_pdf_ID', this.TINS_PDF_ID);
                formData.append('name', value.InsPdfName);
                formData.append('status', value.InsPDFStatus);
                formData.append('ins_PDF_File', pdfFile, pdfFile.name);
            }
            this.tsrmService.Update_TIC_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_TIC_INS_PDF(this.solScltID);
                        this.Hide_ASR_INS_PDF_Modal();
                        swal({
                            title: 'Updated!',
                            text: 'Image Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        }
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
                that.tsrmService.Delete_TIC_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_TIC_INS_PDF(that.solScltID);
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

    get uimageList(): FormArray {
        return this.unassignImageForm.get('uimageList') as FormArray;
    };

  /*General Instruction PDF*/
  Load_TIC_GEN_INS_PDF(TSOM_ID) {
    const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_GEN_INS_PDF(formData).subscribe(
        data => {
          this.GeneralInsPDFArray = data;
            const unassignImage_Array = [];
            for (const uimage of this.UnassignInstructionPDFArray) {
                unassignImage_Array.push(this.fb.group({
                    isChosen: false,
                    Image_Name: uimage.IPDFM_Name,
                    Image_KeyID: uimage.IPDFM_KeyID
                }));
            }
            this.unassignImageForm = this.fb.group({
                uimageList: this.fb.array(unassignImage_Array)
            });
        }
    );
  }

  Assign_ASR_GEN_INS_PDF() {
      const items = this.unassignVideoForm.value;
      this.SelectedVideoList = items.uvideoList.filter(x => x.isChosen).map(x => { return { name: x.Video_Name, id: x.Video_KeyID}; });
      this.SelectedVideoList.forEach(
          Image => {
              const formData: FormData = new FormData();
              formData.append('tsomID', this.solScltID);
              formData.append('GPDF_ID', Image.id);
              this.tsrmService.Assign_TIC_GEN_INS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.Load_TIC_GEN_INS_PDF(this.solScltID);
                          this.Load_TIC_GEN_INS_PDF_UnAssignList(this.solScltID);
                      }
                  }
              );
          }
      );

      $(function () {
          $('#Gen_INS_PDF_Modal').modal('hide');
      });
      swal({
          title: 'Assigned!',
          text: 'Video Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });
    }

    get uvideoList(): FormArray {
        return this.unassignVideoForm.get('uvideoList') as FormArray;
    };

  Load_TIC_GEN_INS_PDF_UnAssignList(TSOM_ID) {
    const formData: FormData = new FormData();
    formData.append('tsomID', TSOM_ID);
    this.tsrmService.Load_TIC_GEN_INS_PDF_UnAssignList(formData).subscribe(
        data => {
          this.UnassignGenPDF = data;
            const unassignVideo_Array = [];
            for (const uvideo of this.UnassignGenPDF) {
                unassignVideo_Array.push(this.fb.group({
                    isChosen: false,
                    Video_Name: uvideo.GGIPDF_Name,
                    Video_KeyID: uvideo.GIPDF_KeyID
                }));
            }
            this.unassignVideoForm = this.fb.group({
                uvideoList: this.fb.array(unassignVideo_Array)
            });
        }
    );
  }

  Show_TIC_GEN_INS_PDF_Create_Modal() {
    this.Gen_Ins_PDF_Form = this.fb.group({
      'GenPDFName': [null,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'GenPDF_File': [null, FileValidatorDirective.validate]
    });
    this.ASR_GEN_INS_PDF_Modal_Title = 'Create Video';
    this.ASR_GEN_INS_PDF_Modal_Btn = 'Create';
    this.ASR_GEN_INS_PDF_Assign_Status = true;
    this.Load_TIC_GEN_INS_PDF_UnAssignList(this.solScltID);
    $(function () {
      $('#Gen_INS_PDF_Modal').modal();
      $('.dropify').dropify();
    });
  }

  Show_TIC_GEN_INS_PDF_Edit_modal(GPDF_ID) {
      const formData: FormData = new FormData();
      formData.append('TIC_GEN_PDF_ID', GPDF_ID);
        this.tsrmService.Load_TIC_GEN_INS_PDF_Details(formData).subscribe(
            data => {
                this.GEN_INS_PDF_ID = data['TGIPDF_GIPDF_KeyID'];
                this.AGEN_INS_PDF_ID = data['TGIPDF_AGIPDF_KeyID'];
                this.TGEN_INS_PDF_ID = data['TGIPDF_KeyID'];
                this.GenPDFName = data['TGGIPDF_Name'];
                this.Gen_Ins_PDF_Form = this.fb.group({
                    'GenPDFName': [this.GenPDFName,  Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'GenPDF_File': [null]
                });
                this.ASR_GEN_INS_PDF_Modal_Title = 'Update Video';
                this.ASR_GEN_INS_PDF_Modal_Btn = 'Update';
                this.ASR_GEN_INS_PDF_Assign_Status = false;
                $(function () {
                    $('#Gen_INS_PDF_Modal').modal();
                    $('.dropify').dropify();
                });
            }
        );
    }

  Hide_ASR_GEN_INS_PDF_Modal() {
    $(function () {
      $('#Gen_INS_PDF_Modal').modal('hide');
      $('#GenInsPDFForm').trigger('reset');
      $('.dropify-clear').click();
      let drEvent = $('.dropify').dropify();
      drEvent = drEvent.data('dropify');
      drEvent.resetPreview();
      drEvent.clearElement();
    });
  }

  Save_ASR_GEN_INS_PDF(value) {
        if (this.ASR_GEN_INS_PDF_Modal_Btn === 'Create') {
            const PDF = this.Gen_Ins_Pdf.nativeElement;
            if (PDF.files && PDF.files[0]) {
                this.GenPDF_File = PDF.files[0];
            }
            const genPDFFile: File = this.GenPDF_File;
            const formData: FormData = new FormData();
            formData.append('tsomID', this.solScltID);
            formData.append('name', value.GenPDFName);
            formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
            this.tsrmService.Create_TIC_GEN_INS_PDF(formData).subscribe(
                data => {
                    let response: any;
                    response = data;
                    if (response.result === 'success') {
                        this.Load_TIC_GEN_INS_PDF(this.solScltID);
                        this.Hide_ASR_GEN_INS_PDF_Modal();
                        swal({
                            title: 'Created!',
                            text: 'Video Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
        } else if (this.ASR_GEN_INS_PDF_Modal_Btn === 'Update') {
            const formData: FormData = new FormData();
            if (value.GenPDF_File === null) {
                formData.append('tsomID', this.solScltID);
                formData.append('gen_ins_pdf_id', this.GEN_INS_PDF_ID);
                formData.append('agen_ins_pdf_id', this.AGEN_INS_PDF_ID);
                formData.append('tgen_ins_pdf_id', this.TGEN_INS_PDF_ID);
                formData.append('name', value.GenPDFName);
                this.tsrmService.Update_TIC_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Load_TIC_GEN_INS_PDF(this.solScltID);
                            this.Hide_ASR_GEN_INS_PDF_Modal();
                            swal({
                                title: 'Updated!',
                                text: 'Video Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            } else {
                const PDF = this.Gen_Ins_Pdf.nativeElement;
                if (PDF.files && PDF.files[0]) {
                    this.GenPDF_File = PDF.files[0];
                }
                const genPDFFile: File = this.GenPDF_File;
                formData.append('tsomID', this.solScltID);
                formData.append('gen_ins_pdf_id', this.GEN_INS_PDF_ID);
                formData.append('agen_ins_pdf_id', this.AGEN_INS_PDF_ID);
                formData.append('tgen_ins_pdf_id', this.TGEN_INS_PDF_ID);
                formData.append('name', value.GenPDFName);
                formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
                this.tsrmService.Update_TIC_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            this.Load_TIC_GEN_INS_PDF(this.solScltID);
                            this.Hide_ASR_GEN_INS_PDF_Modal();
                            swal({
                                title: 'Updated!',
                                text: 'Video Updated Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }
        }
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
                that.tsrmService.Remove_TIC_GEN_INS_PDF(formData).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response.result === 'success') {
                            that.Load_TIC_GEN_INS_PDF(that.solScltID);
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

    public SelectedPart(PartID) {
      this.SelectedPartArray.push({'partID': PartID});
    }
}
