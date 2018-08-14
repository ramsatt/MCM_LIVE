import { ElementRef, Component, NgZone, OnInit,Input, ViewChild,OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MapsAPILoader, SebmGoogleMap} from 'angular2-google-maps/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {SiteService} from "../../site/service/site.service";
import {EditsiteService} from "../../site/service/editsite.service";
import {CreateassetsComponent} from "../createassets/createassets.component";


declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;
declare var jQuery;

@Component({
  selector: 'app-create-site',
  templateUrl: './create-site.component.html',
  styleUrls: ['./create-site.component.css']
})
export class CreateSiteComponent implements OnInit, OnChanges  {
  @Input() AccountID;

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
  //  @ViewChild('myMap') public sebm: ElementRef;

  //AccountID: any = '';
    contactname:any='';
  AccountName: any = '';
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
  isconfirmed: any = '';
  description: any = '';

  /* array */
  accounts: any;
  results: any;
  SitesArray: any = [];
  SiteDetails: any;
  AssignResponse: any;
  SiteAccountNumber: any = '';
  site_accountnumber:any='';
  is_confirmed:any='';
    showMap:any;
    userID: any = '';
  constructor( public site: SiteService, public router: Router, public account: AccountsService, private mapsAPILoader:  MapsAPILoader, private ngZone: NgZone, public actRoute: ActivatedRoute, public Edit: EditsiteService,private asscom:CreateassetsComponent) {
      this.userID = localStorage.getItem('ucmid');

  }
  ngOnChanges(){
      this.SiteAccountNumber='';
      this.sitename='';
      this.address='';
      this.city='';
      this.state='';
      this.country='';
      this.zip='';
      this.phone='';
      this.phone='';
      this.isconfirmed='';
      this.description='';
    this.ForAccount(this.AccountID);
    //  $("#adminSiteFor").trigger("reset");
     /// $("#hidemap").hide();
      this.Googlemap();
      //this.showMap=false;
   //this.AccountID=this.id;
     // this.sebm.triggerResize();
  }
  ngOnInit() {

      $(function () {
          $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#us-fax-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#us-mobile-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#us-home-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});

      })
    this.LoadAccounts();
    //this.ForAccount(this.AccountID);

    this.LoadUnassignSites();
      this.Googlemap();


  }
  refresh(){
      $("#adminSiteFor").trigger("reset");
  }
showmap(){
    $("#myMap").trigger('resize');

}

  CreateSite() {

    this.site.CreateSite ( this.AccountID, this.sitename, this.address, this.city, this.state, this.country, this.zip, this.phone, this.fax, this.isconfirmed, this.description, this.latitude, this.longitude, this.SiteAccountNumber, this.mobile, this.home,this.contactname, this.userID).subscribe(
        data => {
          this.results = data;
          if(this.results[0].result === 'success')
          {

              swal({
                title: "Site Assigned!",
                text: "Site Successfully Added to "+this.AccountName,
                type: "success",
                confirmButtonClass: "btn-success",
                confirmButtonText: "Success"
              });


              this.Googlemap();
          }
          this.asscom.viewassignsite(this.AccountID);
          this.asscom.crsite();

          $("#adminSiteFor").trigger("reset");
        }
    );
  }

  onSubmit() {
    this.submitted = false;
   this. active = true;
  }

  LoadAccounts() {
    this.account.LoadAccounts().subscribe(
        data => {
          this.accounts = data;
        }
    );
  }

  LoadUnassignSites() {
    this.site.LoadUnassignSite(this.AccountID).subscribe(
        data => {
          this.SitesArray = data;
        }
    );
  }


    Googlemap()
    {
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
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1|| component[c].types.indexOf('postal_town')>-1)
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
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 12;
            });
        }
    }




  AssignSite(AccID,SiteID)
  {
    this.Edit.AssignSite(AccID,SiteID).subscribe(
        data=>
        {
          this.AssignResponse = data;
          if(this.AssignResponse[0].result =="success")
          {
            swal({
              title: "Site Assigned!",
              text: "Site Successfully added to "+this.AccountName,
              type: "success",
              confirmButtonClass: "con btn-success",
              confirmButtonText: "Ok"
            });
          }


          this.LoadUnassignSites();
          this.asscom.viewassignsite(this.AccountID);
          this.asscom.crsite();


        }
    );

  }
  AssignSiteconfirmation(AccID,SiteID)
  {
    let that = this;
    swal({
          title: "Are you sure?",
          text: "Are you sure want to assign the selected site or create as new site ?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Create",
          cancelButtonText: "Assign",
          closeOnConfirm: false,
          closeOnCancel: false
        },
        function(isConfirm){
          if (isConfirm) {
           that. SelectSiteconfirmation(SiteID)
          } else {
            that.AssignSite(AccID,SiteID);
          }
        });
  }
  SelectSiteconfirmation(id)
  {
    this.site.LoadSinglesite(id).subscribe(
        data => {
          this.SiteDetails = data;
          this.sitename = this.SiteDetails.SM_SiteName;
          this.site_accountnumber = this.SiteDetails.SM_AccountNumber;
          this.is_confirmed = this.SiteDetails.SM_Is_Confirmed;
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
          this.CreateSiteconfirmation(this.sitename, this.address, this.city, this.state, this.country, this.zip, this.phone, this.fax, this.longitude, this.latitude, this.description, this.site_accountnumber, this.is_confirmed, this.mobile, this.home,this.contactname);

        }


    );
  }

  CreateSiteconfirmation(sitename, address, city, state, country, zip, phone, fax, lon, lat, desc, siteaccount, isconfirm, mobile, home,contactname) {
    this.site.CreateSite ( this.AccountID, sitename, address, city, state, country, zip, phone, fax, isconfirm, desc, lat, lon, siteaccount, mobile, home, contactname, this.userID).subscribe(
        data => {
          this.results = data;
          if(this.results[0].result === 'success')
          {

            swal({
              title: "Site Assigned!",
              text: "Site Successfully added to "+this.AccountName,
              type: "success",
              confirmButtonClass: "btn-success",
              confirmButtonText: "Ok"
            });
          }
          this.asscom.viewassignsite(this.AccountID);
          this.asscom.crsite();
          $("#adminSiteFor").trigger("reset");
        }
    );
  }

  SelectSite(id)
  {
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
          this.fax = this.SiteDetails.SM_Fax;
          this.longitude = this.SiteDetails.SM_Longitude;
          this.latitude = this.SiteDetails.SM_Latitude;
          this.description = this.SiteDetails.SM_Description;
        }
    );
  }

  ForAccount(id) {
    this.account.AccountOverview(id).subscribe(
        data => {
          this.accounts = data;
          this.AccountName = this.accounts[0].AM_Name;
        }
    );

  }

  Navigation(link) {
    this.router.navigate([link]);
  }
    GoogleAddress(city,state) {
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
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
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
