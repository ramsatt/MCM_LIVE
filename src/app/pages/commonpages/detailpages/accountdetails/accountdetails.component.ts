import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {DetailpageService} from '../service/detailpage.service';
import {GlobalVariable} from '../../../../global/global';
declare const google;

@Component({
  selector: 'app-accountdetails',
  templateUrl: './accountdetails.component.html',
  styleUrls: ['./accountdetails.component.scss']
})
export class AccountdetailsComponent implements OnInit, OnChanges {

  @Input() AccountID;
  /*AccountDetails*/
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
    Account_Logo_Path: any = '';
    lat: any= -28.643387;
    lng: any= 153.612224;
    zoom: any;
    AccountDetails: any = [];

  constructor(private detailpageService: DetailpageService) { }

  ngOnInit() {
  }

    ngOnChanges(changes: SimpleChanges): void {
    this.LoadAccountDetails(this.AccountID);
    }

  LoadAccountDetails(Acc_ID) {
    const URL = GlobalVariable.BASE_API_URL +  'accountmaster/accountview&id=' + encodeURIComponent(Acc_ID);
    this.detailpageService.GET(URL).subscribe(
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
            this.Account_Logo_Path = 'assets/uploads/accounts/' + this.AccountID + '/logo/' + this.AccountDetails[0].AM_Logo_Path;

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
                setTimeout(
                    function () {
                        google.maps.event.addListenerOnce(map, 'mouseover', function() {
                            google.maps.event.trigger(map, 'resize');
                        });
                    }, 1000);
            }
        }
    );
  }
}
