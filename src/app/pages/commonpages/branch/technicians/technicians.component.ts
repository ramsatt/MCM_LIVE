import {Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {TechniciansService} from "../services/technicians.service";
import { RequestOptions, Headers } from '@angular/http';
import {Technicians} from "./technicians";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalVariable} from "../../../../global/global";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {UserService} from "../../../settings/services/users/user.service";


declare var $;
declare var swal;

@Component({
    selector: 'app-technicians',
    templateUrl: './technicians.component.html',
    styleUrls: ['./technicians.component.scss']
})
export class TechniciansComponent implements OnInit {

    @Input() id;
    @Input() name;
    @Input() brStatus;
    UserImage: File;
    @ViewChild('UserImage') UserImageInput;
    UserRecord: File ;
    @ViewChild('UserRecord') UserRecordInput;
    UserBC: File ;
    @ViewChild('UserBC') UserBCInput;
    UserImageup: File;
    @ViewChild('UserImageup') UserImageInputup;
    UserRecordup: File ;
    @ViewChild('UserRecordup') UserRecordInputup;
    UserBCup: File ;
    @ViewChild('UserBCup') UserBCInputup;
    altemail:any='';
    additionemail:any='';
    userNameStatus: any;
    alluser:any='';
    resultArray: any = [];
    allcertifications: any = '';
    allcertificationsid: any = '';
    allexperiencesid: any = '';
    allsecuritiesid: any = '';
    allexperiences: any = '';
    allsecurities: any = '';
    alltechnicians: any = '';
    result: any = '';
    TUD_BM_KeyID: any = '';
    experienceid: any = [];
    certificationid: any = [];
    securityid: any = [];
    uexperienceid: any = [];
    ucertificationid: any = [];
    usecurityid: any = [];
    expresults: any;
    cerresults: any;
    secresults: any;
    technicianid: any;
    technicianInfo: any;
    TUD_KeyID: any = '';
    UM_KeyID: any = '';
    UM_First_Name: any;
    UM_Last_Name: any;
    UM_Login_Name: any;
    UM_EmailID: any;
    TUD_Cell: any;
    TUD_Phone_Numberl: any;
    TUD_Emergency_Phone_Number: any;
    TUD_TUD_Fax_Number; any;
    TUD_Shirt_Size: any = '0';
    escltaltEmail:any='';
    enableval:any=1;
    enableval1:any=0;
    setClickedRow:any;
    allsecuritiesskills:any;
    allcertificationsskills:any;
    allexperiencesskills:any;
    techImage: any;
    shotRecord: any;
    bgCheck: any;
    techImagechk: any;
    shotRecordchk: any;
    bgCheckchk: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umkeyid:any;
    urmid:any='';
    loaduniqueemail:any;
    loaduniqueemaillen:any;
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(public router: Router,private userser:UserService,private domSanitizer : DomSanitizer, routing: ActivatedRoute, public technicians: TechniciansService,public menu:MenumanagementService) {
        this.sessid=localStorage.getItem('ucmid');
        this.umkeyid=localStorage.getItem('umid');
        this.urmid=localStorage.getItem('urmid');
        this.Loadbuttons();
        //this.TUD_BM_KeyID = routing.snapshot.params['accid'];
        this.setClickedRow = function(index) {
            this.selectedRow = index;
        }
    }

    ngOnInit() {
        this.LoadCertifications();
        this.LoadExperience();
        this.LoadSecurity();
        //this.listTechnicians();


    }

    ngOnChanges(changes: SimpleChanges): void {
        this.listTechnicians(this.id);
    }

    model = new Technicians();

