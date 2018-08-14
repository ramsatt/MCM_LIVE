import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import  { BranchService } from './../services/branch.service';
import  { UpdatebranchService } from './../services/updatebranch.service';
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";




import {RequestService} from "../services/request.service";
//import {RaisedrequestComponent} from "../raisedrequest/raisedrequest.component";

declare var $;
declare var swal;
declare var document;
declare var google;

@Component({
  selector: 'app-branchoverview',
  templateUrl: './branchoverview.component.html',
  styleUrls: ['./branchoverview.component.scss']
})
export class BranchoverviewComponent implements OnInit {
  //@ViewChild(RaisedrequestComponent) child;
  status: any;
  selectedRow: Number = 0;
  setClickedRow: Function;

  /* DataArray */
  BranchArray: any;
  BranchDetails: any;
  BranchTicketListArray: any = [];
    BranchLoaded :any= false;


    /* Branch Details */
  SelectedBranchID: any = '';
  Branch_ID: any='';
  Branch_Name: any;
  Branch_Status:any;
  Branch_Address: any;
  Branch_City: any;
  Branch_State: any;
  Branch_Country: any;
  Branch_Zip: any;
    results:any;
  Branch_Phone: any;
  Branch_Fax: any;
  Branch_Description: any;
    Branch_Private_Description: any;
  lat: any = -34.397;
  lng: any = 150.644;
  SiteArray: any;
  AccArray: any;
  site_name: any;
  account_name: any;
    Branch_Email: any;
    Branch_Code: any;
    changedid:any='';
    mobile: any;
    home: any;
    bncoverid: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umkeyid:any;
    raisedRequests:any;
    bilid:any='';
    biladdress: any = '';
    bilcity: any = '';
    bilstate: any = '';
    bilcountry: any = '';
    bilzip: any = '';
    shipid1:any='';
    shipaddress1: any = '';
    shipcity1: any = '';
    shipstate1: any = '';
    shipcountry1: any = '';
    shipzip1: any = '';
    shipid2:any='';
    shipaddress2: any = '';
    shipcity2: any = '';
    shipstate2: any = '';
    shipcountry2: any = '';
    shipzip2: any = '';
    shipid3:any='';
    shipaddress3: any = '';
    shipcity3: any = '';
    shipstate3: any = '';
    shipcountry3: any = '';
    shipzip3: any = '';
    shipid4:any='';
    shipaddress4: any = '';
    shipcity4: any = '';
    shipstate4: any = '';
    shipcountry4: any = '';
    shipzip4: any = '';
    shipaddress5: any = '';
    shipcity5: any = '';
    shipstate5: any = '';
    shipcountry5: any = '';
    shipzip5: any = '';
    shipid5:any='';
    branchedit:any='';
    branchbilling:any='';
    bilname:any='';
    unassignbtn:any='';
    urmid:any='';
    Chilmenu:any='';
  constructor( public router: Router, public actroute:ActivatedRoute,public branchService: BranchService, public del: UpdatebranchService,public acc:AccountsService,private requestService: RequestService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.umkeyid=localStorage.getItem('umid');
      this.urmid=localStorage.getItem('urmid');
      this.BranchLoaded = false;
    this.status = 'active';
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };
  }

  ngOnInit() {
      if(!this.actroute.snapshot.queryParams['id'])
      {
          this.Branch_ID='';
      }
      else {
          this.Branch_ID=this.actroute.snapshot.queryParams['id'];
      }

    this.LoadBranches(this.Branch_ID);
      this.Loadsubmenu();
      this.Loadbuttons();
      this.Loadchildmenu();
      $.fn.dataTable.ext.errMode = 'none';
      /*var dt = $('#RaisedReqID').DataTable();
      dt.clear().draw();
      dt.destroy();*/
      //$('#RaisedReqID').hide();
  }

    ngOnChanges() {
        this.raisedreq();
        //$('#RaisedReqID').hide();
    }

    Loadchildmenu() {
        this.menu.Loadchildmenu(8, 'N').subscribe(
            data => {
                this.Chilmenu = data;
            }
        );
    }
    Activate(id)
    {
        let that = this;
        swal({
                title: "Are you sure?",
                text: "Want to activate this branch!",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Activate",
                closeOnConfirm: false
            },
            function () {
                that.del.Activate(id,'Y').subscribe(
                    data => {
                        this.results = data;
                        if (this.results[0].result == "success") {
                            swal({
                                title: "Activated!",
                                text: "Branch has been activated successfully",
                                type: "success",
                                confirmButtonClass: "btn-success"
                            });
                            that.LoadBranches(id);
                        }

                    }
                );

            });
    }
    Deactivate(id)
    {
        let that = this;
        swal({
                title: "Are you sure?",
                text: "Want to deactivate this branch!",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Deactivate",
                closeOnConfirm: false
            },
            function () {
                that.del.Activate(id,'N').subscribe(
                    data => {
                        this.results = data;
                        if (this.results[0].result == "success") {
                            swal({
                                title: "Deactivated!",
                                text: "Branch has been deactivated successfully",
                                type: "success",
                                confirmButtonClass: "btn-success"
                            });
                            that.LoadBranches(id);
                        }
                        else {
                            swal({
                                title: "Sorry!",
                                text: "There will be some outstanding active tickets used this branch. Please close those tickets before deactivate",
                                type: "error",
                                confirmButtonClass: "btn-danger"
                            });
                        }

                    }
                );

            });
    }

  LoadBranches(bncid) {
    this.branchService.LoadBranch(this.umkeyid).subscribe(
        data => {
          this.BranchArray = data;
            this.BranchLoaded = true;

            this.BranchArray.sort((a, b) => {
                if (a.BM_Branch_Name < b.BM_Branch_Name) return -1;
                else if (a.BM_Branch_Name > b.BM_Branch_Name) return 1;
                else return 0;
            });

            if(bncid=='') {

                this.LoadBranchDetails(this.BranchArray[0].BM_KeyID);

            }
            else{
                if(this.Branch_ID=='' || this.Branch_ID=='undefined')
                {
                    //console.log('empty');
                    this.Branch_ID = this.BranchArray[0].BM_KeyID;
                }
                this.LoadBranchDetails(this.Branch_ID);
            }

          this.Branch_Name = this.BranchArray[0].BM_Branch_Name;
          this.Branch_Status = this.BranchArray[0].BM_IsActive;

          this.LoadBillingDetails(this.Branch_ID);
          this.LoadShippingDetails(this.Branch_ID);

          console.log("SDF"+this.Branch_ID);
          this.Loadsites(this.Branch_ID);
          this.Loadaccounts(this.Branch_ID);

          this.Load_Branch_Ticket_List(this.Branch_ID);
          this.raisedreq();
            this.selectedRow = 0;
           // this.selectBranchDetails(this.Branch_ID);
        }
    );
  }
    LoadBillingDetails(id) {
        this.branchService.Viewbilling(id).subscribe(
            data => {
                this.branchbilling = data;
                // console.log(data);

                {
if( this.branchbilling!=='')
{

                        this.bilid = data.BSA_KeyID;
                        this.biladdress = data.BSA_Address;
                        this.bilzip = data.BSA_Zip;
                        this.bilcity = data.BSA_City;
                        this.bilstate = data.BSA_State;
                        this.bilcountry = data.BSA_Country;
    this.bilname = data.BSA_Name;

                }
                else {
    this.bilid = '';
    this.bilname = '';
    this.biladdress = '';
    this.bilzip = '';
    this.bilcity = '';
    this.bilstate = '';
    this.bilcountry = '';

}
                }

            },

        );
    }
    LoadShippingDetails(id) {
        this.branchService.Viewshipping(id).subscribe(
            data => {
                this.branchedit = data;
                }
        );
    }
  selectBranchDetails(id) {
        this.SelectedBranchID = id;
        this.LoadBranchDetails(id);
        this.Loadsites(id);
        this.Loadaccounts(id);
        this.bncoverid = id;
        this.Load_Branch_Ticket_List(id);
      this.LoadBillingDetails(id);
      this.LoadShippingDetails(id);
  }

  LoadBranchDetails(Branch_ID) {
    this.branchService.ViewBranch(Branch_ID).subscribe(
        data => {

          this.BranchDetails = data;
          /* Branch Details */
          this.Branch_ID = this.BranchDetails[0].BM_KeyID;
          this.Branch_Name = this.BranchDetails[0].BM_Branch_Name;
          this.Branch_Status = this.BranchDetails[0].BM_IsActive;
          this.Branch_Address = this.BranchDetails[0].BM_Address;
          this.Branch_City = this.BranchDetails[0].BM_City;
          this.Branch_State = this.BranchDetails[0].BM_State;
          this.Branch_Country = this.BranchDetails[0].BM_Country;
          this.Branch_Zip = this.BranchDetails[0].BM_Zip;
          this.Branch_Phone = this.BranchDetails[0].BM_Phone;
          this.Branch_Fax = this.BranchDetails[0].BM_Fax;
            this.Branch_Email = this.BranchDetails[0].BM_Email;
            this.Branch_Code = this.BranchDetails[0].BM_Code;
          this.lat = this.BranchDetails[0].BM_Latitude;
          this.lng = this.BranchDetails[0].BM_Longitude;
            this.home=this.BranchDetails[0].BM_Home;
            this.mobile=this.BranchDetails[0].BM_Mobile;
            this.Branch_Description=this.BranchDetails[0].BM_Description;
            this.Branch_Private_Description=this.BranchDetails[0].BM_Private_Description;
          const bnclat = this.BranchDetails[0].BM_Latitude;
          const bnclng = this.BranchDetails[0].BM_Longitude;
            this.raisedreq();

          if(this.lat!='' && this.lng!='')
          {
            var myLatLng = {lat: bnclat, lng: bnclng};

            var reslong = new google.maps.LatLng(bnclat, bnclng);

            var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 12,
              center: reslong
            });


            var marker = new google.maps.Marker({
              position: reslong,
              map: map,

              title: 'Hello World!'
            });
            marker.setPosition(reslong);
          }
        }
    );
  }

  Navication(link) {
      if(link!='branch/create')
      {
          if(this.Branch_Status=='N' && this.urmid!=1)
          {
              swal({
                  title: "Branch cannot be updated",
                  text: 'This branch is deactivated',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });
          }
          else {
              this.router.navigate([link]);
          }
      }else
      {
          if(this.Branch_Status=='N' && this.urmid!=1)
          {
              swal({
                  title: "Branch cannot be added",
                  text: 'This branch is deactivated',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });
          }
          else {
              this.router.navigate([link]);
          }
      }

  }

  Loadsites(bnc_id) {

    this.branchService.LoadSitebranch(bnc_id).subscribe(
        data=> {
          this.SiteArray = data;


        }
    );

  }

  Loadaccounts(bnc_id) {

    this.branchService.Loadaccbranch(bnc_id).subscribe(
        data=> {
          this.AccArray = data;


        }
    );

  }

  Delete(id) {
      if(this.Branch_Status=='N' && this.urmid!=1)
      {
          swal({
              title: "Branch cannot be deleted",
              text: 'This branch is deactivated',
              type: 'error',
              confirmButtonClass: 'btn-danger'
          });
      }
      else {

          let that = this;
          swal({
                  title: "Are you sure?",
                  text: "This Branch will not recover in future. If any tickets link with this Branch, it can’t be delete.",
                  type: "warning",
                  showCancelButton: true,
                  cancelButtonClass: "btn-default",
                  confirmButtonClass: "btn-warning",
                  confirmButtonText: "Delete",
                  closeOnConfirm: false
              },
              function () {
                  that.del.DeleteBranch(id).subscribe(
                      data => {
                          this.results = data;
                          if (this.results[0].result == "success") {
                              swal({
                                  title: "Deleted!",
                                  text: "Branch has been deleted",
                                  type: "success",
                                  confirmButtonClass: "btn-success"
                              });
                              that.LoadBranches('');
                          }else if(this.results[0].result === 'error'){
                              swal({
                                  title: 'Not able to delete user',
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
    changedmenu(menu)
    {
        if(menu==24)
        {
            this.changedid=1;
        }
        else if(menu==25)
        {
            this.changedid=2
        }
        else if(menu==28)
        {
            this.changedid=4
        }
        else
            {
            this.changedid=3;
        }

    }
  Load_Branch_Ticket_List(BranchID){
      const formData: FormData = new FormData();
      formData.append('branchID', BranchID);
      this.branchService.Load_Branch_Ticket_List(formData).subscribe(
          data => {
              this.BranchTicketListArray = data;
          }
      );
  }
    Loadsubmenu() {
        this.acc.Loadmenu(8).subscribe(
            data => {
                this.Asssubmenu = data;


            }
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(8,23,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;
                this.delete=this.Asssubbutton[0].MA_Delete;




            }
        );

    }
    raisedreq() {
        $(function () {
            $('#RaisedReqID').dataTable().fnDestroy();
        });

        this.requestService.raisedRequest(this.Branch_ID).subscribe(
            data => {
                this.raisedRequests = data;
                $(function () {
                  var dt =   $('#RaisedReqID').DataTable(
                        {
                            paging: true,
                            searching: true,
                            lengthChange: false,
                            bLengthChange: false,
                            order: [[ 0, 'asc']]
                        }
                    );
                });

                $('#RaisedReqID').show();
            }
        );
    }
}
