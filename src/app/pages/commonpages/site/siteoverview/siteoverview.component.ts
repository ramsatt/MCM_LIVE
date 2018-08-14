import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { SiteService } from './../service/site.service';
import { EditsiteService } from './../service/editsite.service';
import { BranchService } from './../../branch/services/branch.service';
import { AssignbranchService } from './../../branch/services/assignbranch.service';
import { AssignsecbranchService } from './../../branch/services/assignsecbranch.service';
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";


declare var $;
declare var swal;
declare var document;
declare var google;


@Component({
  selector: 'app-siteoverview',
  templateUrl: './siteoverview.component.html',
  styleUrls: ['./siteoverview.component.scss']
})
export class SiteoverviewComponent implements OnInit {
    branch_name:any='';

  status: any;
  selectedRow: Number = 0;
  setClickedRow: Function;
  SiteLoaded: any = false;
  SiteDetailsLoded: any = false;
    Asssubmenu:any;
    Asssubbutton:any;
    primeAsssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    unassign:any;
    sessid:any;
    umid:any;
    primeadd:any;
    primeedit:any;
    primedelete:any;
    primeunassign:any;
    siteRtn: any;
    unassignbtn: any;

  /* Search_Keywoed */

  /* Data_Array */
  checkbox: any = [];
  demoChk: any = [];
  SitesArray: any;
  BranchesArray: any;
  stStatus:any;
  SiteDetails: any;
  def: any = 10;
  /* Site_Details */
  SiteID: any='';
  SiteName: any;
  SM_IsActive:any
  SiteAddress: any;
  SiteCity: any;
  SiteState: any;
  SiteCountry: any;
  SiteZIP: any;
  SitePhone: any;
    SiteMobile: any;
    SiteHomePhone: any;
  SiteFax: any;
  SiteDescription: any;
  SiteAccountNumber: any = '';
  lat: any;
  lng: any;
  brnBranchName: any = '';
  brnaddress: any;
  brnzip: any;
  brnstate: any;
  brncountry: any;
  brnfax: any;
  brncity: any;
  brnphone: any;
  brnconfrom: any;
  brnconto: any;
  brndescription: any;
  brnlat: any;
  brnlong: any;
  brnstatus: any;
  primarybranch: any;
  secbranch: any;
  allbranch: any=[];
  results: any;
  secid: any;
  id: any;
  dissearch: any = '';
  search: any = '';
  samezip: any;
  brnBranchId: any;
  loadkm: any;
  lat1: any;
  lon1: any;
  lat2: any;
  lon2: any;
    AssSite: any = [];
    Sitecontactperson: any;
    selectid: any;
    Chilmenu: any;
  SiteAaccoutsArray: any = [];
  SiteBranchsArray: any = [];
  urmkeyid:any='';
  userID: any = '';
    pageNum:any='';
    pageNum1:any='';
    sitepassid:any='';

  constructor( public router: Router,public actroute:ActivatedRoute,public siteService: SiteService, public branchService: BranchService, public assbnch: AssignbranchService, public asssec: AssignsecbranchService, public editSiteService: EditsiteService, public acc: AccountsService, public menu: MenumanagementService) {
      this.userID = localStorage.getItem('umid');
this.urmkeyid=localStorage.getItem('urmid');
      this.sessid = localStorage.getItem('ucmid');
      this.Loadbuttons();
    this.setClickedRow = function(index){
      this.selectedRow = index;
    };
  }

  ngOnInit() {
      if(!this.actroute.snapshot.queryParams['id'])
      {
          this.SiteID='';
      }
      else {
      this.SiteID=this.actroute.snapshot.queryParams['id'];
      }


      this.Loadsubmenu();
      this.Loadchildmenu();
      this.Loadprimebuttons();
    this.LoadSites(this.SiteID);
      $("#kmsearch").keypress(function (e) {
          //if the letter is not digit then display error and don't type anything
          if (e.which === 8 || e.which === 46) {
              return true;
          } else if (e.which < 48 || e.which > 57 ) {
              return false;
          } else {
              return true;
          }

      });
  }

