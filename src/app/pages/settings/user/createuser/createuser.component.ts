import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {GlobalVariable} from "../../../../global/global";
import { RequestOptions, Headers } from '@angular/http';

import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";
import {UserService} from "../../services/users/user.service";
declare var $;
declare var swal;


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
    selectedRow: Number = 0;
    setClickedRow: Function;
    deluser:any
    @Input() accname;
    @Input() AccountID;
    CategoryArray: any = [];
    UserImage: File ;
    @ViewChild('UserImage') UserImageInput;
    userNameStatus: any;
    resultArray: any = [];
    result:any;
    UserprimaryDetails:any;
    UsersArray: any = [];
    UserDetails: any = [];
    scltUserID: any;
    scltFirstName: any;
    scltLastName: any='';
    scltUserRole: any;
    scltUserCategory: any;
    scltUserName: any;
    scltEmail: any;
    scltMobile: any;
    scltUserCompany: any = '';
    scltUserAvatar: any;
    showimg:any;
    scltumkeyid:any;
    scltaudid:any;
    avararPath: any = 'assets/images/No-image-found.jpg';
    enableval:any=0;
    //Edit variables
    escltUserID: any;
    escltFirstName: any;
    escltLastName: any;
    escltUserRole: any;
    escltUserCategory: any;
    escltUserName: any;
    escltEmail: any;
    escltMobile: any;
    escltbudid:any;
    escltumkeyid:any;

    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    unassignbtn:any;
    accid:any;
    escltPassword:any;
    results:any;
    accountid:any;
    UserArray:any;
    eCategoryArray: any = [];
    eUserArray: any = [];
    eUserDetails: any = [];
    eUserImage: File ;
    @ViewChild("editfileInput") editfileInput;
    euserNameStatus: any;
    eresultArray:any;
    loaduniqueemail:any;
    loaduniqueemaillen:any;
    isValid = true;
    isValidupdate:any;
    userType: any=1;
    ticktype:any='';
    userdistype:any;

  constructor(public menu:MenumanagementService,public User:UserService){
      this.sessid=localStorage.getItem('ucmid');
      this.Loadbuttons();
      this.LoadUsers();




      $(function () {
          var drEvent = $('.dropify').dropify();

// called when you click on the "remove" button
          drEvent.on('dropify.beforeClear', function(event, element){
              // do something
          });

// called after the Dropify is clear
          drEvent.on('dropify.afterClear', function(event, element){
              // do something
          });

      });
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };
  }
  ngOnInit() {
      $(function(){
          $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#e-us-phone-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});


      });
      this.LoadUsers();
      this.User.LoadCategory().subscribe(
          data => {
              this.CategoryArray = data;
          }
      );
  }
    ngOnChanges(changes: SimpleChanges): void {
          this.LoadUsers();

    }
    ShowCreateUserModel() {
        this.checkunique('','');
        $(function () {
            $('#CreateUser').trigger('reset');
            $('#CreateUserModel').modal();
        });

    }

    HideCreateUserModel() {
        this.isValid = true;
        $(function () {
            $('#CreateUserModel').modal('hide');
            $('#CreateUser').trigger('reset');
            $('.dropify-clear').click();
        });
        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function(event, element){
            // alert('File deleted');
        });
    }
    HideupdateUserModel(){
        $(function () {
            $('#EditUserModel').modal('hide');

            $('.dropify-clear').click();
        });
        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function (event, element) {
            // alert('File deleted');
        });
    }

    LoadUsers() {
        this.User.LoadUsers().subscribe(
            data => {
                this.UsersArray = data;
                if(this.UsersArray!='') {
                    this.scltUserID = this.UsersArray[0].UM_KeyID;
                     this.LoadUserDetails(this.scltUserID);
                }
                else{
                    this.LoadUserDetails(0);
                }
            }
        );
    }

    LoadUserDetails(userID) {
        this.User.LoadUserDetails(userID).subscribe(
            data => {
                 this.UserDetails = data;
                if(this.UserDetails!='') {
                    this.scltFirstName = this.UserDetails[0].UM_First_Name;
                    this.scltLastName = this.UserDetails[0].UM_Last_Name;
                    this.scltUserRole = this.UserDetails[0].URM_Role_Name;
                    this.scltUserCategory = this.UserDetails[0].UCM_Category_Name;
                    this.scltUserName = this.UserDetails[0].UM_Login_Name;
                    this.scltEmail = this.UserDetails[0].UM_EmailID;
                    this.scltMobile = this.UserDetails[0].ADUD_Cell;
                    this.scltUserAvatar = this.UserDetails[0].ADUD_User_Image;
                    this.scltaudid=this.UserDetails[0].ADUD_KeyID;
                    this.scltumkeyid=this.UserDetails[0].UM_KeyID;
                    this.userType = this.UserDetails[0].UM_User_Type;
                    this.showimg=GlobalVariable.BASE_FILE_API;
                    this.ticktype=this.UserDetails[0].UM_Ticket_Email_Status;


                    // check usertype and enable/disable password field
                    if(this.UserDetails[0].UM_User_Type==1)
                    {
                        this.isValidupdate = true;
                        this.userdistype='User';
                    }
                    else
                    {
                        this.isValidupdate = false;
                        this.userdistype='Contact';
                    }
                }
                else {
                    this.scltFirstName = '';
                    this.scltLastName = '';
                    this.scltUserRole = '';
                    this.scltUserCategory = '';
                    this.scltUserName = '';
                    this.scltEmail = '';
                    this.scltMobile = '';

                }
            }
        );
    }
    EditUserDetails(userID) {
        this.User.LoadUserDetails(userID).subscribe(
            data => {
                 this.eUserDetails = data;
                this.escltFirstName = this.eUserDetails[0].UM_First_Name;

                this.escltLastName = this.eUserDetails[0].UM_Last_Name;
                this.escltUserRole = this.eUserDetails[0].URM_Role_Name;
                this.escltUserCategory = this.eUserDetails[0].UCM_Category_Name;
                this.escltUserName = this.eUserDetails[0].UM_Login_Name;
                this.escltEmail = this.eUserDetails[0].UM_EmailID;
                this.escltMobile = this.eUserDetails[0].ADUD_Cell;
                this.escltbudid = this.eUserDetails[0].ADUD_KeyID;
                this.escltumkeyid= this.eUserDetails[0].UM_KeyID;
                this.userType = this.eUserDetails[0].UM_User_Type;
                this.showimg=GlobalVariable.BASE_FILE_API;
                this.checkunique(this.escltEmail,this.escltumkeyid);
                if(this.eUserDetails[0].UM_User_Type==1)
                {
                    this.isValidupdate = true;
                    this.userdistype='User';
                }
                else
                {
                    this.isValidupdate = false;
                    this.userdistype='Contact';
                }
            }
        );
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
    checkunique(email,id)
    {
        this.User.checkunique(email,id).subscribe(
            data => {

                this.loaduniqueemail = data;
                this.loaduniqueemaillen=this.loaduniqueemail.length;
                 if(this.loaduniqueemail.length!=0)
                {
                    $("#existmail").show();
                    $("#existmailedit").show();
                    return false;
                }
                else{
                    $("#existmail").hide();
                    $("#existmailedit").hide();
                    return true;
                }

            }
        );
    }
    passwordvalidation(val:string,event){
        if(val==event){
            this.enableval=1;
            $("#existerror").hide();
            // $("#existerror1").hide();
            return true;
        }else{
            this.enableval=0;
            $("#existerror").show();
            // $("#existerror1").show();
            return false;
        }

    }

    accsetpassword(val:string,event){

        if(val){
            this.enableval=0;
            //$("#techexisterror").hide();
            return true;
        }else{
            this.enableval=1;
            //$("#techexisterror").show();
            return false;
        }

    }

    editpasswordvalidation(val:string,event){
        if(val==event){
            this.enableval=1;
            $("#existerror1").hide();
            return true;
        }else{
            this.enableval=0;
            $("#existerror1").show();
            return false;
        }

    }
    enable()
    {
        if(this.enableval==0 || this.loaduniqueemaillen==0)
        {

            return false;
        }
        else{

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
        }

        else
        {
            const Image = this.UserImageInput.nativeElement;
            if (Image.files && Image.files[0])
            {
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
                            this.LoadUsers();
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
                formData.append('userMobile', value.Mobile);
                formData.append('userType', this.userType);
                formData.append('userImageFiles','');
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
                            var drEvent = $('.dropify').dropify();

                            drEvent.on('dropify.afterClear', function(event, element){
                                // alert('File deleted');
                            });
                            this.LoadUsers();
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
        this.User.checkunique(this.escltEmail,this.escltumkeyid).subscribe(
            data => {

                this.loaduniqueemail = data;
                this.loaduniqueemaillen=this.loaduniqueemail.length;
                 if(this.loaduniqueemail.length!=0)
                {
                    $("#existmail").show();
                    $("#existmailedit").show();
                    return false;
                }
                else{
                    let fi = this.editfileInput.nativeElement;
                    if (fi.files && fi.files[0]) {
                        let efileToUpload = fi.files[0];

                        this.User.updateaccuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltEmail, this.escltbudid, this.escltumkeyid,efileToUpload,this.AccountID,this.escltPassword,this.ticktype,this.userType).subscribe(
                            data => {
                                this.results = data;

                                this.LoadUsers();
                                if ( this.results[0].result === 'success' ) {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'User Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });

                                    this.LoadUsers();

                                }
                            }
                        );
                    }
                    else{

                        this.User.updateaccuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltEmail, this.escltbudid, this.escltumkeyid,'',this.AccountID,this.escltPassword,this.ticktype,this.userType).subscribe(
                            data => {
                                this.results = data;

                                this.LoadUsers();
                                if ( this.results[0].result === 'success' ) {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'User Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    this.LoadUsers();

                                }
                            }
                        );
                    }
                }

            }
        );
    }

    Deletebranchuser(umid,budid)
    {
        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This User will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.User.Delaccuser(umid,budid).subscribe(
                    data => {
                        this.deluser = data;
                        that.LoadUsers();
                        // that.viewparts(id);
                        if(this.deluser != null)
                        {
                            {
                                swal({
                                    title: 'Deleted!',
                                    text: 'User has been deleted',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }

                            //this.LoadPrimaryDetails(this.SiteID);
                        }
                    }


                );
            });
    }
    Loadbuttons() {
        this.menu.Loadbutton(12,95,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;
            }
        );

    }

    Hidediv(type)
    {
        if(type==2)
        {
            this.isValid = false;
            this.isValidupdate = false;
        }
        else
        {
            this.isValid = true;
            this.isValidupdate = true;
        }

        $(function () {
            $("#existerror").hide();
        });
    }
}
