import { Component, OnInit } from '@angular/core';
import { AccountsService } from './../../../../services/accounts/accounts.service';
import { Router, ActivatedRoute} from '@angular/router';
import { EditaccountService } from './../services/editaccount.service';
import { MenumanagementService } from '../../menumanagement/service/menumanagement.service';

declare var $;
declare var swal;
declare var document;
declare var google;

@Component({
    selector: 'app-accountoverview',
    templateUrl: './accountoverview.component.html',
    styleUrls: ['./accountoverview.component.scss']
})
export class AccountoverviewComponent implements OnInit {
    status: any;
    normal = '';
    selectedRow: Number = 0;
    setClickedRow: Function;
    AccountsLoaded: any = false;

    /*Search*/
    date_from: any;
    date_to: any;


    /*Data Array*/
    AccountsArray: any;
    AccountDetails: any;
    SitesArray: any;
    DeleteStatusArray: any;
    AccountsTicketsArray: any;
    BranchArray: any = [];

    testArray: any;

    /*AccountDetails*/
    AccountID: any='';
    AccountName: any;
    AccountAddress: any;
    AccountCity: any;
    AccountState: any;
    AccountCountry: any;
    AccountZIP: any;
    AccountPhone: any;
    AccountMobile: any;
    AccountHomePhone: any;
    AccountFax: any;
    AccountDescription: any;
    Account_Logo_Path: any;
    lat: any= -28.643387;
    lng: any= 153.612224;
    zoom: any;
    Assaccount: any;
    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    viewbtn: any;
    sessid: any;
    userid: any;
    Chilmenu: any;
    menname: any = '';
    constructor( public accService: AccountsService, public router: Router, public editAccountService: EditaccountService, public menu: MenumanagementService, public actvRoute: ActivatedRoute) {
      if (actvRoute.snapshot.params['acc_id']) {
        this.AccountID = actvRoute.snapshot.params['acc_id'];
      }
        this.sessid = localStorage.getItem('ucmid');
        this.userid = localStorage.getItem('umid');
        this.Loadbuttons();
        this.setClickedRow = function(index){
            this.selectedRow = index;
        };
    }

    ngOnInit() {
        this.LoadAccounts(this.AccountID );
        this.Loadsubmenu();
        this.Loadchildmenu();
    }

    Loadchildmenu() {
        this.menu.Loadchildmenu(2, 'ir_checklist').subscribe(
            data => {
                this.Chilmenu = data;
            }
        );
    }

    modref(menuname) {
        if (menuname === 'Instruction List') {
            this.menname = 1;
        } else if (menuname === 'IR Checklist') {
            this.menname = 2;
        } else {
            this.menname = 3;
        }
    }
    LoadAccounts(accid) {
        const formData = new FormData();
        formData.append('userID', this.userid);
        this.accService.LoadAccounts_byUsers(formData).subscribe(
            data => {
                this.AccountsArray = data;

                this.AccountsLoaded = true;
               /* this.AccountsArray.sort((a, b) => {
                    if (a.AM_Name < b.AM_Name){
                        return -1;
                    } else if (a.AM_Name > b.AM_Name) {
                        return 1;
                    } else {
                        return 0;
                    }
                });*/
                if (accid === '') {
                    this.LoadAccountDetails(this.AccountsArray[0].AM_KeyID);
                } else {
                    if (this.AccountID === '') {
                    this.AccountID = this.AccountsArray[0].AM_KeyID;
                }
                    this.LoadAccountDetails(this.AccountID);
                }
                this.LoadSites(this.AccountID);
                this.LoadAccAssets(this.AccountID);
                this.Load_Account_Ticket_List(this.AccountID);
                this.Load_Acc_Branch(this.AccountID);
            }

        );
    }

