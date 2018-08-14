import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicerequestService } from '../services/servicerequest.service';
import { EditservicerequestService } from '../services/editservicerequest.service';
import { KnownissueService } from '../services/knownissue.service';
import { EditknownissueService } from '../services/editknownissue.service';
import { SolutionService } from '../services/solution.service';
import { EditsolutionService } from '../services/editsolution.service';
import { PartsService } from '../../../commonpages/inventory/parts/services/parts.service';
import { InstructionlistService } from '../services/instructionlist.service';
import { InstructionpdfService } from '../services/instructionpdf.service';
import { GeninspdfService } from '../services/geninspdf.service';
import { RequestOptions, Headers } from '@angular/http';
declare var $;
declare var swal;

@Component({
  selector: 'app-instuctionlist',
  templateUrl: './instuctionlist.component.html',
  styleUrls: ['./instuctionlist.component.scss']
})
export class InstuctionlistComponent implements OnInit {
  submitted = false;
  active = true;
  /* Array */
  ServiceRequestArray: any = [];
  KnownIssuesArray: any = [];
  SolutionsArray: any = [];
  ResultArray: any = [];
  /* ServiceRequest */
  ServiceRequestID: any = '';
  ServiceRequestName: any = '';
  ServiceRequestDesc: any = '';
  ServiceRequestDisabled: any = 'NO';
  ServiceReqModelTitle: any = '';
  ServiceReqModelButtonPrimary: any = '';
  ServiceReqModelButtonSec: any = '';
  ServiceReqModelButtonAction: any = '';
  serReqselectedRow: Number;
  serReqsetClickedRow: Function;
  /* Known Issues */
  SelctSerReqID: any = '';
  KnownIssues: any = '';
  KnownIssuesID: any = '';
  selcttKnownIssuesID: any = '';
  KIModelTitle: any = '';
  KIModelButtonPrimary: any = '';
  KIModelButtonSec: any = '';
  KIMselectedRow: Number;
  KIMClickedRow: Function;
  /* SolutionServices*/
  SOMModelTitle: any = '';
  SOMModelButtonPrimary: any = '';
  SOMModelButtonSec: any = '';
  SOMselectedRow: Number;
  SOMClickedRow: Function;
  SOM_ID: any = '';
  SOM_Sclt_ID: any = '';
  SOM_Name: any = '';
  /* AssignParts */
  PartsArray: any = [];
  AssignedPartsArray = [];
  Part_ID: any = '';
  PartImgPath: any = '';
  /* Instruction List */
  InstructionListArray: any = [];
  ILModelTitle: any = '';
  ILModelButtonPrimary: any = '';
  ILModelButtonSec: any = '';
  IL_ID: any = '';
  IL_Name: any = '';
  IL_Desc: any = '';

  /* Instruction List Pdf */
  InsListPdfArray: any = [];
  ILPDFModelTittle: any = '';
  ILPDFModelButtonPrimary: any = '';
  ILPDFModelButtonSec: any = '';
  ILPDF_ID: any = '';
  ILPDF_Name: any = '';
  ILPDF_PDF_PATH: any = '';
  ILPDF_Primary: any = 'NO';
  /* File Upload */
  uploadFile: any;
  hasBaseDropZoneOver: any = false;
  options: Object;
  Gen_IND_PDFoptions: Object;
  sizeLimit = 2000000;

  /* General Instruction PDF */
  GenInsPDFArray: any = [];
  Gen_Ins_PDF_ID: any = '';
  Gen_Ins_PDF_Name: any = '';
  Gen_Ins_PDF_Path: any = '';
  Gen_INS_PDF_ModelTittle: any = '';
  Gen_INS_PDF_ModelButtonPrimary: any = '';
  Gen_INS_PDF_ModelButtonSec: any = '';

  @ViewChild('insPDFFile') InsPDFFile;
  @ViewChild('GenInsfile') GeninsPDFFile;
  InsPDF_File: File;
  GenInsPDF_File: File;

