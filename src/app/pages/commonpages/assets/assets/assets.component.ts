import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {Router} from '@angular/router';
import {AssetsService} from "../services/assets.service";
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {MoveassetsService} from "../services/moveassets.service";

declare var  $;
declare var jQuery: any;
declare var  swal;

@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['assets.component.scss']
})
export class AssetsComponent implements OnInit {
    status:any='active';
    editassdetail:any;
    assdetail:any;
    ass_sno:any;
    ass_model:any;
    Partmfg:any;
    AssID:any;
    asStatus: any;
    Partopeningbal:any;
    Parttotalsold:any;
    AssArray:any;
    Partprice:any;
    Internalcost:any;
    Description:any;
    Imgpath:any;
    imgdetail:any;
    AssName:any;
    normal = '';
    selectedRow: Number = 0;
    setClickedRow: Function;
    delparts:any;
    ass_from:any;
    ass_to:any;
    eass_to:any;
    eass_from:any;
    eass_name:any;
    eass_sno:any;
    submitted = false;
    active = true;
    results:any;
    siteov_name:any='';
    SiteLat: any;
    SiteLng: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    eass_iden:any;
    delete:any;
    sessid:any;
    umkeyid:any;
    urmid:any;
    ass_iden:any;
    AM_KeyID: any;
    AGMStatus:any;
    agreementarray: any;
    AgreementName: any;
    AGMID: any = '';
    unassignbtn: any;
    assetRtn: any = '';
    AccountsArray:any=[];
    AM_Name:any='';
    @ViewChild("assf_date") public CDateFrom: ElementRef;
    @ViewChild("dfesto_date") public CDateTo: ElementRef;
  constructor( public router: Router, public accService: MoveassetsService, public ass: AssetsService,public acc:AccountsService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.umkeyid=localStorage.getItem('umid');
      this.urmid=localStorage.getItem('urmid');
      this.setClickedRow = function(index){
          this.selectedRow = index;
      };


  }

  ngOnInit() {
      setTimeout(function() {
          $('.datepicker-only-init').datetimepicker({
              widgetPositioning: {
                  horizontal: 'left'
              },
              icons: {
                  time: "fa fa-clock-o",
                  date: "fa fa-calendar",
                  up: "fa fa-arrow-up",
                  down: "fa fa-arrow-down"
              },
              format: 'MM/DD/Y'
          });
      }, 1000)
      this.LoadAssets('');
      this.Loadsubmenu();
      this.Loadbuttons();
  }
  Navication(link) {
    this.router.navigate([link]);
  }
    LoadAccounts(id) {
        this.accService.LoadAccounts(id).subscribe(
            data => {
                this.AccountsArray = data;


                this.AM_Name = this.AccountsArray[0].AM_Name;


            }

        );

    }
    viewass(Ass_ID){
        this.ass.Editass(Ass_ID).subscribe(
            data => {
                this.assdetail = data;
                this.AssID = this.assdetail[0].ASM_KeyID;
                this.AssName = this.assdetail[0].ASM_Asset_Name;
                this.ass_sno = this.assdetail[0].ASM_Serial_No;
                this.ass_model = this.assdetail[0].MM_Model_Name;
                this.ass_from = this.assdetail[0].ASM_Datefrom;
                this.ass_to = this.assdetail[0].ASM_Dateto;
                this.asStatus = this.assdetail[0].ASM_IsActive;
                this.siteov_name = this.assdetail[0].SM_SiteName;
                this.SiteLat = this.assdetail[0].SM_Latitude;
                this.SiteLng = this.assdetail[0].SM_Longitude;
                this.ass_iden = this.assdetail[0].ASM_ID;
                this.AM_KeyID = this.assdetail[0].SAD_AM_KeyID;
                this.AGMStatus = this.assdetail[0].ASM_Agreement_Status;
                this.AGMID = this.assdetail[0].ASM_AGM_KeyID;
                this.AgreementName = this.assdetail[0].AGM_Agreement_Name;
                this.LoadAccounts(Ass_ID);
            }
        );


    }
    editass(Ass_ID){
        if(this.asStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Asset cannot be updated",
                text: 'This Asset is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            $(function () {
                $('#editpart').modal();
            });

