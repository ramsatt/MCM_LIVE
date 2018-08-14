import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SiteService } from './../service/site.service';
import { EditsiteService } from './../service/editsite.service';

declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-editsite',
  templateUrl: './editsite.component.html',
  styleUrls: ['./editsite.component.css']
})
export class EditsiteComponent implements OnInit {

  public latitude: any;
  public longitude: any;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild('search') public searchElementRef: ElementRef;

  SiteID: any = '';
  sitename: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
  phone: any = '';
  mobile: any = '';
  home: any = '';
  fax: any = '';
  isconfirmed: any = 'YES';
  description: any = '';
  SiteAccountNumber: any = '';
  contactname: any = '';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  /* array */
  accounts: any = [];
  results: any = [];
  Sites: any = [];
  SiteDetails: any = [];

  submitted = false;
  active = true;

  constructor( public site: SiteService, public router: Router, public actRoute: ActivatedRoute, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public Edit: EditsiteService ) { }

  ngOnInit() {

    this.SiteID = this.actRoute.snapshot.params['id'];
    this.LoadSiteDetail(this.SiteID);
    this.Googlemap();
  }

  LoadSiteDetail(id) {
    this.site.LoadSinglesite(id).subscribe(
        data => {
          this.SiteDetails = data;
          this.sitename = this.SiteDetails.SM_SiteName;
          this.address = this.SiteDetails.SM_Address;
          this.city = this.SiteDetails.SM_City;
          this.state = this.SiteDetails.SM_State;
          this.country = this.SiteDetails.SM_Country;
          this.zip = this.SiteDetails.SM_Zip;
          this.phone = this.SiteDetails.SM_Phone;
          this.mobile = this.SiteDetails.SM_Mobile;
          this.home = this.SiteDetails.SM_Home_Phone;
          this.fax = this.SiteDetails.SM_Fax;
          this.longitude = this.SiteDetails.SM_Longitude;
          this.latitude = this.SiteDetails.SM_Latitude;
          this.description = this.SiteDetails.SM_Description;
          this.SiteAccountNumber = this.SiteDetails.SM_AccountNumber;
          this.contactname = this.SiteDetails.SM_Contact_Person;
        }
    );

  }

  Googlemap() {
    this.zoom = 4;

    /* create search FormControl */
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          /* set latitude, longitude and zoom */
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();

          let component = place.address_components;

          if(component) {
            for(let c=0;c<component.length;++c)
            {
              if(component[c].types.indexOf('route')>-1)
              {
                this.address = component[c].long_name;
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
          }

          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = parseFloat(this.latitude);
        this.longitude = parseFloat(this.longitude);
        this.zoom = 12;
      });
    }
  }

  UpdateSite() {
    $('#loader').hide();
    if (this.isconfirmed === 'YES') {
      this.isconfirmed = 'Y';
    } else if (this.isconfirmed === 'NO') {
      this.isconfirmed = 'N';
    }

      this.Edit.EditSite(this.SiteID, this.sitename, this.address, this.city, this.state, this.country, this.zip, this.phone, this.fax, this.isconfirmed, this.description, this.latitude, this.longitude, this.SiteAccountNumber, this.mobile, this.home,this.contactname).subscribe(
          data => {
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
            this.results = data;
            if (this.results[0].result === 'success') {
              swal({
                title: 'Updated!',
                text: 'Site Details Updated Successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['site/overview'],{ queryParams: { id: this.SiteID} });
            }

          }
      );
  }

  Navigation()
  {
      this.router.navigate(['site/overview'],{ queryParams: { id: this.SiteID} });

  }
  onSubmit() {
    this.submitted = true;
  }

  GoogleAddress(city,state) {
      let address: any;
      if (state === '') {
          address = city;
      } else {
          address = city + ',' + state;
      }
    this.Edit.LoadGoogleMapAddress(address).subscribe(
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
}