  constructor( public serReq: ServicerequestService, public edtSerReq: EditservicerequestService, public KIS: KnownissueService, public EKIS: EditknownissueService, public SolSer: SolutionService, public edtSolSer: EditsolutionService, public partSer: PartsService, public insSer: InstructionlistService, public insPdf: InstructionpdfService, public genInsPdf: GeninspdfService) {
    /* ServiceRequest */
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

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      swal({
        title: 'Uploaded!',
        text: 'File has been uploaded.',
        type: 'success',
        confirmButtonClass: 'btn-success'
      });
      $(function () {
        $('#Ins_pdf_upload').modal('hide');
        $('#Gen_Ins_pdf_upload').modal('hide');
      });
      this.LoadInsPdf(this.SOM_Sclt_ID);
      this.LoadAllGenInsPDF(this.SOM_Sclt_ID);
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      /* alert('File is too large'); */
      swal({
        title: 'Error!',
        text: 'File size is too large.',
        type: 'danger',
        confirmButtonClass: 'btn-danger'
      });
    }
  }

  ngOnInit() {
    $(function() {
      $('.dropify').dropify();
    });
    this.LoadAllServiceRequest();
    this.LoadAllKnownIssues();
    this.LoadAllSolutions();
  }

  showSerReq() {
    this.ServiceReqModelTitle = 'Create Service Request';
    this.ServiceReqModelButtonPrimary = 'Create';
    this.ServiceReqModelButtonSec = 'Cancel';
    this.ServiceReqModelButtonAction = 'CreateSerRequest';
    $(function(){
      $('#new_ser_req').modal();
    });
  }

  hideSerreq() {
    this.ServiceRequestID = '';
    this.ServiceRequestName = '';
    this.ServiceRequestDesc = '';
    this.ServiceRequestDisabled = 'NO';
    $(function(){
      $('#new_ser_req').modal('hide');
    });
  }

  showKnownIssues() {
    if ( this.SelctSerReqID === '') {
      $.notify({
        title: '<strong>Service Request Not Setected.</strong><br>',
        message: 'Please select the service request.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.KIModelTitle = 'Create Known Issue';
      this.KIModelButtonPrimary = 'Create';
      this.KIModelButtonSec = 'Cancel';
      $(function(){
        $('#KnownIssues').modal();
      });
    }
  }

  hideKnownIssues() {
    this.KnownIssues = '';
    $(function(){
      $('#KnownIssues').modal('hide');
    });
  }

  showSolutions() {
    if ( this.selcttKnownIssuesID === '') {
      $.notify({
        title: '<strong>Known Issues Not Setected.</strong><br>',
        message: 'Please select the known issue.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.SOMModelTitle = 'Create Solution';
      this.SOMModelButtonPrimary = 'Create';
      this.SOMModelButtonSec = 'Cancel';
      $(function(){
        $('#solution').modal();
      });
    }
  }

  hideSolutions() {
    this.SOM_Name = '';
    $(function(){
      $('#solution').modal('hide');
    });
  }

  onSubmit() {
    this.submitted = false;
  }

  LoadAllServiceRequest() {
    this.serReq.GetAllRequest().subscribe(
        data => {
          this.ServiceRequestArray = data;
        }
    );
  }

  LoadAllKnownIssues() {
    this.KIS.GetAll().subscribe(
        data => {
          this.KnownIssuesArray = data;
        }
    );
  }

  LoadAllSolutions() {
    this.SolSer.GetAll().subscribe(
        data => {
          this.SolutionsArray = data;
        }
    );
  }

  Load_SR_KI() {
    this.KnownIssuesArray = [];
    this.KIS.GetAll_SR_KI(this.SelctSerReqID).subscribe(
        data => {
          this.KnownIssuesArray = data;
        }
    );
    this.SolutionsArray  = [];
    this.AssignedPartsArray = [];
    this.InstructionListArray = [];
    this.GenInsPDFArray = [];
    this.InsListPdfArray = [];
    this.KIMselectedRow = -1;
    this.SOMselectedRow = -1;
    this.selcttKnownIssuesID = '';
    this.SOM_Sclt_ID = '';
  }

  CreateSerRequest() {
    const that = this;
    if ( this.ServiceRequestDisabled === 'NO') {
      this.ServiceRequestDisabled = 'N';
    } else if ( this.ServiceRequestDisabled === 'YES' ) {
      this.ServiceRequestDisabled = 'Y';
    }
    this.serReq.InsertSrRequest( this.ServiceRequestName, this.ServiceRequestDesc, this.ServiceRequestDisabled).subscribe(
        data => {
          this.ResultArray = data;
          if ( this.ResultArray[0].result === 'success' ) {
            swal({
              title: 'Created!',
              text: 'Service Request Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function(){
              $('#new_ser_req').modal('hide');
              that.LoadAllServiceRequest();
              that.ServiceRequestName = '';
              that.ServiceRequestDesc = '';
              that.ServiceRequestDisabled = '';
            });
          }
        }
    );
  }

  EditSerRequest( ReqID, ReqName, ReqDesc, ReqDisabled) {
    this.ServiceRequestID = ReqID;
    this.ServiceRequestName = ReqName;
    this.ServiceRequestDesc = ReqDesc;
    this.ServiceRequestDisabled = ReqDisabled;
    if ( this.ServiceRequestDisabled === 'Y') {
      this.ServiceRequestDisabled = 'YES';
    } else if ( this.ServiceRequestDisabled === 'N' ) {
      this.ServiceRequestDisabled = 'NO';
    }
    this.ServiceReqModelTitle = 'Update Service Request';
    this.ServiceReqModelButtonPrimary = 'Update';
    this.ServiceReqModelButtonSec = 'Cancel';
    this.ServiceReqModelButtonAction = 'CreateSerRequest';
    $(function () {
      $('#new_ser_req').modal();
    });
  }

  UpdateSerRequest() {
    if ( this.ServiceRequestDisabled === 'NO') {
      this.ServiceRequestDisabled = 'N';
    } else if ( this.ServiceRequestDisabled === 'YES' ) {
      this.ServiceRequestDisabled = 'Y';
    }
    this.edtSerReq.UpdateSerRequest( this.ServiceRequestName, this.ServiceRequestDesc, this.ServiceRequestDisabled, this.ServiceRequestID).subscribe(
        data => {
          this.ResultArray = data;
          if ( this.ResultArray[0].result === 'success' ) {
            swal({
              title: 'Updated!',
              text: 'Service Request Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function(){
              $('#new_ser_req').modal('hide');
            });
            this.LoadAllServiceRequest();
            this.ServiceRequestName = '';
            this.ServiceRequestDesc = '';
            this.ServiceRequestDisabled = '';
            this.ServiceRequestID = '';

          }
        }
    );
  }

  ServiceReqAction( ) {
    if ( this.ServiceReqModelButtonPrimary === 'Create' ) {
      this.CreateSerRequest();
    } else if ( this.ServiceReqModelButtonPrimary === 'Update' ) {
      this.UpdateSerRequest();
    }
  }

  SelectedSerReq(id) {
    this.SelctSerReqID = id;
    this.Load_SR_KI();
  }

  KIFormAction() {
    if ( this.KIModelButtonPrimary === 'Create' ) {
      this.CreateKIM();
    } else if ( this.KIModelButtonPrimary === 'Update' ) {
      this.updateKIM();
    }
  }

  CreateKIM() {
    this.KIS.Create(this.KnownIssues, this.SelctSerReqID).subscribe(
        data => {
          this.ResultArray = data;
          if ( this.ResultArray[0].result === 'success' ) {
            swal({
              title: 'Created!',
              text: 'Known Issue Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function(){
              $('#KnownIssues').modal('hide');
            });
            this.KnownIssues = '';
            this.Load_SR_KI();
          }
        }
    );
  }

  EditKIM(id, issue) {
    this.KIModelTitle = 'Update Known Issue';
    this.KIModelButtonPrimary = 'Update';
    this.KIModelButtonSec = 'Cancel';
    this.KnownIssuesID = id;
    this.KnownIssues = issue;
    $(function(){
      $('#KnownIssues').modal();
    });
  }

  updateKIM() {
    this.EKIS.Update(this.KnownIssuesID, this.KnownIssues).subscribe(
        data => {
          this.ResultArray = data;
          if (this.ResultArray[0].result === 'success') {
            swal({
              title: 'Updated!',
              text: 'Known Issue Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function () {
              $('#KnownIssues').modal('hide');
            });
            this.KnownIssues = '';
            this.KnownIssuesID = '';
            this.Load_SR_KI();
          }
        }
    );
  }

  SelectedKI(id) {
    this.selcttKnownIssuesID = id;
    this.LoadIssueSolution(id);
  }

  LoadIssueSolution(KI_ID) {
    this.SolSer.GetIssueSol(KI_ID).subscribe(
        data => {
          this.SolutionsArray = data;
        }
    );

    this.AssignedPartsArray = [];
    this.InstructionListArray = [];
    this.GenInsPDFArray = [];
    this.InsListPdfArray = [];
    this.SOMselectedRow = -1;
    this.SOM_Sclt_ID = '';
  }

  SOMFormAction() {
    if ( this.SOMModelButtonPrimary === 'Create' ) {
      this.CreateSOM();
    } else if ( this.SOMModelButtonPrimary === 'Update' ) {
      this.UpdateSOM();
    }
  }

  CreateSOM() {
    this.SolSer.Create(this.selcttKnownIssuesID, this.SOM_Name).subscribe(
        data => {
          this.ResultArray = data;
          if (this.ResultArray[0].result === 'success') {
            swal({
              title: 'Created!',
              text: 'Solution Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function () {
              $('#solution').modal('hide');
            });
            this.SOM_Name = '';
            this.LoadIssueSolution(this.selcttKnownIssuesID);
          }
        }
    );
  }

  EditSOM(id, name) {
    this.SOMModelTitle = 'Update Solution';
    this.SOMModelButtonPrimary = 'Update';
    this.SOMModelButtonSec = 'Cancel';
    this.SOM_ID = id;
    this.SOM_Name = name;
    $(function(){
      $('#solution').modal();
    });
  }

  UpdateSOM() {
    this.edtSolSer.Update(this.SOM_ID, this.SOM_Name).subscribe(
        data => {
          this.ResultArray = data;
          if (this.ResultArray[0].result === 'success') {
            swal({
              title: 'Updated!',
              text: 'Solution Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function () {
              $('#solution').modal('hide');
            });
            this.SOM_Name = '';
            this.SOM_ID = '';
            this.LoadAllSolutions();
          }
        }
    );
  }

  SelectedSOMID(id) {
    this.SOM_Sclt_ID = id;
    this.LoadAssignedParts(id);
    this.LoadAllInsList(id);
    this.LoadInsPdf(id);
    this.LoadAllGenInsPDF(id);
  }

  /* Assign Parts */
  showPartsModel() {
    if ( this.SOM_Sclt_ID === '') {
      $.notify({
        title: '<strong>Solution Not Selected.</strong><br>',
        message: 'Please select the solution.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      $(function(){
        $('#ModelAssign').modal();
      });
      this.LoadAllParts();
    }

  }

  hidePartsModel() {
    $(function () {
      $('#ModelAssign').modal();
    });
  }

  LoadAllParts() {
    this.SolSer.Parts(this.SOM_Sclt_ID).subscribe(
        data => {
          this.PartsArray = data;
        }
    );
  }

  LoadAssignedParts(SOM_ID) {
    this.SolSer.AssignedParts(SOM_ID).subscribe(
        data => {
          this.AssignedPartsArray = data;
        }
    );
  }

  AssignParts(Part_ID) {
    this.SolSer.AassignPart(this.SOM_Sclt_ID, Part_ID).subscribe(
        data => {
          this.ResultArray = data;
          if (this.ResultArray[0].result === 'success') {
            swal({
              title: 'Assigned!',
              text: 'Part Assigned Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.LoadAssignedParts(this.SOM_Sclt_ID);
            this.LoadAllParts();
          }
        }
    );
  }

  /* Instruction List */

  showInsList() {
    if ( this.SOM_Sclt_ID === '') {
      $.notify({
        title: '<strong>Solution Not Selected.</strong><br>',
        message: 'Please select the solution.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.ILModelTitle = 'Create Instruction List';
      this.ILModelButtonPrimary = 'Create';
      this.ILModelButtonSec = 'Cancel';
      $(function () {
        $('#ins_list').modal();
      });
    }
    }

  hideInsList() {
    this.IL_Name = '';
    this.IL_Desc = '';
    $(function(){
      $('#ins_list').modal('hide');
    });
  }

  ILFormAction() {
    if ( this.ILModelButtonPrimary === 'Create' ) {
      this.CreateIL();
    } else if ( this.ILModelButtonPrimary === 'Update' ) {
      this.UpdateIL();
    }
  }

  CreateIL() {
    this.insSer.Create(this.SOM_Sclt_ID, this.IL_Name, this.IL_Desc).subscribe(
        data => {
          this.ResultArray = data;
          if (this.ResultArray[0].result === 'success') {
            swal({
              title: 'Created!',
              text: 'Instruction List Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            $(function () {
              $('#ins_list').modal('hide');
            });
            this.IL_Name = '';
            this.IL_Desc = '';
            this.LoadAllInsList(this.SOM_Sclt_ID);
          }
        }
    );
  }

  UpdateIL() {

  }

  LoadAllInsList(id) {
    this.insSer.GetAllInsList(id).subscribe(
        data => {
          this.InstructionListArray = data;
        }
    );
  }

  /* Instruction PDF List */
  showInsPDFList() {
    if ( this.SOM_Sclt_ID === '') {
      $.notify({
        title: '<strong>Solution Not Selected.</strong><br>',
        message: 'Please select the solution.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.ILPDFModelTittle = 'Create Instruction PDF';
      this.ILPDFModelButtonPrimary = 'Create';
      this.ILPDFModelButtonSec = 'Cancel';
      $(function () {
        $('#ins_PDF').modal();
      });
    }
  }

  hideInsPDFList() {
    this.ILPDF_Name = '';
    this.ILPDF_Primary = 'NO';
    this.InsPDFFile.nativeElement.value = '';
    $(function(){
      $('#ins_PDF').modal('hide');
      $('.dropify-clear').click();
    });
  }

  InsPDFFormAction() {
    if ( this.ILPDFModelButtonPrimary === 'Upload PDF' ) {
      /* this.CreateInsPDF(); */
    } else if ( this.ILPDFModelButtonPrimary === 'Update' ) {
      this.UpdateInsPDF();
    }
  }

  CreateInsPDF(value) {
    const fi = this.InsPDFFile.nativeElement;
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

    this.insPdf.Create(formData, options, this.SOM_Sclt_ID, this.ILPDF_Name, this.ILPDF_Primary).subscribe(
        data => {
          this.ResultArray = data;

          if ( this.ResultArray.result === 'success' ) {
            this.hideInsPDFList();
            this.LoadInsPdf(this.SOM_Sclt_ID);
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

  UpdateInsPDF() {
  }

  LoadInsPdf(id) {
    this.insPdf.GetAll(id).subscribe(
        data => {
          this.InsListPdfArray = data;
        }
    );
  }

  showGenInsPDFList() {
    if ( this.SOM_Sclt_ID === '') {
      $.notify({
        title: '<strong>Solution Not Selected.</strong><br>',
        message: 'Please select the solution.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.Gen_INS_PDF_ModelTittle = 'Create General Instruction PDF';
      this.Gen_INS_PDF_ModelButtonPrimary = 'Upload PDF';
      this.Gen_INS_PDF_ModelButtonSec = 'Cancel';
      $(function () {
        $('#Gen_ins_PDF').modal();
      });
    }
  }

  hideGenInsPDFList() {
    this.Gen_Ins_PDF_Name = '';
    $(function(){
      $('#Gen_ins_PDF').modal('hide');
      $('.dropify-clear').click();
    });
  }

  GenInsPDFFormAction() {
    if ( this.Gen_INS_PDF_ModelButtonPrimary === 'Upload PDF' ) {
    } else if ( this.Gen_INS_PDF_ModelButtonPrimary === 'Update' ) {
      this.UpdateGenInsPDF();
    }
  }

  CreateGenInsPDF(value) {
    const fi = this.GeninsPDFFile.nativeElement;
    if (fi.files && fi.files[0]) {
      this.GenInsPDF_File = fi.files[0];
    }
    const file: File = this.GenInsPDF_File;
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('Name', value.Gen_Ins_PDF_Name);
    const headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });

    this.genInsPdf.Create(formData, options, this.SOM_Sclt_ID, this.Gen_Ins_PDF_Name).subscribe(
        data => {
          this.ResultArray = data;
          if ( this.ResultArray.result === 'success' ) {
            this.hideGenInsPDFList();
            this.LoadAllGenInsPDF(this.SOM_Sclt_ID);
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

  UpdateGenInsPDF() {
  }

  LoadAllGenInsPDF(id) {
    this.genInsPdf.GetALL(id).subscribe(
        data => {
          this.GenInsPDFArray = data;
        }
    );
  }

  ViewInsPdf(id, File) {
    this.ILPDF_PDF_PATH = 'https://docs.google.com/viewer?url=54.210.61.94/mcmcalltracking/mcmbackend/web/uploads/instruction_pdf/' + id + '/pdf/' + File + '&embedded=true';
    $(function(){
      $('#ViewInsPdf').modal('show');
    });
  }

  ViewGenInsPdf(id, File) {
    this.Gen_Ins_PDF_Path = 'https://docs.google.com/viewer?url=54.210.61.94/mcmcalltracking/mcmbackend/web/uploads/general_instruction_pdf/' + id + '/pdf/' + File + '&embedded=true';
    $(function(){
      $('#ViewGenInsPdf').modal('show');
    });
  }

  HideInsPDFModel () {
    this.ILPDF_Name = '';
    this.ILPDF_Primary = 'NO';

    $(function () {
      $('#ins_PDF').modal('hide');
      $('.dropify-clear').click();
    });
  }
}