            this.viewagreements(this.AM_KeyID);
            this.ass.Editass(Ass_ID).subscribe(
                data => {
                    this.editassdetail = data;
                    // this.eass_name = this.assdetail[0].ASM_KeyID;
                    this.eass_name = this.assdetail[0].ASM_Asset_Name;
                    this.eass_sno = this.assdetail[0].ASM_Serial_No;
                    this.eass_from = this.assdetail[0].ASM_Datefrom;
                    this.eass_to = this.assdetail[0].ASM_Dateto;
                    this.eass_iden = this.assdetail[0].ASM_ID;


                }
            );
        }

    }
    Selectedasset(Ass_ID) {
        this.viewass(Ass_ID);

    }
    onSubmit() {
        this.submitted = true;
    }

    LoadAssets(assid) {
        this.ass.LoadAssets(this.umkeyid, this.urmid).subscribe(
            data => {
                this.AssArray = data;
                this.AssID = this.AssArray[0].ASM_KeyID;
                this.asStatus = this.AssArray[0].ASM_IsActive;
                if(assid!='')
                {
                    this.AssID=assid;
                this.viewass(assid);

                }
                else {
                    this.viewass(this.AssID);
                }
            }
        );
    }

    updateAss(assid){
        this.eass_from = this.CDateFrom.nativeElement.value;
        this.eass_to = this.CDateTo.nativeElement.value;
        this.ass.Updateass( this.eass_name, this.eass_from, this.eass_to, this.eass_iden, assid, this.AGMID, this.umkeyid).subscribe(data => {
                this.results = data;
                if ( this.results[0].result === 'success') {
                    swal({
                        title: 'Updated!',
                        text: 'Asset Details Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });

                    $('#editpart').modal("hide");
//this.viewass(assid);
                    this.LoadAssets(assid);
                    //this.Selectedasset(assid);

                }

            }
        );
    }
    Delete(id) {
        if(this.asStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Asset cannot be deleted",
                text: 'This Asset is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            let that = this;
            swal({
                    title: "Are you sure?",
                    text: "This Asset will not recover in future. If any tickets link with this Asset, it can’t be delete.",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Delete",
                    closeOnConfirm: false
                },
                function () {
                    that.ass.Deleteass(id).subscribe(
                        data => {
                            this.results = data;
                            if (this.results[0].result == "success") {
                                swal({
                                    title: "Deleted!",
                                    text: "Asset has been deleted",
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });
                                that.LoadAssets('');
                            }
                            else if(this.results[0].result == "error"){
                                swal({
                                    title: 'Not able to delete account',
                                    text: this.results[0].message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }

                        }
                    );

                });
        }
    }
    Loadsubmenu() {
        this.acc.Loadmenu(4).subscribe(
            data => {
                this.Asssubmenu = data;

            }
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(4,13,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign

            }
        );

    }

    viewagreements(accid){
        this.ass.Loadagreements(accid).subscribe(
            data => {
                this.agreementarray = data;

            },
        );

    }

    Updatestatus(assetid,status) {

        let that = this;

        if(status=='N') // Deactivate
        {
            swal({
                    title: "Are you sure?",
                    text: "Want to deactivate this asset!",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Deactivate",
                    closeOnConfirm: false
                },
                function () {
                    that.ass.Updatestatus(assetid,status).subscribe(
                        data => {
                            this.assetRtn = data;
                            if (this.assetRtn[0].result === 'success') {
                                swal({
                                    title: 'Asset Deactivated!',
                                    text: 'Asset Deactivated Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                            else {
                                swal({
                                    title: "Sorry!",
                                    text: "There will be some outstanding active tickets used this asset. Please close those tickets before deactivate",
                                    type: "error",
                                    confirmButtonClass: "btn-danger"
                                });
                            }
                            that.LoadAssets(assetid);
                        }
                    );
             });
        }
        else // Activate
        {
            swal({
                    title: "Are you sure?",
                    text: "Want to activate this asset!",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Activate",
                    closeOnConfirm: false
                },
                function () {
                    that.ass.Updatestatus(assetid,status).subscribe(
                        data => {
                            this.assetRtn = data;
                            if (this.assetRtn[0].result === 'success') {
                                swal({
                                    title: 'Asset Activated!',
                                    text: 'Asset Activated Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }

                            that.LoadAssets(assetid);
                        }
                    );
                });
        }

    }
}