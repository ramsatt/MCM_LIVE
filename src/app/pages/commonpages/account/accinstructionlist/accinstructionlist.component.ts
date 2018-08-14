import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ModelsService } from '../../../settings/models/services/models.service';
import { AccountservicerequestService } from '../services/accserreq/accountservicerequest.service';
import { RequestOptions, Headers } from '@angular/http';
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;


@Component({
  selector: 'app-accinstructionlist',
  templateUrl: './accinstructionlist.component.html',
  styleUrls: ['./accinstructionlist.component.scss']
})
export class AccinstructionlistComponent implements OnInit, OnChanges {
  submitted = false;
  active = true;
  @Input() AccountID;
  ModelsArray: any = [];
  ModelID: any = '';
  AssignedSerReqArray: any = [];
  UnAssignedSerReqArray: any = [];
  ResultArray: any = [];
  KnownIssuesArray: any = [];
  KIUnassignedArray: any = [];
  KnownIssues: any = '';
  Selected_KI_ID: any = '';
  AMS_ID: any = '';
  SRM_ID: any = '';
  SolutionListArray: any = [];
  PartsArrayList: any = [];
  InstructionListArray: any = [];
  InstructionPDFArray: any = [];
  GenInsPDFArray: any = [];
  KIModelTitle: any = '';
  KIModelButtonPrimary: any = '';
  KIModelButtonSec: any = '';
  SOMModelTitle: any = '';
  SOMModelButtonPrimary: any = '';
  SOMModelButtonSec: any = '';
  PartModelTitle: any = '';
  PartModelButtonPrimary: any = '';
  PartModelButtonSec: any = '';
  UnAssignPartsArray: any = [];
  UnassignedSollutionArray: any = [];
  Solution: any = '';
  AKISD_KeyID: any = '';
  InsListModalTitle: any = '';
  InsListModalButtonPrimary: any = '';
  InsListModalButtonSec: any = '';
  UnAssignInsListArray: any = [];
  InsListName: any = '';
  InsListDesc: any = '';
  InsListPDFModalTitle: any = '';
  InsListPDFModalBtnPri: any = '';
  InsListPDFModalBtnSec: any = '';
  UnAssignedInsPDFArray: any = [];
  ILPDF_Name: any = '';
  ILPDF_Primary: any = '';
  GenInsPDFModalTitle: any = '';
  GenInsPDFModalBtnPri: any = '';
  GenInsPDFModalBtnSec: any = '';
  GenInsPDFName: any = '';
  UnAssignGenInsPDFArray: any = [];
  InsPDF_File: File;
  GenInsPDF_File: File;
  @ViewChild('Insfile') insPDFFile;
  @ViewChild('GenInsfile') GeninsPDFFile;
  serReqselectedRow: Number;
  serReqsetClickedRow: Function;
  KIMselectedRow: Number;
  KIMClickedRow: Function;
  SOMselectedRow: Number;
  SOMClickedRow: Function;
  Ins_PDF_Path: any = '';
  SelectedSolutionID: any = '';
  userID: any = '';
    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;


  constructor( public modelSer: ModelsService, public accSerReq: AccountservicerequestService,public menu:MenumanagementService) {
      this.Loadbuttons();
      this.userID = localStorage.getItem('ucmid');
      this.serReqsetClickedRow = function(index){
          this.serReqselectedRow = index;

      };
      /* KnownIssue */
      this.KIMClickedRow = function(index){
          this.KIMselectedRow = index;
      };
      /* Solutions */
      this.SOMClickedRow = function(index){
          this.SOMselectedRow = index;
      };
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.LoadAccModels(this.AccountID);
  }

  onSubmit() {
      this.submitted = false;
  }

  public LoadAccModels(Account_ID) {
    this.modelSer.LoadAccModels(Account_ID).subscribe(
        data => {
          this.ModelsArray = data;

        }
    );
  }

  public LoadServiceRequest(Model_ID) {
    this.ModelID = Model_ID;
    this.accSerReq.LoadAssignedRequestList(this.AccountID, this.ModelID).subscribe(
        data => {
          this.AssignedSerReqArray = data;

        }
    );
  }

  public LoadUnAssignedServiceRequest(Model_ID) {
    this.accSerReq.LoadUnAssignedRequestList(this.AccountID, Model_ID).subscribe(
        data => {
          this.UnAssignedSerReqArray = data;
        }
    );
  }

