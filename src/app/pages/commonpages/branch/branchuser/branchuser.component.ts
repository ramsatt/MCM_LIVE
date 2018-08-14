import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import { RequestOptions, Headers } from '@angular/http';
import {BranchuserService} from "../services/branchuser/branchuser.service";
import {GlobalVariable} from "../../../../global/global";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {UserService} from "../../../settings/services/users/user.service";


declare var $;
declare var swal;

@Component({
    selector: 'app-branchuser',
    templateUrl: './branchuser.component.html',
    styleUrls: ['./branchuser.component.css']
})
export class BranchuserComponent implements OnInit,OnChanges{
    @Input() branchid;
    @Input() createdby;
    @Input() branchname;
    @Input() branchstatus;
    selectedRow: Number = 0;
    setClickedRow: Function;
    scltUserID: any='';
    scltFirstName: any;
    scltLastName: any;
    scltUserRole: any;
    scltUserCategory: any;
    alluser:any='';
    scltUserName: any;
    Isactive:any='';
    scltEmail: any;
    scltMobile: any;
    scltumkeyid:any;
    scltbudkeyid :any;
    scltbudimgpath :any;
    scltbudid:any;
    showimg:any;
    CategoryArray: any = [];
    UserArray: any = [];
    UserDetails: any = [];
    UserImage: File ;
    @ViewChild('UserImage') UserImageInput;
    userNameStatus: any;
    resultArray:any;
    unUserArray:any;
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
    deluser:any;
    escltPassword:any;
    results:any;
    enableval:any=1;
    usernamechk:any=1;
    passwordchk:any=1;
    repasswordchk:any=1;
    eCategoryArray: any = [];
    isprimary:any='';
    eUserArray: any = [];
    eUserDetails: any = [];
    eUserImage: File ;
    @ViewChild("editfileInput") editfileInput;
    euserNameStatus: any;
    eresultArray:any;
    AUserArray:any;
    scltprimeFirstName: any;
    scltprimeumkeyid: any='';
    scltprimeLastName: any='';
    scltprimeUserRole: any='';
    scltprimeUserCategory: any='';
    scltprimeUserName: any='';
    scltprimeEmail: any='';
    scltprimeMobile: any='';
    UserprimaryDetails:any='';
    createby:any;
    additionemail:any='';
    //End
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    unassignbtn:any;
    escltbudimgpath:any;
    eshowimg:any;
    SelectedValue: string = null;
    userType: any=1;
    isValid = true;
    isValidupdate:any;
    scltprimealtemail:any='';
     urmid:any='';
    loaduniqueemail:any;
    loaduniqueemaillen:any;
    escltaltEmail:any='';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    designation:any[] = [
        {id:'Owner',name:'Owner'},
        {id:'Manager',name:'Manager'},
        {id:'Dispatcher',name:'Dispatcher'},
        {id:'Administration',name:'Administration'},
    ];


