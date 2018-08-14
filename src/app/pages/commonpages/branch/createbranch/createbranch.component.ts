import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { BranchService } from './../services/branch.service';
declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-createbranch',
  templateUrl: './createbranch.component.html',
  styleUrls: ['./createbranch.component.css']
})
export class CreatebranchComponent implements OnInit {
  submitted = false;
  active = true;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

    public billatitude: number;
    public billongitude: number;
    public bilsearchControl: FormControl;
    public bilzoom: number;

    public shiplatitude1: number;
    public shiplongitude1: number;
    public shipsearchControl1: FormControl;
    public shipzoom1: number;

    public shiplatitude2: number;
    public shiplongitude2: number;
    public shipsearchControl2: FormControl;
    public shipzoom2: number;

    public shiplatitude3: number;
    public shiplongitude3: number;
    public shipsearchControl3: FormControl;
    public shipzoom3: number;

    public shiplatitude4: number;
    public shiplongitude4: number;
    public shipsearchControl4: FormControl;
    public shipzoom4: number;

    public shiplatitude5: number;
    public shiplongitude5: number;
    public shipsearchControl5: FormControl;
    public shipzoom5: number;


  street_number: any = '';
  road: any = '';
  locality: any = '';

    bilstreet_number: any = '';
    bilroad: any = '';
    billocality: any = '';
    shipstreet_number1: any = '';
    shiproad1: any = '';
   shipstreet_number2: any = '';
   shiproad2: any = '';
    shipstreet_number3: any = '';
    shiproad3: any = '';
    shipstreet_number4: any = '';
    shiproad4: any = '';
    shipstreet_number5: any = '';
    shiproad5: any = '';

  @ViewChild('search') public searchElementRef: ElementRef;
  @ViewChild('search1') public searchElementRef1: ElementRef;
    @ViewChild('searchship1') public shipsearchElementRef1: ElementRef;
    @ViewChild('searchship2') public shipsearchElementRef2: ElementRef;
    @ViewChild('searchship3') public shipsearchElementRef3: ElementRef;
    @ViewChild('searchship4') public shipsearchElementRef4: ElementRef;
    @ViewChild('searchship5') public shipsearchElementRef5: ElementRef;
  map: any = '';
  datefrom: any = '';
  dateto: any = '';
  branchname: any = '';
  branchcode: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
    bilname:any='';
    biladdress: any = '';
    bilcity: any = '';
    bilstate: any = '';
    bilcountry: any = '';
    bilzip: any = '';
    shipname1:any='';
    shipaddress1: any = '';
    shipcity1: any = '';
    shipstate1: any = '';
    shipcountry1: any = '';
    shipzip1: any = '';
    shipname2:any='';
    shipaddress2: any = '';
    shipcity2: any = '';
    shipstate2: any = '';
    shipcountry2: any = '';
    shipzip2: any = '';
    shipname3:any='';
    shipaddress3: any = '';
    shipcity3: any = '';
    shipstate3: any = '';
    shipcountry3: any = '';
    shipzip3: any = '';
    shipname4:any='';
    shipaddress4: any = '';
    shipcity4: any = '';
    shipstate4: any = '';
    shipcountry4: any = '';
    shipzip4: any = '';
    shipname5:any='';
    shipaddress5: any = '';
    shipcity5: any = '';
    shipstate5: any = '';
    shipcountry5: any = '';
    shipzip5: any = '';
  phone: any = '';
  fax: any = '';
  accounttype: any = '';
  description: any = '';
  private_description: any = '';
  results: any = '';
  place: any = '';
  lat: any = '';
  long: any = '';
  branchemail:any='';
  home:any='';
  mobile:any='';
  sessid:any;
    checked:any='';
    shipchecked1:any='';
    shipchecked4:any='';
    shipchecked3:any='';
    shipchecked2:any='';
    shipchecked5:any='';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    userRole: any;

    constructor( public router: Router, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public branch: BranchService ) {
    this.sessid=localStorage.getItem('umid');
    this.userRole = localStorage.getItem('urmid');
  }

