import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild,ElementRef} from '@angular/core';


import { RequestOptions, Headers } from '@angular/http';
import {SiteuserService} from "../service/siteuser/siteuser.service";
import {GlobalVariable} from "../../../../global/global";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {UserService} from "../../../settings/services/users/user.service";




declare var $;
declare var swal;
@Component({
    selector: 'app-siteuser',
    templateUrl: './siteuser.component.html',
    styleUrls: ['./siteuser.component.css']
})
export class SiteuserComponent implements OnInit, OnChanges {
    @Input() SiteID;
    @Input() sitename;
    Userscontact:any='';
    alluser:any='';
    @Input() stStatus;
    selectedRow: Number = 0;
    demoChk: any = [];
    setClickedRow: Function;
    scltUserID: any='';
    scltFirstName: any='';
    scltLastName: any='';
    scltUserRole: any='';
    scltUserCategory: any='';
    scltUserName: any='';
    Asukeyid:any='';
    scltEmail: any='';
    scltMobile: any = '';
    escltUserID: any = '';
    eusertype:any='';
    escltFirstName: any = '';
    escltLastName: any = '';
    escltUserRole: any = '';
    escltUserCategory: any = '';
    escltUserName: any = '';
    escltEmail: any = '';
    escltMobile: any = '';
    scltprimeFirstName: any;
    scltprimeumkeyid: any='';
    scltprimeLastName: any='';
    scltprimeUserRole: any='';
    scltprimeUserCategory: any='';
    scltprimeUserName: any='';
    scltprimeEmail: any='';
    scltprimeMobile: any='';
    escltsudid: any='';
    escltaltEmail:any='';
    escltsudimgpath:any='';
    scltprimealtemail:any='';
    fileToUpload: any = [];
    enableval: any = 1;
    scltsudkeyid: any = '';
    options: Object;
    CategoryArray: any = [];
    UserArray: any = [];
    UserDetails: any = [];
    eUserDetails: any = [];
    UserprimaryDetails: any = [];
    UserImage: File;
    submitted = false;
    active = true;
    scltumkeyid: any = '';
    results: any = '';
    deluser: any = '';
    @ViewChild('UserImage') UserImageInput;
    @ViewChild("password") public pwd: ElementRef;
    escltumkeyid: any = '';
    userNameStatus: any = '';
    resultArray: any = '';
    uploadFile: any = '';
    status: any = '';
    showimg: any = '';
    scltsudimgpath: any = '';
    editfileToUpload: any = '';
    escltPassword: any = '';
    edituploadFile: any = '';
    SelectedValue: string = null;
    userType: any=1;
    isValid = true;
    isValidupdate:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    unassignbtn:any;
    userdistype:any;
    loaduniqueemail:any;
    loaduniqueemaillen:any;
    urmkeyid:any='';
additionemail:any='';
Isactive:any='';
    isprimary:any='';
    contactsite:any='';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    @ViewChild("fileInput") fileInput;
    @ViewChild("editfileInput") editfileInput;
    designation: any[] = [
        {id: 'Owner', name: 'Owner'},
        {id: 'Manager', name: 'Manager'},
        {id: 'Dispatcher', name: 'Dispatcher'},
        {id: 'Administration', name: 'Administration'},
    ];