    constructor(public User: BranchuserService,public userser:UserService,public menu:MenumanagementService) {
        this.sessid=localStorage.getItem('ucmid');
        this.createby=localStorage.getItem('umid');
        this.urmid=localStorage.getItem('urmid');
        this.Loadbuttons();
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


    ngOnChanges() {
        this.LoadbncUsers('');
        this.LoadPrimaryDetails(this.branchid);
        //this.LoadUserDetails(this.branchid);
               this.createby=this.createdby;


    }
    checktechnician(eve)
    {

        this.User.checktechnician(eve).subscribe(
            data => {
                this.AUserArray = data;
                if (this.AUserArray[0].UCM_Category_Name === 'Technician') {
                    //this.HideCreateUserModel();
                    swal({
                        title: 'Sorry!',
                        text: 'Please create technicians in technician tab under branch',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                    $("#CreateUser").trigger("reset");
                }

                //console.log(bncid);
                // this.LoadbncUsers();
                //this.LoadPrimaryDetails(this.branchid);

            }
        );
    }
    ngOnInit()
    {

        $(function () {
            $('.dropify').dropify();
        });

        this.User.LoadCategory().subscribe(
            data => {
                this.CategoryArray = data;
            }
        );
    }

    Loadbuttons() {
        this.menu.Loadbutton(8,31,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;




            }
        );

    }
    AssignPrimary(bncid) {
        if(this.branchstatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Branch user cannot assign to primary",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
        this.User.Assignprimary(bncid, this.branchid).subscribe(
            data => {
                this.AUserArray = data;
                if (this.AUserArray[0].result === 'success') {
                    //this.HideCreateUserModel();
                    swal({
                        title: 'Assigned!',
                        text: 'Primary Branch User Assigned Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }

                this.LoadbncUsers('');
                this.LoadPrimaryDetails(this.branchid);

            }
        );
        }
    }
    LoadPrimaryDetails(branchid) {
        this.User.LoadPrimaryDetails(this.branchid).subscribe(
            data => {
                this.UserprimaryDetails = data;
                if (this.UserprimaryDetails != '') {
                    this.scltprimeumkeyid = this.UserprimaryDetails[0].UM_KeyID;
                    this.scltprimeFirstName = this.UserprimaryDetails[0].UM_First_Name;
                    this.scltprimeLastName = this.UserprimaryDetails[0].UM_Last_Name;
                    this.scltprimeUserRole = this.UserprimaryDetails[0].URM_Role_Name;
                    this.scltprimeUserCategory = this.UserprimaryDetails[0].UCM_Category_Name;
                    this.scltprimeUserName = this.UserprimaryDetails[0].UM_Login_Name;
                    this.scltprimeEmail = this.UserprimaryDetails[0].UM_EmailID;
                    this.scltprimeMobile = this.UserprimaryDetails[0].BUD_Cell;
                    this.scltprimealtemail=this.UserprimaryDetails[0].BUD.Addition_EmailID;

                }
                else{
                    this.scltprimeumkeyid = '';
                    this.scltprimeFirstName = '';
                    this.scltprimeLastName = '';
                    this.scltprimeUserRole = '';
                    this.scltprimeUserCategory = '';
                    this.scltprimeUserName = '';
                    this.scltprimeEmail = '';
                    this.scltprimeMobile = '';
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
    formrefresh() {
        if (this.branchstatus == 'N'&& this.urmid!=1) {
            swal({
                title: "User cannot be added",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {

            $(function () {
                $('#CreatebranchUserModel').modal();
            });
            this.checkunique('', '');
            this.isValid = true;
            this.isValidupdate = true;
            $("#CreateUser").trigger("reset");
            $("#image").val('');
            var drEvent = $('.dropify').dropify();

            drEvent.on('dropify.afterClear', function (event, element) {
                // alert('File deleted');
            });

        }
    }
    LoadbncUsers(userid) {
        this.User.LoadUsers(this.branchid).subscribe(
            data => {
                this.UserArray = data;

                if(this.UserArray!='')
                {
                    if(userid!='')
                    {
                     this.LoadUserDetails(userid);
                    }
                    else
                    {
                        this.scltUserID = this.UserArray[0].UM_KeyID;
                        this.LoadUserDetails(this.scltUserID);
                    }
                }
                else{

                    this.scltUserID = '';
                    //console.log('selected bnc user is-->' + this.scltUserID);
                    this.LoadUserDetails(0);
                }
            }
        );
    }
    passwordvalidation(val:string,event){
        if(val==event){
            this.enableval=1;
            $("#existerror").hide();
            $("#existerror1").hide();
            return true;
        }else{
            this.enableval=0;
            $("#existerror").show();
            $("#existerror1").hide();
            return false;
        }

    }

    contactsetpassword(val:string,event){
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
        if(this.enableval==0 || this.loaduniqueemaillen!=0)
        {

            return false;
        }
        else{

            return true;
        }
    }
    LoadUserDetails(userID) {
        this.User.LoadUserDetails(userID).subscribe(
            data => {
                this.UserDetails = data;
                if(this.UserDetails!='') {
                    this.scltUserID=this.UserDetails[0].UM_KeyID;
                    this.scltFirstName = this.UserDetails[0].UM_First_Name;
                    this.scltLastName = this.UserDetails[0].UM_Last_Name;
                    this.scltUserRole = this.UserDetails[0].URM_Role_Name;
                    this.scltUserCategory = this.UserDetails[0].UCM_Category_Name;
                    this.scltUserName = this.UserDetails[0].UM_Login_Name;
                    this.scltEmail = this.UserDetails[0].UM_EmailID;
                    this.scltMobile = this.UserDetails[0].BUD_Cell;
                    this.scltumkeyid = this.UserDetails[0].UM_KeyID;
                    this.scltbudkeyid = this.UserDetails[0].BUD_KeyID;
                    this.scltbudimgpath = this.UserDetails[0].BUD_User_image;
                    this.userType = this.UserDetails[0].UM_User_Type;
                    this.showimg=GlobalVariable.BASE_FILE_API;
                    this.additionemail=this.UserDetails[0].BUD_Additional_EmailID;
                    this.Isactive=this.UserDetails[0].UM_Active;
                    // check usertype and enable/disable password field
                    if(this.UserDetails[0].UM_User_Type==1)
                    {
                        this.isValidupdate = true;
                    }
                    else
                    {
                        this.isValidupdate = false;
                    }

                }
                else
                    {
                    this.scltFirstName = '';
                    this.scltLastName = '';
                    this.scltUserRole = '';
                    this.scltUserCategory ='';
                    this.scltUserName = '';
                    this.scltEmail = '';
                    this.scltMobile = '';
                    this.scltumkeyid ='';
                    this.scltbudimgpath = '';
                        this.additionemail='';

                }
                this.checkunique(this.scltEmail,this.scltumkeyid);
            }
        );
    }
    Deactivate(audid,urmkeyid,userid,status)
    {
        let that = this;
        swal({
                title: "Are you sure?",
                text: "You want to activate this user?",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Activate",
                closeOnConfirm: false
            },
            function() {

                that.userser.deactivate(urmkeyid, userid, status).subscribe(
                    data => {

                        this.alluser = data;
                        if (this.alluser[0].result == "success") {

                            swal({
                                title: "Activated",
                                text: "User Activated Successfully",
                                type: "success",
                                confirmButtonClass: "btn-success"
                            });
                            that.LoadbncUsers(userid);



                            //$('.modal-backdrop').hide();
                        }

                    });
            });

    }
    unassign(branchid){
        if(this.branchstatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Branch user cannot be unassigned ",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }

        else {
        this.User.Removeprimary(branchid, this.branchid).subscribe(
            data => {
                this.unUserArray = data;
                if (this.unUserArray[0].result === 'success') {
                    //this.HideCreateUserModel();
                    swal({
                        title: 'Unassigned!',
                        text: 'Primary Branch User Unassigned Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }

                this.LoadPrimaryDetails(this.branchid);
                this.LoadbncUsers('');
                //this.AssignPrimary()

            }
        );

    }
    }
    EditUserDetails(userID,prime) {
        if(this.branchstatus=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else if(this.Isactive=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            $(function () {
                $('#EditUserModel').modal();
            });
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
                this.escltFirstName = this.eUserDetails[0].UM_First_Name;

                this.escltLastName = this.eUserDetails[0].UM_Last_Name;
                this.escltUserRole = this.eUserDetails[0].URM_Role_Name;
                this.escltUserCategory = this.eUserDetails[0].UCM_Category_Name;
                this.escltUserName = this.eUserDetails[0].UM_Login_Name;
                this.escltEmail = this.eUserDetails[0].UM_EmailID;
                this.escltMobile = this.eUserDetails[0].BUD_Cell;
                this.escltbudid = this.eUserDetails[0].BUD_KeyID;
                this.escltumkeyid= this.eUserDetails[0].UM_KeyID;
                this.escltbudimgpath = this.eUserDetails[0].BUD_User_image;
                this.eshowimg=GlobalVariable.BASE_FILE_API;
                this.checkunique(this.escltEmail,this.escltumkeyid);
                this.escltaltEmail=this.eUserDetails[0].BUD_Additional_EmailID;
                if(this.eUserDetails[0].UM_User_Type==1)
                {
                    this.isValidupdate = true;
                    //this.userdistype='User';
                }
                else
                {
                    this.isValidupdate = false;
                   // this.userdistype='Contact';
                }
            }
        );
    }}
    HideCreateUserModel() {
        this.isValid = true;
        $(function () {
            $('#CreatebranchUserModel').modal('hide');
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
    FormSubmit(value) {
        if ( this.userNameStatus === '1')
        {
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
            if (Image.files && Image.files[0]) {
                this.UserImage = Image.files[0];

                const imageFile: File = this.UserImage;
                const formData: FormData = new FormData();
                formData.append('userBranchID', this.branchid);
                formData.append('userCategory', value.Category);
                formData.append('userDesignation', value.Designation);
                formData.append('userFirstName', value.FirstName);

                formData.append('userLastName', value.LastName);


                formData.append('userName', value.UserName);
                formData.append('createdby', this.createby);
                formData.append('userPassword', value.Password);
                formData.append('userCnfPassword', value.CnfPassword);
                formData.append('userEmail', value.Email);
                formData.append('useraltEmail', value.AltEmail);
                formData.append('userMobile', value.Mobile);
                formData.append('userType', this.userType);
                formData.append('userImageFiles', imageFile, imageFile.name);
                const headers = new Headers();
                headers.append('enctype', 'multipart/form-data');
                headers.append('Accept', 'application/json');
                const options = new RequestOptions({headers: headers});
                this.User.createAaccountUser(formData).subscribe(
                    data => {
                        this.resultArray = data;
                        if (this.resultArray.result === 'success')
                        {

                            this.HideCreateUserModel();
                            var drEvent = $('.dropify').dropify();

                            drEvent.on('dropify.afterClear', function(event, element){
                                // alert('File deleted');
                            });
                            $(function () {
                                $('#CreateUser').trigger('reset');
                                $('.dropify-clear').click();
                            })
                            swal({
                                title: 'Created!',
                                text: 'Branch Contact Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                        this.LoadbncUsers(this.resultArray.branchuserid);
                    }
                );
            }
            else{
                const formData: FormData = new FormData();
                formData.append('userBranchID', this.branchid);
                formData.append('userCategory', value.Category);
                formData.append('userDesignation', value.Designation);
                formData.append('userFirstName', value.FirstName);

                formData.append('userLastName', value.LastName);
                formData.append('createdby', this.createby);
                formData.append('useraltEmail', value.AltEmail);
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
                            this.LoadbncUsers(this.LoadbncUsers(this.resultArray.branchuserid));
                            swal({
                                title: 'Created!',
                                text: 'Branch Contact Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }
        }



    }
    updateuser(){
        this.User.checkunique(this.escltEmail,this.escltumkeyid).subscribe(
            data => {

                this.loaduniqueemail = data;
                this.loaduniqueemaillen = this.loaduniqueemail.length;
                if (this.loaduniqueemail.length != 0) {
                    $("#existmail").show();
                    $("#existmailedit").show();
                    return false;
                }
                else {
                    let fi = this.editfileInput.nativeElement;
                    if (fi.files && fi.files[0]) {
                        let efileToUpload = fi.files[0];

                        this.User.updatebncuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltaltEmail,this.escltEmail, this.escltbudid, this.escltumkeyid, efileToUpload, this.branchid, this.escltPassword, this.userType).subscribe(
                            data => {
                                this.results = data;
                                if (this.results[0].result === 'success') {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'Branch Contact Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    if(this.isprimary=='yes')
                                    {
                                        this.LoadPrimaryDetails(this.branchid);

                                    }
                                    else
                                    {
                                        this.LoadbncUsers(this.escltumkeyid);
                                    }



                                }
                            }
                        );
                    } else {
                        this.User.updatebncuser(this.escltFirstName, this.escltLastName, this.escltMobile, this.escltaltEmail, this.escltEmail, this.escltbudid, this.escltumkeyid, '', this.branchid, this.escltPassword, this.userType).subscribe(
                            data => {
                                this.results = data;
                                if (this.results[0].result === 'success') {
                                    this.HideupdateUserModel();
                                    swal({
                                        title: 'Updated!',
                                        text: 'Branch Contact Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    if(this.isprimary=='yes')
                                    {
                                        this.LoadPrimaryDetails(this.branchid);

                                    }
                                    else
                                    {
                                        this.LoadbncUsers(this.escltumkeyid);
                                    }

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
        if(this.branchstatus=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be deleted",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else if(this.Isactive=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be Deleted",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Contact will not recover in future. If any tickets link with this Contact, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.User.Delbncuser(umid,budid).subscribe(
                    data => {
                        this.deluser = data;
                        if (this.deluser[0].result === 'success') {
                            that.LoadbncUsers('');
                            swal({
                                title: 'Deleted!',
                                text: 'Contact has been deleted',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }else if(this.deluser[0].result === 'error'){
                            swal({
                                title: 'Not able to delete account',
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
    Hidediv(type)
    {
        if(type==2)
        {
            this.scltUserName='';
            this.isValid = false;
            this.isValidupdate = false;
        }
        else
        {
            this.scltUserName='';
            this.isValid = true;
            this.isValidupdate = true;
        }

        $(function () {
            $("#existerror").hide();
        });
    }


    username()
    {
        if(this.usernamechk==0)
        {
            return false;
        }
        else{
            return true;
        }
    }

    passwordfun()
    {
        if(this.passwordchk==0)
        {
            return false;
        }
        else{
            return true;
        }
    }
    repassword()
    {
        if(this.repasswordchk==0)
        {

            return false;
        }
        else{
            return true;
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
}
