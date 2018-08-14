import {Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SrmService} from './services/srm.service';
import {PartsService} from '../../../commonpages/inventory/parts/services/parts.service';
import {GlobalVariable} from '../../../../global/global';
import {FileValidatorDirective} from '../../../../customDirective/FileValidator.Directive';
import {MenumanagementService} from '../../../commonpages/menumanagement/service/menumanagement.service';


declare var $;
declare var swal;

@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html',
  styleUrls: ['./servicerequest.component.scss']
})
export class ServicerequestComponent implements OnInit {
  SR_Form: FormGroup;
  post: any;
  ServiceRequestArray: any = [];
  KnownIssueArray: any = [];
  SolutionsArray: any = [];
  PartsArray: any = [];
    SelectedPartArray: any = [];
  AssignedPartsArray: any = [];
  InstructionPDFAarray: any = [];
  /* Service Request */
  srScltID: any = '';
  srName: any = '';
  srDescription: any = '';
  srStatus: any = '';
  srModelTitle: any = '';
  srModelButtonpri: any = '';
  srModelButtonsec: any = 'Cancel';
  serReqselectedRow: Number;
  serReqsetClickedRow: Function;
  KIMselectedRow: Number;
  KIMClickedRow: Function;
  SOMselectedRow: Number;
  SOMClickedRow: Function;
  /* Known Issue */
  KI_Form: FormGroup;
  kiScltID: any = '';
  kiName: any = '';
  kiModelTitle: any = '';
  kiModelButtonpri: any = '';
  /* Solutions */
  solModalTitle: any = '';
  solModalBtnPri: any = '';
  SOL_Form: FormGroup;
  solScltID: any = '';
  solName: any = '';

  /* Instruction */
  INS_Form: FormGroup;
  InstructionArray: any = [];
  InsName: any = '';
  InsDesc: any = '';
  InsModalTitle: any = '';
  InsModalBtnPri: any = '';
  insScltID: any = '';
  InstructionFile: File;
  @ViewChild('Instruction_PDF') Instruction_Pdf;
  instructionFile_URL: any = '';

  /* Image */
  INS_PDF_Form: FormGroup;
  InsPdfName: any = '';
  InsPDFStatus: any = '';
  InsPDF_File: File;
  InsPDFModalTitle: any = '';
  InsPDFModalBtn: any = '';
  insPDFScltID: any = '';
  @ViewChild('INS_PDF') Ins_Pdf;

  /* Video */
  GeneralInstructionPDFArry: any = [];
  Gen_Ins_PDF_Form: FormGroup;
  GenPDFName: any = '';
  GenPDF_File: File;
  VideoModalTitle: any = '';
  GenPDFModelBtn: any = '';
  genInsPDFScltID: any = '';
  @ViewChild('GEN_INS_PDF') Gen_Ins_Pdf;


  /* PDF File Modal */
  PDFModalTitle: any = '';
  PDF_PATH: any = '';
  Image_Path: any = '';
  Video_Path: any = '';
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    viewbtn: any;
    sessid: any;
    userID: any = '';

    constructor(private fb: FormBuilder, public srmService: SrmService, public partService: PartsService, public menu: MenumanagementService) {
        this.sessid = localStorage.getItem('ucmid');
        this.userID = localStorage.getItem('ucmid');
        this.Loadbuttons();
    this.SR_Form = this.fb.group({
      'srName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
      'srDescription': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
      'srStatus': ['NO', Validators.required]
    });
    this.KI_Form = this.fb.group({
        'kiName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
    });
        this.SOL_Form = this.fb.group({
            'solName': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
        });

    this.INS_Form = this.fb.group({
        'InsName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
        'InsDesc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
        'instruction_File': [null, FileValidatorDirective.validate],
    });
        this.INS_PDF_Form = this.fb.group({
            'InsPdfName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'InsPDFStatus': ['NO', Validators.required],
            'InsPDF_File': [null, FileValidatorDirective.validate]
        });
        this.Gen_Ins_PDF_Form = this.fb.group({
            'GenPDFName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
            'GenPDF_File': [null, FileValidatorDirective.validate]
        });
        this.serReqsetClickedRow = function (index) {
            this.serReqselectedRow = index;
        };
        /* KnownIssue */
        this.KIMClickedRow = function (index) {
            this.KIMselectedRow = index;
        };
        /* Solutions */
        this.SOMClickedRow = function (index) {
            this.SOMselectedRow = index;
        };
  }