    addTechnician() {

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({headers: headers});

        this.TUD_BM_KeyID = this.id;
        this.technicians.addTechnician(this.model).subscribe(
            data => {
                this.result = data;
                this.technicianid = this.result[0].id;
                this.listTechnicians(this.id);
                if (this.result[0].result === 'success') {
                    swal({
                        title: 'Created!',
                        text: 'Technician Details Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    // this.router.navigate(['agreement/edit/'+this.results[0].id]);
                }

            }
        );
    }


    SearchUserName(event, key) {
        if (event.target.value.length >= 1) {
            this.technicians.CheckUserName(event.target.value).subscribe(
                data => {
                    this.userNameStatus = data[0].result;
                }
            );
        }
    }

    // Create Technician
    FormSubmit(value)
    {
        //this.userNameStatus = 0;
        if ( this.userNameStatus == '1')
        {

            swal({
                title: 'Username Already Exist!',
                text: 'Username already exist. Please choose another one.',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
            return false;
        }
        else
        {
            const formData: FormData = new FormData();
            formData.append('TUD_BM_KeyID', this.id);
            formData.append('UM_First_Name', value.UM_First_Name);
            formData.append('UM_Last_Name', value.UM_Last_Name);
            formData.append('UM_Login_Name', value.UM_Login_Name);
            formData.append('UM_Password', value.UM_Password);
            formData.append('AltEmail', value.AltEmail);
            formData.append('UM_EmailID', value.UM_EmailID);
            formData.append('TUD_Cell', value.TUD_Cell);
            formData.append('TUD_Phone_Numberl', value.TUD_Phone_Numberl);
            formData.append('TUD_Emergency_Phone_Number', value.TUD_Emergency_Phone_Number);
            formData.append('TUD_TUD_Fax_Number', value.TUD_TUD_Fax_Number);
            formData.append('TUD_Shirt_Size', value.TUD_Shirt_Size);
            formData.append('TUD_User', value.umkeyid);

            const Image = this.UserImageInput.nativeElement;
            if (Image.files && Image.files[0]) {
                this.UserImage = Image.files[0];
                const imageFile: File = this.UserImage;
                formData.append('TUD_Technician_Image', imageFile, imageFile.name);
            }

            const Record = this.UserRecordInput.nativeElement;
            if (Record.files && Record.files[0]) {
                this.UserRecord = Record.files[0];
                const RecordFile: File = this.UserRecord;
                formData.append('TUD_Shot_Records', RecordFile, RecordFile.name);
            }

            const BC = this.UserBCInput.nativeElement;
            if (BC.files && BC.files[0]) {
                this.UserBC = BC.files[0];
                const BCFile: File = this.UserBC;
                formData.append('TUD_Most_Recent_Background_Check', BCFile, BCFile.name);
            }

            const headers = new Headers();
            headers.append('enctype', 'multipart/form-data');
            headers.append('Accept', 'application/json');

            this.technicians.addTechnician(formData).subscribe(
                data => {
                    this.resultArray = data;
                    if ( this.resultArray[0].result === 'success' ) {

                        // update experience
                        this.technicians.UpdateExperienced(this.experienceid).subscribe(
                            data => {
                                this.expresults = data;
                            }
                        );

                        // update certification
                        this.technicians.UpdateCertification(this.certificationid).subscribe(
                            data => {
                                this.cerresults = data;
                            }
                        );

                        // update security
                        this.technicians.UpdateSecurity(this.securityid).subscribe(
                            data => {
                                this.secresults = data;
                            }
                        );

                        this.experienceid.length = 0;
                        this.certificationid.length = 0;
                        this.securityid.length = 0;

                        //console.log('After id',this.certificationid);

                        this.HideCreateUserModel();

                        $(function () {
                            $('#CreateUser').trigger('reset');
                            $('.dropify-clear').click();
                        });

                        swal({
                            title: 'Created!',
                            text: 'Technician Details Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });

                        this.listTechnicians(this.id);

                    }
                }
            );

        }
    }

// Update Technician
    FormSubmitupdate(value) {
        this.technicians.checkunique(this.UM_EmailID, this.UM_KeyID).subscribe(
            data => {

                this.loaduniqueemail = data;
                this.loaduniqueemaillen=this.loaduniqueemail.length;
                if(this.loaduniqueemail.length!=0)
                {
                    $("#existmailtech").show();
                    $("#existmailtechedit").show();
                    return false;
                }
                else{

                    const formData: FormData = new FormData();
                    formData.append('TUD_KeyID', this.TUD_KeyID);
                    formData.append('UM_KeyID', this.UM_KeyID);
                    formData.append('UM_First_Name', value.UM_First_Name);
                    formData.append('UM_Last_Name', value.UM_Last_Name);
                    formData.append('UM_Login_Name', value.UM_Login_Name);
                    formData.append('UM_Password', value.UM_Password);
                    formData.append('UM_EmailID', value.UM_EmailID);
                    formData.append('UM_altEmailID', value.EAltEmail);
                    formData.append('TUD_Cell', value.TUD_Cell);
                    formData.append('TUD_Phone_Numberl', value.TUD_Phone_Numberl);
                    formData.append('TUD_Emergency_Phone_Number', value.TUD_Emergency_Phone_Number);
                    formData.append('TUD_TUD_Fax_Number', value.TUD_TUD_Fax_Number);
                    formData.append('TUD_Shirt_Size', value.TUD_Shirt_Size);
                    formData.append('TUD_User', value.umkeyid);

                    const Imageup = this.UserImageInputup.nativeElement;
                    if (Imageup.files && Imageup.files[0]) {
                        this.UserImageup = Imageup.files[0];
                        const imageFileup: File = this.UserImageup;
                        formData.append('TUD_Technician_Image', imageFileup, imageFileup.name);
                    }

                    const Recordup = this.UserRecordInputup.nativeElement;
                    if (Recordup.files && Recordup.files[0]) {
                        this.UserRecordup = Recordup.files[0];
                        const RecordFileup: File = this.UserRecordup;
                        formData.append('TUD_Shot_Records', RecordFileup, RecordFileup.name);
                    }

                    const BCup = this.UserBCInputup.nativeElement;
                    if (BCup.files && BCup.files[0]) {
                        this.UserBCup = BCup.files[0];
                        const BCFileup: File = this.UserBCup;
                        formData.append('TUD_Most_Recent_Background_Check', BCFileup, BCFileup.name);
                    }

                    const headers = new Headers();
                    headers.append('enctype', 'multipart/form-data');
                    headers.append('Accept', 'application/json');

                    this.technicians.updateTechnician(formData).subscribe(
                        data => {
                            this.resultArray = data;
                            if (this.resultArray[0].result === 'success') {

                                // update experience
                                this.technicians.UpdateExperienceds(this.uexperienceid).subscribe(
                                    data => {
                                        this.expresults = data;
                                    }
                                );

                                // update certification
                                this.technicians.UpdateCertifications(this.ucertificationid).subscribe(
                                    data => {
                                        this.cerresults = data;
                                    }
                                );

                                // update security
                                this.technicians.UpdateSecuritys(this.usecurityid).subscribe(
                                    data => {
                                        this.secresults = data;
                                    }
                                );

                                //this.uexperienceid.length = 0;
                                //this.ucertificationid.length = 0;
                                //this.usecurityid.length = 0;

                                this.HideUpdateModel();

                                $(function () {
                                    $('#UpdateUser').trigger('reset');
                                    $('.dropify-clear').click();
                                });

                                swal({
                                    title: 'Updated!',
                                    text: 'Technician Details Updated Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                                this.listTechnicians(this.id);
                            }
                        }
                    );
                }
            }
        );
    }

    FormCert(value)
    {
        //console.log('Cert Form',value);
    }

    ShowCreateUserModel() {
        $(function () {
            $('#CreateTechnician').modal();
            $('.dropify-clear').click();
        });
    }

    HideCreateUserModel() {
        $(function () {
            $('#TechCreateUser').trigger('reset');
            $('#CreateTechnician').modal('hide');
            $('.dropify-clear').click();
            /*this.certificationid.length = 0;
            this.certificationid = [];
            this.experienceid.length = 0;
            this.experienceid = [];
            this.securityid.length = 0;
            this.securityid = [];*/
        });

        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function(event, element){
            // alert('File deleted');
        });

    }

    HideUpdateModel() {
        $(function () {
            $('#TechCreateUser').trigger('reset');
            $('#UpdateTechnician').modal('hide');
            $('.dropify-clear').click();
            //this.ucertificationid.length = 0;
            //this.uexperienceid.length = 0;
            //this.usecurityid.length = 0;
        });

        var drEvent = $('.dropify').dropify();

        drEvent.on('dropify.afterClear', function(event, element){
            // alert('File deleted');
        });

    }

    /* View Certifications */
    LoadCertifications(){
        this.technicians.LoadCertifications().subscribe(
            data => {
                this.allcertifications = data;
                //console.log('allcertifications',data);
            }
        );
    }

    /* View Certifications By Id*/
    LoadCertificationsbyid(id){
        this.technicians.LoadCertificationsbyid(id).subscribe(
            data => {
                this.allcertificationsid = data;
                //console.log('allcertifications',data);
                this.setcertids(data);
            }
        );
    }

    /* View Certifications Skils Name By Id*/
    LoadCertificationsskillsbyid(id){
        this.technicians.LoadCertificationsskillsbyid(id).subscribe(
            data => {
                this.allcertificationsskills = data;
            }
        );
    }

    setcertids(value)
    {
        this.ucertificationid.length=0;
        this.ucertificationid.push(this.TUD_KeyID);
        for(var i = 0; i < value.length; i++){
            if(value[i].checked)
            {
                this.ucertificationid.push(value[i].TCM_KeyID);
            }
        }

        //console.log('on load',this.ucertificationid,value);
    }

    /* View Experience */
    LoadExperience(){
        this.technicians.LoadExperience().subscribe(
            data => {
                this.allexperiences = data;
            }
        );
    }

    /* View Experience By Id*/
    LoadExperiencebyid(id){
        this.technicians.LoadExperiencebyid(id).subscribe(
            data => {
                this.allexperiencesid = data;
                this.setexpids(data);
            }
        );
    }

    /* View Experience Skills By Id*/
    LoadExperienceskillsbyid(id){
        this.technicians.LoadExperienceskillsbyid(id).subscribe(
            data => {
                this.allexperiencesskills = data;
            }
        );
    }

    setexpids(value)
    {
        this.uexperienceid.length=0;
        this.uexperienceid.push(this.TUD_KeyID);
        for(var i = 0; i < value.length; i++){
            if(value[i].checked)
            {
                this.uexperienceid.push(value[i].TEM_KeyID);
            }

        }
    }

    /* View Security */
    LoadSecurity(){
        this.technicians.LoadSecurity().subscribe(
            data => {
                this.allsecurities = data;
            }
        );
    }

    /* View security */
    LoadSecuritybyid(id){
        this.technicians.LoadSecuritybyid(id).subscribe(
            data => {
                this.allsecuritiesid = data;
                this.setsectids(data);
            }
        );
    }

    /* View security skills */
    LoadSecurityskillsbyid(id){
        this.technicians.LoadSecurityskillsbyid(id).subscribe(
            data => {
                this.allsecuritiesskills = data;
            }
        );
    }

    setsectids(value)
    {
        this.usecurityid.length=0;
        this.usecurityid.push(this.TUD_KeyID);
        for(var i = 0; i < value.length; i++){
            if(value[i].checked)
            {
                this.usecurityid.push(value[i].TSCM_KeyID);
            }

        }
    }

    /* View Tickets */
    listTechnicians(id){
        this.technicians.listTechnicians(this.id).subscribe(
            data => {
                this.alltechnicians = data;
                var $table = $('.demo');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover1');
                    }
                });
                this.alltechnicians.sort((a, b) => {
                    if (a.UM_Login_Name < b.UM_Login_Name) return -1;
                    else if (a.UM_Login_Name > b.UM_Login_Name) return 1;
                    else return 0;

                });
                //console.log(data);
            }
        );
    }

    /* Push checkbox ids into array */
    updateCertifications(chBox, event) {

        /* */ if(event.target.checked) {

            this.certificationid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.certificationid.indexOf(chBox);
            this.certificationid.splice(indexx,1);
        }
        if(this.certificationid)
        {

        }
    }

    // onul for update
    updateCertificationsu(chBox, event) {

        if(event.target.checked) {

            this.ucertificationid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.ucertificationid.indexOf(chBox);
            this.ucertificationid.splice(indexx,1);
        }
        if(this.ucertificationid)
        {

        }
    }

    updateExperiences(chBox, event) {

        /* */ if(event.target.checked) {

            this.experienceid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.experienceid.indexOf(chBox);
            this.experienceid.splice(indexx,1);
        }
        if(this.experienceid)
        {

        }
    }

    updateExperiencesu(chBox, event) {

        /* */ if(event.target.checked) {

            this.uexperienceid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.uexperienceid.indexOf(chBox);
            this.uexperienceid.splice(indexx,1);
        }
        if(this.uexperienceid)
        {
        }
    }

    updateSecurities(chBox, event) {

        /* */ if(event.target.checked) {

            this.securityid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.securityid.indexOf(chBox);
            this.securityid.splice(indexx,1);
        }
        if(this.securityid)
        {
        }
    }

    updateSecuritiesu(chBox, event) {

        /* */ if(event.target.checked) {

            this.usecurityid.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.usecurityid.indexOf(chBox);
            this.usecurityid.splice(indexx,1);
        }
        if(this.usecurityid)
        {

        }
    }

    findTecnicianbyId(id,active) {
        if(this.brStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Technician cannot be updated",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
       else if(active=='N' && this.urmid!=1)
        {
            swal({
                title: "User cannot be updated",
                text: 'This User is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            $(function () {
                $('#UpdateTechnician').modal();
            });
            // Load Technician Information
            this.technicians.findTecnicianbyId(id).subscribe(
                data => {
                    console.log(data)
                    this.technicianInfo = data;
                    this.TUD_KeyID = this.technicianInfo.TUD_KeyID;
                    this.UM_KeyID = this.technicianInfo.UM_KeyID;
                    this.UM_First_Name = this.technicianInfo.UM_First_Name;
                    this.UM_Last_Name = this.technicianInfo.UM_Last_Name;
                    this.UM_Login_Name = this.technicianInfo.UM_Login_Name;
                    this.UM_EmailID = this.technicianInfo.UM_EmailID;
                    this.TUD_Cell = this.technicianInfo.TUD_Cell;
                    this.TUD_Phone_Numberl = this.technicianInfo.TUD_Phone_Numberl;
                    this.TUD_Emergency_Phone_Number = this.technicianInfo.TUD_Emergency_Phone_Number;
                    this.TUD_TUD_Fax_Number = this.technicianInfo.TUD_TUD_Fax_Number;
                    this.TUD_Shirt_Size = this.technicianInfo.TUD_Shirt_Size;
                    this.techImage = GlobalVariable.BASE_FILE_API + this.technicianInfo.TUD_Technician_Image;
                    this.shotRecord = GlobalVariable.BASE_FILE_API + this.technicianInfo.TUD_Shot_Records;
                    this.bgCheck = GlobalVariable.BASE_FILE_API + this.technicianInfo.TUD_Most_Recent_Background_Check;
                    this.escltaltEmail=this.technicianInfo.TUD_Additional_EmailID;
                    this.techImagechk = this.technicianInfo.TUD_Technician_Image;
                    this.shotRecordchk = this.technicianInfo.TUD_Shot_Records;
                    this.bgCheckchk = this.technicianInfo.TUD_Most_Recent_Background_Check;
                    this.checkuniquemail(this.UM_EmailID, this.UM_KeyID);
                    this.LoadCertificationsbyid(this.TUD_KeyID);
                    this.LoadExperiencebyid(this.TUD_KeyID);
                    this.LoadSecuritybyid(this.TUD_KeyID);
                      }
                // () => console.log('Agreement Loaded')
            );
        }

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
                            that.listTechnicians(this.id);


                            //$('.modal-backdrop').hide();
                        }

                    });
            });

    }
    findTecnicianskillsbyId(id) {
        // Load Technician Information
        this.LoadCertificationsskillsbyid(id);
        this.LoadExperienceskillsbyid(id);
        this.LoadSecurityskillsbyid(id);
    }

