import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountsService } from './../../../../services/accounts/accounts.service';
import { EditaccountService } from './../services/editaccount.service';
declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;
@Component({
  selector: 'app-editaccount',
  templateUrl: './editaccount.component.html',
  styleUrls: ['./editaccount.component.css']
})
export class EditaccountComponent implements OnInit {
  submitted = false;
  active = true;

  public latitude: any = 33.8154078;
  public longitude: any = -117.9236525;
  public searchControl: FormControl;
  public zoom: number;
  street_number: any = '';
  road: any = '';
  locality: any = '';
  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('dateFrom') public CDateFrom: ElementRef;
  @ViewChild('dateTo') public CDateTo: ElementRef;
  map: any;
  datefrom: any = '';
  dateto: any = '';
  OldDateF: any = '';
  OldDateT: any = '';
  accountname: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
  phone: any = '';
  mobile: any = '';
  home: any = '';
  fax: any = '';
  accounttype: any = '';
  description: any = '';
  place: any = '';
  lat: any = '';
  long: any = '';
  AccountId: any = '';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


    /* Array */
  Accounts: any;
  results: any;
  constructor( public account: AccountsService, public router: Router, public actvRoute: ActivatedRoute, private mapsAPILoader:  MapsAPILoader, private ngZone: NgZone, public edit: EditaccountService ) {
    this.AccountId = actvRoute.snapshot.params['id'];
    this.LoadAccountDetails(this.AccountId);
  }

  ngOnInit() {
      $(function(){
         $('.datepicker-only-init').datetimepicker({
              widgetPositioning: {
                  horizontal: 'left'
              },
              icons: {
                  time: 'fa fa-clock-o',
                  date: 'fa fa-calendar',
                  up: 'fa fa-arrow-up',
                  down: 'fa fa-arrow-down',
                  previous: 'fa fa-arrow-left',
                  next: 'fa fa-arrow-right'
              },
              format: 'MM/D/Y'
          });

      });
  }

  onSubmit() {
        this.submitted = true;
    }

  LoadAccountDetails(id) {
    this.account.AccountOverview(id).subscribe(
        data => {
          this.account = data;
          this.accountname = this.account[0].AM_Name;
          this.address = this.account[0].AM_Address;
          this.city = this.account[0].AM_City;
          this.state = this.account[0].AM_State;
          this.country = this.account[0].AM_Country;
          this.zip = this.account[0].AM_Zip;
          this.phone = this.account[0].AM_Phone;
          this.mobile = this.account[0].AM_Mobile;
          this.home = this.account[0].AM_Home_Phone;
          this.fax = this.account[0].AM_Fax;
          this.latitude = this.account[0].AM_Latitude;
          this.longitude = this.account[0].AM_Longitude;
          this.datefrom = this.account[0].AM_Contract_From;
          this.dateto = this.account[0].AM_Contract_To;
          this.description = this.account[0].AM_Description;
          this.OldDateF = this.datefrom;
          this.OldDateT = this.dateto;
          this.accounttype = this.account[0].AM_Acount_Type;
        }
    );

    this.GoogleMap();
  }

  Update() {
      $('#loader').show();
    this.datefrom = this.CDateFrom.nativeElement.value;
    this.dateto = this.CDateTo.nativeElement.value;
    if (this.datefrom == '') {
      this.datefrom = this.OldDateF;
    }
    if (this.dateto == '') {
      this.dateto = this.OldDateT;
    }
    this.edit.EditAccount(this.AccountId, this.accountname, this.address, this.city, this.state, this.country, this.zip, this.phone, this.mobile, this.home, this.fax, this.accounttype, this.datefrom, this.dateto, this.description, this.latitude, this.longitude).subscribe(
          data => {
              $('#loader').hide();
              $("#loader").css("visibility", "hidden");
            this.results = data;

            if (this.results[0].result == 'success') {
              swal({
                title: 'Updated!',
                text: 'Account Details Updated Successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['account/overview/'+this.AccountId]);
            }

          }
      );
  }

  GoogleMap() {
      this.zoom = 4;
      /* create search FormControl */
      this.searchControl = new FormControl();
      /* set current position */
      this.setCurrentPosition();
      /* load Places Autocomplete */
      this.mapsAPILoader.load().then(() => {
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ['address']
          });
          autocomplete.addListener('place_changed', () => {
              this.ngZone.run(() => {
                  /* get the place result */
                  const place = autocomplete.getPlace();

                  /* verify result */
                  if (place.geometry === undefined || place.geometry === null) {
                      return;
                  }

                  /* set latitude, longitude and zoom */
                  this.latitude = place.geometry.location.lat();
                  this.longitude = place.geometry.location.lng();

                  const component = place.address_components;


                  if ( component ) {
                      this.street_number = '';
                      for ( let c = 0; c < component.length; ++c ) {
                          if ( component[c].types.indexOf('street_number') > -1) {
                              this.street_number = component[c].long_name;
                          }
                          if ( component[c].types.indexOf('route') > -1) {
                              this.road = component[c].long_name;
                          }
                          if ( component[c].types.indexOf('locality') > -1 && component[c].types.indexOf('political' ) > -1) {
                              this.city = component[c].long_name;
                          }
                          if ( component[c].types.indexOf('administrative_area_level_1') > -1) {
                              this.state = component[c].long_name;
                          }
                          if ( component[c].types.indexOf('country') > -1 ) {
                              this.country = component[c].long_name;
                          }
                          if (component[c].types.indexOf('postal_code') > -1) {
                              this.zip = component[c].long_name;
                          }
                      }
                      this.address = this.street_number + ' ' + this.road;
                  }
                  this.zoom = 8;
              });
          });
      });
  }

    private setCurrentPosition() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = parseFloat(this.latitude);
                this.longitude = parseFloat(this.longitude);
                this.zoom = 12;
            });
        }

    }

    GoogleAddress(city,state) {
        let address: any;
        if (state === '') {
            address = city;
        } else {
            address = city + ',' + state;
        }
       this.edit.LoadGoogleMapAddrss(address).subscribe(
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

  Navigation(link) {
    this.router.navigate([link]);
  }


}
