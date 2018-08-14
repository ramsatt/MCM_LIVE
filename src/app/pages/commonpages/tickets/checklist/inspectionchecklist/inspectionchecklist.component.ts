import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RepairService } from '../service/repair/repair.service';
import { GlobalVariable } from '../../../../../global/global';
declare const $: any;
declare const jQuery: any;
declare const autosize: any;
declare const swal: any;


@Component({
  selector: 'app-inspectionchecklist',
  templateUrl: './inspectionchecklist.component.html',
  styleUrls: ['./inspectionchecklist.component.scss']
})
export class InspectionchecklistComponent implements OnInit {
    ICL_Modal_Title: any = '';
    ICL_Modal_Btn: any = '';
    ICL_Form: FormGroup;
    ManufacturerArray: any = [];
    ModelArray: any = [];
    Sclt_Manufecturer_ID = '';
    Sclt_Model_ID = '';
    InspectionCheckListArray: any = [];
    ICL_ID: any = '';
    ICL_Description: any = '';

  constructor(private fb: FormBuilder, private repairService: RepairService) {
      this.ICL_Form = this.fb.group({
          'ICL_Check_List': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
      });
  }

  ngOnInit() {
      this.Load_Manufacturer();
      $(function () {
          autosize($('#textarea'));
      });
  }

    Load_Manufacturer() {
        const URL = GlobalVariable.BASE_API_URL + 'accountmaster/accounts';
        this.repairService.GET(URL).subscribe(
            data => {
                this.ManufacturerArray = data;
            }
        );
    }

    Load_Model(Manufacturer_ID) {
        this.Sclt_Manufecturer_ID = Manufacturer_ID;
        const URL = GlobalVariable.BASE_API_URL + 'model/loadaccmodel&accountID=' + encodeURIComponent(this.Sclt_Manufecturer_ID);
        this.repairService.GET(URL).subscribe(
            data => {
                this.ModelArray = data;
            }
        );
    }

    ICL_Create_Model() {
        this.ICL_Modal_Title = 'Create Checklist';
        this.ICL_Modal_Btn = 'Create';
        $(function () {
            $('#Inspection_Check_list').modal();
        });
    }

    ICL_Load_ALL(Model_ID) {
        this.Sclt_Model_ID = Model_ID;
        const URL = GlobalVariable.BASE_API_URL + 'check_list/icl_load_all';
        const formData: FormData = new FormData();
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('modelID', this.Sclt_Model_ID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.InspectionCheckListArray = data;
            }
        );
    }

    ICL_Save(value) {
        if (this.ICL_Modal_Btn === 'Create') {
            const URL = GlobalVariable.BASE_API_URL + 'check_list/icl_create';
            const formData: FormData = new FormData();
            formData.append('accID', this.Sclt_Manufecturer_ID);
            formData.append('modelID', this.Sclt_Model_ID);
            formData.append('iclDesc', value.ICL_Check_List);
            this.repairService.POST(URL, formData).subscribe(
                data => {
                    this.ICL_Load_ALL(this.Sclt_Model_ID);
                    if (data.result === 'success') {
                        swal({
                            title: 'Created!',
                            text: 'New Checklist created',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        $(function () {
                            $('#Inspection_Check_list').modal('hide');
                        });
                    }
                }
            );
        } else if (this.ICL_Modal_Btn === 'Update') {
            const URL = GlobalVariable.BASE_API_URL + 'check_list/icl_update';
            const formData: FormData = new FormData();
            formData.append('iclID', this.ICL_ID);
            formData.append('accID', this.Sclt_Manufecturer_ID);
            formData.append('modelID', this.Sclt_Model_ID);
            formData.append('iclDesc', value.ICL_Check_List);
            this.repairService.POST(URL, formData).subscribe(
                data => {
                    this.ICL_Load_ALL(this.Sclt_Model_ID);
                    if (data.result === 'success') {
                        swal({
                            title: 'Updated!',
                            text: 'Checklist updated',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        $(function () {
                            $('#Inspection_Check_list').modal('hide');
                        });
                    }
                }
            );
        }
    }

    ICL_Update_Model(iclID) {
        this.ICL_Modal_Title = 'Update Checklist';
        this.ICL_Modal_Btn = 'Update';
        const URL = GlobalVariable.BASE_API_URL + 'check_list/icl_load_details';
        const formData: FormData = new FormData();
        formData.append('iclID', iclID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.ICL_ID = data.AMICL_KeyID;
                this.ICL_Description = data.AMICL_CheckList_Description;
                this.ICL_Form = this.fb.group({
                    'ICL_Check_List': [this.ICL_Description, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
                });
                $(function () {
                    $('#Inspection_Check_list').modal();
                });
            }
        );
    }

    ICL_Delete(iclID) {
      const that = this;
      swal({
                    title: 'Are you sure?',
                    text: 'You will not be able to recover this Checklist!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-danger',
                    confirmButtonText: 'Delete',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const formData = new FormData();
                        formData.append('iclID', iclID);
                        const URL = GlobalVariable.BASE_API_URL + 'check_list/icl_delete';
                        that.repairService.POST(URL, formData).subscribe(
                            data => {
                                if (data.result === 'success') {
                                    that.ICL_Load_ALL(this.Sclt_Model_ID);
                                    swal({
                                        title: 'Deleted!',
                                        text: 'Your Checklist has been deleted.',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                }
                            }
                        );
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: 'Your heck list is safe :)',
                            type: 'error',
                            confirmButtonClass: 'btn-danger'
                        });
                    }
                });
    }

}
