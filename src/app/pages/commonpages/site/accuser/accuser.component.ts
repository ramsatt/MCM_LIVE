import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import { RequestOptions, Headers } from '@angular/http';
import {AccuserService} from "../service/accuser/accuser.service";

import {GlobalVariable} from '../../../../global/global';
import {MenumanagementService} from '../../menumanagement/service/menumanagement.service';
import {UserService} from "../../../settings/services/users/user.service";
import {isPrimitive} from "util";
import {CreateuserService} from "../../account/services/accountuser/createuser.service";
import {SiteService} from "../service/site.service";
declare var $;
declare var swal;
@Component({
  selector: 'app-accuser',
  templateUrl: './accuser.component.html',
  styleUrls: ['./accuser.component.css']
})
export class AccuserComponent implements OnInit, OnChanges {
  @Input() SiteID;
    showimg: any;
  CategoryArray: any = [];
  UserImage: File ;
    AccountID:any='';
  @ViewChild('UserImage') UserImageInput;
  userNameStatus: any;
  resultArray: any = [];
  UsersArray: any = [];
  UserDetails: any = '';
  scltUserID: any;
  scltFirstName: any = '';
  scltLastName: any = '';
  scltUserRole: any = '';
  scltUserCategory: any = '';
  scltUserName: any = '';
  scltEmail: any = '';
  scltMobile: any = '';
  scltUserCompany: any = '';
  scltUserAvatar: any = '';
  UserArray: any = [];
  scltprimeFirstName: any = '';
  scltprimeLastName: any = '';
  scltprimeUserRole: any = '';
  scltprimeUserCategory: any = '';
  scltprimeUserName: any = '';
  scltprimeEmail: any = '';
  scltprimeMobile: any = '';
  UserprimaryDetails: any = [];
    scltaudid:any='';
    scltcomp: any = '';
  avararPath: any = 'assets/images/No-image-found.jpg';
    enableval: any = 0;
    deluser:any='';
    /*Edit variables*/
    escltUserAvatar:any='';
    escltUserID: any;
    escltFirstName: any;
    escltLastName: any;
    escltUserRole: any;
    escltUserCategory: any;
    escltUserName: any;
    escltEmail: any;
    escltMobile: any;
    escltaltEmail: any = '';
    escltbudid: any;
    escltumkeyid: any;
    scltedUserID:any='';
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    sessid: any;
    unassignbtn: any;
    accid: any;
    escltPassword: any;
    results: any;
    accountid: any;
    Asskeyid:any;
    eCategoryArray: any = [];
    eUserArray: any = [];
    eUserDetails: any = [];
    eUserImage: File ;
    @ViewChild('editfileInput') editfileInput;
    euserNameStatus: any;
    eresultArray: any;
    loaduniqueemail: any;
    loaduniqueemaillen: any;
    isValid = true;
    isValidupdate: any;
    userType: any = 1;
    userdistype: any;
    addemail: any = '';
    isactive:any='';
    urmid:any='';
    isprimary:any='';
    SiteAaccoutsArray:any='';
   Userscontact:any='';
    status: any = '';
    scltumkeyid:any='';
    setClickedRow: Function;
    scltaccUserID:any='';
  constructor(public aUser: AccuserService,public siteService: SiteService, public User: CreateuserService,public userser:UserService,public menu: MenumanagementService) {
      this.status = 'active';
      this.sessid=localStorage.getItem('ucmid');
       this.Loadbuttons();
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };
  }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.LoadPrimaryDetails(this.SiteID);
    $(function () {
      $('.dropify').dropify();
    });
    this.LoadUsers(this.SiteID);
