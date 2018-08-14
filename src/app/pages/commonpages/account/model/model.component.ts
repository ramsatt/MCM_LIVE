import {Component, OnInit, OnChanges, Input, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModelsService } from '../../../settings/models/services/models.service';
import { EditmodelService } from '../../../settings/models/services/editmodel.service';
import { AccountsService } from '../../../../services/accounts/accounts.service';
import {GlobalVariable} from '../../../../global/global';
declare var $;
declare var swal;

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnChanges, OnInit {
  submitted = false;
  active = true;
  @Input() AccountID;
  ModelsArray: any = [];
  /* single model details */
  ModelDetailsArray: any = [];

  /* Model Details */
  ModelID: any = '';
  ModelName: any = '';
  ModelDescription: any = '';
  ModelStatus: any = '';
  ModelImage: any = 'assets/modules/core/img/noimagefound.jpg';

  /* Edit Status */
  EdtStatus: any = 'inactive';

  /* Model Text */
  ModelTittle: any = '';
  ModelButtonPrimary: any = '';
  ModelButtonSec: any = '';
  ModelButtonAction: any = '';


  /* Create Model */
  CrModelName: any = '';
  CrModelDesc: any = '';
  CrModelStatus: any = 'NO';
  /* CreateArry */
  CrResultArray: any;

  /* FileUpload */
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object;
  sizeLimit = 2000000;
  constructor( public router: Router, public accountService: AccountsService, public modelServide: ModelsService, public edtModel: EditmodelService, public actRoute: ActivatedRoute ) {
  }

  ngOnInit() {
    this.LoadAccModels(this.AccountID);
    $(function () {
      $('.dropify').dropify();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.LoadAccModels(this.AccountID);
    $(function () {
      $('.dropify').dropify();
    });
  }

  onSubmit() {
    this.submitted = false;
  }

  LoadAccModels(Account_ID) {
    this.AccountID = Account_ID;
    this.modelServide.LoadAccModels(Account_ID).subscribe(
        data => {
          this.ModelsArray = data;
            }
    );
  }

  ViewModel(Model_ID) {
    this.modelServide.LoadModel(Model_ID).subscribe(
        data => {
          this.ModelDetailsArray = data;
          this.ModelID = this.ModelDetailsArray.MM_KeyID;
          this.ModelName = this.ModelDetailsArray.MM_Model_Name;
          this.ModelDescription = this.ModelDetailsArray.MM_Description;
          this.ModelStatus = this.ModelDetailsArray.MM_Disabled;

          if (this.ModelDetailsArray.MM_Model_Image != null) {
            this.ModelImage = 'assets/uploads/Model/' + this.ModelID + '/image/' + this.ModelDetailsArray.MM_Model_Image;
          }

          this.options = {
            /* url: 'https://rcc.mcmservice.com/mcmbackend/web/ModelImage.php?model_id='+this.ModelID */
            url: GlobalVariable.BASE_FILE_API + 'ModelImage.php?model_id=' + this.ModelID
          };

          if ( this.ModelID != null ) {
            this.EdtStatus = 'active';
          } else {
            this.EdtStatus = 'inactive';
          }
        }
    );

  }

  showCreateModel() {
    this.ModelTittle = 'Create Model';
    this.ModelButtonPrimary = 'Create';
    this.ModelButtonSec = 'Cancel';
    this.ModelButtonAction = 'FormAction';
    $(function(){
      $('#CreateModel').modal();
    });
  }

  hideCreateModel() {
    this.CrModelName = '';
    this.CrModelDesc = '';
    this.CrModelStatus = 'NO';
    $(function(){
      $('#CreateModel').modal('hide');
    });
  }

  FormAction() {
    if ( this.ModelButtonPrimary === 'Create') {
      this.CreateModel();
    } else if ( this.ModelButtonPrimary === 'Update') {
      this.UpdateModel();
    }
  }

  public CreateModel() {
  }

  public EditModel() {
    this.ModelTittle = 'Update Model';
    this.ModelButtonPrimary = 'Update';
    this.ModelButtonSec = 'Cancel';
    this.ModelButtonAction = 'FormAction';
    this.CrModelName = this.ModelName;
    this.CrModelDesc = this.ModelDescription;
    this.CrModelStatus = this.ModelStatus;
    $(function(){
      $('#CreateModel').modal();
    });
  }

  public UpdateModel() {
  }

  public DeleteModel(ModelID) {
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
                if ( this.DeleteStatusArray[0].result == 'success') {
                  swal({
                    title: 'Deleted!',
                    text: 'Model has been deleted',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                  });

                 that.LoadAccModels(that.AccountID);
                    that.ModelID = '';
                    that.ModelName = '';
                    that.ModelDescription = '';
                    that.ModelStatus = '';
                    that.ModelImage = '';
                }
              }
          );

        });
  }

  public ImageModelShow() {
    $(function(){
      $('#ImageUpload').modal();
    });
  }

  public ImageModelHide() {
    $(function(){
      $('#ImageUpload').modal('hide');
    });
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      this.ViewModel(this.ModelID);
      swal({
        title: 'Uploaded!',
        text: 'Logo has been uploaded.',
        type: 'success',
        confirmButtonClass: 'btn-success'
      });
      this.ImageModelHide();
    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      swal({
        title: 'Error!',
        text: 'File size is too large.',
        type: 'danger',
        confirmButtonClass: 'btn-danger'
      });
    }
  }
}