  ShowAssignSerReqModel() {
    if ( this.ModelID === '') {
      $.notify({
        title: '<strong>Model Not Setected.</strong><br>',
        message: 'Please select the model.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.LoadUnAssignedServiceRequest(this.ModelID);
      $(function () {
        $('#assignSerReq').modal();
      });
    }
  }

  AssignServiceRequest(SerReq_ID) {
    this.accSerReq.AssignSerReq(this.AccountID, this.ModelID, SerReq_ID).subscribe(
        data => {
          this.ResultArray = data;
          this.LoadServiceRequest(this.ModelID);
          if ( this.ResultArray[0].result === 'success' ) {
              this.LoadUnAssignedServiceRequest(this.ModelID);
            swal({
              title: 'Assigned!',
              text: 'Service Request Assigned Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
          }
        }
    );
  }


  LoadACCKnownIssues(AMS_ID, SRM_ID) {
    this.AMS_ID = AMS_ID;
    this.SRM_ID = SRM_ID;
    this.KIMselectedRow = -1;
    this.SOMselectedRow = -1;
    this.SolutionListArray = [];
    this.InstructionListArray = [];
    this.PartsArrayList = [];
    this.InstructionPDFArray = [];
    this.GenInsPDFArray = [];


    this.accSerReq.LoadAccKI(AMS_ID).subscribe(
        data => {
          this.KnownIssuesArray = data;

        }
    );
  }

  SelectedSoletion(id) {
    this.SelectedSolutionID = id;
  }

  LoadACCSolutions(KI_ID) {
    this.Selected_KI_ID = KI_ID;
      this.SOMselectedRow = -1;
      this.InstructionListArray = [];
      this.PartsArrayList = [];
      this.InstructionPDFArray = [];
      this.GenInsPDFArray = [];

    this.accSerReq.LoadAccSolution(KI_ID).subscribe(
        data => {
          this.SolutionListArray = data;

        }
    );
  }

  LoadAccParts(AKISD_KeyID) {
      this.AKISD_KeyID = AKISD_KeyID;
      this.accSerReq.LoadAccParts(AKISD_KeyID).subscribe(
        data => {
          this.PartsArrayList = data;
        }
        );
  }

  LoadAccInsList(AKISD_KeyID) {
    this.accSerReq.LoadAccInsList(AKISD_KeyID).subscribe(
        data => {
          this.InstructionListArray = data;
        }
    );
  }

  LoadAccInsPDF(AKISD_KeyID) {
    this.accSerReq.LoadAccInsPDF(AKISD_KeyID).subscribe(
        data => {
          this.InstructionPDFArray = data;
        }
    );
  }

  LoadAccGenInsPDF(AKISD_KeyID) {
        this.accSerReq.LoadAccGenInsPDF(AKISD_KeyID).subscribe(
            data => {
                this.GenInsPDFArray = data;
            }
        );
  }

  ShowKIModel() {
      if ( this.AMS_ID === '' ) {
          $.notify({
              title: '<strong>Service Request Not Setected.</strong><br>',
              message: 'Please select the Service request.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.LoadUnassignedKI(this.SRM_ID);
          this.KIModelTitle = 'Create Known Issue';
          this.KIModelButtonPrimary = 'create';
          this.KIModelButtonSec = 'Cancel';
          $(function () {
              $('#KnownIssues').modal();
          });
      }

  }

  hideKnownIssues() {
      this.KnownIssues = '';
      $(function () {
          $('#KnownIssues').modal('hide');
      });
  }

  ShowSOMModel() {
      if ( this.Selected_KI_ID === '' ) {
          $.notify({
              title: '<strong>Known Issue Not Setected.</strong><br>',
              message: 'Please select the Known Issue.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.SOMModelTitle = 'Create Solution';
          this.SOMModelButtonPrimary = 'create';
          this.SOMModelButtonSec = 'Cancel';
          this.LoadUnassignedSolutions(this.Selected_KI_ID);
          $(function () {
              $('#Solutions').modal();
          });
      }
  }

  hideSOMModal() {
        this.Solution = '';
        $(function () {
            $('#Solutions').modal('hide');
        });
  }

  ShowPartsModel() {
      if ( this.AKISD_KeyID === '' ) {
          $.notify({
              title: '<strong>Solution Not Setected.</strong><br>',
              message: 'Please select the Solution.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.LoadUnassignParts(this.AKISD_KeyID);
          this.PartModelTitle = 'Create Part';
          this.PartModelButtonPrimary = 'create';
          this.PartModelButtonSec = 'Cancel';
          $(function () {
              $('#Parts').modal();
          });
      }
  }

  ShowInsListModel() {
      if ( this.AKISD_KeyID === '' ) {
          $.notify({
              title: '<strong>Solution Not Setected.</strong><br>',
              message: 'Please select the Solution.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.LoadUnassignInsList(this.AKISD_KeyID);
          this.InsListModalTitle = 'Create Instruction';
          this.InsListModalButtonPrimary = 'create';
          this.InsListModalButtonSec = 'Cancel';
          $(function () {
              $('#InsList').modal();
          });
      }
  }

  HideInsListModel() {
      this.InsListName = '';
      this.InsListDesc = '';
      $(function () {
          $('#InsList').modal('hide');
      });
  }

  ShowInsPDFModel() {
      if ( this.AKISD_KeyID === '' ) {
          $.notify({
              title: '<strong>Solution Not Setected.</strong><br>',
              message: 'Please select the Solution.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.LoadUnAssign_INS_PDF(this.AKISD_KeyID);
          this.InsListPDFModalTitle = 'Create Instruction PDF';
          this.InsListPDFModalBtnPri = 'create';
          this.InsListPDFModalBtnSec = 'Cancel';
          $(function () {
              $('#InsListPDF').modal();
          });
      }
  }

  HideInsPDFModel () {
      this.ILPDF_Name = '';
      this.ILPDF_Primary = 'NO';
      $(function () {
          $('#InsListPDF').modal('hide');
          $('.dropify-clear').click();
      });
  }

  ShowGenInsPDFModel() {
      if ( this.AKISD_KeyID === '' ) {
          $.notify({
              title: '<strong>Solution Not Selected.</strong><br>',
              message: 'Please select the Solution.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });
      } else {
          this.GenInsPDFModalTitle = 'Create General Instruction PDF';
          this.GenInsPDFModalBtnPri = 'create';
          this.GenInsPDFModalBtnSec = 'Cancel';
          this.LoadUnAssign_GEN_INS_PDF(this.AKISD_KeyID);
          $(function () {
              $('#GenInsPDF').modal();
          });
      }
  }

    HideGenInsPDFModel () {
      this.GenInsPDFName = '';
        $(function () {
            $('#GenInsPDF').modal('hide');
            $('.dropify-clear').click();
        });
    }

  CreateAccKI() {
      this.accSerReq.CreateAccKI(this.SRM_ID, this.AMS_ID, this.KnownIssues).subscribe(
          data => {
              this.ResultArray = data;
              this.LoadACCKnownIssues(this.AMS_ID, this.SRM_ID);
              if ( this.ResultArray[0].result === 'success' ) {
                  this.hideKnownIssues();
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

  LoadUnassignedKI(SR_ID) {
      this.accSerReq.LoadUnassignedKI(SR_ID).subscribe(
          data => {
              this.KIUnassignedArray = data;
          }
      );
  }

  AssignAccKI(KIM_ID) {
      this.accSerReq.AssignACC_KI(this.SRM_ID, this.AMS_ID, KIM_ID).subscribe(
          data => {
              this.ResultArray = data;
              this.LoadACCKnownIssues(this.AMS_ID, this.SRM_ID);
              if ( this.ResultArray[0].result === 'success' ) {
                  this.hideKnownIssues();
                  swal({
                      title: 'Assigned!',
                      text: 'Known Issue Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
  }

  LoadUnassignedSolutions(AMS_ID) {
      this.accSerReq.LoadUnassignedSOM(AMS_ID).subscribe(
          data => {
              this.UnassignedSollutionArray = data;
          }
      );
  }

  AssignAcc_Solution(SOM_ID) {
      this.accSerReq.AssignAcc_SOM(this.Selected_KI_ID, SOM_ID).subscribe(
          data => {
              this.ResultArray = data;
              if ( this.ResultArray[0].result === 'success' ) {
                  this.hideSOMModal();
                  this.LoadACCSolutions(this.Selected_KI_ID);
                  swal({
                      title: 'Assigned!',
                      text: 'Solution Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
  }

  CreateACCSolution() {
      this.accSerReq.CreateACC_SOM(this.Selected_KI_ID, this.Solution).subscribe(
          data => {
              this.ResultArray = data;
              this.LoadACCSolutions(this.Selected_KI_ID);
              if ( this.ResultArray[0].result === 'success' ) {
                  this.hideSOMModal();
                  swal({
                      title: 'Created!',
                      text: 'Solution Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );

    }

    LoadUnassignParts(AKISD_KEYID) {
      this.accSerReq.LoadUnassignParts(AKISD_KEYID).subscribe(
          data => {
              this.UnAssignPartsArray = data;
          }
      );
    }

    AssignPart(PART_ID) {
      this.accSerReq.AssignPart(this.AKISD_KeyID, PART_ID).subscribe(
          data => {
              this.ResultArray = data;
              if ( this.ResultArray[0].result === 'success' ) {
                  this.LoadAccParts(this.AKISD_KeyID);
                  swal({
                      title: 'Assigned!',
                      text: 'Parts Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
    }

    LoadUnassignInsList(AKISD_KEYID) {
      this.accSerReq.LoadUnassignInsList(AKISD_KEYID).subscribe(
          data => {
              this.UnAssignInsListArray = data;
          }
      );
    }

    AssignInsList(INS_ID) {
      this.accSerReq.AssignInsList(this.AKISD_KeyID, INS_ID).subscribe(
          data => {
              this.ResultArray = data;
              if ( this.ResultArray[0].result === 'success' ) {
                  this.LoadAccInsList(this.AKISD_KeyID);
                  swal({
                      title: 'Assigned!',
                      text: 'Instruction Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
    }

    CreateInsList() {
      this.accSerReq.CreateInsList(this.AKISD_KeyID, this.InsListName, this.InsListDesc).subscribe(
          data => {
              this.ResultArray = data;
              this.LoadAccInsList(this.AKISD_KeyID);
              if ( this.ResultArray[0].result === 'success' ) {
                  this.hideSOMModal();
                  swal({
                      title: 'Created!',
                      text: 'Instruction Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
    }

    LoadUnAssign_INS_PDF(AKISD_KEYID) {
      this.accSerReq.LoadUnAssignInsPdf(AKISD_KEYID).subscribe(
          data => {
              this.UnAssignedInsPDFArray = data;
          }
      );
    }

    LoadUnAssign_GEN_INS_PDF(AKISD_KEYID) {
        this.accSerReq.LoadUnAssignGenInsPdf(AKISD_KEYID).subscribe(
            data => {
                this.UnAssignGenInsPDFArray = data;
            }
        );
    }

    Assign_INS_PDF(IND_PDF_ID) {
      this.accSerReq.AssignInsPDF(this.AKISD_KeyID, IND_PDF_ID).subscribe(
          data => {
              this.ResultArray = data;
              if ( this.ResultArray[0].result === 'success' ) {
                  this.LoadAccInsPDF(this.AKISD_KeyID);
                  swal({
                      title: 'Assigned!',
                      text: 'Instruction PDF Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
    }

    Assign_GEN_INS_PDF(GEN_IND_ID) {
        this.accSerReq.AssignGenInsPDF(this.AKISD_KeyID, GEN_IND_ID).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadAccGenInsPDF(this.AKISD_KeyID);
                    swal({
                        title: 'Assigned!',
                        text: 'General Instruction PDF Assigned Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    InsPDFSubmit(value) {

        const fi = this.insPDFFile.nativeElement;
        if (fi.files && fi.files[0]) {
            this.InsPDF_File = fi.files[0];
        }
        const file: File = this.InsPDF_File;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('ILPDF_Name', value.ILPDF_Name);
        formData.append('ILPDF_Primary', value.ILPDF_Primary);
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });

        this.accSerReq.InsPDFFormSubmit(formData, options, this.AKISD_KeyID, this.ILPDF_Name, this.ILPDF_Primary)
            .subscribe(
                data => {
                    this.ResultArray = data;
                    this.LoadAccInsPDF(this.AKISD_KeyID);
                    if ( this.ResultArray.result === 'success' ) {
                        this.HideInsPDFModel();
                        swal({
                            title: 'Created!',
                            text: 'Instruction PDF Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
    }

    GenInsPDFSubmit(value) {

        const fi = this.GeninsPDFFile.nativeElement;
        if (fi.files && fi.files[0]) {
            this.GenInsPDF_File = fi.files[0];
        }
        const file: File = this.GenInsPDF_File;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('GIPDF_Name', value.GenInsPDFName);
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });

        this.accSerReq.GenInsPDFFormSubmit(formData, options, this.AKISD_KeyID, this.GenInsPDFName)
            .subscribe(
                data => {
                    this.ResultArray = data;
                    this.LoadAccGenInsPDF(this.AKISD_KeyID);
                    if ( this.ResultArray.result === 'success' ) {
                        this.HideGenInsPDFModel();
                        swal({
                            title: 'Created!',
                            text: 'General Instruction PDF Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                }
            );
    }

    ViewInsPDFModel(path) {
      this.Ins_PDF_Path = 'https://docs.google.com/viewer?url=https://rcc.mcmservice.com/mcmbackend/web/uploads/instruction_pdf/' + this.SelectedSolutionID + '/pdf/' + path + '&embedded=true';

        $(function () {
            $('#ShowInsPDF').modal();
        });
    }

    ViewGenInsPDFModel(path) {
        this.Ins_PDF_Path = 'https://docs.google.com/viewer?url=https://rcc.mcmservice.com/mcmbackend/web/uploads/instruction_pdf/' + this.SelectedSolutionID + '/pdf/' + path + '&embedded=true';

        $(function () {
            $('#ShowGenInsPDF').modal();
        });
    }

    DeleteSR(AMS_ID) {
      this.accSerReq.DeleteSerRequest(AMS_ID).subscribe(
          data => {
              this.ResultArray = data;
              if ( this.ResultArray[0].result === 'success' ) {
                  this.LoadServiceRequest(this.ModelID);
                  this.KIMselectedRow = -1;
                  this.SOMselectedRow = -1;
                  this.KnownIssuesArray = [];
                  this.SolutionListArray = [];
                  this.InstructionListArray = [];
                  this.PartsArrayList = [];
                  this.InstructionPDFArray = [];
                  this.GenInsPDFArray = [];
                  swal({
                      title: 'Deleted!',
                      text: 'Service request deleted successfully.',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
    }

    DeleteKI(isuue_id) {
        this.accSerReq.DeleteKI(isuue_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadACCKnownIssues(this.AMS_ID, this.SRM_ID);
                    this.KIMselectedRow = -1;
                    this.SOMselectedRow = -1;
                    this.SolutionListArray = [];
                    this.InstructionListArray = [];
                    this.PartsArrayList = [];
                    this.InstructionPDFArray = [];
                    this.GenInsPDFArray = [];
                    swal({
                        title: 'Deleted!',
                        text: 'Known issue deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    DeleteSOM(som_id) {
        this.accSerReq.DeleteSOM(som_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadACCSolutions(this.Selected_KI_ID);
                    this.SOMselectedRow = -1;
                    this.InstructionListArray = [];
                    this.PartsArrayList = [];
                    this.InstructionPDFArray = [];
                    this.GenInsPDFArray = [];
                    swal({
                        title: 'Deleted!',
                        text: 'Solutions deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    DeletePart(part_id) {
        this.accSerReq.DeletePart(part_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadAccParts(this.AKISD_KeyID);
                    swal({
                        title: 'Deleted!',
                        text: 'Part deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    DeleteIns(ins_id) {
        this.accSerReq.DeleteIns(ins_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadAccInsList(this.AKISD_KeyID);
                    swal({
                        title: 'Deleted!',
                        text: 'Instruction list deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    DeleteInsPDF(ipdf_id) {
        this.accSerReq.DeleteInsPDF(ipdf_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadAccInsPDF(this.AKISD_KeyID);
                    swal({
                        title: 'Deleted!',
                        text: 'Instruction pdf deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    DeleteGenPDF(gpdf_id) {
        this.accSerReq.DeleteGenInsPDF(gpdf_id).subscribe(
            data => {
                this.ResultArray = data;
                if ( this.ResultArray[0].result === 'success' ) {
                    this.LoadAccGenInsPDF(this.AKISD_KeyID);
                    swal({
                        title: 'Deleted!',
                        text: 'General Instruction pdf deleted successfully.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }
    Loadbuttons() {
        this.menu.Loadbutton(2,7,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
            }
        );

    }
}
