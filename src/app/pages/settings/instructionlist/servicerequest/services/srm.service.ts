import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {GlobalVariable} from '../../../../../global/global';


@Injectable()
export class SrmService {

  constructor( public http: Http ) { }
/* Service request */
  public LoadSR() {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_sr';
    const response = this.http.get(url).map( res => res.json() );
    return response;
  }

  public LoadSRDetails(SrID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_sr_details';
    const response = this.http.post( url, {'srID': SrID} ).map( res => res.json() );
    return response;
  }
  public createSR(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_sr';
    return this.http.post(url, formData).map(res => res.json());
  }

  public UpdateSR(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_sr';
    return this.http.post(url, formData).map(res => res.json());
  }

  public DeleteSR(SrID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_sr';
    const response = this.http.post( url, {'srID': SrID} ).map( res => res.json() );
    return response;
  }

  /* Known Issues */

  public LoadKI(SR_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ki';
    const response = this.http.post(url, { 'srID': SR_ID}).map( res => res.json() );
    return response;
  }

  public LoadKIDetails(Ki_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ki_details';
    const response = this.http.post( url, {'ki_ID': Ki_ID} ).map( res => res.json() );
    return response;
  }

  public createKI(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_ki';
    return this.http.post(url, formData).map(res => res.json());
  }

  public UpdateKI(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_ki';
    return this.http.post(url, formData).map(res => res.json());
  }

  public DeleteKI(Ki_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_ki';
    const response = this.http.post( url, {'ki_id': Ki_ID} ).map( res => res.json() );
    return response;
  }

  /* Solutions */
  public LoadSOL(KI_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_sol';
    const response = this.http.post(url, { 'kiID': KI_ID}).map( res => res.json() );
    return response;
  }

  public LoadSOLDetails(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_sol_details';
    const response = this.http.post( url, {'sol_ID': sol_ID} ).map( res => res.json() );
    return response;
  }

  public createSOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_sol';
    return this.http.post(url, formData).map(res => res.json());
  }

  public UpdateSOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_sol';
    return this.http.post(url, formData).map(res => res.json());
  }

  public DeleteSOL(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_sol';
    const response = this.http.post( url, {'sol_ID': sol_ID} ).map( res => res.json() );
    return response;
  }

  /* Parts */
  public LoadParts(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_parts';
    const response = this.http.post(url, { 'sol_ID': sol_ID}).map( res => res.json() );
    return response;
  }

  public LoadUnassigned_Parts(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_unassign_part';
    const response = this.http.post(url, { 'sol_ID': sol_ID}).map( res => res.json() );
    return response;
  }

  public LoadPartDetails(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_sol_details';
    const response = this.http.post( url, {'sol_ID': sol_ID} ).map( res => res.json() );
    return response;
  }

  public AssignPart(Sol_ID, partID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/assign_parts';
    return this.http.post(url, {'sol_ID': Sol_ID, 'part_ID': partID}).map(res => res.json());
  }

  public UnassignPart(part_ID, sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/unassign_part';
    const response = this.http.post( url, {'part_ID': part_ID, 'sol_ID': sol_ID} ).map( res => res.json() );
    return response;
  }

  /* Instruction */
  public LoadINS(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ins';
    const response = this.http.post(url, { 'solID': SOL_ID}).map( res => res.json() );
    return response;
  }

  public LoadINSDetails(ins_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ins_details';
    const response = this.http.post( url, {'ins_ID': ins_ID} ).map( res => res.json() );
    return response;
  }

  public createINS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_ins';
    return this.http.post(url, formData).map(res => res.json());
  }

  public UpdateINS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_ins';
    return this.http.post(url, formData).map(res => res.json());
  }

  public DeleteINS(ins_id) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_ins';
    const response = this.http.post( url, {'ins_ID': ins_id} ).map( res => res.json() );
    return response;
  }

  /* Instruction PDF */
  public LoadINS_PDF(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ins_pdf';
    const response = this.http.post(url, { 'solID': SOL_ID}).map( res => res.json() );
    return response;
  }

  public LoadINSPDFDetails(ins_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_ins_pdf_details';
    const response = this.http.post( url, {'ins_PDF_ID': ins_ID} ).map( res => res.json() );
    return response;
  }

  public createINS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_ins_pdf';
    return this.http.post(url, formData).map(res => res.json());
  }

  public UpdateINS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_ins_pdf';
    return this.http.post(url, formData).map(res => res.json());
  }

  public DeleteINS_PDF(ins_Pdf_id) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_ins_pdf';
    const response = this.http.post( url, {'ins_PDF_ID': ins_Pdf_id} ).map( res => res.json() );
    return response;
  }

  /* General Instruction PDF */
  public Load_Gen_Ins_PDF(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_gen_ins_pdf';
    const response = this.http.post(url, { 'solID': SOL_ID}).map( res => res.json() );
    return response;
  }

  public Load_gen_INS_PDF_Details(ins_ID) {
    const url = GlobalVariable.BASE_API_URL + 'srm/load_gen_ins_pdf_details';
    const response = this.http.post( url, {'GEN_INS_PDF_ID': ins_ID} ).map( res => res.json() );
    return response;
  }

  public create_Gen_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/create_gen_ins_pdf';
    return this.http.post(url, formData).map(res => res.json());
  }

  public Update_Gen_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'srm/update_gen_ins_pdf';
    return this.http.post(url, formData).map(res => res.json());
  }

  public Delete_Gen_INS_PDF(pdf_id, sol_id) {
    const url = GlobalVariable.BASE_API_URL + 'srm/delete_gen_ins_pdf';
    const response = this.http.post( url, {'pdfID': pdf_id, 'solID': sol_id } ).map( res => res.json() );
    return response;
  }
}
