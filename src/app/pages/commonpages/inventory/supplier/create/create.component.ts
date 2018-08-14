import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import {MapsAPILoader, SebmGoogleMap} from 'angular2-google-maps/core';
import {SupplierserviceService} from '../service/supplierservice.service';

declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
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
  map: any = '';

  suppliername: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
  phone: any = '';
  email: any = '';
  description: any = '';
  results: any = '';
  place: any = '';
  asspart:any='';
umkeyid:any='';
  home:any='';
  mobile:any='';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor( public router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public supplier: SupplierserviceService ) {
    this.umkeyid=localStorage.getItem('umid');
  }


  ngOnInit() {

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    /*create search FormControl*/
    this.searchControl = new FormControl();

    /*set current position*/
    this.setCurrentPosition();

    /*load Places Autocomplete*/
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          /*get the place result*/
          let place = autocomplete.getPlace();

          /*verify result*/
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          /*set latitude, longitude and zoom*/
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          let component = place.address_components;

          if(component) {
            for(let c=0;c<component.length;++c)
            {
              if ( component[c].types.indexOf('street_number') > -1) {
                this.street_number = component[c].long_name;
              }
              if ( component[c].types.indexOf('route') > -1) {
                this.road = component[c].long_name;
              }
              if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1)
              {
                this.city = component[c].long_name;
              }
              if(component[c].types.indexOf('administrative_area_level_1')>-1)
              {
                this.state = component[c].long_name;
              }
              if(component[c].types.indexOf('country')>-1)
              {
                this.country = component[c].long_name;
              }
              if(component[c].types.indexOf('postal_code')>-1)
              {
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
  onSubmit() {
    this.submitted = true;
  }
  GoogleAddress(city) {
    this.asspart.LoadGoogleMapAddress(city).subscribe(
        data => {
          let addresslength: any;
          addresslength = data.results[0].address_components.length;
          for ( let i = 0; i < addresslength; i++) {
            if (data.results[0].address_components[i].types[0] === 'locality' || data.results[0].address_components[i].types[0] === 'postal_town') {
              let c_name: any;
              c_name = data.results[0].address_components[i].long_name;
            }
            if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1' ) {
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
  createSupplier() {
    if(this.address=='null') {
      this.address = '';
    }
    if(this.state=='null') {
      this.state = '';
    }
    if(this.country=='null') {
      this.country = '';
    }
    if(this.email=='null') {
      this.email = '';
    }
    if(this.description=='null') {
      this.description = '';
    }

    if(this.mobile==null)
    {
      this.mobile = '';
    }
    if(this.home==null) {
      this.home = '';
    }
    this.supplier.CreateSupplier(  this.suppliername, this.address, this.city, this.state, this.country, this.zip, this.phone, this.email, this.description,this.latitude, this.longitude,this.mobile,this.home,this.umkeyid  ).subscribe(
        data => {
          this.results = data;
          if (this.results[0].result === 'success') {
            swal({
              title: 'Created!',
              text: 'Supplier created successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.router.navigate(['supplier/list']);
          }
        }
    );
  }
  Navigation(link) {
    this.router.navigate([link]);
  }
}
