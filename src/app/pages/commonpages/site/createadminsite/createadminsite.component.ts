import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from './../../../../services/accounts/accounts.service';
import { SiteService } from './../service/site.service';
import { EditsiteService } from './../service/editsite.service';
import {stat} from "fs";
declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-createadminsite',
  templateUrl: './createadminsite.component.html',
  styleUrls: ['./createadminsite.component.scss']
})
export class CreateadminsiteComponent implements OnInit {
    contactname: any = '';
  submitted = false;
  active = true;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  street_number: any = '';
  road: any = '';
  locality: any = '';
  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('sName') public newSite: ElementRef;
  AccountID: any = '';
  AccountName: any = '';
  sitename: any;
  site_Name: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
  phone: any = '';
  mobile: any = '';
  home: any = '';
  fax: any = '';
  isconfirmed: any = '';
  description: any = '';
  search: any;
  SiteAccountNumber: any = '';

  /* array */
  accounts: any;
  results: any;
  SitesArray: any;
  SiteDetails: any;
  AssignResponse: any;
  userID: any = '';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor( public router: Router, public account: AccountsService, private mapsAPILoader:  MapsAPILoader, private ngZone: NgZone, public actRoute: ActivatedRoute, public site: SiteService, public Edit: EditsiteService) {
      this.userID = localStorage.getItem('umid');
  }

  ngOnInit() {
    $(function(){

      $('.select2').select2();
      $('.select2-tags').select2({
        tags: true,
        tokenSeparators: [',', ' ']
      });

      $('.selectpicker').selectpicker();


    });
    this.LoadAccounts();
    this.Googlemap();
  }

  onSubmit() {
    this.submitted = true;
  }

  LoadAccounts() {
    const formData = new FormData();
    formData.append('userID', this.userID);
    this.account.LoadAccounts_byUsers(formData).subscribe(
        data => {
          this.accounts = data;

        }
    );
  }

  LoadAccSites(Account_ID) {
    this.AccountID = Account_ID;
    this.LoadUnassignSites();
  }

  LoadUnassignSites() {
    this.site.LoadUnassignSite(this.AccountID).subscribe(
        data => {
          this.SitesArray = data;
          console.log(data);
          setTimeout(function() {
            $('#sites').DataTable({
              responsive: true
            });
          }, 1000);
        }
    );
  }

  AssignSite( AccID, SiteID ) {
    this.Edit.AssignSite( AccID, SiteID ).subscribe(
        data => {
          this.AssignResponse = data;

          if ( this.AssignResponse[0].result === 'success' ) {
            swal({
              title: 'Site Assigned!',
              text: 'Site added Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success',
              confirmButtonText: 'Success'
            });
            this.UnassignSites();

          }

        }
    );

  }

  UnassignSites() {
    this.site.LoadUnassignSite(this.AccountID).subscribe(
        data => {
          this.SitesArray = data;
        }
    );
  }

  Navigation(link) {
    this.router.navigate([link]);
  }

  Googlemap() {
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          const component = place.address_components;

          if ( component ) {
            for ( let c = 0; c < component.length; ++c) {
              if ( component[c].types.indexOf('street_number') > -1) {
                this.street_number = component[c].long_name;
              }
              if ( component[c].types.indexOf('route') > -1) {
                this.road = component[c].long_name;
              }
              if ( component[c].types.indexOf('locality') > -1 && component[c].types.indexOf('political') > -1 ) {
                this.city = component[c].long_name;
              }
              if ( component[c].types.indexOf('administrative_area_level_1') > -1 ) {
                this.state = component[c].long_name;
              }
              if ( component[c].types.indexOf('country') > -1 ) {
                this.country = component[c].long_name;
              }
              if ( component[c].types.indexOf('postal_code') > -1 ) {
                this.zip = component[c].long_name;
              }
            }
            this.address = this.street_number + ' ' + this.road;
          }

          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

    GoogleAddress(city, state) {
        let address: any;
        if (state === '') {
            address = city;
        } else {
            address = city + ',' + state;
        }
        this.site.LoadGoogleMapAddress(address).subscribe(
        data => {
          let addresslength: any;
          addresslength = data.results[0].address_components.length;
          for ( let i = 0; i < addresslength; i++) {
            if (data.results[0].address_components[i].types[0] === 'locality') {
              let c_name: any;
              c_name = data.results[0].address_components[i].long_name;
            }
            if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
              this.state = data.results[0].address_components[i].long_name;
            }
            if (data.results[0].address_components[i].types[0] === 'country') {
              this.country = data.results[0].address_components[i].long_name;
            }
            if (data.results[0].address_components[i].types[0] === 'postal_code') {
              this.zip = data.results[0].address_components[i].long_name;
            }
          }
          this.latitude = data.results[0].geometry.location.lat;
          this.longitude = data.results[0].geometry.location.lng;
        }
    );
  }

  CreateSite() {
    this.site.CreateSite( this.AccountID, this.site_Name, this.address, this.city, this.state, this.country, this.zip, this.phone, this.fax, this.isconfirmed, this.description, this.latitude, this.longitude, this.SiteAccountNumber, this.mobile, this.home,this.contactname, this.userID).subscribe(
          data => {
            this.results = data;
            if ( this.results[0].result === 'Success' ) {
              console.log('this.results[0].result');
              swal({
                title: 'Created!',
                text: 'Site created successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['site/overview'],{ queryParams: {id: this.results[0].siteid } });
            }
          }
      );
  }

}