  ngOnInit() {
    this.LoadAllSR();
      $(function () {
          $('.mediatec-cleanvideoplayer').cleanvideoplayer();
          $('.mediatec-cleanaudioplayer').cleanaudioplayer();
          $('#example1').DataTable(
              {
                  paging: true,
                  searching: true,
              }
          );
      });
      $(function () {
          $('.dropify-clear').click(function () {
              let drEvent = $('.dropify').dropify();
              drEvent = drEvent.data('dropify');
              drEvent.resetPreview();
              drEvent.clearElement();
          });
      });
  }

  public LoadAllSR() {
    this.srmService.LoadSR().subscribe(
        data => {
            this.ServiceRequestArray = data;
        }
    );
  }

  showCreateSrModel() {
    /* Service Request Form */
    this.srModelButtonpri = 'Create';
    this.srModelTitle = 'Create Service Request';
      this.SR_Form = this.fb.group({
          'srName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
          'srDescription': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
          'srStatus': ['NO', Validators.required]
      });
      $(function () {
      $('#CreateSR').modal();
    });
  }

  public saveSR(value) {
      if (this.srModelButtonpri === 'Create') {
          let Desc;
          if (value.srDescription === null) {
              Desc = '';
          } else {
              Desc = value.srDescription;
          }
      const formData: FormData = new FormData();
      formData.append('srName', value.srName);
      formData.append('srDesc', Desc);
      formData.append('srStatus', value.srStatus);
      formData.append('userID', this.userID);
      this.srmService.createSR(formData).subscribe(
          data => {
              let response: any;
              response = data;
              if (response[0].result === 'success') {
                  this.hideSrModel();
                  this.LoadAllSR();
                  swal({
                      title: 'Created!',
                      text: 'Service Request Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          }
      );
      } else if (this.srModelButtonpri === 'Update') {
          const formData: FormData = new FormData();
          formData.append('srName', value.srName);
          formData.append('srDesc', value.srDescription);
          formData.append('srStatus', value.srStatus);
          formData.append('srID', this.srScltID);
          this.srmService.UpdateSR(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response[0].result === 'success') {
                      this.hideSrModel();
                      this.LoadAllSR();
                      swal({
                          title: 'Updated!',
                          text: 'Service Request Updated Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
    }
  }

  showEditSrModel(SrID) {
      this.srScltID = SrID;
      this.srmService.LoadSRDetails(SrID).subscribe(
          data => {
              this.srName = data.SRM_Name;
              this.srDescription = data.SRM_Description;
              this.srStatus = data.SRM_Disable;
              if (this.srStatus === 'N') {
                  this.srStatus = 'NO';
              } else if (this.srStatus === 'Y') {
                  this.srStatus = 'YES';
              }
              this.srModelButtonpri = 'Update';
              this.srModelTitle = 'Update Service Request';
              this.SR_Form = this.fb.group({
                  'srName': [this.srName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                  'srDescription': [this.srDescription, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                  'srStatus': [this.srStatus, Validators.required]
              });
              $(function () {
                  $('#CreateSR').modal();
              });
          }
    );
  }

  hideSrModel() {
      $(function () {
      $('#CreateSR').modal('hide');
      $('#SRForm').trigger('reset');
    });
  }

  public DeleteSR(SrID) {

      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This service request will not be able to recover this future!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Delete',
              closeOnConfirm: false
          },
          function () {
              that.srmService.DeleteSR(SrID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          that.LoadAllSR();
                          swal({
                              title: 'Deleted!',
                              text: 'Service Requested Deleted Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
              that.KnownIssueArray = [];
              that.SolutionsArray = [];
              that.AssignedPartsArray = [];
              that.InstructionArray = [];
              that.InstructionPDFAarray = [];
              that.GeneralInstructionPDFArry = [];
              that.srScltID = '';
              that.kiScltID = '';
              that.solScltID = '';
          });
  }

  public SelectedSR(SR_ID) {
      this.srScltID = SR_ID;
      this.LoadAllKI(this.srScltID);
  }

  public showKICreateModel() {
      if (this.srScltID === '') {
          $.notify({
              title: '<strong>Service Request Not Selected.</strong><br>',
              message: 'Please select Service Request.'
          }, {
              type: 'danger',
              placement: {
                  from: 'bottom'
              }
          });

      } else {
          this.kiModelTitle = 'Create Known Issue';
          this.kiModelButtonpri = 'Create';
          $(function () {
              $('#KnownIssue').modal();
          });
      }

  }

  public hideKIModel() {
      $(function () {
          $('#KnownIssue').modal('hide');
          $('#KIForm').trigger('reset');
      });
  }

  LoadAllKI(SR_ID) {
      this.srmService.LoadKI(SR_ID).subscribe(
          data => {
              this.KnownIssueArray = data;
              this.SolutionsArray = [];
              this.AssignedPartsArray = [];
              this.InstructionArray = [];
              this.InstructionPDFAarray = [];
              this.GeneralInstructionPDFArry = [];
              this.kiScltID = '';
              this.solScltID = '';
          }
      );
  }

  public saveKI(value) {
      if (this.kiModelButtonpri === 'Create') {
          const formData: FormData = new FormData();
          formData.append('srID', this.srScltID);
          formData.append('issue', value.kiName);
          formData.append('userID', this.userID);
          this.srmService.createKI(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response[0].result === 'success') {
                      this.hideKIModel();
                      this.LoadAllKI(this.srScltID);
                      swal({
                          title: 'Created!',
                          text: 'Known Issue Created Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
      } else if (this.kiModelButtonpri === 'Update') {
          const formData: FormData = new FormData();
          formData.append('kiID', this.kiScltID);
          formData.append('issue', value.kiName);
          this.srmService.UpdateKI(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response[0].result === 'success') {
                      this.hideKIModel();
                      this.LoadAllKI(this.srScltID);
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

  public showKIEditModel(ki_id) {
      this.kiScltID = ki_id;
      this.kiModelTitle = 'Update Known Issue';
      this.kiModelButtonpri = 'Update';
      this.srmService.LoadKIDetails(ki_id).subscribe(
          data => {
              this.kiName = data.KIM_Known_Issue;
              this.KI_Form = this.fb.group({
                  'kiName': [this.kiName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])]
              });
              $(function () {
                  $('#KnownIssue').modal();
              });
          }
      );
  }

  public LoadSolutions(KI_ID) {
      this.kiScltID = KI_ID;
      this.srmService.LoadSOL(KI_ID).subscribe(
          data => {
              this.SolutionsArray = data;
              this.AssignedPartsArray = [];
              this.InstructionArray = [];
              this.InstructionPDFAarray = [];
              this.GeneralInstructionPDFArry = [];
              this.solScltID = '';
          }
      );
  }

  public DeleteKI(ki_id) {
      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This Known issue will not be able to recover this future!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Delete',
              closeOnConfirm: false
          },
          function () {
              that.srmService.DeleteKI(ki_id).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          that.LoadAllKI(that.srScltID);
                          swal({
                              title: 'Deleted!',
                              text: 'Known Issue Deleted Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
              that.SolutionsArray = [];
              that.AssignedPartsArray = [];
              that.InstructionArray = [];
              that.InstructionPDFAarray = [];
              that.GeneralInstructionPDFArry = [];
              that.kiScltID = '';
              that.solScltID = '';
          });
  }

  public showSolCreateModal() {
      this.solModalTitle = 'Create Solution';
      this.solModalBtnPri = 'Create';
      if (this.kiScltID === '') {
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
          $(function () {
              $('#Solutions').modal();
          });
      }
  }

  public hideSolModal() {
      $(function () {
          $('#Solutions').modal('hide');
          $('#SOLForm').trigger('reset');
      });
  }

  public SaveSolution(value) {
      if (this.solModalBtnPri === 'Create') {
          const formData: FormData = new FormData();
          formData.append('kiID', this.kiScltID);
          formData.append('sol', value.solName);
          formData.append('sol', value.solName);
          formData.append('userID', this.userID);
          this.srmService.createSOL(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response[0].result === 'success') {
                      this.LoadSolutions(this.kiScltID);
                      this.hideSolModal();
                      swal({
                          title: 'Created!',
                          text: 'Solution Created Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
      } else if (this.solModalBtnPri === 'Update') {
          const formData: FormData = new FormData();
          formData.append('solID', this.solScltID);
          formData.append('solName', value.solName);
          this.srmService.UpdateSOL(formData).subscribe(
              data => {
                  let response: any;
                  response = data;

                  if (response[0].result === 'success') {
                      this.hideSolModal();
                      this.LoadSolutions(this.kiScltID);
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

  public showEditSolModel(sol_ID) {
      this.solModalBtnPri = 'Update';
      this.solModalTitle = 'Update Solution';
      this.srmService.LoadSOLDetails(sol_ID).subscribe(
          data => {
              this.solScltID = data.SOM_KeyID;
              this.srName = data.SOM_Solution;
              this.SOL_Form = this.fb.group({
                  'solName': [this.srName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])]
              });
              $(function () {
                  $('#Solutions').modal();
              });
          }
      );
  }

  public DeleteSol(sol_id) {
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
          function () {
              that.srmService.DeleteSOL(sol_id).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          that.LoadSolutions(that.kiScltID);
                          swal({
                              title: 'Deleted!',
                              text: 'Solution Deleted Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
              that.AssignedPartsArray = [];
              that.InstructionArray = [];
              that.InstructionPDFAarray = [];
              that.GeneralInstructionPDFArry = [];
              that.solScltID = '';
          });
  }

  /* Parts */
  public LoadParts(sol_ID) {
    this.solScltID = sol_ID;
    this.srmService.LoadParts(this.solScltID).subscribe(
        data => {
            this.AssignedPartsArray = data;
        }
    );
  }

    public showPartModal() {
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
            this.loadUnAssignedParts(this.solScltID);
            $('#Parts').modal();
        }
  }

    public loadUnAssignedParts(sol_id) {
        $(function () {
            $('#example1').dataTable().fnDestroy();
        });
        this.srmService.LoadUnassigned_Parts(sol_id).subscribe(
            data => {
                this.PartsArray = data;
                setTimeout(function () {
                    $(function () {
                        $('#example1').DataTable(
                            {
                                paging: true,
                                searching: true,
                                order: [[0, 'asc'], [1, 'asc'], [2, 'asc'], [3, 'asc'], [4, 'asc']],
                                columnDefs: [
                                    {'orderable': false, 'targets': 5}
                                ]
                            }
                        );
                    });
                }, 1000);
            }
        );
  }

    public hidePartModel() {
        $(function () {
            $('#Parts').modal('hide');
        });
  }

  public assignPart() {
      this.SelectedPartArray.forEach(
          part => {
              this.srmService.AssignPart(this.solScltID, part.partID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          this.LoadParts(this.solScltID);
                      }
                  }
              );
          }
      );
      this.hidePartModel();
      this.SelectedPartArray = [];
      swal({
          title: 'Assigned!',
          text: 'Part Assigned Successfully',
          type: 'success',
          confirmButtonClass: 'btn-success'
      });

  }

  public unassignPart(partID) {
      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This Part will be Un-assign for this solution!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Un-assign',
              closeOnConfirm: false
          },
          function () {
              that.srmService.UnassignPart(partID, that.solScltID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          that.LoadParts(that.solScltID);
                          swal({
                              title: 'Unassigned!',
                              text: 'Part Unassigned Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
          });
  }

  /* Instructions */
  public LoadIns(sol_ID) {
      this.srmService.LoadINS(sol_ID).subscribe(
          data => {
              this.InstructionArray = data;
          }
      );
  }

  public showInsCreateModal() {
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
          this.InsModalTitle = 'Create Instruction';
          this.InsModalBtnPri = 'Create';
          this.INS_Form = this.fb.group({
              'InsName': [this.InsName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
              'InsDesc': [this.InsDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
              'instruction_File': [null, FileValidatorDirective.validate]
          });
          $(function () {
              $('#InstructionModal').modal();
          });
      }

  }

  public hideInsModal() {
      $(function () {
          $('#InstructionModal').modal('hide');
          $('#INSForm').trigger('reset');
          $('.dropify-clear').click();
          const drEvent = $('.dropify').dropify();
          drEvent.data('dropify');
          drEvent.clearElement();
          drEvent.resetPreview();
      });
  }

  public saveInsrtuction(value) {

      if (this.InsModalBtnPri === 'Create') {
          let Desc;
          if (value.InsDesc === null) {
              Desc = '';
          } else {
              Desc = value.InsDesc;
          }
          const PDF = this.Instruction_Pdf.nativeElement;
          if (PDF.files && PDF.files[0]) {
              this.InstructionFile = PDF.files[0];
          }
          const pdfFile: File = this.InstructionFile;
          const formData: FormData = new FormData();
          formData.append('Ins_Name', value.InsName);
          formData.append('Ins_Desc', Desc);
          formData.append('sol_ID', this.solScltID);
          formData.append('userID', this.userID);
          formData.append('instructionFIle', pdfFile, pdfFile.name);
          this.srmService.createINS(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response.result === 'success') {
                      this.LoadIns(this.solScltID);
                      this.hideInsModal();
                      swal({
                          title: 'Created!',
                          text: 'Instruction Created Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
      } else if (this.InsModalBtnPri === 'Update') {

          if (value.instruction_File !== null) {
              const PDF = this.Instruction_Pdf.nativeElement;
              if (PDF.files && PDF.files[0]) {
                  this.InstructionFile = PDF.files[0];
              }
              const pdfFile: File = this.InstructionFile;
              const formData: FormData = new FormData();
              formData.append('Ins_Name', value.InsName);
              formData.append('Ins_Desc', value.InsDesc);
              formData.append('Ins_ID', this.insScltID);
              formData.append('solID', this.solScltID);
              formData.append('instructionFIle', pdfFile, pdfFile.name);
              this.srmService.UpdateINS(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.LoadIns(this.solScltID);
                          this.hideInsModal();
                          swal({
                              title: 'Updated!',
                              text: 'Instruction Updated Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
          } else {
              const formData: FormData = new FormData();
              formData.append('Ins_Name', value.InsName);
              formData.append('Ins_Desc', value.InsDesc);
              formData.append('Ins_ID', this.insScltID);
              formData.append('solID', this.solScltID);
              this.srmService.UpdateINS(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.LoadIns(this.solScltID);
                          this.hideInsModal();
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
  }

    public showEditInsModal(INS_ID) {
        this.insScltID = INS_ID;
        this.InsModalBtnPri = 'Update';
        this.InsModalTitle = 'Update Instruction';
        this.srmService.LoadINSDetails(INS_ID).subscribe(
            data => {
                this.InsName = data['ILM_Name'];
                this.InsDesc = data['ILM_Description'];
                this.INS_Form = this.fb.group({
                    'InsName': [this.InsName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsDesc': [this.InsDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                    'instruction_File': [null]
                });
                $(function () {
                    $('#InstructionModal').modal();
                });
            }
        );
  }

  public deleteInstruction(INS_ID) {
      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This Instruction will not be able to recover this future!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Delete',
              closeOnConfirm: false
          },
          function () {
              that.srmService.DeleteINS(INS_ID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response[0].result === 'success') {
                          that.LoadIns(that.solScltID);
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

  public viewInstructionPDF(PDF_Name) {
      this.instructionFile_URL = 'https://drive.google.com/viewerng/viewer?url=https://rcc.mcmservice.com/mcmbackend/web/uploads/service_request/instructions/' + this.solScltID + '/pdf/' + PDF_Name + '?pid=explorer&efh=false&a=v&chrome=false&embedded=true';
      $(function () {
          $('#InstructionPDFViewModal').modal();
      });
  }

  /* InstructionPDF */
  public LoadInsPDF(SolID) {
      this.srmService.LoadINS_PDF(SolID).subscribe(
          data => {
              this.InstructionPDFAarray = data;
          }
      );
  }

    public showInsPDFCreateModal() {
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
            this.INS_PDF_Form = this.fb.group({
                'InsPdfName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                'InsPDFStatus': ['NO', Validators.required],
                'InsPDF_File': [null, FileValidatorDirective.validate]
            });
            this.InsPDFModalTitle = 'Create Image';
            this.InsPDFModalBtn = 'Create';
            $(function () {
                $('#InstructionPDF').modal();
                $('.dropify').dropify();

            });
        }
  }

  public hideInsPDFModal() {
      $(function () {
          $('#InstructionPDF').modal('hide');
          $('#INSPDFForm').trigger('reset');
          $('.dropify-clear').click();
          const drEvent = $('.dropify').dropify();
          drEvent.data('dropify');
          drEvent.clearElement();
          drEvent.resetPreview();
      });
  }

  public saveInstructionPDF(value) {
      if (this.InsPDFModalBtn === 'Create') {
          const PDF = this.Ins_Pdf.nativeElement;
          if (PDF.files && PDF.files[0]) {
              this.InsPDF_File = PDF.files[0];
          }
          const pdfFile: File = this.InsPDF_File;
          const formData: FormData = new FormData();
          formData.append('sol_ID', this.solScltID);
          formData.append('Ins_PDF_Name', value.InsPdfName);
          formData.append('Ins_PDF_Status', value.InsPDFStatus);
          formData.append('ins_PDF_File', pdfFile, pdfFile.name);
          formData.append('userID', this.userID);
          this.srmService.createINS_PDF(formData).subscribe(
              data => {
                  let response: any;
                  response = data;
                  if (response.result === 'success') {
                      this.hideInsPDFModal();
                      this.LoadInsPDF(this.solScltID);
                      swal({
                          title: 'Created!',
                          text: 'Image Created Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  }
              }
          );
      } else if (this.InsPDFModalBtn === 'Update') {
          const PDF = this.Ins_Pdf.nativeElement;
          if (PDF.files && PDF.files[0]) {
              this.InsPDF_File = PDF.files[0];
          }
          const pdfFile: File = this.InsPDF_File;
          if (value.InsPDF_File === null) {
              const formData: FormData = new FormData();
              formData.append('sol_ID', this.solScltID);
              formData.append('Ins_PDF_ID', this.insPDFScltID);
              formData.append('Ins_PDF_Name', value.InsPdfName);
              formData.append('Ins_PDF_Status', value.InsPDFStatus);
              this.srmService.UpdateINS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.hideInsPDFModal();
                          this.LoadInsPDF(this.solScltID);
                          swal({
                              title: 'Updated!',
                              text: 'Image Updated Successfully',
                              type: 'success',
                              confirmButtonClass: 'btn-success'
                          });
                      }
                  }
              );
          } else {
              const formData: FormData = new FormData();
              formData.append('sol_ID', this.solScltID);
              formData.append('Ins_PDF_ID', this.insPDFScltID);
              formData.append('Ins_PDF_Name', value.InsPdfName);
              formData.append('Ins_PDF_Status', value.InsPDFStatus);
              formData.append('ins_PDF_File', pdfFile, pdfFile.name);
              this.srmService.UpdateINS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.hideInsPDFModal();
                          this.LoadInsPDF(this.solScltID);
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
  }

    public showInsPDFEditModal(InsPDF_ID) {
        this.insPDFScltID = InsPDF_ID;
        this.InsPDFModalTitle = 'Update Image';
        this.InsPDFModalBtn = 'Update';
        this.srmService.LoadINSPDFDetails(InsPDF_ID).subscribe(
            data => {
                this.InsPdfName = data.IPDFM_Name;
                this.InsPDFStatus = data.IPDFM_Primary;
                if (this.InsPDFStatus === 'Y') {
                    this.InsPDFStatus = 'YES';
                } else if (this.InsPDFStatus === 'N') {
                    this.InsPDFStatus = 'NO';
                }
                this.INS_PDF_Form = this.fb.group({
                    'InsPdfName': [this.InsPdfName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                    'InsPDFStatus': [this.InsPDFStatus, Validators.required],
                    'InsPDF_File': [null]
                });
                $(function () {
                    $('#InstructionPDF').modal();
                    $('.dropify').dropify();
                });
            }
        );
  }

  public deleteINS_PDF(InsPDF_ID) {
      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This Image will not be able to recover this future!',
              type: 'warning',
              showCancelButton: true,
              cancelButtonClass: 'btn-default',
              confirmButtonClass: 'btn-warning',
              confirmButtonText: 'Delete',
              closeOnConfirm: false
          },
          function () {
              that.srmService.DeleteINS_PDF(InsPDF_ID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          that.LoadInsPDF(that.solScltID);
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

  /* Genera lInstruction PDF */
  public LoadGenInsPDF(sol_id) {
      this.srmService.Load_Gen_Ins_PDF(sol_id).subscribe(
          data => {
              this.GeneralInstructionPDFArry = data;
          }
      );
  }

  public showGenInsPDFCreateModal() {
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
          this.Gen_Ins_PDF_Form = this.fb.group({
              'GenPDFName': [null, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
              'GenPDF_File': [null, FileValidatorDirective.validate]
          });
          this.VideoModalTitle = 'Create Video';
          this.GenPDFModelBtn = 'Create';
          $(function () {
              $('#GenInsPDF').modal();
              $('.dropify').dropify();

          });
      }
  }

  public hideGenInsModal() {
      $(function () {
          $('#GenInsPDF').modal('hide');
          $('#GenInsPDFForm').trigger('reset');
          $('.dropify-clear').click();
          let drEvent = $('.dropify').dropify();
          drEvent = drEvent.data('dropify');
          drEvent.resetPreview();
          drEvent.clearElement();
      });
  }

  public showEditGenInsPDFModal(gen_ins_pdf_id) {
      this.genInsPDFScltID = gen_ins_pdf_id;
      this.VideoModalTitle = 'Update Video';
      this.GenPDFModelBtn = 'Update';
      this.srmService.Load_gen_INS_PDF_Details(gen_ins_pdf_id).subscribe(
          data => {
              this.GenPDFName = data.GGIPDF_Name;
              this.Gen_Ins_PDF_Form = this.fb.group({
                  'GenPDFName': [this.GenPDFName, Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(1500)])],
                  'GenPDF_File': [null]
              });
              $(function () {
                  $('#GenInsPDF').modal();
                  $('.dropify').dropify();
              });

          }
      );
  }

  public saveGeneralInstructionPDF(value) {
      if (this.GenPDFModelBtn === 'Create') {
      const PDF = this.Gen_Ins_Pdf.nativeElement;
      if (PDF.files && PDF.files[0]) {
          this.GenPDF_File = PDF.files[0];
      }
      const genPDFFile: File = this.GenPDF_File;
      const formData: FormData = new FormData();
      formData.append('sol_ID', this.solScltID);
      formData.append('name', value.GenPDFName);
      formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
      formData.append('userID', this.userID);
      this.srmService.create_Gen_INS_PDF(formData).subscribe(
          data => {
              let response: any;
              response = data;
              if (response.result === 'success') {
                  this.hideGenInsModal();
                  this.LoadGenInsPDF(this.solScltID);
                  swal({
                      title: 'Created!',
                      text: 'Video Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
              }
          });
      } else if (this.GenPDFModelBtn === 'Update') {
          if (value.GenPDF_File === null) {
              const formData: FormData = new FormData();
              formData.append('sol_ID', this.solScltID);
              formData.append('gen_pdf_id', this.genInsPDFScltID);
              formData.append('name', value.GenPDFName);
              this.srmService.Update_Gen_INS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.hideGenInsModal();
                          this.LoadGenInsPDF(this.solScltID);
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
              const formData: FormData = new FormData();
              formData.append('sol_ID', this.solScltID);
              formData.append('gen_pdf_id', this.genInsPDFScltID);
              formData.append('name', value.GenPDFName);
              formData.append('gen_ins_PDF_File', genPDFFile, genPDFFile.name);
              this.srmService.Update_Gen_INS_PDF(formData).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          this.hideGenInsModal();
                          this.LoadGenInsPDF(this.solScltID);
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

  public DeleteGenINSPDF(pdf_id) {
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
          function () {
              that.srmService.Delete_Gen_INS_PDF(pdf_id, that.solScltID).subscribe(
                  data => {
                      let response: any;
                      response = data;
                      if (response.result === 'success') {
                          that.LoadGenInsPDF(that.solScltID);
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

  public showImage(ImageName) {
      this.Image_Path = GlobalVariable.BASE_FILE_API + 'uploads/service_request/ins_list/' + this.solScltID + '/pdf/' + ImageName;
      $(function () {
          $('#ImageModel').modal();
      });
  }

    public showVideo(pdfName) {
        this.Video_Path = GlobalVariable.BASE_FILE_API + 'uploads/service_request/Gen_ins/' + this.solScltID + '/pdf/' + pdfName;
        $(function () {
            $('#VideoModel').modal();
        });
    }

    Loadbuttons() {
        this.menu.Loadbutton(12, 83, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
                this.viewbtn = this.Asssubbutton[0].MA_View;
            }
        );

    }

    public SelectedPart(PartID) {
        this.SelectedPartArray.push({'partID': PartID});
    }
}
