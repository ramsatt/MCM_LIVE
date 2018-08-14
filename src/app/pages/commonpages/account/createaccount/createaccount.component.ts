import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validator, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { AccountsService } from './../../../../services/accounts/accounts.service';
declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    submitted = false;
  active = true;
  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('dateFrom') public CDateFrom: ElementRef;
  @ViewChild('dateTo') public CDateTo: ElementRef;
  @ViewChild('accountName') public AccName: ElementRef;

  street_number: any = '';
  road: any = '';
  locality: any = '';

  map: any;
  datefrom: any = '';
  dateto: any = '';
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
  results: any = '';
  place: any = '';
  lat: any = '';
  long: any = '';
  date: any = '';
  userID: any = '';

  constructor( public account: AccountsService, public router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone ) {
      this.userID = localStorage.getItem('ucmid');
  }

  ngOnInit() {
    $(function(){
        $('#loader').hide();
       $('.select2-tags').select2({
        tags: true,
        tokenSeparators: [',', ' ']
      });
      $('.selectpicker').selectpicker();

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

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
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
              if ( component[c].types.indexOf('locality') > -1 && component[c].types.indexOf('political' ) > -1 || component[c].types.indexOf('postal_town' ) > -1 ) {
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

  onSubmit() {
    this.submitted = false;
  }

  GoogleAddress(city,state) {
      let address: any;
      if (state === '') {
          address = city;
      } else {
          address = city + ',' + state;
      }
    this.account.LoadGoogleMapAddrss(address).subscribe(
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

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }

  }

  createAccount() {
    $('#loader').show();

    this.datefrom = this.CDateFrom.nativeElement.value;
    this.dateto = this.CDateTo.nativeElement.value;

    this.account.CreateAccount(this.accountname, this.address, this.city, this.state, this.country, this.zip, this.phone, this.mobile, this.home, this.fax, this.accounttype, this.datefrom, this.dateto, this.description, this.latitude, this.longitude, this.userID).subscribe(
          data => {
            this.results = data;

            if ( this.results.result === 'success' ) {
              $('#loader').hide();
              $('#loader').css('visibility', 'hidden');
                swal({
                        title: 'Created!',
                        text: 'Account Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
              this.router.navigate(['account/overview/' + this.results.accID]);
            }
          },
          err => {
            swal({
              title: 'Error',
              text: 'Error occurs, please try after some time.',
              type: 'error',
              confirmButtonClass: 'btn-danger'
            });

          }
      );
  }

  Navigation(link) {
    this.router.navigate([link]);
  }

}
