import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AccountsService } from './../../../../services/accounts/accounts.service';
import {GlobalVariable} from "../../../../global/global";

declare var swal;
declare var $;
@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.css']
})
export class LogoComponent implements OnInit {

  /* variable */
  status: any;
  AccountID: any;
  AccountName: any;
  LogoExt: any = 'assets/modules/dummy-assets/common/img/noimagefound.jpg';

  /* Account Details */
  AccountDetailsArray: any;
  /* File Upload */
  uploadFile: any;
  hasBaseDropZoneOver: any = false;
  options: Object;
  logoPath: any = '';

  sizeLimit = 2000000;

  constructor(public router: Router, public actRoute: ActivatedRoute, public accountService: AccountsService) {
      this.AccountID = this.actRoute.snapshot.params['id'];
      this.options = {
          url: GlobalVariable.BASE_FILE_API + 'logo.php?account_id=' + this.AccountID

      };
      this.LoadAccountDetails(this.AccountID);
  }
    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            this.LoadAccountDetails(this.AccountID);
            swal({
                title: 'Uploaded!',
                text: 'Logo has been uploaded.',
                type: 'success',
                confirmButtonClass: 'btn-success'
            });
        }
    }

    fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    beforeUpload(uploadingFile): void {
        if (uploadingFile.size > this.sizeLimit) {
            uploadingFile.setAbort();
            /* alert('File is too large'); */
            swal({
                title: 'Error!',
                text: 'File size is too large.',
                type: 'danger',
                confirmButtonClass: 'btn-danger'
            });
        }
    }




    ngOnInit() {
        setTimeout(function() {
            $('.dropify').dropify();
            }, 1000);
    }

    LoadAccountDetails(Account_ID){
        this.accountService.AccountOverview(Account_ID).subscribe(
            data => {
                this.AccountDetailsArray = data;
                this.AccountName = this.AccountDetailsArray[0].AM_Name;
                this.LogoExt = 'assets/uploads/accounts/' + this.AccountID + '/logo/' + this.AccountDetailsArray[0].AM_Logo_Path;
                this.logoPath = this.AccountDetailsArray[0].AM_Logo_Path;
            }
        );

    }

    Navication(Link){
        this.router.navigate([Link]);
    }

    DeleteImage(accId) {

        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Logo will not be recovered!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.accountService.DeleteImage(accId).subscribe(
                    data => {
                        that.LoadAccountDetails(accId);
                        //console.log(data);
                        if (data.result === 'success') {
                            swal({
                                title: 'Deleted!',
                                text: 'Logo Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                    // () => console.log('Agreement Loaded')
                );
            });

        //this.router.navigate(['account/overview/']);
    }

}
