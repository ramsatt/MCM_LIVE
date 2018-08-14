import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/users/user.service";
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";


declare var $;
declare var swal;

@Component({
    selector: 'app-useroverview',
    templateUrl: './useroverview.component.html',
    styleUrls: ['./useroverview.component.css']
})
export class UseroverviewComponent implements OnInit {
    statustitle:any;
    statustext:any;
    unassignbtn:any;
    alluser:any;
    status: any;
    selectedRow: Number = 0;
    setClickedRow: Function;
    selectuser:any;
    username:any;
    firstname:any;
    results:any;
    lastname:any;
    usercategory:any;
    userrole:any;
    delete:any;
    email:any;
    escltPassword:any='';
    enableval:any;
    resetuserid:any;
    confirmtile:any;
    Asssubbutton:any;
    addbtn:any;
    editbtn:any;
    deletebtn:any;
    sessid:any;
    viewrole:any;
    Dviewrole:any;
    usercatid:any;
    Dfirstname:any;
    Dlastname:any
    usercatid2; any;
    escltprimePassword:any='';
    Dusercatid:any;
    checkprimaryuser:any='';
    isprimeuser:any='';
    Chilmenu:any;
    constructor(public user:UserService,public menu:MenumanagementService)
    {
        this.sessid=localStorage.getItem('ucmid');
        this.Loadchildmenu();
        this.Loadbuttons();

        this.status = 'active';
        this.setClickedRow = function (index) {
            this.selectedRow = index;
        };
    }

    ngOnInit() {
        this.Viewuser();


    }