  ngOnInit() {
    $(function()
        {
      $('#loader').hide();
          });
this.searchplace();
      this.searchshippingplace();
      this.searchshippingplace1();
      this.searchshippingplace2();
      this.searchshippingplace3();
      this.searchshippingplace4();
      this.searchshippingplace5();
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
              if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
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
                  if(!component[c].long_name ) {
                      this.zip = null;
                  }
                  else {
                      this.zip=component[c].long_name;
                  }

              }
            }
            this.address = this.street_number + ' ' + this.road;
          }
          this.zoom = 12;
        });
      });
    });
  }

  onSubmit() {
    this.submitted = true;
  }

  createBranch() {
    $('#loader').show();
    this.branch.CreateBranch( this.branchcode, this.branchname, this.address, this.city, this.state, this.country, this.zip, this.phone, this.fax, this.accounttype, this.datefrom, this.dateto, this.description, this.latitude, this.longitude,this.branchemail,this.home,this.mobile,this.sessid,this.bilname, this.biladdress, this.bilcity, this.bilstate, this.bilcountry, this.bilzip, this.shipname1,this.shipaddress1, this.shipcity1, this.shipstate1, this.shipcountry1, this.shipzip1, this.shipname2,this.shipaddress2, this.shipcity2, this.shipstate2, this.shipcountry2, this.shipzip2,this.shipname3, this.shipaddress3, this.shipcity3, this.shipstate3, this.shipcountry3, this.shipzip3,this.shipname4, this.shipaddress4, this.shipcity4, this.shipstate4, this.shipcountry4, this.shipzip4,this.shipname5,this.shipaddress5, this.shipcity5, this.shipstate5, this.shipcountry5, this.shipzip5, this.private_description).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result === 'success') {
              $('#loader').hide();
              $("#loader").css("visibility", "hidden");
              swal({
                title: 'Created!',
                text: 'Branch created successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['branch/overview/'],{ queryParams: { id: this.results[0].branchid } });
            }
          }
      );
  }
  Navigation(link) {
    this.router.navigate([link]);
  }