    constructor(public User: SiteuserService,public userser:UserService,public menu:MenumanagementService) {
        this.sessid=localStorage.getItem('ucmid');
        this.urmkeyid=localStorage.getItem('urmid');
        this.Loadbuttons();
        $(function () {
            var drEvent = $('.dropify').dropify();

// called when you click on the "remove" button
            drEvent.on('dropify.beforeClear', function (event, element) {
                // do something
            });

// called after the Dropify is clear
            drEvent.on('dropify.afterClear', function (event, element) {
                // do something
            });

        });
        this.status = 'active';
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        };
    }


    ngOnInit() {

        $(function () {
            $('.dropify').dropify();
        });

        this.User.LoadCategory().subscribe(
            data => {
                this.CategoryArray = data;
            }
        );

    }

    handleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.uploadFile = data;
            // this.LoadPartsDetails();

        }
    }

    edithandleUpload(data): void {
        if (data && data.response) {
            data = JSON.parse(data.response);
            this.edituploadFile = data;
            // this.LoadPartsDetails();

        }
    }

    ngOnChanges() {

        this.LoadUsers(this.SiteID,'');
        this.UserDetails='';
        this.LoadPrimaryDetails(this.SiteID);

        //this.LoadUserDetails(this.SiteID);

        this.User.LoadCategory().subscribe(
            data => {
                this.CategoryArray = data;
            }
        );

    }
    updateOptions(form){

        this.User.Assignsite(form).subscribe(
            data => {

                if(data[0].result =="success")
                {
                    swal({
                        title: "Assigned!",
                        text: " Contact Assigned Successfully",
                        type: "success",
                        confirmButtonClass: "btn-success"
                    });
                    this.LoadUsers(this.SiteID,'');
                }


            }

        );
    }
    onSubmit() {
        this.submitted = true;
    }

    ShowCreateUserModel() {
        $(function () {

        });
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

    LoadUsers(Siteid,userid) {
        this.User.LoadUsers(this.SiteID).subscribe(
            data => {
                this.UserArray = data;
                if (this.UserArray != '') {
                    this.scltUserID = this.UserArray[0].UM_KeyID;
                    if(userid!='')
                    {
                    this.scltUserID = userid;
                        this.LoadUserDetails(userid);
                    }
                    else
                    {

                        this.LoadUserDetails(this.scltUserID);
                    }

                }
                else {
                    this.LoadUserDetails(0);
                }

            }
        );
    }

    passwordvalidation(val: string, event) {
        if (val == event) {
            this.enableval = 1;
            $("#existerror").hide();
            $("#existerror1").hide();
            return true;
        } else {
            this.enableval = 0;
            $("#existerror").show();
            $("#existerror1").show();
            return false;
        }

    }
    checkunique(email,id,type)
    {

            this.User.checkunique(email, id).subscribe(
                data => {

                    this.loaduniqueemail = data;
                    this.loaduniqueemaillen = this.loaduniqueemail.length;
                    if (this.loaduniqueemail.length != 0) {
                        $("#existmail").show();
                        $("#existmailedit").show();
                        return false;
                    }
                    else {
                        $("#existmail").hide();
                        $("#existmailedit").hide();
                        return true;
                    }

                }
            );

    }
    sitesetpassword(val:string,event){
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

    editpasswordvalidation(val: string, event) {
        if (val == event) {
            this.enableval = 1;
            $("#existerror1").hide();
            return true;
        } else {
            this.enableval = 0;
            $("#existerror1").show();
            return false;
        }

    }

    enable() {
        if (this.enableval == 0 || this.loaduniqueemaillen!=0) {

            return false;
        }
        else {

            return true;
        }
    }

    formrefresh() {
        this.isValid = true;
        this.isValidupdate = true;



        $("#image").val('');
        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "User cannot be added",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            this.demoChk=[];
            this.LoadContacts();
            $(function () {
                $("#CreatesiteUser").trigger("reset");
               // $("#asssiteform").trigger("reset");
                $('#CreatesiteUserModel').modal();
            });
        }

    }
    ShowsiteCreateUserModel() {
        this.isValid = true;
        this.isValidupdate = true;

        /*this.checkunique('', '');*/
        $(function () {
            $('#CreatesiteUser').trigger('reset');
            $('.sitecreateuser').show();
            $('.assingsiteuser').hide();
            $('#createbtn').hide();
        });

    }
    HideCreateUser()
    {
        $(function () {
            $('#CreatesiteUser').trigger('reset');
            $('.sitecreateuser').hide();
            $('.assingsiteuser').show();
            $('#createbtn').show();
        });
    }
    LoadContacts() {
        $(function () {
            $('#asssitecon').dataTable().fnDestroy();
        });
        this.User.LoadContact(this.SiteID).subscribe(
            data => {
                this.Userscontact=data;
                setTimeout(function () {
                    $(function () {
                        $('#asssitecon').DataTable(
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
    updateCheckedOptions(i,chBox, event) {

        if(event.target.checked) {


            this.demoChk.push(chBox);
        }

        else {

            let indexx = this.demoChk.indexOf(chBox);
            this.demoChk.splice(indexx,1);


        }
    }
    btnenble()
    {

        if((this.demoChk.length > 0) ){
            return false;
        }else{
            return true;
        }
    }

    AssignPrimary(siteid) {

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "Site user cannot assign primary",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            this.User.Assignprimary(siteid, this.SiteID).subscribe(
                data => {
                    this.UserArray = data;
                    if (this.UserArray[0].result === 'success') {
                        //this.HideCreateUserModel();
                        swal({
                            title: 'Assigned!',
                            text: 'Primary Site User Assigned Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        this.demoChk=[];
                    }
                    this.LoadUsers(this.SiteID,'');
                    this.LoadPrimaryDetails(this.SiteID);

                }
            );
        }
    }
    unassign(siteid){

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "Primary user cannot be unassigned",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            this.User.Removeprimary(siteid, this.SiteID).subscribe(
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

                    this.LoadUsers(this.SiteID,'');
                    this.LoadPrimaryDetails(this.SiteID);

                    //this.AssignPrimary()

                }
            );
        }

    }
    LoadUserDetails(userID) {
        this.User.LoadUserDetails(userID).subscribe(
            data => {
                this.UserDetails = data;
                if (this.UserDetails != '') {
                    this.scltUserID=this.UserDetails[0].UM_KeyID;
                    this.scltFirstName = this.UserDetails[0].UM_First_Name;

                    this.scltLastName = this.UserDetails[0].UM_Last_Name;
                    this.scltUserRole = this.UserDetails[0].URM_Role_Name;
                    this.scltUserCategory = this.UserDetails[0].UCM_Category_Name;
                    this.scltUserName = this.UserDetails[0].UM_Login_Name;
                    this.scltEmail = this.UserDetails[0].UM_EmailID;
                    this.scltMobile = this.UserDetails[0].SUD_Cell;
                    this.scltumkeyid = this.UserDetails[0].UM_KeyID;
                    this.scltsudkeyid = this.UserDetails[0].SUD_KeyID;
                    this.userType = this.UserDetails[0].UM_User_Type;
                    this.scltsudimgpath = this.UserDetails[0].SUD_User_image;
                    this.showimg = GlobalVariable.BASE_FILE_API;
                    this.checkunique(this.scltEmail,this.scltumkeyid,'');
                    this.additionemail=this.UserDetails[0].SUD_Additional_EmailID;
                    this.Isactive=this.UserDetails[0].UM_Active;
                    this.Asukeyid=this.UserDetails[0].ASU_KeyID;
                    this.contactsite=this.UserDetails[0].SM_SiteName;
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
                    this.additionemail='';
                    this.scltLastName = '';
                    this.scltUserRole = '';
                    this.scltUserCategory = '';
                    this.scltUserName = '';
                    this.scltEmail = '';
                    this.scltMobile = '';
                    this.scltumkeyid = '';
                    this.scltsudkeyid = '';
                    this.userType='';
                    this.showimg ='';

                }
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
                            that.LoadUsers(this.SiteID,'');



                            //$('.modal-backdrop').hide();
                        }

                    });
            });

    }
    EditUserDetails(userID,prime) {

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else if(this.Isactive=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            if(prime=='primary')
            {
                this.isprimary='yes';
            }
            else
            {
                this.isprimary='no';
            }
            // Load Modal
            $(function () {
                $('#EditsiteuserModel').modal();
            });
            this.User.LoadUserDetails(userID).subscribe(
                data => {
                    this.eUserDetails = data;
                    this.escltFirstName = this.eUserDetails[0].UM_First_Name;
                   this.eusertype=this.eUserDetails[0].UM_User_Type;
                    this.escltLastName = this.eUserDetails[0].UM_Last_Name;
                    this.escltUserRole = this.eUserDetails[0].URM_Role_Name;
                    this.escltUserCategory = this.eUserDetails[0].UCM_Category_Name;
                    this.escltUserName = this.eUserDetails[0].UM_Login_Name;
                    this.escltEmail = this.eUserDetails[0].UM_EmailID;
                    this.escltMobile = this.eUserDetails[0].SUD_Cell;
                    this.escltsudimgpath = this.eUserDetails[0].SUD_User_image;
                    this.escltsudid = this.eUserDetails[0].SUD_KeyID;
                    this.escltumkeyid = this.eUserDetails[0].UM_KeyID;
                    this.escltaltEmail=this.eUserDetails[0].SUD_Additional_EmailID;
                    if (this.eUserDetails[0].UM_User_Type == 1) {
                        this.isValidupdate = true;
                        this.userdistype = 'User';
                    }
                    else {
                        this.isValidupdate = false;
                        this.userdistype = 'Contact';
                    }
                }
            );
        }
    }

    LoadPrimaryDetails(siteid) {
        this.User.LoadPrimaryDetails(this.SiteID).subscribe(
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
                    this.scltprimeMobile = this.UserprimaryDetails[0].SUD_Cell;
                    this.scltprimealtemail=this.UserprimaryDetails[0].SUD_Additional_EmailID;
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

    HideCreateUserModel() {
        this.isValid = true;
        $(function () {
            $('#CreatesiteUserModel').modal('hide');
            $('#CreatesiteUser').trigger('reset');
            $('.dropify-clear').click();
        });
        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function (event, element) {
            // alert('File deleted');
        });
    }
    HideupdateUserModel(){
        $(function () {
            $('#EditsiteuserModel').modal('hide');

            $('.dropify-clear').click();
        });
        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function (event, element) {
            // alert('File deleted');
        });
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
            if (Image.files && Image.files[0]) {
                this.UserImage = Image.files[0];

                const imageFile: File = this.UserImage;
                const formData: FormData = new FormData();
                formData.append('userBranchID', this.SiteID);
                formData.append('userCategory', value.Category);
                formData.append('userFirstName', value.FirstName);
                formData.append('userLastName', value.LastName);
                formData.append('useraltEmail', value.AltEmail);
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
                        if (this.resultArray[0].result === 'success') {
                            //this.HideCreateUserModel();
                            this.LoadContacts();
                            $(function () {
                                $('#CreatesiteUser').trigger('reset');
                                $('.dropify-clear').click();

                                $('.sitecreateuser').hide();
                                $('.assingsiteuser').show();
                                $('#createbtn').show();
                            });
                            this.LoadUsers(this.SiteID,this.resultArray[0].siteid);
                            swal({
                                title: 'Created!',
                                text: 'Site Contact Created Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            }
            else {
                const formData: FormData = new FormData();
                formData.append('userBranchID', this.SiteID);
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
                        if (this.resultArray[0].result === 'success') {
                           // this.HideCreateUserModel();
                            this.LoadContacts();
                            $(function () {
                                $('#CreatesiteUser').trigger('reset');
                                $('.dropify-clear').click();

                                $('.sitecreateuser').hide();
                                $('.assingsiteuser').show();
                                $('#createbtn').show();
                            });
                            var drEvent = $('.dropify').dropify();

                            drEvent.on('dropify.afterClear', function (event, element) {
                                // alert('File deleted');
                            });
                            this.LoadUsers(this.SiteID,this.resultArray[0].siteid);
                            swal({
                                title: 'Created!',
                                text: 'Site Contact Created Successfully',
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
                this.loaduniqueemaillen=this.loaduniqueemail.length;
                if(this.loaduniqueemail.length!=0)
                {
                    $("#existmail").show();
                    $("#existmailedit").show();
                    return false;
                }
                else {
                    let fi = this.editfileInput.nativeElement;
                    if (fi.files && fi.files[0]) {
                        let efileToUpload = fi.files[0];


                        this.User.updateuser(this.escltFirstName, this.escltLastName, this.escltMobile,this.escltaltEmail, this.escltEmail, this.escltsudid, this.escltumkeyid,efileToUpload,this.SiteID,this.escltPassword,this.eusertype).subscribe(
                            data => {
                                this.results = data;
                                this.HideupdateUserModel();
                                if ( this.results[0].result === 'success' ) {
                                    swal({
                                        title: 'Updated!',
                                        text: 'User Details Updated Successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                    if(this.isprimary=='yes')
                                    {
                                        this.LoadPrimaryDetails(this.SiteID);

                                    }
                                    else
                                    {
                                        this.LoadUsers(this.SiteID,this.escltumkeyid);
                                    }


                                }
                            }
                        );
                    }
                    else{

                        this.User.updateuser(this.escltFirstName, this.escltLastName, this.escltMobile,this.escltaltEmail, this.escltEmail, this.escltsudid, this.escltumkeyid,'',this.SiteID,this.escltPassword,this.eusertype).subscribe(
                            data => {
                                this.results = data;

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
                                        this.LoadPrimaryDetails(this.SiteID);

                                    }
                                    else
                                    {
                                        this.LoadUsers(this.SiteID,this.escltumkeyid);
                                    }
                                }
                            }
                        );
                    }
                }

            }
        );
    }

    DeleteSiteuser(asuid,umid,sudid,siteid)
    {
        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "User cannot be deleted",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else if(this.Isactive=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            let that = this;
            swal({
                    title: 'Are you sure?',
                    text: 'This User will not recover in future. If any tickets link with this User, it can’t be delete.',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function () {
                    that.User.Deluser(asuid,umid, sudid,siteid).subscribe(
                        data => {
                            this.deluser = data;

                            that.LoadUsers(that.SiteID,'');
                            that.LoadPrimaryDetails(that.SiteID);
                            if (this.deluser[0].result === 'success') {
                                {
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
    Loadbuttons() {
        this.menu.Loadbutton(3,10,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;

            }
        );

    }
}