  LoadSites(siteid) {
      const formData = new FormData();
      formData.append('userID', this.userID);
    this.siteService.LoadSitesbyUser(formData).subscribe(
        data => {
            this.SiteLoaded = true;
          this.SitesArray = data;
           /* this.SitesArray.sort((a, b) => {
                if (a.SM_SiteName < b.SM_SiteName) return -1;
                else if (a.SM_SiteName > b.SM_SiteName) return 1;
                else return 0;
            });*/

            if(siteid=='') {

                this.LoadSiteDetails(this.SitesArray[0].SM_KeyID);

            }
            else{
                if(this.SiteID=='' || this.SiteID=='undefined')
                {
                    //console.log('empty');
                    this.SiteID = this.SitesArray[0].SM_KeyID;
                }
                this.LoadSiteDetails(this.SiteID);
            }
          //this.LoadSiteDetails(this.SiteID);
          this.LoadBranch(this.SiteID);
          this.viewprimary(this.SiteID);
          this.LoadSiteAccounts(this.SiteID);
          this.LoadSiteBranches(this.SiteID);
          this.LoadSiteAssets(this.SiteID);

        }
    );
  }

    RefreshSites() {
        const formData = new FormData();
        formData.append('userID', this.userID);
        this.siteService.LoadSitesbyUser(formData).subscribe(
            data => {
                this.SitesArray = data;
            }
        );
    }
    LoadSiteAssets(Site_ID) {
      this.SiteDetailsLoded = false;
        this.siteService.LoadAssets(Site_ID).subscribe(
            data => {
                this.SiteDetailsLoded = false;
                this.AssSite = data;
            }
        );

    }
  LoadSiteDetails(Site_ID) {
    this.siteService.LoadSinglesite(Site_ID).subscribe(
        data => {
          this.SiteDetails = data;
          this.SiteID = this.SiteDetails.SM_KeyID;
          this.SiteName = this.SiteDetails.SM_SiteName;
          this.stStatus = this.SiteDetails.SM_IsActive;
          this.SiteAddress = this.SiteDetails.SM_Address;
          this.SiteCity = this.SiteDetails.SM_City;
          this.SiteState = this.SiteDetails.SM_State;
          this.SiteCountry = this.SiteDetails.SM_Country;
          this.SiteZIP = this.SiteDetails.SM_Zip;
          this.SitePhone = this.SiteDetails.SM_Phone;
          this.SiteFax = this.SiteDetails.SM_Fax;
          this.SiteDescription = this.SiteDetails.SM_Description;
          this.lat = this.SiteDetails.SM_Latitude;
          this.lng = this.SiteDetails.SM_Longitude;
          this.SiteAccountNumber = this.SiteDetails.SM_AccountNumber;
            this.SiteMobile = this.SiteDetails.SM_Mobile;
            this.SiteHomePhone = this.SiteDetails.SM_Home_Phone;
            this.Sitecontactperson = this.SiteDetails.SM_Contact_Person;

          var sitelat = this.SiteDetails.SM_Latitude;
          var sitelng = this.SiteDetails.SM_Longitude;

          if(this.lat != '' && this.lng != '')
          {
            var myLatLng = {lat: sitelat, lng: sitelng};

            var reslong = new google.maps.LatLng(sitelat, sitelng);

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

    //console.log('SiteST',this.stStatus);
  }

  SelectedSite(Site_ID) {
    this.LoadSiteDetails(Site_ID);
    this.LoadBranch(Site_ID);
    this.LoadSiteAccounts(Site_ID);
    this.LoadSiteBranches(Site_ID);
    this.LoadSiteAssets(Site_ID);
    this.selectbranch(Site_ID);
  }

  selectbranch(Site_ID) {
      this.viewprimary(Site_ID);
  }

  LoadBranch(Site_ID) {
      this.branchService.ViewSiteBranch(Site_ID).subscribe(
          data => {
                this.BranchesArray = data;
            }
        );
  }
  viewprimary(id) {
        /* console.log(this.secid); */
        this.assbnch.ViewPrimaryBranch(id).subscribe(
            data => {
                this.primarybranch = data;
                if ( data != '' ) {
                    this.brnBranchName = data[0].BM_Branch_Name;
                    this.brnBranchId = data[0].BM_KeyID;
                    this.brnaddress = data[0].BM_Address;
                    this.brnzip = data[0].BM_Zip;
                    this.brncity = data[0].BM_City;
                    this.brnstate = data[0].BM_State;
                    this.brncountry = data[0].BM_Country;
                    this.brnfax = data[0].BM_Fax;
                    this.brnphone = data[0].BM_Phone;
                    this.brnconfrom = data[0].BM_Contract_FirstName;
                    this.brnconto = data[0].BM_Contract_SecondName;
                    this.brndescription = data[0].BM_Description;
                    this.brnlat = data[0].BM_Latitude;
                    this.brnlong = data[0].BM_Longitude;
                    this.brnstatus = 'active';
                } else {
                    this.brnBranchName = '';
                    this.brnaddress = '';
                    this.brnzip = '';
                    this.brncity = '';
                    this.brnstate = '';
                    this.brncountry = '';
                    this.brnfax = '';
                    this.brnphone = '';
                    this.brnconfrom = '';
                    this.brnconto = '';
                    this.brndescription = '';
                    this.brnlat = '';
                    this.brnlong = '';
                }
                this.viewsecondary(id);
                this.LoadSiteDetails(id);
                this.viewsamezip(id);
                this.distance(id);

                /* $('#accounts').DataTable({
                 responsive: true
                 });
                 */
            }
        );
  }

    distance(id) {
        this.branchService.LoadZipkm(id).subscribe(
            data=> {
                this.loadkm=data.branches;
                if(this.loadkm != null)
                {

                }
            });
    }
    distance1(id) {
        this.branchService.LoadZipkm1(id,this.dissearch).subscribe(
            data=> {
                this.loadkm=data.branches;
            });
    }
    viewsecondary(id){

        var $table = $('.demo');
        $table.floatThead({
            //useAbsolutePositioning: true,
            scrollContainer: function ($table) {
                return $table.closest('.cover1');
            }
        });

        this.assbnch.ViewSecondaryBranch(id).subscribe(
            data => {
                this.secbranch = data;
                if(this.assbnch != null)
                {
                    this.status = 'active';
                    // this.viewbranch(id);
                    if(this.secbranch != null)
                    {
                        this.status = 'active';
                    }
                }
            }
        );
    }
    viewbranch(id)
    {
        this.assbnch.LoadAllBranch(id,this.search).subscribe(
            data => {
                this.allbranch = data.allbranches;
                this.checkbox = this.allbranch.BM_KeyID;

                if(this.allbranch != null)
                {
                    this.status = 'active';

                }
            }
        );
    }
    viewallbranch(id)
    {
        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: 'Site cannot add secondary branch',
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            $(function () {
                $('#showbranch').modal();
            });
            this.demoChk = [];
            this.branch_name='';
            this.search='';
            $('#search1').val("");
            $('#search2').val("");
            this.assbnch.LoadBranch(id).subscribe(
                data => {
                    this.allbranch = data.allbranches;
                    this.checkbox = this.allbranch.BM_KeyID;
                    if (this.allbranch != null) {
                        this.status = 'active';

                    }
                }
            );
        }
    }
    updateCheckedOptions(chBox, event) {


        if(event.target.checked) {
           // this.selectid = 'true';

            this.demoChk.push(chBox);
        }
        else if (!event.target.checked){
            let indexx = this.demoChk.indexOf(chBox);
            this.demoChk.splice(indexx,1);
        }


    }
    enable()
    {
        if(this.demoChk.length > 0){
            return false;
        }else{
            return true;
        }
    }
    updateOptions(SiteID){
        this.asssec.AssignsecBranch(this.demoChk, SiteID).subscribe(
            data => {
                this.results = data;

                if (this.results[0].result === 'success') {
                    swal({
                        title: 'Assigned!',
                        text: 'Branch Assigned successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.viewsecondary(SiteID);
                }
                this.demoChk = [];
            }
        );
    }
    makeprimary(siteid, bm_id) {

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: 'Site cannot assign primary',
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            this.asssec.MakePrimary(siteid, bm_id).subscribe(
                data => {
                    this.results = data;

                    if (this.results[0].result === 'success') {
                        {
                            swal({
                                title: 'Assigned!',
                                text: 'Primary Branch Assigned successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });

                        }
                        this.viewprimary(siteid);
                        this.viewsecondary(siteid);
                    }

                }
            );
        }
    }

    deleteprimary(siteid){

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "Site cannot be unassigned",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            const that = this;
            swal({
                    title: 'Are you sure?',
                    text: 'You want to un-assign this from primary branch!',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Delete',
                    closeOnConfirm: false
                },
                function () {
                    that.assbnch.DeleteBranch(siteid).subscribe(
                        data => {
                            this.results = data;
                            that.viewprimary(siteid);
                            that.viewsecondary(siteid);
                            if (this.results[0].result === 'success') {
                                {
                                    swal({
                                        title: 'Unassigned!',
                                        text: 'Branch unassigned successfully',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                }
                            }
                        }
                    );
                });
        }
    }
  viewsamezip(siteid){
      this.assbnch.Viewsamezipbranch(siteid).subscribe(
            data => {
                this.samezip = data;

                if(this.assbnch != null)
                {
                    this.status = 'active';

                    if(this.samezip != null)
                    {
                        this.status = 'active';
                    }
                }
            }
        );

  }

  DeleteSite(Site_ID) {

      if(this.stStatus=='N' && this.urmkeyid!=1)
      {
          swal({
              title: "Site cannot be deleted",
              text: 'This site is deactivated',
              type: 'error',
              confirmButtonClass: 'btn-danger'
          });
      }
      else {
          const that = this;
          swal({
                  title: 'Are you sure?',
                  text: 'This Site will not recover in future. If any Assets or Branchs link with this Site, it can’t be delete.',
                  type: 'warning',
                  showCancelButton: true,
                  cancelButtonClass: 'btn-default',
                  confirmButtonClass: 'btn-warning',
                  confirmButtonText: 'Delete',
                  closeOnConfirm: false
              },
              function () {
                  that.editSiteService.DeleteSite(Site_ID).subscribe(
                      data => {
                          this.DeleteStatusArray = data;

                          if (this.DeleteStatusArray[0].result === 'success') {
                              swal({
                                  title: 'Deleted!',
                                  text: 'Site has been deleted',
                                  type: 'success',
                                  confirmButtonClass: 'btn-success'
                              });
                              that.LoadSites('');
                          }
                          else if(this.DeleteStatusArray[0].result === 'error'){
                              swal({
                                  title: 'Not able to delete Site',
                                  text: this.DeleteStatusArray[0].message,
                                  type: 'error',
                                  confirmButtonClass: 'btn-danger'
                              });
                          }
                      }
                  );

              });
      }
  }

  Navication(link,type){
      if(type=='edit')
      {
          if(this.stStatus=='N' && this.urmkeyid!=1)
          {
              swal({
                  title: "Site cannot be updated",
                  text: 'This site is deactivated',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });
          }
          else {
              this.router.navigate([link]);
          }
      }
      else
      {
          if(this.stStatus=='N' && this.urmkeyid!=1)
          {
              swal({
                  title: "Site cannot be added",
                  text: 'This site is deactivated',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });
          }
          else {
              this.router.navigate([link]);
          }
      }
  }

  LoadSiteAccounts(SiteID) {
      this.siteService.LoadSiteAccounts(SiteID).subscribe(
          data => {
              this.SiteAaccoutsArray = data;
          }
      );
  }
refresh()
{
    this.LoadSiteBranches(this.SiteID);
}
    LoadSiteBranches(SiteID) {
        this.siteService.LoadSiteBranches(SiteID).subscribe(
            data => {
                this.SiteBranchsArray = data;
            }
        );
    }

    // Un assign Account from site
    deleteSiteAcc(id, AccId, SiteID) {

        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'Do you want unassign this account!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Unassign',
                closeOnConfirm: false
            },
            function() {
                that.siteService.deleteSiteAcc(id, AccId, SiteID).subscribe(
                    data => {
                        if (data.result === 'success') {
                            that.LoadSiteAccounts(SiteID);
                            swal({
                                title: 'Unassigned!',
                                text: 'Site Account Unassigned Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        } else if (data.result === 'warning') {
                            swal({
                                title: 'Cannot Un-assign!',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }

    // Un assign Branch from site
    deleteSiteBrn(id, SiteID, brKeyid) {

        if(this.stStatus=='N' && this.urmkeyid!=1)
        {
            swal({
                title: "Branch cannot be unassigned",
                text: 'This site is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {

            const that = this;
            swal({
                    title: 'Are you sure?',
                    text: 'Do you want unassign this branch!',
                    type: 'warning',
                    showCancelButton: true,
                    cancelButtonClass: 'btn-default',
                    confirmButtonClass: 'btn-warning',
                    confirmButtonText: 'Unassign',
                    closeOnConfirm: false
                },
                function () {
                    that.siteService.deleteSiteBrn(id, brKeyid, SiteID).subscribe(
                        data => {

                            if (data.result === 'success') {
                                that.LoadSiteBranches(SiteID);
                                swal({
                                    title: 'Unassigned!',
                                    text: 'Site Branch Unassigned Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            } else if (data.result === 'warning') {
                                swal({
                                    title: 'Cannot Un-assign!',
                                    text: data.message,
                                    type: 'error',
                                    confirmButtonClass: 'btn-danger'
                                });
                            }
                        }
                    );
                });
        }
    }

    // Un assign Asset from site
    deleteSiteAsst(id, SiteID) {

        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'Do you want unassign this branch!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Unassign',
                closeOnConfirm: false
            },
            function() {
                that.siteService.deleteSiteAsst(id).subscribe(
                    data => {
                        if (data.result === 'success') {
                            that.LoadSiteAssets(id);
                            swal({
                                title: 'Unassigned!',
                                text: 'Site Branch Unassigned Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                );
            });
    }
    Loadsubmenu() {
        this.acc.Loadmenu(3).subscribe(
            data => {
                this.Asssubmenu = data;
            }
        );

    }
    Loadchildmenu() {
        this.menu.Loadchildmenu(3, 'N').subscribe(
            data => {
                this.Chilmenu = data;
            }
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(3,8,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
                this.unassign=this.Asssubbutton[0].MA_Unassign;
                this.unassignbtn=this.Asssubbutton[0].MA_Unassign;

            }
        );

    }
    Loadprimebuttons() {
        this.menu.Loadbutton(3,9,this.sessid).subscribe(
            data => {
                this.primeAsssubbutton = data;
                this.primeadd=this.primeAsssubbutton[0].MA_Add;
                this.primeedit=this.primeAsssubbutton[0].MA_Edit;

                this.primedelete=this.primeAsssubbutton[0].MA_Delete;
                this.primeunassign=this.primeAsssubbutton[0].MA_Unassign;




            }
        );

    }

    Updatestatus(siteid,status) {

        let that = this;

        if(status=='N') // Deactivate
        {
            swal({
                    title: "Are you sure?",
                    text: "Want to deactivate this site!",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Deactivate",
                    closeOnConfirm: false
                },
                function () {
                    that.siteService.Updatestatus(siteid,status).subscribe(
                        data => {
                            this.siteRtn = data;
                            if (this.siteRtn[0].result === 'success') {
                                swal({
                                    title: 'Site Deactivated!',
                                    text: 'Site Deactivated Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                            else {
                                swal({
                                    title: "Sorry!",
                                    text: "There will be some outstanding active tickets used this site. Please close those tickets before deactivate",
                                    type: "error",
                                    confirmButtonClass: "btn-danger"
                                });
                            }
                            that.LoadSites(this.SiteID);
                        }
                    );
                });
        }
        else // Activate
        {
            swal({
                    title: "Are you sure?",
                    text: "Want to activate this site!",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonClass: "btn-default",
                    confirmButtonClass: "btn-warning",
                    confirmButtonText: "Activate",
                    closeOnConfirm: false
                },
                function () {
                    that.siteService.Updatestatus(siteid,status).subscribe(
                        data => {
                            this.siteRtn = data;
                            if (this.siteRtn[0].result === 'success') {
                                swal({
                                    title: 'Site Activated!',
                                    text: 'Site Activated Successfully',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }

                            that.LoadSites(this.SiteID)
                        }
                    );
                });
        }
    }
}
