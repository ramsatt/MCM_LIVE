import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
import {RepairService} from '../service/repair/repair.service';
import {AsrmService} from '../../../account/accservicerequest/services/asrm.service';
import {GlobalVariable} from '../../../../../global/global';
import {MenumanagementService} from '../../../menumanagement/service/menumanagement.service';

declare const $: any;
declare const jQuery: any;
declare const autosize: any;
declare const swal: any;

@Component({
  selector: 'app-checklistcategory',
  templateUrl: './checklistcategory.component.html',
  styleUrls: ['./checklistcategory.component.scss']
})
export class ChecklistcategoryComponent implements OnInit, OnChanges {
    @Input() MenuChange: any;
    CLC_Modal_Title: any = '';
    CLC_Modal_Btn: any = '';
    CLC_Form: FormGroup;
    Category_Form: FormGroup;
    Edit_Category_Form: FormGroup;
    ManufacturerArray: any = [];
    ModelsArray: any = [];
    Sclt_Manufecturer_ID = '';
    Sclt_Model_ID = '';
    CheckListCategoryArray: any = [];
    CategoryListArray: any = [];
    mySelectedCategoryList: any = [];
    sessid: any = '';
    sessionid: any = '';
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    editClcmData: any = '';
    /* Service Request */
    AccountSRArray: any = [];
    Sclt_ASRM_KeyID = '';
    EdtCLC_ID: any = '';
    EdtCLCM_ID: any = '';
    CheckListLoading: boolean = false;
    /*Default Category Form*/
    MasterCategoryForm: FormGroup;
    MasterList: any = [];

    constructor(private fb: FormBuilder, private repairService: RepairService, public menu: MenumanagementService, public asrmService: AsrmService) {
        this.Category_Form = this.fb.group({
            'categoryName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1500)])],
        });
        this.Edit_Category_Form = this.fb.group({
            'editCategoryName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1500)])],
        });
        const MasterCategoryArray = [];
        this.MasterCategoryForm = this.fb.group({
            master_category: this.fb.array(MasterCategoryArray)
        });
        this.sessid = localStorage.getItem('umid');
        this.sessionid = localStorage.getItem('ucmid');
  }

