import { ElementRef,Component,NgZone, OnInit,ViewChild,Input,OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import {Router} from '@angular/router'
import {SupplierserviceService} from "./service/supplierservice.service";
import {EditsupplierService} from "./service/editsupplier.service";
import {OrderedpartsComponent} from "./orderedparts/orderedparts.component";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";


declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit,OnChanges {
    @Input() supid;
    @Input() name;
allsuppliers:any;
  SupplierID:any;
    sup_name:any;
    sup_address:any;
    sup_email:any;
    sup_phone:any;
    sup_description:any;
    sup_address2:any;
    editid:any;
  status:any;
    submitted = false;
    active = true;

    public latitude: any;
    public longitude: any;
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
    mobile:any='';
    lat:any;
    lan:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(public router: Router, public sup: SupplierserviceService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public editsup:EditsupplierService,private ordpar:OrderedpartsComponent,public menu:MenumanagementService) {
    this.viewsuppliers();
      this.sessid=localStorage.getItem('ucmid');
  }

  ngOnInit() {
      this.viewsuppliers();
      this.Loadbuttons();

  }
  open(link) {
    this.router.navigate([link]);

  }
    Loadbuttons() {
        this.menu.Loadbutton(11,77,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;




            }
        );

    }
    showpop(){
        this.GoogleMap();
        this.editid=this.SupplierID;

       this.LoadSuppDetails();
        $("#editsupp").trigger("reset");

    }
    ngOnChanges(){
        this.GoogleMap();
        this.viewsuppliers();

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

                    if (component) {
                        for (let c = 0; c < component.length; ++c) {
                            if ( component[c].types.indexOf('street_number') > -1) {
                                this.street_number = component[c].long_name;
                            }
                            if ( component[c].types.indexOf('route') > -1) {
                                this.road = component[c].long_name;
                            }
                            if (component[c].types.indexOf('locality') > -1 && component[c].types.indexOf('political') > -1|| component[c].types.indexOf('postal_town')>-1) {
                                this.city = component[c].long_name;
                            }
                            if (component[c].types.indexOf('administrative_area_level_1') > -1) {
                                this.state = component[c].long_name;
                            }
                            if (component[c].types.indexOf('country') > -1) {
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
                this.latitude = parseFloat(this.lat);
                this.longitude = parseFloat(this.lan);
                this.zoom = 10;
            });
        }

    }
    onSubmit() {
        this.submitted = true;
    }
    Navication(link)
    {
        this.router.navigate([link]);
    }
  viewsuppliers(){
    this.sup.EditSuppliers(this.supid).subscribe(
        data => {
          this.allsuppliers = data;

          this.SupplierID = this.allsuppliers.SUM_KeyID;
            this.sup_name = this.allsuppliers.SUM_Name;
            this.name = this.allsuppliers.SUM_Name;
            this.sup_address = this.allsuppliers.SUM_Address1;
            this.sup_email = this.allsuppliers.SUM_Email;
            this.sup_phone = this.allsuppliers.SUM_Phone;
            this.sup_description = this.allsuppliers.SUM_Description;
this.sup_address2=this.allsuppliers.SUM_Address2;
            this.latitude = this.allsuppliers.SUM_Latitude;
            this.longitude = this.allsuppliers.SUM_Longitude;
            this.home = this.allsuppliers.SUM_Home;
            this.mobile = this.allsuppliers.SUM_Mobile;
            this.state = this.allsuppliers.SUM_State;
            this.zip = this.allsuppliers.SUM_Zip;
          if(this.allsuppliers != null)
          {
            this.status = 'active';


          }

            var sitelat = this.allsuppliers.SUM_Latitude;
            var sitelng =  this.allsuppliers.SUM_Longitude;
            this.lat = this.allsuppliers.SUM_Latitude;
            this.lan = this.allsuppliers.SUM_Longitude;
            this.GoogleMap();
            if(this.lat != '' && this.lan != '')
            {
                var myLatLng = {lat: sitelat, lng: sitelng};

                var reslong = new google.maps.LatLng(sitelat, sitelng);

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: reslong
                });

                var marker = new google.maps.Marker({
                    position: reslong,
                    map: map,
                    title: 'Hello World!'
                });
                marker.setPosition(reslong);
            }
          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        }
    );


  }
    Delete(id)
    {
        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Supplier will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.sup.Delsuppliers(id).subscribe(
                    data => {
                        this.delparts = data;
                        that.viewsuppliers();
                        if(this.delparts != null)
                        {

                                swal({
                                    title: 'Deleted!',
                                    text: 'Supplier has been deleted',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                          that.ordpar.viewsuppliers('');
                            that.viewsuppliers();

                        }
                    }


                );
            });
    }
    LoadSuppDetails() {
        this.editsup.EditSuppliers(this.SupplierID).subscribe(
            data => {
                this.editsupplier = data;
                this.suppliername = data.SUM_Name;
                this.address = data.SUM_Address1;
                this.city = data.SUM_Address2;
                this.phone = data.SUM_Phone;
                this.country = data.SUM_Country;
                this.email = data.SUM_Email;
                this.description = data.SUM_Description;
                this.latitude = parseFloat(data.SUM_Latitude);
                this.longitude = parseFloat(data.SUM_Longitude);
                this.home = data.SUM_Home;
                this.mobile = data.SUM_Mobile;
                this.state = data.SUM_State;
                this.zip = data.SUM_Zip;



            }
        );
    }
    editSupplier() {
        if(this.address==null) {
            this.address = '';
        }
        if(this.state==null) {
            this.state = '';
        }
        if(this.country==null) {
            this.country = '';
        }
        if(this.email==null) {
            this.email = '';
        }
        if(this.description==null) {
            this.description = '';
        }
        if(this.mobile==null) {
            this.mobile = '';
        }
        if(this.home==null) {
            this.home = '';
        }
        this.sup.editSupplier(  this.suppliername, this.address, this.city, this.state, this.country, this.zip, this.phone, this.email, this.description ,this.SupplierID,this.latitude, this.longitude,this.mobile,this.home ).subscribe(
            data => {
                this.results = data;
                if (this.results[0].result === 'success') {
                    swal({
                        title: 'Updated!',
                        text: 'Supplier Details Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.viewsuppliers();
                    this.ordpar.viewsuppliers(this.SupplierID);
                }
            }
        );
    }
    GoogleAddress(city) {
        this.sup.LoadGoogleMapAddress(city).subscribe(
            data => {
                let addresslength: any;
                addresslength = data.results[0].address_components.length;
                for ( let i = 0; i < addresslength; i++) {
                    if (data.results[0].address_components[i].types[0] === 'locality')
                    {
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
