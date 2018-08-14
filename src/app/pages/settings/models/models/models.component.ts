import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';
import { ModelsService } from '../services/models.service';
import { EditmodelService } from '../services/editmodel.service';
import { AccountsService } from '../../../../services/accounts/accounts.service';


declare var $;
declare var swal;

@Component({
  selector: 'app-models',
  templateUrl: './models.component.html',
  styleUrls: ['./models.component.scss']
})
export class ModelsComponent implements OnInit {
  submitted = false;
  active = true;

  /* Pipe */
  model_name: any;

  /* Model Title */
  ModalTittle: any = '';
  ModalBtnPri: any = '';
  ModalBtnSec: any = '';

  /* Arrays */
  AccountArray: any;
  ModelsArray: any;
  /* single model details */
  ModelDetailsArray: any;

  /* Model Details */
  ModelID: any = '';
  ModelName: any = '';
  ModelDescription: any = '';
  ModelStatus: any = '';
  ModelImage: any = 'assets/images/No-image-found.jpg';
  SelectedImage: any;
  EdtImage: File;
  @ViewChild('Edt_Model_image') EdtImageFile;

  /* Edit Status */
  EdtStatus: any = 'inactive';

  AccountID: any = '';

  /* Create Model */
  CrModelName: any = '';
  CrModelDesc: any = '';
  CrModelStatus: any = 'NO';
  ModalImageFile: File;
  @ViewChild('ModalImage') Image;
    selectedRow: Number;
    setClickedRow: Function;
    userid: any = '';

  constructor( public router: Router, public accountService: AccountsService, public modelServide: ModelsService, public edtModel: EditmodelService ) {
      this.setClickedRow = function(index){
          this.selectedRow = index;
      };
      this.userid = localStorage.getItem('umid');
  }

  ngOnInit() {
    this.LoadAccounts();
    $(function () {
      $('.dropify').dropify();
    });
  }

  Navication(link) {
    this.router.navigate([link]);
  }

  LoadAccounts() {
      const formData = new FormData();
      formData.append('userID', this.userid);
    this.accountService.LoadAccounts_byUsers(formData).subscribe(
        data => {
          const AccountNameArray = [];
          this.AccountArray = data;
          for (const accounts of this.AccountArray)
          {
            AccountNameArray.push(accounts['AM_Name']);

          }
          setTimeout(function() {
            $.typeahead({
              input: '#example1',
              order: 'asc',
              minLength: 1,
              source: {
                data: AccountNameArray
              },
              cancelButton: false
            });

          }, 2000);
        }
    );
  }

  /* Load All Models */
  LoadModels() {
    this.modelServide.LoadModels().subscribe(
        data => {
          this.ModelsArray = data;
        }
    );

  }

  /* Single Model Details */
  ViewModel(Model_ID) {
    this.modelServide.LoadModel(Model_ID).subscribe(
        data => {
          this.ModelDetailsArray = data;
          this.ModelID = this.ModelDetailsArray.MM_KeyID;
          this.ModelName = this.ModelDetailsArray.MM_Model_Name;
          this.ModelDescription = this.ModelDetailsArray.MM_Description;
          this.ModelStatus = this.ModelDetailsArray.MM_Disabled;
          if (this.ModelStatus == 'N') {
              this.ModelStatus = 'NO';
          } else if ( this.ModelStatus == 'Y') {
              this.ModelStatus = 'YES';
          }
          this.SelectedImage = this.ModelDetailsArray.MM_Model_Image;
          if ( this.ModelDetailsArray.MM_Model_Image !== null ) {
            this.ModelImage = 'mcmbackend/web/uploads/Model_Images/' + this.AccountID + '/image/' + this.ModelDetailsArray.MM_Model_Image;
          }
          if ( this.ModelID !== null ) {
            this.EdtStatus = 'active';
          } else {
            this.EdtStatus = 'inactive';
          }
        }
    );
  }

