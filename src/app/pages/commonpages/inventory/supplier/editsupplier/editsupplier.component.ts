import { ElementRef, Component, NgZone, OnInit, ViewChild,OnChanges,Input } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import {SupplierserviceService} from "../service/supplierservice.service";
import {EditsupplierService} from "../service/editsupplier.service";

declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-editsupplier',
  templateUrl: './editsupplier.component.html',
  styleUrls: ['./editsupplier.component.css']
})
export class EditsupplierComponent implements OnInit,OnChanges {

  @Input() id;
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
  partsid:any;
  editsupplier:any;
  data:any;
  home:any='';
  mobile:any;

  constructor( public router: Router, public  routing: ActivatedRoute,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public supplier: SupplierserviceService,public editsup:EditsupplierService) {
    //this.partsid = routing.snapshot.params['id'];
   // this.LoadSuppDetails();
  }
  ngOnChanges(){
this.partsid=this.id;
    this.LoadSuppDetails();
    $(function () {
      $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: 'Enter the Phone Number'});
    })
  }
  ngOnInit() {
    $(function () {
      $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: 'Enter the Phone Number'});
    })

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
  viewsupplier(){



  }
  LoadSuppDetails() {
    this.editsup.EditSuppliers(this.id).subscribe(
        data => {
          this.editsupplier = data;
          this.suppliername = data.SUM_Name;
          this.address = data.SUM_Address1;
          this.city = data.SUM_Address2;
          this.phone = data.SUM_Phone;
          this.country = data.SUM_Country;
          this.email = data.SUM_Email;
          this.description = data.SUM_Description;


        }
    );
  }
  editSupplier() {
    this.supplier.editSupplier(  this.suppliername, this.address, this.city, this.state, this.country, this.zip, this.phone, this.email, this.description ,this.id,this.latitude,this.longitude,this.mobile,this.home).subscribe(
        data => {
          this.results = data;
          if (this.results[0].result === 'success') {
            swal({
              title: 'Updated!',
              text: 'Supplier Details Updated successfully',
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
