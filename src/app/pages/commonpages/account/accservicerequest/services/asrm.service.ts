import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { GlobalVariable } from '../../../../../global/global';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class AsrmService {

  constructor(public http: HttpClient) {
  }
  /* SERVICE REQUEST */
  public LoadASR(Acc_ID, Model_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_asr';
    const response = this.http.post(url, {'acc_ID': Acc_ID, 'model_ID': Model_ID});
    return response;
  }
  public ActivateKI(id)
  {
      const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_sr';
    const response = this.http.post(url, {'KI_Id': id});
      return response;
  }
  public createASR(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_asr';
    return this.http.post(url, formData);
  }

  public LoadUnAssignedASR(Acc_ID, Model_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_sr';
    const response = this.http.post(url, {'acc_ID': Acc_ID, 'model_ID': Model_ID});
    return response;
  }

  public assignASR(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_sr';
    return this.http.post(url, formData);
  }

  public LoadASRDetails(asrm_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_asr_details';
    const response = this.http.post(url, {'asrmID': asrm_ID});
    return response;
  }

  public updateASR(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_asr';
    return this.http.post(url, formData);
  }

  public DeleteASR(asrm_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_asr';
    const response = this.http.post(url, {'asrmID': asrm_ID});
    return response;
  }

  /* KNOWN ISSUE */
  public Load_ASR_KI(AMSR_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ki';
    const response = this.http.post(url, {'AMSR_ID': AMSR_ID});
    return response;
  }

  public create_ASR_KI(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_ki';
    return this.http.post(url, formData);
  }

  public Load_UnAssigned_ASR_KI(Params) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_ki';
    const response = this.http.post(url, Params);
    return response;
  }

  public assign_ASR_KI(Params) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_ki';
    return this.http.post(url, Params);
  }

  public Load_ASR_KI_Details(KI_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ki_details';
    const response = this.http.post(url, {'KI_ID': KI_ID});
    return response;
  }

  public update_ASR_KI(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_ki';
    return this.http.post(url, formData);
  }

  public Delete_ASR_KI(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_ki';
    const response = this.http.post(url, formData);
    return response;
  }

  /* Solution */
  public Load_ASR_SOL(KI_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_sol';
    const response = this.http.post(url, {'KI_ID': KI_ID});
    return response;
  }

  public create_ASR_SOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_sol';
    return this.http.post(url, formData);
  }

  public Load_UnAssigned_ASR_SOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_sol';
    const response = this.http.post(url, formData);
    return response;
  }

  public assign_ASR_SOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_sol';
    return this.http.post(url, formData);
  }

  public Load_ASR_SOL_Details(sol_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_sol_details';
    const response = this.http.post(url, {'SOL_ID': sol_ID});
    return response;
  }

  public update_ASR_SOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_sol';
    return this.http.post(url, formData);
  }

  public Delete_ASR_SOL(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_sol';
    const response = this.http.post(url, formData);
    return response;
  }

  /* Parts */
  public Load_ASR_Part(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_part';
    const response = this.http.post(url, {'SOL_ID': SOL_ID});
    return response;
  }

  public create_ASR_Part(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_asr';
    return this.http.post(url, formData);
  }

  public Load_UnAssigned_ASR_Part(Acc_ID, ASOM_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_part';
    const response = this.http.post(url, {'ACC_ID': Acc_ID, 'ASOM_ID': ASOM_ID});
    return response;
  }

  public assign_ASR_Part(asom_id, part_id) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_part';
    return this.http.post(url, {'Part_ID': part_id, 'ASOM_ID': asom_id});
  }

  public Load_ASR_Part_Details(asrm_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_asr_details';
    const response = this.http.post(url, {'asrmID': asrm_ID});
    return response;
  }

  public update_ASR_Part(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_asr';
    return this.http.post(url, formData);
  }

  public Delete_ASR_Part(partID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_part';
    const response = this.http.post(url, {'PartID': partID});
    return response;
  }

  /* Instruction */
  public Load_ASR_INS(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ins';
    const response = this.http.post(url, {'SOL_ID': SOL_ID});
    return response;
  }

  public create_ASR_INS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_ins';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Load_UnAssigned_INS_Part(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_ins';
    const response = this.http.post(url, formData);
    return response;
  }

  public assign_ASR_INS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_ins';
    return this.http.post(url, formData);
  }

  public Load_ASR_INS_Details(AIM_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ins_details';
    const response = this.http.post(url, {'AIM_ID': AIM_ID});
    return response;
  }

  public update_ASR_INS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_ins';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Delete_ASR_INS(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_ins';
    const response = this.http.post(url, formData);
    return response;
  }

  /* Instruction PDF */
  public Load_ASR_INS_PDF(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ins_pdf';
    const response = this.http.post(url, {'SOL_ID': SOL_ID});
    return response;
  }

  public create_ASR_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_ins_pdf';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Load_UnAssigned_INS_PDF_Part(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_ins_pdf';
    const response = this.http.post(url, formData);
    return response;
  }

  public assign_ASR_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_ins_pdf';
    return this.http.post(url, formData);
  }

  public Load_ASR_INS_PDF_Details(INS_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_ins_pdf_details';
    const response = this.http.post(url, {'INS_ID': INS_ID});
    return response;
  }

  public update_ASR_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_ins_pdf';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Delete_ASR_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_ins_pdf';
    const response = this.http.post(url, formData);
    return response;
  }

  /* General Instruction PDF */
  public Load_ASR_GEN_INS_PDF(SOL_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_gen_pdf';
    const response = this.http.post(url, {'SOL_ID': SOL_ID});
    return response;
  }

  public create_ASR_GEN_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/create_gen_pdf';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Load_UnAssigned_GEN_INS_PDF_Part(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_unassign_gen_pdf';
    const response = this.http.post(url, formData);
    return response;
  }

  public assign_ASR_GEN_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/assign_gen_pdf';
    return this.http.post(url, formData);
  }

  public Load_ASR_GEN_INS_PDF_Details(gPDF_ID) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/load_gen_pdf_details';
    const response = this.http.post(url, {'GPDF_ID': gPDF_ID});
    return response;
  }

  public update_ASR_GEN_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/update_gen_pdf';
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public Delete_ASR_GEN_INS_PDF(formData) {
    const url = GlobalVariable.BASE_API_URL + 'asrm/delete_gen_pdf';
    const response = this.http.post(url, formData);
    return response;
  }
}
