import { ElementRef,NgZone,ViewChild,Component, OnInit,Input,OnChanges,SimpleChanges } from '@angular/core';
import {Router} from '@angular/router';
import {SupplierserviceService} from "../service/supplierservice.service";
import {RequestService} from "../../../branch/services/request.service";
import {FormControl} from "@angular/forms";
import {MapsAPILoader} from "angular2-google-maps/core";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";



declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-orderedparts',
  templateUrl: './orderedparts.component.html',
  styleUrls: ['./orderedparts.component.scss']
})
export class OrderedpartsComponent implements OnInit,OnChanges {

  @Input() dupid;
  receivedRequests: any;
  allsuppliers:any;
  SupplierID:any;
  SupplierName:any;
  status:any;
  selectedRow: Number = 0;
  setClickedRow: Function;
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
    supname='';
    phone: any = '';
    email: any = '';
    description: any = '';
    results: any = '';
    place: any = '';
    asspart:any='';
    home:any='';
    mobile:any='';
    showMap:any;
    Chilmenu:any;
    supmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umkeyid:any;
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    constructor(public router: Router, public sup: SupplierserviceService,public requestService:RequestService,private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,public menu:MenumanagementService) {
      this.umkeyid=localStorage.getItem('umid');
      this.sessid=localStorage.getItem('ucmid');
    this.setClickedRow = function (index) {
      this.selectedRow = index;

    };
  }

  ngOnInit() {
    //this.LoadRequest();
    //this.receivedRequest(this.id);
      this.viewsuppliers('');
      this.Loadchildmenu();
      this.Loadbuttons();

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

  selectRequestDetails(id,name)
  {
    this.receivedRequest(id);
      this.SupplierID=id;
      this.SupplierName=name;
  }
    Navication(link)
    {
        this.router.navigate([link]);
    }

  ngOnChanges(changes: SimpleChanges): void{
    //this.receivedRequest(this.SupplierID);
    //console.log(this.SupplierID);
      this.viewsuppliers('');
  }

  receivedRequest(id) {
    this.requestService.receivedRequest(id,'Supplier').subscribe(
        data => {
          this.receivedRequests = data;
            setTimeout(function() {
                var $table = $('.demo');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover1');
                    }
                });
            }, 1000);
        }
    );
  }

  viewsuppliers(supid){
    this.sup.LoadSupplier().subscribe(
        data => {
          this.allsuppliers = data;
          if(supid!='')
          {
              this.SupplierID =supid;
          }
          else
          {
          this.SupplierID = this.allsuppliers[0].SUM_KeyID;
          }
          this.SupplierName  = this.allsuppliers[0].SUM_Name;
          this.receivedRequest(this.allsuppliers[0].SUM_KeyID);

          if(this.allsuppliers != null)
          {
            this.status = 'active';


          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
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
        this.sup.LoadGoogleMapAddress(city).subscribe(
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
        this.sup.CreateSupplier(  this.suppliername, this.address, this.city, this.state, this.country, this.zip, this.phone, this.email, this.description,this.latitude, this.longitude,this.mobile,this.home,this.umkeyid ).subscribe(
            data => {
                this.results = data;
                if (this.results[0].result === 'success') {
                    swal({
                        title: 'Created!',
                        text: 'Supplier Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.viewsuppliers(this.results[0].supid);
                    $("#crsup").trigger("reset");
                }
            }
        );
    }
    refreshsup(){
        $("#crsup").trigger("reset");
    }
    Loadchildmenu() {
        this.supmenu='supplier';
        this.menu.Loadchildmenu(11,this.supmenu).subscribe(
            data => {
                this.Chilmenu = data;



            }
        );

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
}
