import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RepairService} from '../service/repair/repair.service';
import {AsrmService} from '../../../account/accservicerequest/services/asrm.service';
import {GlobalVariable} from '../../../../../global/global';
import {FromEventObservable} from 'rxjs/observable/FromEventObservable';
import {MenumanagementService} from '../../../menumanagement/service/menumanagement.service';

declare const $: any;
declare const jQuery: any;
declare const autosize: any;
declare const swal: any;


@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit, OnChanges {
    @Input() MenuChange: any;
    CL_Modal_Title: any = '';
    CL_Modal_Btn: any = '';
    CL_Form: FormGroup;
    ManufacturerArray: any = [];
    ModelsArray: any = [];
    CheckListCategoryArray: any = [];
    Sclt_Manufecturer_ID = '';
    Sclt_Model_ID = '';
    ScltCLCategoryID = '';
    CheckListArray: any = '';
    CL_ID: any = '';
    CL_Desc: any = '';
    sessid: any = '';
    sessionid: any = '';
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    MasterList: any = [];
    /* Service Request */
    AccountSRArray: any = [];
    Sclt_ASRM_KeyID = '';
    CheckListLoading:any='';
    CategoryListArray:any=[];
    CLC_Form:FormGroup;
    MasterCategoryForm: FormGroup;
    mySelectedCategoryList: any = [];
    constructor(private fb: FormBuilder, private repairService: RepairService, public menu: MenumanagementService, public asrmService: AsrmService) {
        this.CL_Form = this.fb.group({
            'Check_List_Desc': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1500)])],
        });
        this.sessid = localStorage.getItem('umid');
        this.sessionid = localStorage.getItem('ucmid');
  }

  ngOnInit() {
      const catArray = [];
      this.CLC_Form = this.fb.group({
          categoryList: this.fb.array(catArray)
      });
      const MasterCategoryArray = [];
      this.MasterCategoryForm = this.fb.group({
          master_category: this.fb.array(MasterCategoryArray)
      });

      this.Load_Manufacturer();
      this.Loadbuttons();
      $(function () {
          autosize($('#textarea'));
      });
  }
    Load_Default_Category() {
        this.CheckListLoading = true;
        const catArray = [];
        this.CategoryListArray = [];
        const URL = GlobalVariable.BASE_API_URL + 'check_list/load_account_checklist';
        const formData = new FormData();
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('clcmkeyID', this.ScltCLCategoryID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.CategoryListArray = data;
                const that = this;
                for (const clc of that.CategoryListArray) {
                    catArray.push(that.fb.group({
                        isChosen: false,
                        name: clc.CL_Description,
                        id: clc.ACL_CLCM_KeyID,
                        clid: clc.CL_KeyID
                    }));
                }
                that.CLC_Form = that.fb.group({
                    categoryList: that.fb.array(catArray)
                });
                this.CheckListLoading = false;
            });
    }
    AssignMasterList(): void {
        $(() => {
            $('#Check_list_Modal').modal('hide');
            $('#All_Check_list_Modal').modal();
            // $('#Default_Check_list_Category_Modal').modal();
        });
        const items = this.MasterCategoryForm.value;
        this.mySelectedCategoryList = items.master_category.filter(x => x.isChosen).map(x => {
            return {name: x.name, id: x.id};
        });
        const formData = new FormData();
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('catID', this.ScltCLCategoryID);

        formData.append('masterList', JSON.stringify(this.mySelectedCategoryList));
        const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_acc_assign';
        this.repairService.POST(URL, formData).subscribe(
            response => {
                if (response.result === 'success') {
                    //this.Load_Category(this.Sclt_ASRM_KeyID);
                    this.Load_Default_Category();
                    this.Swift_Alert('Assigned', 'Check list  assigned to account', 'success', 'btn-success');
                }
            }
        );
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (this.MenuChange === 2) {
            this.Sclt_Manufecturer_ID = '';
            this.Sclt_Model_ID = '';
            this.Sclt_ASRM_KeyID = '';
            this.ScltCLCategoryID = '';
            this.Load_Manufacturer();
            this.Load_Model('');
            this.LoadAllASR('', '');
            this.Load_Category('');
            this.Load_CheckList('');
        } else {
        }
    }
    get categoryList(): FormArray {
        return this.CLC_Form.get('categoryList') as FormArray;
    };
    get master_category(): FormArray {
        return this.MasterCategoryForm.get('master_category') as FormArray;
    };
    public SelectedModel(Model_ID) {
        this.Sclt_Model_ID = Model_ID;
        this.LoadAllASR(this.Sclt_Manufecturer_ID, Model_ID);
    }

    public LoadAllASR(AccID, ModelID) {
        this.asrmService.LoadASR(AccID, ModelID).subscribe(
            data => {
                this.AccountSRArray = data;
                this.CheckListCategoryArray = [];
                this.CheckListArray = [];
                this.Sclt_ASRM_KeyID = '';
                this.ScltCLCategoryID = '';
            }
        );
    }

    Load_Manufacturer() {
        const formData = new FormData();
        formData.append('userID', this.sessid);
        const URL = GlobalVariable.BASE_API_URL + 'accountmaster/accounts';
        this.repairService.POST(URL, formData).subscribe(
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
                this.ModelsArray = data;
                this.AccountSRArray = [];
                this.CheckListCategoryArray = [];
                this.CheckListArray = [];
                this.Sclt_Model_ID = '';
                this.Sclt_ASRM_KeyID = '';
                this.ScltCLCategoryID = '';
            }
        );
    }

    Load_Category(ASRM_KeyID) {
        this.Sclt_ASRM_KeyID = ASRM_KeyID;
        const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_category_load_all';
        const formData = new FormData();
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('modelID', this.Sclt_Model_ID);
        formData.append('asrmID', this.Sclt_ASRM_KeyID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.CheckListCategoryArray = data;
                this.CheckListArray = [];
                this.ScltCLCategoryID = '';
            }
        );
    }

    Load_CheckList(CLC_ID) {
        this.ScltCLCategoryID = CLC_ID;
        const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_load_all';
        const formData = new FormData();
        formData.append('clcmID', CLC_ID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.CheckListArray = data;
            }
        );
    }

    ShowNotifyMsg(title, message) {
        $.notify({
            title: '<strong>' + title + '</strong><br>',
            message: message
        }, {
            type: 'danger',
            placement: {
                from: 'bottom'
            }
        });
    }

    CL_Create_Model() {
        if (this.Sclt_Manufecturer_ID === '') {
            this.ShowNotifyMsg('Account Not Selected.', 'Please select a Account.');
        } else if (this.Sclt_Model_ID === '') {
            this.ShowNotifyMsg('Model Not Selected.', 'Please select a Model.');
        } else if (this.Sclt_ASRM_KeyID === '') {
            this.ShowNotifyMsg('Service Requests Not Selected.', 'Please select a Service Requests.');
        } else if (this.ScltCLCategoryID === '') {
            this.ShowNotifyMsg('Category Not Selected.', 'Please select a Category Requests.');
        } else {
            this.CL_Modal_Title = 'Create Checklist';
            this.CL_Modal_Btn = 'Create';
            this.Load_Default_Category();
            $(function () {
               // $('#Check_list_Modal').modal();
                $('#All_Check_list_Modal').modal();
                $('#RCLForm').trigger('reset');
            });
        }
    }
    AddDefaultChecklist() {

        this.Load_Master_Category(this.Sclt_Manufecturer_ID);
        $(function () {
            $('#All_Check_list_Modal').modal('hide');
            $('#Check_list_Modal').modal();
        });
    }
    Load_Master_Category(ACC_ID) {
        const formData = new FormData();
        formData.append('accID', ACC_ID);
        formData.append('clcID', this.ScltCLCategoryID);
        const URL = GlobalVariable.BASE_API_URL + 'check_list/load_master_checklistdata';
        this.repairService.POST(URL, formData).subscribe(
            masterList => {
                this.MasterList = masterList;
                const MasterCategoryArray = [];
                const that = this;
                this.MasterList.forEach(
                    maserData => {
                        MasterCategoryArray.push(that.fb.group({
                            isChosen: false,
                            name: maserData.CL_Description,
                            id: maserData.CL_KeyID
                        }));
                    }
                );
                that.MasterCategoryForm = that.fb.group({
                    master_category: that.fb.array(MasterCategoryArray)
                });
            }
        );
    }
    CL_Update_Model(clmID) {
        this.CL_Modal_Title = 'Update Checklist';
        this.CL_Modal_Btn = 'Update';
        const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_load_details';
        const formData: FormData = new FormData();
        formData.append('clmID', clmID);
        this.repairService.POST(URL, formData).subscribe(
            data => {
                this.CL_ID = data.CLM_KeyID;
                this.CL_Desc = data.CLM_Check_List_Description;
                this.CL_Form = this.fb.group({
                    'Check_List_Desc': [this.CL_Desc, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1500)])],
                });
                $(function () {
                    $('#Check_list_Modal').modal();
                });
            }
        );
    }

    CL_Save(value) {
        if (this.CL_Modal_Btn === 'Create') {
            const formData = new FormData();
            formData.append('clcmID', this.ScltCLCategoryID);
            formData.append('description', value.Check_List_Desc);
            const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_create';
            this.repairService.POST(URL, formData).subscribe(
                data => {
                    if (data.result === 'success') {
                        this.Load_CheckList(this.ScltCLCategoryID);
                        swal({
                            title: 'Created!',
                            text: 'New Checklist category created',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        $('#RCLForm').trigger('reset');
                        this.Load_Master_Category(this.Sclt_Manufecturer_ID);

                        $(function () {
                           // $('#Check_list_Modal').modal('hide');

                        });
                    }
                }
            );
        } else if (this.CL_Modal_Btn === 'Update') {
            const formData = new FormData();
            formData.append('clmID', this.CL_ID);
            formData.append('clcmID', this.ScltCLCategoryID);
            formData.append('description', value.Check_List_Desc);
            const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_update';
            this.repairService.POST(URL, formData).subscribe(
                data => {
                    if (data.result === 'success') {
                        this.Load_CheckList(this.ScltCLCategoryID);
                        swal({
                            title: 'Updated!',
                            text: 'Checklist category updated',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        $(function () {
                            $('#Check_list_Modal').modal('hide');
                        });
                    }
                }
            );
        }
    }

    CL_Delete(CL_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Checklist will not recover in future. If any tickets link with this Checklist, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                confirmButtonClass: 'btn-danger',
                confirmButtonText: 'Delete',
                cancelButtonText: 'Cancel',
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function (isConfirm) {
                if (isConfirm) {
                    const formData = new FormData();
                    formData.append('clmID', CL_ID);
                    const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_delete';
                    that.repairService.POST(URL, formData).subscribe(
                        data => {
                            if (data[0].result === 'success') {
                                that.Load_CheckList(that.ScltCLCategoryID);
                                swal({
                                    title: 'Deleted!',
                                    text: 'Your Checklist has been deleted.',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }if (data[0].result === 'error') {
                                swal({
                                    title: 'Not able to delete Checklist',
                                    text: data[0].message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }
                        }
                    );
                } else {
                    swal({
                        title: 'Cancelled',
                        text: 'Your Checklist is safe :)',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                }
            });
    }

    Loadbuttons() {
        this.menu.Loadbutton(2, 89, this.sessionid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;

            }
        );

    }
    submitMe(): void {
        $(function () {
            $('#All_Check_list_Modal').modal('hide');
        });
        const items = this.CLC_Form.value;
        this.mySelectedCategoryList = items.categoryList.filter(x => x.isChosen).map(x => {
            return {name: x.name, id: x.id,clid:x.clid};
        });
        const formData = new FormData();
        this.mySelectedCategoryList.forEach(
            data => {
                formData.append('accID', this.Sclt_Manufecturer_ID);
                formData.append('modelID', this.Sclt_Model_ID);
                formData.append('asrmID', this.Sclt_ASRM_KeyID);
                formData.append('clcID', data.clid);
                formData.append('clcmID', data.id);
                formData.append('categoryName', data.name);

                const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_details_create';
                this.repairService.POST(URL, formData).subscribe(
                    newdata => {
                        if (newdata.result === 'success') {
                            swal({
                                title: 'Assigned!',
                                text: 'Your Checklist has been assigned successfully.',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                            this.Load_CheckList(this.ScltCLCategoryID);
                        }
                    }
                );
            });
    }
    Swift_Alert(Title, Text, Type, Class) {
        $(() => {
            swal({
                title: Title,
                text: Text,
                type: Type,
                confirmButtonClass: Class
            });
        });
    }

}
