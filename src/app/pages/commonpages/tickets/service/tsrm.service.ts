import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {GlobalVariable} from '../../../../global/global';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class TsrmService {

    constructor(public http: HttpClient) {
    }
  /*Known Issues*/
  Load_Acc_SR_KI(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_acc_ki_all';
      return this.http.post(URL, formData);
  }
  Load_TIC_KI(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ki';
      const response = this.http.post(URL, formData);
    return response;
  }
    Assign_TIC_KI(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_ki';
        const response = this.http.post(URL, formData);
        return response;
    }

    Load_TIC_KI_UnAssign_List(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ki_unassign_list';
        const response = this.http.post(URL, formData);
        return response;
    }

  Load_TIC_KI_Details(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ki_details';
      const response = this.http.post(URL, formData);
    return response;
  }

  Create_TIC_KI(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'tsrm/create_tic_ki';
      const response = this.http.post(URL, formData);
      return response;
  }

  Update_TIC_KI(formData) {
      const URL = GlobalVariable.BASE_API_URL + 'tsrm/update_tic_ki';
      const response = this.http.post(URL, formData);
      return response;
  }

  Delete_TIC_KI(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_ki';
      const response = this.http.post(URL, formData);
    return response;
  }

    Delete_TIC_KI_Edit(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_ki_edit';
        const response = this.http.post(URL, formData);
        return response;
  }

  /*Solutions*/
  Load_TIC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_SOL_ALL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_sol_all';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_ACC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/acc_ki_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

  Assign_TIC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

    Load_TIC_SOL_UnAssign_List(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_sol_unassign_list';
        const response = this.http.post(URL, formData);
        return response;
    }

    Load_TIC_SOL_Details(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_sol_details';
        const response = this.http.post(URL, formData);
        return response;
    }

  Create_TIC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/create_tic_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

  Update_TIC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/update_tic_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

  Delete_TIC_SOL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_sol';
      const response = this.http.post(URL, formData);
    return response;
  }

  /*Parts*/
  Load_TIC_Parts(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_parts';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_Parts_All(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_parts_all';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_ACC_Assigned_Parts(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_acc_assigned_parts';
      const response = this.http.post(URL, formData);
    return response;
  }

  Assign_TIC_Parts(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_parts';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_Parts_UnAssign_List(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_parts_unassign_list';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_Parts_Details(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_parts';
      const response = this.http.post(URL, formData);
    return response;
  }

    Remove_TIC_Parts(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/remove_tic_part';
        const response = this.http.post(URL, formData);
        return response;
    }

  /*Instruction*/
  Load_TIC_INS(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_INS_ALL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_all';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_ACC_Assigned_INS(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_acc_assigneds_ins';
      const response = this.http.post(URL, formData);
    return response;
  }

  Assign_TIC_INS(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_ins';
      const response = this.http.post(URL, formData);
    return response;
  }
  Load_TIC_INS_UnAssign_List(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_unassign_list';
      const response = this.http.post(URL, formData);
    return response;
  }

    Load_TIC_INS_Details(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_details';
        const response = this.http.post(URL, formData);
        return response;
    }

    Create_TIC_INS(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/create_tic_ins';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }

    Update_TIC_INS(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/update_tic_ins';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }

    Delete_TIC_INS(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_ins';
        const response = this.http.post(URL, formData);
        return response;
    }

  /*Instruction PDF*/
  Load_TIC_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_ACC_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_acc_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_ACC_INS_PDF_All(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_pdf_all';
      const response = this.http.post(URL, formData);
    return response;
  }

  Assign_TIC_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_INS_PDF_UnAssign_List(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_pdf_unassign_list';
      const response = this.http.post(URL, formData);
    return response;
  }

    Load_TIC_INS_PDF_Details(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_ins_pdf_details';
        const response = this.http.post(URL, formData);
        return response;
    }

    Create_TIC_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/create_tic_ins_pdf';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }

    Update_TIC_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/update_tic_ins_pdf';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }

    Delete_TIC_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_ins_pdf';
        const response = this.http.post(URL, formData);
        return response;
    }

  /*General Instuction PDF*/
  Load_TIC_GEN_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_gen_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_GEN_INS_PDF_ALL(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_gen_ins_pdf_all';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_ACC_GEN_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_acc_gen_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Assign_TIC_GEN_INS_PDF(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/assign_tic_gen_ins_pdf';
      const response = this.http.post(URL, formData);
    return response;
  }

  Load_TIC_GEN_INS_PDF_UnAssignList(formData) {
    const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_gen_ins_pdf_unassign_list';
      const response = this.http.post(URL, formData);
    return response;
  }

    Load_TIC_GEN_INS_PDF_Details(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/load_tic_gen_ins_pdf_details';
        const response = this.http.post(URL, formData);
        return response;
    }

    Create_TIC_GEN_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/create_tic_gen_ins_pdf';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }

    Remove_TIC_GEN_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/delete_tic_gen_ins_pdf';
        const response = this.http.post(URL, formData);
        return response;
    }

    Update_TIC_GEN_INS_PDF(formData) {
        const URL = GlobalVariable.BASE_API_URL + 'tsrm/update_tic_gen_ins_pdf';
        const response = this.http.post(URL, formData, {
            reportProgress: true,
            observe: 'events'
        });
        return response;
    }
}
