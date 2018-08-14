import {Component, ElementRef, NgZone, OnInit, ViewChild, Input,OnChanges,SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {PartsService} from "../services/parts.service";
import { FormControl } from '@angular/forms';
import {MapsAPILoader, SebmGoogleMap} from 'angular2-google-maps/core';
import {SupplierserviceService} from "../../supplier/service/supplierservice.service";
import {OrderedpartsComponent} from "../../supplier/orderedparts/orderedparts.component";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";



declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;
@Component({
  selector: 'app-assignsupplier',
  templateUrl: './assignsupplier.component.html',
  styleUrls: ['./assignsupplier.component.scss']
})
export class AssignsupplierComponent implements OnInit,OnChanges {
  @Input() partid;
  results:any;
  id:any;
    asssup:any;
    checkbox: any = [];
    demoChk: any = [];
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
    partdet:any='';
    place: any = '';
    partname:any='';
    mobile:any='';
    home:any='';
    dupid:any='';
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    qtval:any;
    qtval1:any=[];
    values1:any='';
    umkeyid:any='';
  constructor(public router: Router,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public asspart:PartsService,public supplier:SupplierserviceService,private ordpart:OrderedpartsComponent,public menu:MenumanagementService) {
      this.umkeyid=localStorage.getItem('umid');
  }

  ngOnInit() {
      this.sessid=localStorage.getItem('ucmid');
      $(function () {
          $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#us-phone-mask-supmobile').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
          $('#us-phone-mask-suphome').mask('(000) 000-0000', {placeholder: '(___) ___-____'});
      });
      this.empty();
      this.dupid=1000;
      this.Loadbuttons();
   // this.assignedsuppliers();
      //this.assignedsuppliers(this.partid);

      /*set current position*/

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
  empty(){
      this.suppliername = '';
      this.address= '';
      this.city = '';
      this.state = '';
      this.country = '';
      this.zip = '';
      this.phone = '';
      this.email = '';
      this.description = '';
      this.partdet='';
      this.place = '';

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
  ngOnChanges(){
    //this.assignedsuppliers(this.partid);
    this.assignedsuppliers(this.partid);

      this.Googlemap();
  }
  assignedsuppliers(id)
  {
    this.asspart.Assignedsuppliers(this.partid).subscribe(
        data => {
          this.asssup = data;
            var $table = $('.demo');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });

        },
    );
  }
    supplieraction(){
        this.Googlemap();
this.empty();
        $('#supplist').hide();
        $('#suppform').show();
        $('#suppformbut').show();
        $('#supplistbut').hide();
        $('#footer').hide();

    }
    supplieractionform(){
    $('#supplist').show();
    $('#suppform').hide();
        $('#supplistbut').show();
        $('#suppformbut').hide();
        $('#footer').show();



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
    viewpartname()
    {
        this.asspart.EditParts(this.partid).subscribe(
            data => {
                this.partdet = data;
                this.partname=data.PM_Part_Name;
            },
        );
    }
  viewassignsupplier(id)
  {
      this.Googlemap();
      this.demoChk=[];
      $("#supplierform").trigger("reset");
this.viewpartname()
    this.asspart.Loadallsupplier(this.partid).subscribe(
        data => {
          this.results = data;
            setTimeout(function() {
                var $table = $('.demo1');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover1');
                    }
                });
            }, 1000);



        },
    );
  }
    enable()
    {
        //console.log('count', this.demoChk.length, this.qtval1.length);

        if((this.demoChk.length > 0 && (this.values1.length>0)) ){
            return false;
        }
        else{
            return true;
        }
    }
    onSubmit() {
        this.submitted = true;
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

        if(this.mobile==null) {
            this.mobile = '';
        }
        if(this.home==null) {
            this.home = '';
        }


        this.supplier.CreateSupplier(  this.suppliername, this.address, this.city, this.state, this.country, this.zip, this.phone, this.email, this.description,this.latitude, this.longitude,this.mobile,this.home,this.umkeyid ).subscribe(
            data => {
                this.results = data;
                if (this.results[0].result === 'success') {
                    swal({
                        title: 'Created!',
                        text: 'Supplier created successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    $('#supplist').show();
                    $('#suppform').hide();
                    $('#footer').show();
                    $('#supplistbut').show();
                    $("#supplierform").trigger("reset");
                    this.viewassignsupplier(this.id);
                    this.ordpart.viewsuppliers('');
                    this.dupid=5;

                }
            }
        );
    }
    updateCheckedOptions(i,chBox, event) {

        if(event.target.checked) {
            this.demoChk.push(chBox);
            $("#qaty"+i).prop("readonly", false);
            this.textenable1(i,'');
        }
        else if (!event.target.checked){
            let indexx = this.demoChk.indexOf(chBox);
            this.demoChk.splice(indexx,1);

            this.values1=$("#qaty"+i).val('');
            $("#qaty"+i).attr("readonly", "readonly");
        }


    }
    updateOptions(form){
        this.asspart.Assignsupplier(form).subscribe(
            data => {
                this.results = data;
                if(this.results[0].result =="success")
                {
                    swal({
                        title: "Assigned!",
                        text: " Supplier Assigned successfully",
                        type: "success",
                        confirmButtonClass: "btn-success"
                    });
                    this.assignedsuppliers(this.id);
                    this.ordpart.viewsuppliers('');
                }
                this.demoChk=[];
            }
        );
    }

    textenable1(i,event:any)
    {
        this.values1 = $("#qaty"+i).val();

    }

    viewqty(i,event)
    {
        $("#qaty"+i).prop("readonly", false);
        this.qtval=$("#qaty"+i).val();
        this.qtval1.push(this.qtval);
    }

    // Update Replenishment
    updateRepl(qty,rpdid)
    {
        this.asspart.updateRepl(qty,rpdid).subscribe(
            data => {
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Update!',
                        text: 'Current Stock Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });

                    //this.Requestbyid(this.RPM_KeyID,this.Request_Type);
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: 'Error occurs, please try after some time.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }
}