  ngOnInit() {
      this.Load_Manufacturer();
      this.Loadbuttons();
      this.Load_Default_Category();
      const catArray = [];
      this.CLC_Form = this.fb.group({
          categoryList: this.fb.array(catArray)
      });
      $(function () {
          autosize($('#textarea'));
      });
  }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.MenuChange === 2) {
            this.Sclt_Manufecturer_ID = '';
            this.Sclt_Model_ID = '';
            this.Sclt_ASRM_KeyID = '';
            this.Load_Manufacturer();
            this.Load_Model(this.Sclt_Manufecturer_ID);
            this.LoadAllASR(this.Sclt_Manufecturer_ID, this.Sclt_Model_ID);
            this.Load_Category(this.Sclt_ASRM_KeyID);
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
        this.AccountSRArray = [];
        this.Sclt_ASRM_KeyID = '';
        this.CheckListCategoryArray = [];
        if (Model_ID === '') {
        } else {
            this.LoadAllASR(this.Sclt_Manufecturer_ID, Model_ID);
        }
    }

    public LoadAllASR(AccID, ModelID) {
        this.asrmService.LoadASR(AccID, ModelID).subscribe(
            data => {
                this.AccountSRArray = data;
            }
        );
    }

    Loadbuttons() {
        this.menu.Loadbutton(2, 88, this.sessionid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
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
    this.Sclt_Model_ID = '';
    this.AccountSRArray = [];
    this.ModelsArray = [];
    this.Sclt_ASRM_KeyID = '';
    this.CheckListCategoryArray = [];
      if (Manufacturer_ID === '') {
    } else {
      const URL = GlobalVariable.BASE_API_URL + 'model/loadaccmodel&accountID=' + encodeURIComponent(this.Sclt_Manufecturer_ID);
      this.repairService.GET(URL).subscribe(
        data => {
          this.ModelsArray = data;
        }
      );
    }
  }

  Load_Category(ASRM_KeyID) {
    this.Sclt_ASRM_KeyID = ASRM_KeyID;
    this.CheckListCategoryArray = [];
      if (ASRM_KeyID === '') {
          this.CheckListCategoryArray = [];
      } else {
          const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_category_load_all';
          const formData = new FormData();
          formData.append('accID', this.Sclt_Manufecturer_ID);
          formData.append('modelID', this.Sclt_Model_ID);
          formData.append('asrmID', this.Sclt_ASRM_KeyID);
          this.repairService.POST(URL, formData).subscribe(
              data => {
                  this.CheckListCategoryArray = data;
              }
          );
      }
  }

    Load_Master_Category(ACC_ID) {
        const formData = new FormData();
        formData.append('accID', ACC_ID);
        const URL = GlobalVariable.BASE_API_URL + 'check_list/load_master_data';
        this.repairService.POST(URL, formData).subscribe(
            masterList => {
                this.MasterList = masterList;
                const MasterCategoryArray = [];
                const that = this;
                this.MasterList.forEach(
                    maserData => {
                        MasterCategoryArray.push(that.fb.group({
                            isChosen: false,
                            name: maserData.CLC_Check_List_Category,
                            id: maserData.CLC_KeyID
                        }));
                    }
                );
                that.MasterCategoryForm = that.fb.group({
                    master_category: that.fb.array(MasterCategoryArray)
                });
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

  CLC_Create_Model() {
      if (this.Sclt_Manufecturer_ID === '') {
          this.ShowNotifyMsg('Account Not Selected.', 'Please select a Account.');
      } else if (this.Sclt_Model_ID === '') {
          this.ShowNotifyMsg('Model Not Selected.', 'Please select a Model.');
      } else if (this.Sclt_ASRM_KeyID === '') {
          this.ShowNotifyMsg('Service Requests Not Selected.', 'Please select a Service Requests.');
      } else {
          this.CLC_Modal_Title = 'Assign Checklist category';
          this.CLC_Modal_Btn = 'ADD';
          this.Load_Default_Category();
          $(function () {
              $('#Check_list_Category_Modal').modal();
          });
      }
  }

  CLC_Edit_Model(clcm) {
    this.EdtCLC_ID = clcm.CLCM_CLC_KeyID;
    this.EdtCLCM_ID = clcm.CLCM_KeyID;
      this.Edit_Category_Form.setValue({
          editCategoryName: clcm.CLCM_Category_Name
      });
      $(function () {
          $('#CLC_Edit_Model').modal();
      });
  }

  CLC_Delete(CLC_ID) {
      const that = this;
      swal({
              title: 'Are you sure?',
              text: 'This Checklist category will not recover in future. If any checklist link with this Checklist category, it can’t be delete.',
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
                  formData.append('clcmID', CLC_ID);
                  const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_category_delete';
                  that.repairService.POST(URL, formData).subscribe(
                      data => {
                          if (data[0].result === 'success') {
                              that.Load_Category(that.Sclt_ASRM_KeyID);
                              that.Swift_Alert('Deleted!', 'Your Checklist category has been deleted.', 'success', 'btn-success');
                          }else if(data[0].result === 'error'){
                              that.Swift_Alert('Not able to delete Checklist category', data[0].message, 'error', 'btn-danger');
                          }
                      }
                  );
              } else {
                  that.Swift_Alert('Cancelled', 'Your Checklist is safe :)', 'error', 'btn-danger');
              }
          });
  }

  Load_Default_Category() {
    this.CheckListLoading = true;
    const catArray = [];
    this.CategoryListArray = [];
      const URL = GlobalVariable.BASE_API_URL + 'check_list/load_default_category';
      const formData = new FormData();
      formData.append('accID', this.Sclt_Manufecturer_ID);
      formData.append('modelID', this.Sclt_Model_ID);
      formData.append('sreqID', this.Sclt_ASRM_KeyID);
      this.repairService.POST(URL, formData).subscribe(
          data => {
              this.CategoryListArray = data;
              const that = this;
              for (const clc of that.CategoryListArray) {
                  catArray.push(that.fb.group({
                      isChosen: false,
                      name: clc.CLC_Check_List_Category,
                      id: clc.CLC_KeyID
                  }));
              }
              that.CLC_Form = that.fb.group({
                  categoryList: that.fb.array(catArray)
              });
              this.CheckListLoading = false;
          });
  }

    submitMe(): void {
        $(function () {
            $('#Check_list_Category_Modal').modal('hide');
        });
        const items = this.CLC_Form.value;
        this.mySelectedCategoryList = items.categoryList.filter(x => x.isChosen).map(x => {
            return {name: x.name, id: x.id};
        });
        const formData = new FormData();
        this.mySelectedCategoryList.forEach(
            data => {
                formData.append('accID', this.Sclt_Manufecturer_ID);
                formData.append('modelID', this.Sclt_Model_ID);
                formData.append('asrmID', this.Sclt_ASRM_KeyID);
                formData.append('clcID', data.id);
                formData.append('categoryName', data.name);
                const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_category_create';
                this.repairService.POST(URL, formData).subscribe(
                    newdata => {
                        if (newdata.result === 'success') {
                            swal({
                                title: 'Assigned!',
                                text: 'Your Checklist category has been assigned successfully.',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                            this.Load_Category(this.Sclt_ASRM_KeyID);
                        }
                    }
                );
            });
    }

    AssignMasterList(): void {
        $(() => {
            $('#Default_Check_list_Category_Modal').modal('hide');
            $('#Check_list_Category_Modal').modal();
           // $('#Default_Check_list_Category_Modal').modal();
        });
        const items = this.MasterCategoryForm.value;
        this.mySelectedCategoryList = items.master_category.filter(x => x.isChosen).map(x => {
            return {name: x.name, id: x.id};
        });
        const formData = new FormData();
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('modelID', this.Sclt_Model_ID);
        formData.append('asrmID', this.Sclt_ASRM_KeyID);
        formData.append('masterList', JSON.stringify(this.mySelectedCategoryList));
        const URL = GlobalVariable.BASE_API_URL + 'check_list/check_list_category_acc_assign';
        this.repairService.POST(URL, formData).subscribe(
            response => {
                if (response.result === 'success') {
                    this.Load_Category(this.Sclt_ASRM_KeyID);
                    this.Load_Default_Category();
                    this.Swift_Alert('Assigned', 'Check list category assigned to account', 'success', 'btn-success');
                }
            }
        );
    }

    AddDefaultCategory() {
        this.Category_Form = this.fb.group({
            'categoryName': ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(1500)])],
        });
        this.Load_Master_Category(this.Sclt_Manufecturer_ID);
        $(function () {
            $('#Check_list_Category_Modal').modal('hide');
            $('#Default_Check_list_Category_Modal').modal();
        });
    }

    SaveDefaultCategory(value) {
        const formData = new FormData();
        formData.append('category', value.categoryName);
        formData.append('accID', this.Sclt_Manufecturer_ID);
        formData.append('modelID', this.Sclt_Model_ID);
        formData.append('asrmID', this.Sclt_ASRM_KeyID);
        const URL = GlobalVariable.BASE_API_URL + 'check_list/save_default_category';
        this.repairService.POST(URL, formData).subscribe(
            data => {
                if (data.result === 'success') {
         // $('#Default_Check_list_Category_Modal').modal();
                   // $('#Check_list_Category_Modal').modal();
                    this.Load_Master_Category(this.Sclt_Manufecturer_ID);
                    this.Load_Default_Category();
                    $("#CategoryForm").trigger("reset");
                    this.Load_Category(this.Sclt_ASRM_KeyID);

                    this.Swift_Alert('Created', 'New check list category created!', 'success', 'btn-success');
                } else if (data.result === 'exist') {
                    this.Swift_Alert('Exist', 'Your Selected Check List Already Exist!', 'error', 'btn-danger');
                }
            }
        );
    }

    Update_CLC_Category(value) {
        const formData = new FormData();
        formData.append('clmID', this.EdtCLCM_ID);
        formData.append('clcID', this.EdtCLC_ID);
        formData.append('categoryName', value.editCategoryName);
        const URL = GlobalVariable.BASE_API_URL + 'check_list/update_category';
        this.repairService.POST(URL, formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.Load_Category(this.Sclt_ASRM_KeyID);
                    this.Swift_Alert('Updated', 'Your check list category has been updated!', 'success', 'btn-success');
                    $('#CLC_Edit_Model').modal('hide');
                }
            }
        );
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
