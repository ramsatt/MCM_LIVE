import { Component, OnInit, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ModelsService } from '../../../settings/models/services/models.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FileValidatorDirective} from '../../../../customDirective/FileValidator.Directive';
import { GlobalVariable } from '../../../../global/global';
import { EditmodelService } from '../../../settings/models/services/editmodel.service';
import {MenumanagementService} from '../../menumanagement/service/menumanagement.service';


declare var $;
declare var swal;

@Component({
  selector: 'app-accmodel',
  templateUrl: './accmodel.component.html',
  styleUrls: ['./accmodel.component.scss']
})
export class AccmodelComponent implements OnInit, OnChanges {
  @Input() scltAccountID;
  ModelselectedRow: Number=0;
  ModelClickedRow: Function;
  ModelsArray: any = [];
  scltModelID: any;
  ModelID: any;
  ModelName: any;
  ModelStatus: any;
  ModelDesc: any;
  ModelImagePath: any;
  ModalBoxTitle: any;
  ModalBoxBtn: any;
  Model_Form: FormGroup;
  ModelImgFile: File;
  modelRecordchk: any;
  @ViewChild('Model_Image') M_Image;
  ImageUrl: any;
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    sessid: any;
    userID: any = '';

  constructor(private modelService: ModelsService, private fb: FormBuilder, private editModel: EditmodelService, public menu: MenumanagementService) {
      this.sessid = localStorage.getItem('ucmid');
      this.userID = localStorage.getItem('ucmid');
      this.Loadbuttons();
    this.Model_Form = this.fb.group({
      'Model_Name': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])],
      'Model_Desc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
      'Model_Status': ['NO', Validators.required],
      'Model_Image': [null, FileValidatorDirective.validate]
    });
    this.ModelClickedRow = function(index){
      this.ModelselectedRow = index;
    };
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.LoadModel(this.scltAccountID,'');
  }

  LoadModel(Account_ID,modelid) {
    this.modelService.LoadAccModels(Account_ID).subscribe(
        data => {
          this.ModelsArray = data;
          const ModelCount = this.ModelsArray.length;
          if ( ModelCount >= 1) {
            this.scltModelID = data[0].MM_KeyID;
              if(modelid!='')
              {

                  this.LoadModelDetails(modelid);
              }
              else {
                  this.LoadModelDetails(this.scltModelID);
              }

          }else if (ModelCount === 0){
            this.ModelID = '';
            this.ModelName = '';
            this.ModelStatus = '';
            this.ModelDesc = '';
            this.ImageUrl = '';
          }
        }
    );
  }

  LoadModelDetails(Model_ID) {
    this.scltModelID = Model_ID;
    this.modelService.LoadModel(Model_ID).subscribe(
        data => {
          this.ModelID = data.MM_KeyID;
          this.ModelName = data.MM_Model_Name;
          this.ModelStatus = data.MM_Disabled;
          this.ModelDesc = data.MM_Description;
          this.ModelImagePath = data.MM_Model_Image;
          if (this.ModelStatus === 'Y') {
            this.ModelStatus = 'YES';
          } else if (this.ModelStatus === 'N') {
            this.ModelStatus = 'NO';
          }
          const modelImage_Path = GlobalVariable.BASE_FILE_API + 'uploads/Model_Images/' + this.scltAccountID + '/image/' + this.ModelImagePath;
          this.ImageUrl = modelImage_Path;
          this.modelRecordchk= this.ImageUrl;
        }
    );
  }

  ShowCreateModelBox() {
      this.modelRecordchk='';
    if (this.scltAccountID === '') {
      $.notify({
        title: '<strong>Account Not Selected.</strong><br>',
        message: 'Please select Account.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom'
        }
      });
    } else {
      this.Model_Form = this.fb.group({
        'Model_Name': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])],
        'Model_Desc': [null, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
        'Model_Status': ['NO', Validators.required],
        'Model_Image': [null, FileValidatorDirective.validate]
      });
      this.ModalBoxTitle = 'Create Model';
      this.ModalBoxBtn = 'Create';
      $(function () {
        $('#ModalBox').modal();
        $('.dropify').dropify();
        $('.dropify-clear').click();
      });
    }
  }

  HideModalBox() {
      this.ngOnInit();
    $(function () {
      $('#ModalBox').modal('hide');
      $('#ModelForm').trigger('reset');
        //$('.dropify-clear').click();
        let drEvent = $('.dropify').dropify();
        drEvent = drEvent.data('dropify');
        drEvent.resetPreview();
        drEvent.clearElement();
    });
  }

  ShowEditModalBox() {
    this.ModalBoxTitle = 'Update Model';
    this.ModalBoxBtn = 'Update';
    this.Model_Form = this.fb.group({
      'Model_Name': [this.ModelName, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(1500)])],
      'Model_Desc': [this.ModelDesc, Validators.compose([Validators.minLength(10), Validators.maxLength(1500)])],
      'Model_Status': [this.ModelStatus, Validators.required],
      'Model_Image': [null]
    });
    $(function () {
      $('#ModalBox').modal();
      $('.dropify').dropify();
    });
  }

  SaveModel(value) {
    if (this.ModalBoxBtn === 'Create') {
      const Image = this.M_Image.nativeElement;
      if (Image.files && Image.files[0]) {
        this.ModelImgFile = Image.files[0];
      }
      const ImageFile: File = this.ModelImgFile;
      const formData: FormData = new FormData();
      if (value.Model_Desc === null) {
          this.ModelDesc = '';
      } else {
          this.ModelDesc = value.Model_Desc;
      }
      formData.append('ACC_ID', this.scltAccountID);
      formData.append('M_Name', value.Model_Name);
      formData.append('M_Desc', this.ModelDesc);
      formData.append('M_Status', value.Model_Status);
      formData.append('M_File', ImageFile, ImageFile.name);
      formData.append('userID', this.userID);
      this.modelService.CreateMOdel(formData).subscribe(
          data => {
            let response: any;
            response = data;
            if (response.result === 'success') {
              this.HideModalBox();
              this.LoadModel(this.scltAccountID,response.lid);
              swal({
                title: 'Created!',
                text: 'Model Created Successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
            }
          }
      );
    } else if (this.ModalBoxBtn === 'Update') {
      if (value.Model_Image === null) {
          if (value.Model_Desc === null) {
              this.ModelDesc = '';
          } else {
              this.ModelDesc = value.Model_Desc;
          }

        const formData: FormData = new FormData();
        formData.append('ACC_ID', this.scltAccountID);
        formData.append('M_ID', this.scltModelID);
        formData.append('M_Name', value.Model_Name);
        formData.append('M_Desc', this.ModelDesc);
        formData.append('M_Status', value.Model_Status);
        this.editModel.UpdateModel(formData).subscribe(
            data => {
              let response: any;
              response = data;
              if (response.result === 'success') {
                this.HideModalBox();
                this.LoadModel(this.scltAccountID,this.scltModelID);
               // this.LoadModelDetails(this.scltModelID);
                swal({
                  title: 'Updated!',
                  text: 'Model Updated Successfully',
                  type: 'success',
                  confirmButtonClass: 'btn-success'
                });
              }
            }
        );
      } else {
        const Image = this.M_Image.nativeElement;
        if (Image.files && Image.files[0]) {
          this.ModelImgFile = Image.files[0];
        }
          if (value.Model_Desc === null) {
              this.ModelDesc = '';
          } else {
              this.ModelDesc = value.Model_Desc;
          }
        const ImageFile: File = this.ModelImgFile;
        const formData: FormData = new FormData();
        formData.append('ACC_ID', this.scltAccountID);
        formData.append('M_ID', this.scltModelID);
        formData.append('M_Name', value.Model_Name);
        formData.append('M_Desc', this.ModelDesc);
        formData.append('M_Status', value.Model_Status);
        formData.append('M_File', ImageFile, ImageFile.name);
        this.editModel.UpdateModel(formData).subscribe(
            data => {
              let response: any;
              response = data;
              if (response.result === 'success') {
                this.HideModalBox();
                this.LoadModel(this.scltAccountID,this.scltModelID);
                //this.LoadModelDetails(this.scltModelID);
                swal({
                  title: 'Updated!',
                  text: 'Model Updated Successfully',
                  type: 'success',
                  confirmButtonClass: 'btn-success'
                });
              }
            }
        );
      }
    }
  }

    DeleteModel(Model_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Model will not recover in future. If any Assets or Service requests link with this account, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function () {
                that.editModel.DeleteModel(Model_ID).subscribe(
                    data => {
                        let response: any;
                        response = data;
                        if (response[0].result === 'success') {
                            that.LoadModel(that.scltAccountID,'');
                            swal({
                                title: 'Deleted!',
                                text: ' Model Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }else if(response[0].result === 'error'){
                            swal({
                                title: 'Not able to delete Model',
                                text: response[0].message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }

    Loadbuttons() {
        this.menu.Loadbutton(12, 81, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;

            }
        );

    }
}