    LoadAccountDetails(Account_id) {
        this.accService.AccountOverview(Account_id).subscribe(
            data => {
                this.AccountDetails = data;
                this.AccountID = this.AccountDetails[0].AM_KeyID;
                this.AccountName = this.AccountDetails[0].AM_Name;
                this.AccountAddress = this.AccountDetails[0].AM_Address;
                this.AccountCity = this.AccountDetails[0].AM_City;
                this.AccountState = this.AccountDetails[0].AM_State;
                this.AccountCountry = this.AccountDetails[0].AM_Country;
                this.AccountZIP = this.AccountDetails[0].AM_Zip;
                this.AccountPhone = this.AccountDetails[0].AM_Phone;
                this.AccountMobile = this.AccountDetails[0].AM_Mobile;
                this.AccountHomePhone = this.AccountDetails[0].AM_Home_Phone;
                this.AccountFax = this.AccountDetails[0].AM_Fax;
                this.AccountDescription = this.AccountDetails[0].AM_Description;
                this.lat = this.AccountDetails[0].AM_Latitude;
                this.lng = this.AccountDetails[0].AM_Longitude;
                if (this.AccountDetails[0].AM_Logo_Path) {
                    this.Account_Logo_Path = 'assets/uploads/accounts/' + this.AccountID + '/logo/' + this.AccountDetails[0].AM_Logo_Path;
                } else {
                    this.Account_Logo_Path = 'assets/modules/dummy-assets/common/img/noimagefound.jpg';
                }
                const acclat = this.AccountDetails[0].AM_Latitude;
                const acclng = this.AccountDetails[0].AM_Longitude;
                if (this.lat !== '' && this.lng !== '') {
                    const myLatLng = {lat: acclat, lng: acclng};

                    const reslong = new google.maps.LatLng(acclat, acclng);

                    const map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 12,
                        center: reslong
                    });

                    const marker = new google.maps.Marker({
                        position: reslong,
                        map: map,
                        title: 'Hello World!'
                    });
                    marker.setPosition(reslong);
                }
            }
        );
    }

    LoadSites(Account_id) {
        this.accService.LoadSites(Account_id).subscribe(
            data => {
                this.SitesArray = data;
                this.SitesArray.sort((a, b) => {
                    if (a.SM_SiteName < b.SM_SiteName){
                        return -1;
                    } else if (a.SM_SiteName > b.SM_SiteName){
                        return 1;
                    } else {
                        return 0;
                    }
                });

                const length = this.SitesArray.length;

                const SiteNull = this.SitesArray[0].SM_KeyID;
                if (SiteNull === null) {
                    this.SitesArray = [];
                }
            }
        );
    }

    LoadAccAssets(Account_id) {
        this.accService.LoadAssets(Account_id).subscribe(
            data => {
                this.Assaccount = data;

            }
        );
    }

    Navication(link) {
        this.router.navigate([link]);
    }
    Navigation(link) {
        this.router.navigate(['site/overview'],{ queryParams: { id: link} });

    }

    SlectedAccount(id) {
        this.AccountID = id;
        this.LoadAccountDetails(id);
        this.LoadSites(id);
        this.LoadAccAssets(id);
        this.Load_Account_Ticket_List(id);
        this.Load_Acc_Branch(id);
    }

    DeleteAaccount(Account_ID) {
        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This account will not recover in future. If any tickets or sites link with this account, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function(){
                that.editAccountService.Delete(Account_ID).subscribe(
                    data => {
                        this.DeleteStatusArray = data;
                        if (this.DeleteStatusArray[0].result === 'success') {
                            that.LoadAccounts('');
                            swal({
                                title: 'Deleted!',
                                text: 'Account  has been deleted',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });

                        }else if(this.DeleteStatusArray[0].result === 'error'){
                            swal({
                                title: 'Not able to delete account',
                                text: this.DeleteStatusArray[0].message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );

            });
    }

    Load_Account_Ticket_List(AccountID){
        const formData: FormData = new FormData();
        formData.append('accountID', AccountID);
        this.accService.Load_Account_Ticket_List(formData).subscribe(
            data => {
                this.AccountsTicketsArray = data;

            }
        );
    }

    AccountTicketOverview(){
        const route = 'tickets/account/overview/' + this.AccountID;
        this.router.navigate([route]);
    }
    Loadsubmenu() {
        this.accService.Loadmenu(2).subscribe(
            data => {
                this.Asssubmenu = data;



            }
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(2, 1, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
                this.viewbtn = this.Asssubbutton[0].MA_View;

            },

        );
    }

    Load_Acc_Branch(ACC_ID) {
        const formData = new FormData();
        formData.append('accID', ACC_ID);
        this.accService.LoadAccountBranch(formData).subscribe(
            data => {
                this.BranchArray = data;
            }
        );
    }
}