this.LoadSiteAccounts();
this.LoadContacts();
  }
    LoadSiteAccounts() {
    this.siteService.LoadSiteAccounts(this.SiteID).subscribe(
        data => {
    this.SiteAaccoutsArray = data;
}
);
}
  LoadUsers(SiteID) {
    this.aUser.LoadUsers(SiteID).subscribe(
        data => {
          this.UsersArray = data;

         // this.scltUserID = this.UsersArray[0].UM_KeyID;
            this.scltaccUserID = this.UsersArray[0].UM_KeyID;
            console.log("userid"+this.scltaccUserID)
          this.LoadUserDetails(this.scltaccUserID);
        }
    );
  }
    LoadContacts() {
        $(function () {
            $('#assaccuser').dataTable().fnDestroy();
        });
        this.aUser.LoadContact(this.SiteID).subscribe(
            data => {
this.Userscontact=data;
                setTimeout(function () {
                    $(function () {
                        $('#assaccuser').DataTable(
                            {
                                paging: true,
                                searching: true
                            }
                        );
                    });
                }, 1000);
            }
        );
    }

    Deleteaccuser(assid,umkeyid,scltaudid) {
        if(this.isactive=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            const that = this;
            swal({
                    title: 'Are you sure?',
                    text: 'This user will not recover in future. If any tickets link with this user, it can’t be delete.',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function() {
                    that.aUser.Delaccuser(assid,umkeyid,scltaudid,that.SiteID).subscribe(
                        data => {
                            that.deluser = data;
                            // that.viewparts(id);
                            if (that.deluser[0].result === 'success') {
                                {
                                    that.LoadUsers(that.SiteID);
                                    swal({
                                        title: 'Deleted!',
                                        text: 'User has been deleted',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    //this.LoadUsers(this.SiteID);
                                }
                            }else if(that.deluser[0].result === 'error'){
                                swal({
                                    title: 'Not able to delete user',
                                    text: that.deluser[0].message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }
                        }
                    );
                });
        }
    }
    LoadUserDetails(userID) {
    this.aUser.LoadUserDetails(userID,this.SiteID).subscribe(
        data => {
            this.UserDetails = data;
            console.log("userdetail"+this.UserDetails);
            if (this.UserDetails != '') {
            this.scltFirstName = this.UserDetails[0].UM_First_Name;
            this.scltLastName = this.UserDetails[0].UM_Last_Name;
            this.scltUserRole = this.UserDetails[0].URM_Role_Name;
            this.scltUserCategory = this.UserDetails[0].UCM_Category_Name;
            this.scltUserName = this.UserDetails[0].UM_Login_Name;
            this.scltEmail = this.UserDetails[0].UM_EmailID;
            this.scltMobile = this.UserDetails[0].AUD_Cell;
            this.scltumkeyid = this.UserDetails[0].UM_KeyID;
            this.Asskeyid = this.UserDetails[0].AAU_KeyID;
                this.showimg = GlobalVariable.BASE_FILE_API;
                this.scltUserID = this.UserDetails[0].UM_KeyID;
            this.scltcomp = this.UserDetails[0].AM_Name;
            this.isactive = this.UserDetails[0].UM_Active;
              this.userdistype=this.UserDetails[0].UM_User_Type;
                this.scltUserAvatar = this.UserDetails[0].AUD_User_Image;
                this.scltaccUserID = this.UserDetails[0].UM_KeyID;
                this.scltaudid = this.UserDetails[0].AUD_KeyID;
                if(this.UserDetails[0].UM_User_Type==1)
                {

                    this.userdistype='User';
                }
                else
                {

                    this.userdistype='Contact';
                }
        }
        else if(this.UserDetails!='')  {
                this.scltFirstName = '';
                this.scltLastName = '';
                this.scltUserRole = '';
                this.scltUserCategory = '';
                this.scltUserName = '';
                this.scltEmail = '';
                this.scltMobile = '';
                this.addemail ='';
                this.userType = '';
                this.addemail = '';
                this.userdistype='';
                this.showimg ='';
            }
        }
    );
  }
  AssignPrimary(userid,accid){
    this.aUser.Assignprimary(userid,accid,this.SiteID).subscribe(
        data => {
          this.UserArray = data;
          if ( this.UserArray[0].result === 'success' ) {
            //this.HideCreateUserModel();
            swal({
              title: 'Assigned!',
              text: 'Primary  User for Account Assigned Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
          }
          this.LoadUsers(this.SiteID);
          this.LoadPrimaryDetails(this.SiteID);

        }
    );
  }
  LoadPrimaryDetails(siteid) {
    this.aUser.LoadPrimaryDetails(siteid).subscribe(
        data => {
          this.UserprimaryDetails = data;
            if(this.UserprimaryDetails!=''){
          this.scltprimeFirstName = this.UserprimaryDetails[0].UM_First_Name;
          this.scltprimeLastName = this.UserprimaryDetails[0].UM_Last_Name;
          this.scltprimeUserRole = this.UserprimaryDetails[0].URM_Role_Name;
          this.scltprimeUserCategory = this.UserprimaryDetails[0].UCM_Category_Name;
          this.scltprimeUserName = this.UserprimaryDetails[0].UM_Login_Name;
          this.scltprimeEmail = this.UserprimaryDetails[0].UM_EmailID;
          this.scltprimeMobile = this.UserprimaryDetails[0].SUD_Cell;

        }
        else{
                this.scltprimeFirstName = '';
                this.scltprimeLastName = '';
                this.scltprimeUserRole = '';
                this.scltprimeUserCategory = '';
                this.scltprimeUserName = '';
                this.scltprimeEmail = '';
                this.scltprimeMobile = '';

            }}
    );
  }
    unassign(amkeyid){



            this.aUser.Removeprimary(amkeyid, this.SiteID).subscribe(
                data => {
                    this.UserArray = data;
                    if (this.UserArray[0].result === 'success') {
                        //this.HideCreateUserModel();
                        swal({
                            title: 'Unassigned!',
                            text: 'Primary Site User Unassigned Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                    }
                   // console.log(siteid);
                    this.LoadUsers(this.SiteID);
                    this.LoadPrimaryDetails(this.SiteID);

                    //this.AssignPrimary()

                }
            );


    }
    ShowCreateUserModel() {
        this.LoadContacts();

        $(function () {

            $('#AssignUserModel').modal();

        });

    }
    ShowaccCreateUserModel() {
        this.isValid = true;
        this.isValidupdate = true;
        /*this.checkunique('', '');*/
        $(function () {
            $('#CreateUser').trigger('reset');
            $('.assingaccuser').hide();
            $('.allacccontshow').show();
            $('#createbtn').hide();
        });

    }
    Hidecreatform()
    {
        $(function () {
            $('#CreateUser').trigger('reset');
            $('.assingaccuser').show();
            $('.allacccontshow').hide();
            $('#createbtn').show();
        });
    }
    updateOptions(form){

        this.aUser.Assignaccount(form).subscribe(
            data => {

                if(data[0].result =="success")
                {
                    swal({
                        title: "Assigned!",
                        text: " Contact Assigned Successfully",
                        type: "success",
                        confirmButtonClass: "btn-success"
                    });
this.LoadUsers(this.SiteID);
                }


            },
            err => {
                swal({
                    title: 'Sorry',
                    text: 'Please enter opening balance and replenishment quantity for the selected Part.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }
    HideCreateUserModel() {
        this.isValid = true;
        $(function () {
            $('#AccUserModel').modal('hide');
            $('#CreateUser').trigger('reset');
            $('.dropify-clear').click();
        });
        const drEvent = $('.dropify').dropify();
        drEvent.on('dropify.afterClear', function(event, element){
            // alert('File deleted');
        });
    }

    HideupdateUserModel(){
        $(function () {
            $('#EditUserModel').modal('hide');

            $('.dropify-clear').click();
        });
        const drEvent = $('.dropify').dropify();
        drEvent.on('dropify.afterClear', function (event, element) {
            // alert('File deleted');
        });
    }
    EditUserDetails(userID,prime) {
        if(this.isactive=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            this.User.LoadUserDetails(userID).subscribe(
                data => {
                    if(prime=='primary')
                    {
                        this.isprimary='yes';
                    }
                    else
                    {
                        this.isprimary='no';
                    }
                    this.eUserDetails = data;
                    this.escltUserAvatar = this.eUserDetails[0].AUD_User_Image;
                    this.escltFirstName = this.eUserDetails[0].UM_First_Name;
                    this.escltLastName = this.eUserDetails[0].UM_Last_Name;
                    this.escltUserRole = this.eUserDetails[0].URM_Role_Name;
                    this.escltUserCategory = this.eUserDetails[0].UCM_Category_Name;
                    this.escltUserName = this.eUserDetails[0].UM_Login_Name;
                    this.escltEmail = this.eUserDetails[0].UM_EmailID;
                    this.escltMobile = this.eUserDetails[0].AUD_Cell;
                    this.escltbudid = this.eUserDetails[0].AUD_KeyID;
                    this.escltumkeyid = this.eUserDetails[0].UM_KeyID;
                    this.userType = this.eUserDetails[0].UM_User_Type;
                    this.showimg = GlobalVariable.BASE_FILE_API;
                    this.checkunique(this.escltEmail, this.escltumkeyid);
                    this.escltaltEmail = this.eUserDetails[0].AUD_Additional_EmailID;
                    if (this.eUserDetails[0].UM_User_Type === 1) {
                        this.isValidupdate = true;
                        this.userdistype = 'User';
                    } else {
                        this.isValidupdate = false;
                        this.userdistype = 'Contact';
                    }
                }
            );
        }
    }
    SearchUserName(event, key) {
        if (event.target.value.length >= 1) {
            this.User.CheckUserName(event.target.value).subscribe(
                data => {
                    this.userNameStatus = data[0].result;
                }
            );
        }
    }

    checkunique(email, id) {
        this.User.checkunique(email, id).subscribe(
            data => {
                this.loaduniqueemail = data;
                this.loaduniqueemaillen = this.loaduniqueemail.length;
                if (this.loaduniqueemail.length !== 0) {
                    $('#existmail').show();
                    $('#existmailedit').show();
                    return false;
                } else {
                    $('#existmail').hide();
                    $('#existmailedit').hide();
                    return true;
                }
            }
        );
    }

    passwordvalidation(val: string, event){
        if ( val === event){
            this.enableval = 1;
            $('#existerror').hide();
            // $("#existerror1").hide();
            return true;
        }else{
            this.enableval = 0;
            $('#existerror').show();
            // $("#existerror1").show();
            return false;
        }

    }

    accsetpassword(val: string, event){
        if (val) {
            this.enableval = 0;
            /*$("#techexisterror").hide();*/
            return true;
        } else {
            this.enableval = 1;
            /*$("#techexisterror").show();*/
            return false;
        }
    }

    editpasswordvalidation(val: string, event){
        if (val === event){
            this.enableval = 1;
            $('#existerror1').hide();
            return true;
        } else {
            this.enableval = 0;
            $('#existerror1').show();
            return false;
        }
    }

    enable() {
        if ( this.enableval === 0 || this.loaduniqueemaillen === 0) {
            return false;
        } else {
            return true;
        }
    }

    FormSubmit(value) {
        if (this.userNameStatus === '1') {
            swal({
                title: 'Username Already Exist!',
                text: 'Username already exist. Please choose another one.',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        } else {
            const Image = this.UserImageInput.nativeElement;
            if (Image.files && Image.files[0]) {
                this.UserImage = Image.files[0];
                const imageFile: File = this.UserImage;
                const formData: FormData = new FormData();
                formData.append('userAccountID', this.AccountID);
                formData.append('userCategory', value.Category);
                formData.append('userFirstName', value.FirstName);
                formData.append('userLastName', value.LastName);
                formData.append('userName', value.UserName);
                formData.append('userPassword', value.Password);
                formData.append('userCnfPassword', value.CnfPassword);
                formData.append('userEmail', value.Email);
                formData.append('userMobile', value.Mobile);
                formData.append('userType', this.userType);
                formData.append('userImageFiles', imageFile, imageFile.name);
                formData.append('useraltEmail', value.AltEmail);
                const headers = new Headers();
                headers.append('enctype', 'multipart/form-data');
                headers.append('Accept', 'application/json');
                this.User.createAaccountUser(formData).subscribe(
                    data => {
                        this.resultArray = data;
                        const message = data.result;
                        if (message === 'success') {
                            this.HideCreateUserModel();
                            $(function () {
                                $('#CreateUser').trigger('reset');
                                $('.dropify-clear').click();
                            });
                            this.scltedUserID=data.userid;

                            ///this.LoadUsers(this.AccountID,this.scltedUserID);
                            swal({
                                title: 'Created!',
                                text: 'Account Contact Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            } else {
                const formData: FormData = new FormData();
                formData.append('userAccountID', this.AccountID);
                formData.append('userCategory', value.Category);
                formData.append('userFirstName', value.FirstName);
                formData.append('userLastName', value.LastName);
                formData.append('userName', value.UserName);
                formData.append('userPassword', value.Password);
                formData.append('userCnfPassword', value.CnfPassword);
                formData.append('userEmail', value.Email);
                formData.append('useraltEmail', value.AltEmail);
                formData.append('userMobile', value.Mobile);
                formData.append('userType', this.userType);
                formData.append('userImageFiles', '');
                const headers = new Headers();
                headers.append('enctype', 'multipart/form-data');
                headers.append('Accept', 'application/json');
                this.User.createAaccountUser(formData).subscribe(
                    data => {
                        this.resultArray = data;
                        const message = data.result;
                        if (message === 'success') {
                            this.HideCreateUserModel();
                            $(function () {
                                $('#CreateUser').trigger('reset');
                                $('.dropify-clear').click();
                            });
                            const drEvent = $('.dropify').dropify();
                            drEvent.on('dropify.afterClear', function(event, element){
                                // alert('File deleted');
                            });
                            this.scltedUserID=data.userid;
                            //console.log("sdf"+this.scltaudid);
                            //this.LoadUsers(this.AccountID,this.scltedUserID);
                            swal({
                                title: 'Created!',
                                text: 'Account Contact Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });

                        }
                    }
                );
            }
        }
    }
    updateaccuser(){
        this.User.checkunique(this.escltEmail, this.escltumkeyid).subscribe(
            data => {
                this.loaduniqueemail = data;
                this.loaduniqueemaillen = this.loaduniqueemail.length;
                if (this.loaduniqueemail.length !== 0) {
                    $('#existmail').show();
                    $('#existmailedit').show();
                    return false;
                } else {
                    const fi = this.editfileInput.nativeElement;
                    if (fi.files && fi.files[0]) {
                        const efileToUpload = fi.files[0];
                        this.User.updateaccuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltaltEmail, this.escltEmail, this.escltbudid, this.escltumkeyid, efileToUpload, this.AccountID, this.escltPassword, this.userType).subscribe(
                            newData => {
                                this.results = newData;
                              //  this.LoadUsers(this.AccountID,this.escltumkeyid);
                                if ( this.results[0].result === 'success' ) {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'User Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });

                                    if(this.isprimary=='yes')
                                    {
                                       // this.LoadPrimaryDetails();

                                    }
                                    else
                                    {
                                       // this.LoadUsers(this.AccountID,this.escltumkeyid);
                                    }
                                }
                            }
                        );
                    } else {
                        this.User.updateaccuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltaltEmail, this.escltEmail, this.escltbudid, this.escltumkeyid, '', this.AccountID, this.escltPassword, this.userType).subscribe(
                            newData => {
                                this.results = newData;
                                // this.LoadUsers(this.AccountID,this.escltbudid);
                                if ( this.results[0].result === 'success' ) {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'User Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    //console.log("primary"+this.isprimary)
                                    if(this.isprimary=='yes')
                                    {
                                        //this.LoadPrimaryDetails();

                                    }
                                    else
                                    {
                                       // this.LoadUsers(this.AccountID,this.escltumkeyid);
                                    }
                                }
                            }
                        );
                    }
                }
            }
        );
    }

    Deletebranchuser(umid, budid) {
        if(this.isactive=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            const that = this;
            swal({
                    title: 'Are you sure?',
                    text: 'This user will not recover in future. If any tickets link with this user, it can’t be delete.',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function() {
                    that.User.Delaccuser(umid, budid).subscribe(
                        data => {
                            this.deluser = data;
                            // that.viewparts(id);
                            if (this.deluser[0].result === 'success') {
                                {
                                    //that.LoadUsers(this.AccountID,'');
                                    swal({
                                        title: 'Deleted!',
                                        text: 'User has been deleted',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                }
                            }else if(this.deluser[0].result === 'error'){
                                swal({
                                    title: 'Not able to delete user',
                                    text: this.deluser[0].message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }
                        }
                    );
                });
        }
    }
    Loadbuttons() {
        this.menu.Loadbutton(3, 10, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
                this.unassignbtn = this.Asssubbutton[0].MA_Unassign;
            }
        );
    }

    Hidediv(type) {

        if (type == 2) {
            this.scltUserName='';
            this.isValid = false;
            this.isValidupdate = false;

        } else {
            this.scltUserName='';
            this.isValid = true;
            this.isValidupdate = true;
            //console.log(this.isValid);
        }
        $(function () {
            $('#existerror').hide();
        });
    }
}