    deleteTecnicianbyId(userid,technicianid,active)
    {
        if(this.brStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Technician cannot be deleted",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else if(active=='N' && this.urmid!=1)
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
                    text: 'This Technician will not recover in future. If any tickets link with this Technician, it can’t be delete.',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function () {
                    that.technicians.deleteTecnicianbyId(userid, technicianid).subscribe(
                        data => {

                            if (data[0].result === 'success') {
                                that.listTechnicians(this.id);
                                swal({
                                    title: 'Deleted!',
                                    text: 'Technician Deleted Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }else if(data[0].result === 'error'){
                                swal({
                                    title: 'Not able to delete account',
                                    text: data[0].message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }
                        }
                    );
                });
        }
    }

    techpasswordvalidation(val:string,event){

        if(val==event){
            this.enableval=1;
            $("#techexisterror").hide();
            return true;
        }else{
            this.enableval=0;
            $("#techexisterror").show();
            return false;
        }

    }

    setpassword(val:string,event){
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



    enable()
    {
        if(this.enableval==0)
        {

            return false;
        }
        else{
            return true;
        }
    }

    edittechpasswordvalidation(val:string,event){

        if(val==event){
            this.enableval1=0;
            $("#techexisterror1").hide();
            return true;
        }else{
            this.enableval1=1;
            $("#techexisterror1").show();
            return false;
        }

    }
    Loadbuttons() {
        this.menu.Loadbutton(8,27,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
            }
        );

    }

    editsetpassword(val:string,event){
        if(val){
            this.enableval1=1;
            return true;
        }else{
            this.enableval1=0;
            return false;
        }

    }
    checkuniquemail(email,id)
    {
        if(this.brStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Technician cannot be added",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            if(email=='' && id=='')
            {
                $(function () {
                    $('#CreateTechnician').modal();
                });
            }

            this.technicians.checkunique(email, id).subscribe(
                data => {

                    this.loaduniqueemail = data;
                    this.loaduniqueemaillen = this.loaduniqueemail.length;
                    
                    if (this.loaduniqueemail.length != 0) {
                        $("#existmailtech").show();
                        $("#existmailtechedit").show();
                        return false;
                    }
                    else {
                        $("#existmailtech").hide();
                        $("#existmailtechedit").hide();
                        return true;
                    }

                }
            );
        }
    }
}