    SelectUserType() {
        $(function () {
            $('#SelectUserType').modal();
        });
    }
    Viewuser()
    {
        this.user.Loadusers().subscribe(
            data => {
                this.alluser = data;

            } );
    }
    Deactivate(urmkeyid,userid,status)
    {
        this.user.checkuserprimary(urmkeyid,userid).subscribe(
            data => {
                this.checkprimaryuser = data;
                if(this.checkprimaryuser!='')
                {
                    this.isprimeuser='primary user';
                }
                else {
                    this.isprimeuser='user';
                }

        if(status=='Y')
        {
            this.statustext='User Deactivated Successfully';
            this.statustitle='Deactivated!';
            this.confirmtile='Deactive';
        }
        else {
            this.statustitle='Activated!';
            this.statustext='User Activated Successfully';
            this.confirmtile='Active';
        }
        let that = this;
        swal({
                title: "Are you sure?",
                text: "You want to "+that.confirmtile+" this " +that.isprimeuser+"?",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: that.confirmtile,
                closeOnConfirm: false
            },
            function() {
                if(status=='Y')
                {
                    this.statustext='User Deactivated Successfully';
                    this.statustitle='Deactivated!';
                    this.confirmtile='Deactive';
                }
                else {
                    this.statustitle='Activated!';
                    this.statustext='User Activated Successfully';
                    this.confirmtile='Active';
                }
                that.user.deactivate(urmkeyid,userid,status).subscribe(
                    data => {
                        this.alluser = data;
                        if(this.alluser[0].result =="success")
                        {
                            {
                                swal({
                                    title: this.statustitle,
                                    text: this.statustext,
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });

                                that.Viewuser();
                            }

                            //$('.modal-backdrop').hide();
                        }

                    });
            } );
            });
    }
    Delete(userid,urmkeyid)
    {
        this.user.checkuserprimary(urmkeyid,userid).subscribe(
            data => {
                this.checkprimaryuser = data;
                if(this.checkprimaryuser!='')
                {
                    this.isprimeuser='primary user';
                }
                else {
                    this.isprimeuser='user';
                }
        let that = this;
        swal({
                title: "Are you sure?",
                text: "This " +that.isprimeuser+ " will not recover in future. If any tickets link with this " +that.isprimeuser+ ", it can’t be delete.",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Delete",
                closeOnConfirm: false
            },
            function() {
                that.user.Delete(userid,urmkeyid).subscribe(
                    data => {
                        this.delete = data;

                        if(this.delete[0].result === 'success')
                        {
                                swal({
                                    title: "Deleted!",
                                    text: "User has been deleted",
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });
                                // that.viewholi1();
                                that.Viewuser()

                        }else if(this.delete[0].result === 'error'){
                            swal({
                                title: "Not able to delete user",
                                text: this.delete[0].message,
                                type: "error",
                                confirmButtonClass: "btn-danger"
                            });
                        }

                        /* $('#accounts').DataTable({
                         responsive: true
                         });
                         */
                    }


                );
            });
            } );
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
    contactsetpassword(val:string,event){
        let cfmpwdval:any;
        cfmpwdval=$("#txtEmail").val()

        this.enableval=1;
        if((val) &&  (cfmpwdval!='')){
            this.enableval=0;
            //$("#techexisterror").hide();
            return true;
        }else{
            this.enableval=1;
            //$("#techexisterror").show();
            return false;
        }

    }
    enable1()
    {
        if(this.enableval==0)
        {

            return false;
        }
        else{
            return true;
        }
    }
    selectuserdetails(id)
    {
        this.user.Loadusersbyid(id).subscribe(
            data => {
                this.selectuser = data;
                if(this.selectuser[0].UM_Login_Name!='')
                {
                    this.username=this.selectuser[0].UM_Login_Name;
                }
                else {
                    this.username='';
                }
                this.lastname=this.selectuser[0].UM_Last_Name;
                this.email=this.selectuser[0].UM_EmailID;
                this.firstname=this.selectuser[0].UM_First_Name;
                this.usercategory=this.selectuser[0].UCM_Category_Name;
                this.userrole=this.selectuser[0].UCM_Role_Name;

            } );
    }
    resetpwd(id)
    {
        this.resetuserid=id;

        this.user.viewrole(this.resetuserid).subscribe(
            data => {
                this.viewrole = data;
                this.Dviewrole=this.viewrole[0].URM_Role_Name;
                this.Dusercatid=this.viewrole[0].UCM_KeyID;
                this.Dfirstname=this.viewrole[0].UM_First_Name;
                this.Dlastname=this.viewrole[0].UM_Last_Name;
                this.viewallcat(this.viewrole[0].URM_KeyID);
                // this.usercatid2=this.viewrole[0].UCM_KeyID;
                //console.log(this.usercatid);


            }
        );
        $("#UpdateUser").trigger("reset");
    }
    viewallcat(id)
    {
        this.user.viewallcat(id).subscribe(
            data => {
                this.usercatid2 = data;


            }
        );
    }

    updateuser()
    {
  if(( this.escltprimePassword!=null || this.escltprimePassword!='') && (this.escltPassword==null || this.escltPassword==''))
        {

            swal({
                title: "Confirm password missing!",
                text: "Please enter the confirm password",
                type: "error",
                confirmButtonClass: "btn-danger"
            });
        }
        else{
            this.user.updatepwd(this.resetuserid,this.escltPassword,this.Dusercatid).subscribe(
                data => {
                    this.results = data;
                    if ( this.results[0].result === 'success' ) {
                        // this.HideupdateUserModel();
                        swal({
                            title: 'Updated!',
                            text: 'Category/Password  Updated Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        $('#update_user_cat').modal("hide");
                        //this.LoadbncUsers();
                        //this.LoadPrimaryDetails(this.branchid)
                        this.Viewuser();

                    }
                }
            );
        }
    }
    Loadbuttons() {
        this.menu.Loadbutton(12,50,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.addbtn=this.Asssubbutton[0].MA_Add;
                this.editbtn=this.Asssubbutton[0].MA_Edit;
                this.deletebtn=this.Asssubbutton[0].MA_Delete;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;
            },
            err => {
                //console.log(err);
            },
            //() => console.log('site loaded')
        );

    }
    Loadchildmenu() {
        this.menu.Loadchildmenu(12,'user').subscribe(
            data => {
                this.Chilmenu = data;
            }
        );
    }
}