  LoadAccModels(Account_ID) {
    this.AccountID = Account_ID;
  }

  CreateMOdel() {
    if ( this.AccountID === '' ) {
      $.notify({
        title: '<strong>Account not selected.</strong><br>',
        message: 'Please select the account.'
      }, {
        type: 'danger',
        placement: {
          from: 'bottom',
          /* align: 'left' */
        }
      });

    } else {
      this.ModalTittle = 'Create Model';
      this.ModalBtnPri = 'Create';
      this.ModalBtnSec = 'Cancel';
      $(function(){
        $('#ModelPopUp').modal();
      });

    }
  }

  hideCreateModal() {
      $(function(){
          $('#ModelPopUp').modal('hide');
      });
      $('.dropify-clear').click();
      this.CrModelName = '';
      this.CrModelDesc = '';
      this.CrModelStatus = 'NO';
  }

  CreateNewModel(value){
        // this.shared_service.share(value);
        const fi = this.Image.nativeElement;
        if (fi.files && fi.files[0]) {
            this.ModalImageFile = fi.files[0];
        }

        const file: File = this.ModalImageFile;
        // let file: File = value.file;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('MName', value.ModelName);
        formData.append('MDesc', value.ModelDesc);
        formData.append('MStatus', value.ModelStatus);
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        // sendFormData

        this.modelServide.Create(formData, options, this.AccountID, this.CrModelName, this.CrModelDesc, this.CrModelStatus)
            .subscribe(
                data => {
                    let Result: any;
                    Result = data;
                    if ( Result.result === 'success' ) {
                        this.hideCreateModal();
                        this.LoadAccModels(this.AccountID);
                        swal({
                            title: 'Created!',
                            text: 'Model Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });

                    }
                }
            );
    }

  EditModelShow() {
      $(function(){
          $('#EditModel').modal();
      });
  }

  EditModelHide() {
      $(function(){
          $('#EditModel').modal('hide');
      });
  }

    EditModel(value){
        // this.shared_service.share(value);
        const fi = this.EdtImageFile.nativeElement;
        if (fi.files && fi.files[0]) {
            this.EdtImage = fi.files[0];
        }
        const file: File = this.EdtImage;
        // let file: File = value.file;
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('MName', value.ModelName);
        formData.append('MDesc', value.ModelDesc);
        formData.append('MStatus', value.ModelStatus);
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });
        // sendFormData

        this.edtModel.update(formData, options, this.AccountID, this.ModelID, this.ModelName, this.ModelDescription, this.ModelStatus)
            .subscribe(
                data => {
                    let Result: any;
                    Result = data;
                    if ( Result.result === 'success' ) {
                        this.EditModelHide();
                        if ( this.AccountID === '' ) {
                            this.LoadModels();
                        } else {
                            this.LoadAccModels(this.AccountID);
                        }
                        swal({
                            title: 'Updated!',
                            text: 'Model Update Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });

                    }
                }
            );
    }

  DeleteModel(ModelID) {
    const that = this;
    swal({
          title: 'Are you sure?',
          text: 'This model will not be able to recover this future!',
          type: 'warning',
          showCancelButton: true,
          cancelButtonClass: 'btn-default',
          confirmButtonClass: 'btn-warning',
          confirmButtonText: 'Delete',
          closeOnConfirm: false
        },
        function(){
          that.edtModel.DeleteModel(ModelID).subscribe(
              data => {
                this.DeleteStatusArray = data;
                if ( this.DeleteStatusArray[0].result === 'success' ) {
                  swal({
                    title: 'Deleted!',
                    text: 'Model has been deleted',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                  });

                  if ( that.AccountID === '' ) {
                    that.LoadModels();
                  } else {
                    that.LoadAccModels(that.AccountID);
                    that.ModelID = '';
                    that.ModelName = '';
                    that.ModelDescription = '';
                    that.ModelStatus = '';
                    that.ModelImage = '';
                  }
                }
              }
          );
        });
  }
}