billcheck(event)
{
    if(event.target.checked==true)
    {
        this.checked=1;

        $("#bilsearch").prop('disabled',false);
        $("#bilstate").prop('disabled',false);
        $("#bilcountry").prop('disabled',false);
        $("#bilcity").prop('disabled',false);
        $("#bilzip").prop('disabled',false);
        $("#biladdress").prop('disabled',false);
        $("#bilname").prop('disabled',false);
    }
    else {
        this.checked=0;
        $("#bilsearch").prop('disabled',true);
        $('#bilsearch').val('');
        $("#bilstate").prop('disabled',true);
        this.bilstate='';
        $('#bilstate').val('');
        $("#bilcountry").prop('disabled',true);
        this.bilcountry='';
        $('#bilcountry').val('');
        $("#bilcity").prop('disabled',true);
        this.bilcity='';
        $('#bilcity').val('');
        $("#bilzip").prop('disabled',true);
        $('#bilzip').val('');
        this.bilzip='';
        $("#biladdress").prop('disabled',true);
        this.biladdress='';
        $('#biladdress').val('');
        $("#bilname").prop('disabled',true);
        this.bilname='';
        $('#bilname').val('');

    }
}
    ship1check4(event)
    {

        if(event.target.checked==true)
        {
            this.shipchecked4=1;

            $("#shipsearch4").prop('disabled',false);
            $("#shipstate4").prop('disabled',false);
            $("#shipcountry4").prop('disabled',false);
            $("#shipcity4").prop('disabled',false);
            $("#shipzip4").prop('disabled',false);
            $("#shipaddress4").prop('disabled',false);
            $("#shipname4").prop('disabled',false);
        }
        else {
            this.shipchecked4=0;
            $("#shipsearch4").prop('disabled',true);
            $('#shipsearch4').val('');


            this.shipaddress4 = '';
            this.shipzip4 = '';
            this.shipcity4 = '';
            this.shipstate4 = '';
            this.shipcountry4 = '';
            this.shipname4='';

        }
    }
    shipcheck2(event)
    {
        if(event.target.checked==true)
        {
            this.shipchecked2=1;

            $("#shipsearch1").prop('disabled',false);
            $("#shipstate1").prop('disabled',false);
            $("#shipcountry1").prop('disabled',false);
            $("#shipcity1").prop('disabled',false);
            $("#shipzip1").prop('disabled',false);
            $("#shipaddress1").prop('disabled',false);
            $("#shipname1").prop('disabled',false);
        }
        else {
            this.shipchecked2=0;
            $("#shipsearch1").prop('disabled',true);
            $('#shipsearch1').val('');
            this.shipaddress1 = '';
            this.shipzip1= '';
            this.shipcity1 = '';
            this.shipstate1= '';
            this.shipcountry1= '';
            this.shipname1= '';

        }
    }
    shipcheck3(event)
    {
        if(event.target.checked==true)
        {
            this.shipchecked3=1;

            $("#shipsearch2").prop('disabled',false);
            $("#shipstate2").prop('disabled',false);
            $("#shipcountry2").prop('disabled',false);
            $("#shipcity2").prop('disabled',false);
            $("#shipzip2").prop('disabled',false);
            $("#shipaddress2").prop('disabled',false);
            $("#shipname2").prop('disabled',false);
        }
        else {
            this.shipchecked3=0;
            $("#shipsearch2").prop('disabled',true);
            $('#shipsearch2').val('');
            this.shipaddress2 = '';
            this.shipzip2 = '';
            this.shipcity2 = '';
            this.shipstate2= '';
            this.shipcountry2 = '';
            this.shipname2 = '';

        }
    }
    shipcheck4(event)
    {
        if(event.target.checked==true)
        {
            this.shipchecked5=1;

            $("#shipsearch3").prop('disabled',false);
            $("#shipstate3").prop('disabled',false);
            $("#shipcountry3").prop('disabled',false);
            $("#shipcity3").prop('disabled',false);
            $("#shipzip3").prop('disabled',false);
            $("#shipaddress3").prop('disabled',false);
            $("#shipname3").prop('disabled',false);
        }
        else {
            this.shipchecked5=0;
            $("#shipsearch3").prop('disabled',true);
            $('#shipsearch3').val('');
            this.shipaddress3 = '';
            this.shipzip3 = '';
            this.shipcity3 = '';
            this.shipstate3 = '';
            this.shipcountry3 = '';
            this.shipname3 = '';

        }
    }
    shipcheck5(event)
    {
        if(event.target.checked==true)
        {
            this.shipchecked1=1;

            $("#shipsearch5").prop('disabled',false);
            $("#shipstate5").prop('disabled',false);
            $("#shipcountry5").prop('disabled',false);
            $("#shipcity5").prop('disabled',false);
            $("#shipzip5").prop('disabled',false);
            $("#shipaddress5").prop('disabled',false);
            $("#shipname5").prop('disabled',false);
        }
        else {
            this.shipchecked1=0;
            $("#shipsearch5").prop('disabled',true);
            $('#shipsearch5').val('');
            this.shipaddress5 = '';
            this.shipzip5 = '';
            this.shipcity5 = '';
            this.shipstate5 = '';
            this.shipcountry5= '';
            this.shipname5= '';

        }
    }
  GoogleAddress(city,state) {
      let address: any;
      if (state === '') {
          address = city;
      } else {
          address = city + ',' + state;
      }
    this.branch.LoadGoogleMapAddress(address).subscribe(
        data => {
          let addresslength: any;
          addresslength = data.results[0].address_components.length;
          for ( let i = 0; i < addresslength; i++) {
            //console.log(i);
            if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
              let c_name: any;
              c_name = data.results[0].address_components[i].long_name;
              //console.log(c_name);
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
    GoogleAddressbil(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.bilstate = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.bilcountry = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.bilzip = data.results[0].address_components[i].long_name;
                    }
                }
                this.billatitude = data.results[0].geometry.location.lat;
                this.billongitude = data.results[0].geometry.location.lng;
            }
        );
    }
    GoogleAddressship1(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.shipstate1 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.shipcountry1 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.shipzip1 = data.results[0].address_components[i].long_name;
                    }
                }
                this.shiplatitude1 = data.results[0].geometry.location.lat;
                this.shiplongitude1 = data.results[0].geometry.location.lng;
            }
        );
    }
    GoogleAddressship2(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.shipstate2 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.shipcountry2 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.shipzip2 = data.results[0].address_components[i].long_name;
                    }
                }
                this.shiplatitude1 = data.results[0].geometry.location.lat;
                this.shiplongitude2 = data.results[0].geometry.location.lng;
            }
        );
    }
    GoogleAddressship3(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.shipstate3 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.shipcountry3 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.shipzip3 = data.results[0].address_components[i].long_name;
                    }
                }
                this.shiplatitude3 = data.results[0].geometry.location.lat;
                this.shiplongitude3 = data.results[0].geometry.location.lng;
            }
        );
    }
    GoogleAddressship4(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.shipstate4 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.shipcountry4 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.shipzip4 = data.results[0].address_components[i].long_name;
                    }
                }
                this.shiplatitude4 = data.results[0].geometry.location.lat;
                this.shiplongitude4 = data.results[0].geometry.location.lng;
            }
        );
    }
    GoogleAddressship5(city) {
        this.branch.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    //console.log(i);
                    if (data.results[0].address_components[i].types[0] === 'locality'|| data.results[0].address_components[i].types[0] ==='postal_town') {
                        let c_name: any;
                        c_name = data.results[0].address_components[i].long_name;
                        //console.log(c_name);
                    }
                    if (data.results[0].address_components[i].types[0] === 'administrative_area_level_1') {
                        this.shipstate5 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'country') {
                        this.shipcountry5 = data.results[0].address_components[i].long_name;
                    }
                    if (data.results[0].address_components[i].types[0] === 'postal_code') {
                        this.shipzip5 = data.results[0].address_components[i].long_name;
                    }
                }
                this.shiplatitude5 = data.results[0].geometry.location.lat;
                this.shiplongitude5 = data.results[0].geometry.location.lng;
            }
        );
    }
    searchplace()
    {
        this.bilzoom = 4;
        this.billatitude = 39.8282;
        this.billongitude = -98.5795;

        /*create search FormControl*/
        this.bilsearchControl = new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef1.nativeElement, {
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
                    this.billatitude = place.geometry.location.lat();
                    this.billongitude = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.bilstreet_number = component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.bilroad = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.bilcity = component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.bilstate = component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.bilcountry = component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.bilzip = component[c].long_name;
                            }
                        }
                        this.biladdress = this.bilstreet_number + ' ' + this.bilroad;
                    }
                    this.zoom = 12;
                });
            });
        });
    }
    searchshippingplace()
    {
        this.shipzoom1 = 4;
        this.shiplatitude1 = 39.8282;
        this.shiplongitude1 = -98.5795;

        /*create search FormControl*/
        this.shipsearchControl1 = new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef1.nativeElement, {
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
                    this.shiplatitude1 = place.geometry.location.lat();
                    this.shiplongitude1 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number1 = component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad1 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.shipcity1 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate1 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry1 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip1 = component[c].long_name;
                            }
                        }
                        this.shipaddress1 = this.shipstreet_number1 + ' ' + this.shiproad1;
                    }
                    this.shipzoom1 = 12;
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
    searchshippingplace1()
    {
        this.shipzoom1 = 4;
        this.shiplatitude1 = 39.8282;
        this.shiplongitude1 = -98.5795;

        /*create search FormControl*/
        this.shipsearchControl1 = new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef2.nativeElement, {
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
                    this.shiplatitude1 = place.geometry.location.lat();
                    this.shiplongitude1 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number1= component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad1 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.shipcity1= component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate1= component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry1= component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip1= component[c].long_name;
                            }
                        }
                        this.shipaddress1 = this.shipstreet_number1 + ' ' + this.shiproad1;
                    }
                    this.shipzoom1 = 12;
                });
            });
        });
    }
    searchshippingplace2()
    {
        this.shipzoom2 = 4;
        this.shiplatitude2 = 39.8282;
        this.shiplongitude2 = -98.5795;

        /*create search FormControl*/
        this.shipsearchControl2 = new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef2.nativeElement, {
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
                    this.shiplatitude2 = place.geometry.location.lat();
                    this.shiplongitude2 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number2= component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad2 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {

                                this.shipcity2= component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate2= component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry2= component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip2 =component[c].long_name;
                            }
                        }
                        this.shipaddress2= this.shipstreet_number2 + ' ' + this.shiproad2;
                    }
                    this.shipzoom2 = 12;
                });
            });
        });
    }
    searchshippingplace3()
    {
        this.shipzoom3 = 4;
        this.shiplatitude3 = 39.8282;
        this.shiplongitude3 = -98.5795;

        /*create search FormControl*/
        this.shipsearchControl3 = new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef3.nativeElement, {
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
                    this.shiplatitude3 = place.geometry.location.lat();
                    this.shiplongitude3 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number3= component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad3 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.shipcity3 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate3 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry3 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip3 = component[c].long_name;
                            }
                        }
                        this.shipaddress3 = this.shipstreet_number3 + ' ' + this.shiproad3;
                    }
                    this.shipzoom3 = 12;
                });
            });
        });
    }
    searchshippingplace4()
    {
        this.shipzoom4 = 4;
        this.shiplatitude4 = 39.8282;
        this.shiplongitude4= -98.5795;

        /*create search FormControl*/
        this.shipsearchControl4= new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef4.nativeElement, {
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
                    this.shiplatitude4= place.geometry.location.lat();
                    this.shiplongitude4 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number4= component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad4 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.shipcity4= component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate4 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry4= component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip4 = component[c].long_name;
                            }
                        }
                        this.shipaddress4 = this.shipstreet_number4 + ' ' + this.shiproad4;
                    }
                    this.shipzoom4 = 12;
                });
            });
        });
    }
    searchshippingplace5()
    {
        this.shipzoom5 = 4;
        this.shiplatitude5 = 39.8282;
        this.shiplongitude5= -98.5795;

        /*create search FormControl*/
        this.shipsearchControl5= new FormControl();

        /*set current position*/
        this.setCurrentPosition();

        /*load Places Autocomplete*/
        this.mapsAPILoader.load().then(() => {
            let autocomplete = new google.maps.places.Autocomplete(this.shipsearchElementRef5.nativeElement, {
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
                    this.shiplatitude5= place.geometry.location.lat();
                    this.shiplongitude5 = place.geometry.location.lng();
                    //console.log(this.latitude+'-'+this.longitude);

                    let component = place.address_components;

                    if(component) {
                        for(let c=0;c<component.length;++c)
                        {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.shipstreet_number5= component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.shiproad5 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('locality')>-1 && component[c].types.indexOf('political')>-1 || component[c].types.indexOf('postal_town')>-1)
                            {
                                this.shipcity5= component[c].long_name;
                            }
                            if(component[c].types.indexOf('administrative_area_level_1')>-1)
                            {
                                this.shipstate5 = component[c].long_name;
                            }
                            if(component[c].types.indexOf('country')>-1)
                            {
                                this.shipcountry5= component[c].long_name;
                            }
                            if(component[c].types.indexOf('postal_code')>-1)
                            {
                                this.shipzip5 = component[c].long_name;
                            }
                        }
                        this.shipaddress5 = this.shipstreet_number5 + ' ' + this.shiproad5;
                    }
                    this.shipzoom5= 12;
                });
            });
        });
    }
}
