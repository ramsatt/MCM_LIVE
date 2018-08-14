import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {RepairService} from '../service/repair/repair.service';
import {GlobalVariable} from '../../../../../global/global';
declare const $: any;
declare const jQuery: any;
declare const autosize: any;
declare const swal: any;

@Component({
  selector: 'app-repairchecklist',
  templateUrl: './repairchecklist.component.html',
  styleUrls: ['./repairchecklist.component.scss']
})
export class RepairchecklistComponent implements OnInit {
  RCL_Modal_Title: any = '';
  RCL_Modal_Btn: any = '';
  RCL_Form: FormGroup;
  ManufacturerArray: any = [];
  ModelArray: any = [];
  Sclt_Manufecturer_ID = '';
  Sclt_Model_ID = '';
  RepairCheckListArray: any = [];
  RCL_ID: any = '';
  RCL_Description: any = '';

  constructor(private fb: FormBuilder, private repairService: RepairService) {
      this.RCL_Form = this.fb.group({
          'RCL_Check_List': ['', Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
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

  RCL_Load_ALL(Model_ID) {
      this.Sclt_Model_ID = Model_ID;
      const URL = GlobalVariable.BASE_API_URL + 'check_list/rcl_load_all';
      const formData: FormData = new FormData();
      formData.append('accID', this.Sclt_Manufecturer_ID);
      formData.append('modelID', this.Sclt_Model_ID);
      this.repairService.POST(URL, formData).subscribe(
          data => {
                  this.RepairCheckListArray = data;
          }
      );
  }

  RCL_Create_Model() {
    this.RCL_Modal_Title = 'Create Repair Checklist';
    this.RCL_Modal_Btn = 'Create';
    $(function () {
       $('#Repair_Check_list').modal();
    });
  }

  RCL_Update_Model(rclID) {
    this.RCL_Modal_Title = 'Update Repair Checklist';
    this.RCL_Modal_Btn = 'Update';
    const URL = GlobalVariable.BASE_API_URL + 'check_list/rcl_load_detail';
    const formData: FormData = new FormData();
    formData.append('rclID', rclID);
    this.repairService.POST(URL, formData).subscribe(
        data => {
            this.RCL_ID = data.AMRCL_KeyID;
            this.RCL_Description = data.AMRCL_CheckList_Description;
            this.RCL_Form = this.fb.group({
                'RCL_Check_List': [this.RCL_Description, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
            });
            $(function () {
                $('#Repair_Check_list').modal();
            });
        }
    );
  }

  RCL_Save(value) {
      if (this.RCL_Modal_Btn === 'Create') {
          const URL = GlobalVariable.BASE_API_URL + 'check_list/rcl_create';
          const formData: FormData = new FormData();
          formData.append('accID', this.Sclt_Manufecturer_ID);
          formData.append('modelID', this.Sclt_Model_ID);
          formData.append('checkListData', value.RCL_Check_List);
          this.repairService.POST(URL, formData).subscribe(
              data => {
                  this.RCL_Load_ALL(this.Sclt_Model_ID);
                  if (data.result === 'success') {
                      swal({
                          title: 'Created!',
                          text: 'New Checklist created',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                      $(function () {
                          $('#Repair_Check_list').modal('hide');
                      });
                  }
              }
          );
      } else if (this.RCL_Modal_Btn === 'Update') {
          const URL = GlobalVariable.BASE_API_URL + 'check_list/rcl_update';
          const formData: FormData = new FormData();
          formData.append('rclID', this.RCL_ID);
          formData.append('accID', this.Sclt_Manufecturer_ID);
          formData.append('modelID', this.Sclt_Model_ID);
          formData.append('checkListData', value.RCL_Check_List);
          this.repairService.POST(URL, formData).subscribe(
              data => {
                  this.RCL_Load_ALL(this.Sclt_Model_ID);
                  if (data.result === 'success') {
                      swal({
                          title: 'Updated!',
                          text: 'Checklist updated',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                      $(function () {
                          $('#Repair_Check_list').modal('hide');
                      });
                  }
              }
          );
      }
  }

    RCL_Delete(iclID) {
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
                    formData.append('rclID', iclID);
                    const URL = GlobalVariable.BASE_API_URL + 'check_list/rcl_delete';
                    that.repairService.POST(URL, formData).subscribe(
                        data => {
                            if (data.result === 'success') {
                                that.RCL_Load_ALL(that.Sclt_Model_ID);
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
