import { Injectable } from '@angular/core';
import {GlobalVariable} from "../../../../../global/global";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/Rx'
@Injectable()
export class TickservicereqService {

    constructor( public http: Http ) { }
    /* SERVICE REQUEST */
    public LoadASR(Acc_ID, Model_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_asr';
        const response = this.http.post(url, { 'acc_ID': Acc_ID, 'model_ID': Model_ID }).map( res => res.json() );
        return response;
    }
    public ActivateKI(formData)
    {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/confirm';
        return this.http.post(url, formData).map(res => res.json());
    }
    public createASR(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_asr';
        return this.http.post(url, formData).map(res => res.json());
    }

    public LoadUnAssignedASR(Acc_ID, Model_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_sr';
        const response = this.http.post(url, { 'acc_ID': Acc_ID, 'model_ID': Model_ID }).map( res => res.json() );
        return response;
    }

    public assignASR(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_sr';
        return this.http.post(url, formData).map(res => res.json());
    }

    public LoadASRDetails(asrm_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_asr_details';
        const response = this.http.post(url, { 'asrmID': asrm_ID}).map( res => res.json() );
        return response;
    }

    public updateASR(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_asr';
        return this.http.post(url, formData).map(res => res.json());
    }

    public DeleteASR(asrm_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_asr';
        const response = this.http.post(url, { 'asrmID': asrm_ID}).map( res => res.json() );
        return response;
    }

    /* KNOWN ISSUE */
    public Load_ASR_KI(AMSR_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ki';
        const response = this.http.post(url, { 'AMSR_ID': AMSR_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_KI(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_ki';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_ASR_KI(Params) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_ki';
        const response = this.http.post(url, Params).map( res => res.json() );
        return response;
    }

    public assign_ASR_KI(Params) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_ki';
        return this.http.post(url, Params).map(res => res.json());
    }

    public Load_ASR_KI_Details(KI_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ki_details';
        const response = this.http.post(url, { 'KI_ID': KI_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_KI(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_ki';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_KI(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_ki';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    /* Solution */
    public Load_ASR_SOL(KI_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_sol';
        const response = this.http.post(url, { 'KI_ID': KI_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_SOL(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_sol';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_ASR_SOL(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_sol';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    public assign_ASR_SOL(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_sol';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_ASR_SOL_Details(sol_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_sol_details';
        const response = this.http.post(url, { 'SOL_ID': sol_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_SOL(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_sol';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_SOL(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_sol';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    /* Parts */
    public Load_ASR_Part(SOL_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_part';
        const response = this.http.post(url, { 'SOL_ID': SOL_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_Part(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_asr';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_ASR_Part(Acc_ID, ASOM_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_part';
        const response = this.http.post(url, { 'ACC_ID': Acc_ID, 'ASOM_ID': ASOM_ID }).map( res => res.json() );
        return response;
    }

    public assign_ASR_Part(asom_id, part_id) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_part';
        return this.http.post(url, {'Part_ID': part_id, 'ASOM_ID': asom_id}).map(res => res.json());
    }

    public Load_ASR_Part_Details(asrm_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_asr_details';
        const response = this.http.post(url, { 'asrmID': asrm_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_Part(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_asr';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_Part(partID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_part';
        const response = this.http.post(url, { 'PartID': partID}).map( res => res.json() );
        return response;
    }

    /* Instruction */
    public Load_ASR_INS(SOL_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ins';
        const response = this.http.post(url, { 'SOL_ID': SOL_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_INS(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_ins';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_INS_Part(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_ins';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    public assign_ASR_INS(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_ins';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_ASR_INS_Details(AIM_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ins_details';
        const response = this.http.post(url, { 'AIM_ID': AIM_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_INS(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_ins';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_INS(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_ins';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    /* Instruction PDF */
    public Load_ASR_INS_PDF(SOL_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ins_pdf';
        const response = this.http.post(url, { 'SOL_ID': SOL_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_ins_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_INS_PDF_Part(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_ins_pdf';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    public assign_ASR_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_ins_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_ASR_INS_PDF_Details(INS_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_ins_pdf_details';
        const response = this.http.post(url, { 'INS_ID': INS_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_ins_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_ins_pdf';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    /* General Instruction PDF */
    public Load_ASR_GEN_INS_PDF(SOL_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_gen_pdf';
        const response = this.http.post(url, { 'SOL_ID': SOL_ID }).map( res => res.json() );
        return response;
    }

    public create_ASR_GEN_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/create_gen_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_UnAssigned_GEN_INS_PDF_Part(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_unassign_gen_pdf';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }

    public assign_ASR_GEN_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/assign_gen_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Load_ASR_GEN_INS_PDF_Details(gPDF_ID) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/load_gen_pdf_details';
        const response = this.http.post(url, { 'GPDF_ID': gPDF_ID}).map( res => res.json() );
        return response;
    }

    public update_ASR_GEN_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/update_gen_pdf';
        return this.http.post(url, formData).map(res => res.json());
    }

    public Delete_ASR_GEN_INS_PDF(formData) {
        const url = GlobalVariable.BASE_API_URL + 'tickasrm/delete_gen_pdf';
        const response = this.http.post(url, formData).map( res => res.json() );
        return response;
    }
}
