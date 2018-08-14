import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';
import {GlobalVariable} from '../../../../../global/global';

@Injectable()
export class AccountservicerequestService {

  constructor( public http: Http ) { }

  LoadAssignedRequestList(ACC_ID, Model_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assignreqlist&accID=' + encodeURIComponent(ACC_ID) + '&mID=' + encodeURIComponent(Model_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnAssignedRequestList(ACC_ID, Model_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/unassignreqlist&accID=' + encodeURIComponent(ACC_ID) + '&mID=' + encodeURIComponent(Model_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignSerReq(ACC_ID, Model_ID, Ser_Req_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assignreq&accID=' + encodeURIComponent(ACC_ID) + '&mID=' + encodeURIComponent(Model_ID) + '&srID=' + encodeURIComponent(Ser_Req_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccKI(AMS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/getknownissue&amsID=' + encodeURIComponent(AMS_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccSolution(ASRKID_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/getsolutions&asrkidID=' + encodeURIComponent(ASRKID_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccParts(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/getparts&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccInsList(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/getinstructionlist&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccInsPDF(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/getinspdf&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadAccGenInsPDF(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/geninspdf&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnassignedKI(SR_ID) {
    const url = GlobalVariable.BASE_API_URL +  'accserreq/loadknownissues&srID=' + encodeURIComponent(SR_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignACC_KI(SR_ID, AMS_ID, KIM_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assignknownissue&srID=' + encodeURIComponent(SR_ID) + '&amsID=' + encodeURIComponent(AMS_ID) + '&kimID=' + encodeURIComponent(KIM_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  CreateAccKI(SR_ID, AMS_ID, ISSUE) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/createaccknownissue&srID=' + encodeURIComponent(SR_ID) + '&amsID=' + encodeURIComponent(AMS_ID) + '&issue=' + encodeURIComponent(ISSUE);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnassignedSOM(AMS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/loadsolutions&amsID=' + encodeURIComponent(AMS_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignAcc_SOM( KIM_ID, SOM_ID ) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assignsolution&KI_ID=' + encodeURIComponent(KIM_ID) + '&SOM_ID=' + encodeURIComponent(SOM_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  CreateACC_SOM(KI_ID, SOL) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/createaccsolution&KI_ID=' + encodeURIComponent(KI_ID) + '&SOL=' + encodeURIComponent(SOL);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnassignParts(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/unssignparts&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignPart(AKISD_KEYID, PART_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assignpart&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&Part_ID=' + encodeURIComponent(PART_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnassignInsList(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/unassigninslist&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignInsList(AKISD_KEYID, INS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assigninslist&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&INS_ID=' + encodeURIComponent(INS_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  CreateInsList(AKISD_KEYID, INS_Name, INS_Desc) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/createinslist&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&INS_Name=' + encodeURIComponent(INS_Name) + '&INS_Desc=' + encodeURIComponent(INS_Desc);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnAssignInsPdf(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/unassigninspdf&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  LoadUnAssignGenInsPdf(AKISD_KEYID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/unassigngeninspdf&AKISD_KEYID=' + encodeURIComponent(AKISD_KEYID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignInsPDF(AKISD_KEYID, INS_PDF_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assigninspdf&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&INS_PDF_ID=' + encodeURIComponent(INS_PDF_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  AssignGenInsPDF(AKISD_KEYID , GEN_INS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/assigngeninspdf&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&GEN_INS_ID=' + encodeURIComponent(GEN_INS_ID);
    const response = this.http.get(url).map(res => res.json());

    return response;
  }

  InsPDFFormSubmit(formData, options, AKISD_KEYID, Ins_PDF_Name, Ins_PDF_Primary) {
    const  url = GlobalVariable.BASE_API_URL + 'accserreq/createinspdf&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&ILPDF_Name=' + encodeURIComponent(Ins_PDF_Name) + '&ILPDF_Primary=' + encodeURIComponent(Ins_PDF_Primary);
    return this.http.post(url, formData, options)
        .map(response => response.json()).catch(error => Observable.throw(error.json()));
  }

  GenInsPDFFormSubmit(formData, options, AKISD_KEYID, Gen_Ins_PDF_Name) {
    const  url = GlobalVariable.BASE_API_URL + 'accserreq/creategeninspdf&AKISD_ID=' + encodeURIComponent(AKISD_KEYID) + '&GIPDF_Name=' + encodeURIComponent(Gen_Ins_PDF_Name);

    return this.http.post(url, formData, options)
        .map(response => response.json()).catch(error => Observable.throw(error.json()));
  }

  DeleteSerRequest(AMS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deleteserreq&ASM_ID=' + encodeURIComponent(AMS_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteKI(Issue_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deleteki&issueID=' + encodeURIComponent(Issue_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteSOM(Som_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deletesom&somID=' + encodeURIComponent(Som_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeletePart(Part_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deletepart&partID=' + encodeURIComponent(Part_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteIns(INS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deleteins&insID=' + encodeURIComponent(INS_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteInsPDF(PDF_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deleteinspdf&ipdfID=' + encodeURIComponent(PDF_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

  DeleteGenInsPDF(GPDF_ID) {
    const url = GlobalVariable.BASE_API_URL + 'accserreq/deletegenpdf&gpdfID=' + encodeURIComponent(GPDF_ID);
    const response = this.http.get(url).map(res => res.json());
    return response;
  }

}
