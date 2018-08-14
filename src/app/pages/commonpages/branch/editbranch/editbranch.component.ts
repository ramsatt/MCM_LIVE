import { ElementRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from 'angular2-google-maps/core';
import { BranchService } from './../services/branch.service';
import { UpdatebranchService } from './../services/updatebranch.service';

declare var $;
declare var google;
declare var document;
declare var card;
declare var window;
declare var navigator;
declare var swal;

@Component({
  selector: 'app-editbranch',
  templateUrl: './editbranch.component.html',
  styleUrls: ['./editbranch.component.css']
})
export class EditbranchComponent implements OnInit {
  submitted = false;
  active = true;

  public latitude: any;
  public longitude: any;
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
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  @ViewChild('search')  public searchElementRef: ElementRef;
  @ViewChild('search1') public searchElementRef1: ElementRef;
  @ViewChild('searchship1') public shipsearchElementRef1: ElementRef;
  @ViewChild('searchship2') public shipsearchElementRef2: ElementRef;
  @ViewChild('searchship3') public shipsearchElementRef3: ElementRef;
  @ViewChild('searchship4') public shipsearchElementRef4: ElementRef;
  @ViewChild('searchship5') public shipsearchElementRef5: ElementRef;
  map: any = '';
  confrom: any = '';
  conto: any = '';
  branchname: any = '';
  address: any = '';
  city: any = '';
  state: any = '';
  country: any = '';
  zip: any = '';
  phone: any = '';
  fax: any = '';
  accounttype: any = '';
  description: any = '';
  private_description: any = '';
  results: any = '';
  place: any = '';
  lat: any = '';
  long: any = '';
  branchemail: any = '';
  BranchId: any = '';
  BranchName: any = '';
  mobile:any='';
  home:any='';
  bilid:any='';
  biladdress: any = '';
  bilcity: any = '';
  bilstate: any = '';
  bilcountry: any = '';
  bilname:any='';
  bilzip: any = '';
  shipid1:any='';
  shipaddress1: any = '';
  shipcity1: any = '';
  shipstate1: any = '';
  shipcountry1: any = '';
  shipzip1: any = '';
  shipname1:any='';
  shipid2:any='';
  shipaddress2: any = '';
  shipcity2: any = '';
  shipstate2: any = '';
  shipcountry2: any = '';
  shipzip2: any = '';
  shipname2:any='';
  shipid3:any='';
  shipaddress3: any = '';
  shipcity3: any = '';
  shipstate3: any = '';
  shipcountry3: any = '';
  shipzip3: any = '';
  shipname3:any='';
  shipid4:any='';
  shipaddress4: any = '';
  shipcity4: any = '';
  shipstate4: any = '';
  shipcountry4: any = '';
  shipzip4: any = '';
  shipname4:any='';
  shipaddress5: any = '';
  shipcity5: any = '';
  shipstate5: any = '';
  shipcountry5: any = '';
  shipzip5: any = '';
  shipid5:any='';
  shipname5:any='';
  checked:any='';
  shipchecked1:any='';
  shipchecked4:any='';
  shipchecked3:any='';
  shipchecked2:any='';
  shipchecked5:any='';
  branedit:any='';
  brancheditshipping:any;
  brancheditmain:any;
    branchcode:any='';


  shipaddress1old: any = '';
  shipcity1old: any = '';
  shipstate1old: any = '';
  shipcountry1old: any = '';
  shipzip1old: any = '';
  shipname1old: any = '';

  shipaddress2old: any = '';
  shipcity2old: any = '';
  shipstate2old: any = '';
  shipcountry2old: any = '';
  shipzip2old: any = '';
  shipname2old: any = '';

  shipaddress3old: any = '';
  shipcity3old: any = '';
  shipstate3old: any = '';
  shipcountry3old: any = '';
  shipzip3old: any = '';
  shipname3old: any = '';

  shipaddress4old: any = '';
  shipcity4old: any = '';
  shipstate4old: any = '';
  shipcountry4old: any = '';
  shipzip4old: any = '';
  shipname4old: any = '';

  shipaddress5old: any = '';
  shipcity5old: any = '';
  shipstate5old: any = '';
  shipcountry5old: any = '';
  shipzip5old: any = '';
  shipname5old: any = '';
    userRole: any;

  shipid:any;
  shipaddress:any;

  constructor( public  router: Router, public branchedit: BranchService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, public routing: ActivatedRoute, public branchupdate: UpdatebranchService ) {
    this.BranchId = routing.snapshot.params['id'];
    this.LoadBranchDetails(this.BranchId);
    this.LoadBillingDetails(this.BranchId);
    this.LoadShippingDetails(this.BranchId);
    this.userRole = localStorage.getItem('urmid');
  }

  ngOnInit() {
    $(function(){
      $('#us-phone-mask-input').mask('(000) 000-0000', {placeholder: 'Enter Phone Number'});
      $('#us-phone-mask-phone').mask('(000) 000-0000', {placeholder: 'Enter Phone Number'});
      $('#us-phone-mask-mobile').mask('(000) 000-0000', {placeholder: 'Enter Mobile Number'});
      $('#us-phone-mask-home').mask('(000) 000-0000', {placeholder: 'Enter Home Phone Number'});
      $('#us-fax-mask-input').mask('(000) 000-0000', {placeholder: 'Enter Fax Number'});

    });
    this.GoogleMap();
    this.searchplace();

    this.searchshippingplace1();
    this.searchshippingplace2();
    this.searchshippingplace3();
    this.searchshippingplace4();
    this.searchshippingplace5();
  }
  billeditcheck(event)
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
      $("#bildelete").show();
    }
    else {
      this.checked=0;
      $("#bildelete").hide();
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
      this.LoadBillingDetails(this.BranchId);

    }
  }
  Delete(id)
  {
    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Address will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function () {
          that.branchedit.Deleteaddress(id).subscribe(
              data => {
                this.results = data;
                if (this.results[0].result == "success") {
                  swal({
                    title: "Deleted!",
                    text: "Address has been deleted",
                    type: "success",
                    confirmButtonClass: "btn-success"
                  });
                  that.LoadBillingDetails(that.BranchId);
                  that.LoadShippingDetails(that.BranchId);
                }

              }
          );

        });
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
      $("#shipdelete4").show();
    }
    else {
      this.shipchecked4=0;
      $("#shipsearch4").prop('disabled',true);
      $('#shipsearch4').val('');
      $("#shipstate4").prop('disabled',true);
      $("#shipcountry4").prop('disabled',true);
      $("#shipcity4").prop('disabled',true);
      $("#shipzip4").prop('disabled',true);
      $("#shipaddress4").prop('disabled',true);
      $("#shipname4").prop('disabled',true);
      $("#shipdelete4").hide();
      this.shipaddress4=this.shipaddress4old;
      this.shipstate4=this.shipstate4old;
      this.shipcountry4=this.shipcountry4old;
      this.shipcity4=this.shipcity4old;
      this.shipzip4=this.shipzip4old;
      this.shipname4=this.shipname4old;



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
      $("#shipdelete1").show();
    }
    else {
      this.shipchecked2=0;
      $("#shipsearch1").prop('disabled',true);
      $('#shipsearch1').val('');
      $("#shipstate1").prop('disabled',true);
      $("#shipcountry1").prop('disabled',true);
      $("#shipcity1").prop('disabled',true);
      $("#shipzip1").prop('disabled',true);
      $("#shipaddress1").prop('disabled',true);
      $("#shipname1").prop('disabled',true);
      $("#shipdelete1").hide();

      this.shipaddress1=this.shipaddress1old;
      this.shipstate1=this.shipstate1old;
      this.shipcountry1=this.shipcountry1old;
      this.shipcity1=this.shipcity1old;
      this.shipzip1=this.shipzip1old;
      this.shipname1=this.shipname1old;

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
      $("#shipdelete2").show();
    }
    else {
      this.shipchecked3=0;
      $("#shipsearch2").prop('disabled',true);
      $('#shipsearch2').val('');
      $("#shipstate2").prop('disabled',true);
      $("#shipcountry2").prop('disabled',true);
      $("#shipcity2").prop('disabled',true);
      $("#shipzip2").prop('disabled',true);
      $("#shipaddress2").prop('disabled',true);
      $("#shipname2").prop('disabled',true);
      $("#shipdelete2").hide();

      this.shipaddress2=this.shipaddress2old;
      this.shipstate2=this.shipstate2old;
      this.shipcountry2=this.shipcountry2old;
      this.shipcity2=this.shipcity2old;
      this.shipzip2=this.shipzip2old;
      this.shipname2=this.shipname2old;

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
      $("#shipdelete3").show();
    }
    else {
      this.shipchecked5=0;
      $("#shipsearch3").prop('disabled',true);
      $('#shipsearch3').val('');
      $("#shipstate3").prop('disabled',true);
      $("#shipcountry3").prop('disabled',true);
      $("#shipcity3").prop('disabled',true);
      $("#shipzip3").prop('disabled',true);
      $("#shipaddress3").prop('disabled',true);
      $("#shipname3").prop('disabled',true);
      $("#shipdelete3").hide();

      this.shipaddress3=this.shipaddress3old;
      this.shipstate3=this.shipstate3old;
      this.shipcountry3=this.shipcountry3old;
      this.shipcity3=this.shipcity3old;
      this.shipzip3=this.shipzip3old;
      this.shipname3=this.shipname3old;

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
      $("#shipdelete5").show();
    }
    else {
      this.shipchecked1=0;
      $("#shipsearch5").prop('disabled',true);
      $('#shipsearch5').val('');
      $("#shipstate5").prop('disabled',true);
      $("#shipcountry5").prop('disabled',true);
      $("#shipcity5").prop('disabled',true);
      $("#shipzip5").prop('disabled',true);
      $("#shipname5").prop('disabled',true);
      $("#shipaddress5").prop('disabled',true);
      $("#shipdelete5").hide();

      this.shipaddress5=this.shipaddress5old;
      this.shipstate5=this.shipstate5old;
      this.shipcountry5=this.shipcountry5old;
      this.shipcity5=this.shipcity5old;
      this.shipzip5=this.shipzip5old;
      this.shipname5=this.shipname5old;

    }
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

  onSubmit() {
    this.submitted = true;
  }

  open(link) {
    this.router.navigate([link]);

  }

  LoadBranchDetails(id) {
    this.branchedit.ViewBranch(id).subscribe(
        data => {
          this.brancheditmain = data;
          this.branchname = data[0].BM_Branch_Name;
            this.branchcode = data[0].BM_Code;
          this.address = data[0].BM_Address;
          this.zip = data[0].BM_Zip;
          this.city = data[0].BM_City;
          this.state = data[0].BM_State;
          this.country=data[0].BM_Country;
          this.fax=data[0].BM_Fax;
          this.phone=data[0].BM_Phone;
          this.confrom=data[0].BM_Contract_FirstName;
          this.conto=data[0].BM_Contract_SecondName;
          this.description=data[0].BM_Description;
          this.private_description=data[0].BM_Private_Description;
          this.latitude=data[0].BM_Latitude;
          this.longitude=data[0].BM_Longitude;
          this.branchemail=data[0].BM_Email;
          this.home=data[0].BM_Home;
          this.mobile=data[0].BM_Mobile;




        }
    );
  }
  LoadBillingDetails(id) {
    this.branchedit.Viewbilling(this.BranchId).subscribe(
        data => {
          this.branedit = data;
         // console.log(data);

if(this.branedit !='')
{

            this.bilid=data.BSA_KeyID;
            this.biladdress = data.BSA_Address;
            this.bilzip = data.BSA_Zip;
            this.bilcity = data.BSA_City;
            this.bilstate = data.BSA_State;
            this.bilcountry=data.BSA_Country;
  this.bilname=data.BSA_Name;

}
else {
  this.bilid='';
  this.biladdress = '';
  this.bilzip = '';
  this.bilcity = '';
  this.bilstate = '';
  this.bilcountry='';
  this.bilname='';


}

        },

    );
  }
  LoadShippingDetails(id) {
    this.branchedit.Viewshipping(id).subscribe(
        data => {
          this.brancheditshipping = data;
          let i;
          let itm = data.length;

          if (itm == 5) {
            //console.log("hi im here only");
            if (data[0].BSA_Type == 'Shipping' && data[0].BSA_Type !== '') {
              this.shipid4 = data[0].BSA_KeyID;
              this.shipaddress4old = data[0].BSA_Address;
              this.shipaddress4 = data[0].BSA_Address;
              this.shipzip4 = data[0].BSA_Zip;
              this.shipzip4old = data[0].BSA_Zip;
              this.shipcity4 = data[0].BSA_City;
              this.shipcity4old = data[0].BSA_City;
              this.shipstate4 = data[0].BSA_State;
              this.shipstate4old = data[0].BSA_State;
              this.shipcountry4 = data[0].BSA_Country;
              this.shipcountry4old = data[0].BSA_Country;
              this.shipname4=data[0].BSA_Name;
              this.shipname4old = data[0].BSA_Name;
            }




          if (data[1].BSA_Type == 'Shipping') {
            this.shipid1 = data[1].BSA_KeyID;

            this.shipaddress1 = data[1].BSA_Address;
            this.shipzip1 = data[1].BSA_Zip;
            this.shipcity1 = data[1].BSA_City;
            this.shipstate1 = data[1].BSA_State;
            this.shipcountry1 = data[1].BSA_Country;
            this.shipname1=data[1].BSA_Name;
            this.shipname1old = data[1].BSA_Name;

            this.shipaddress1old = data[1].BSA_Address;
            this.shipzip1old = data[1].BSA_Zip;
            this.shipcity1old = data[1].BSA_City;
            this.shipstate1old = data[1].BSA_State;
            this.shipcountry1old = data[1].BSA_Country;
          }



          if (data[2].BSA_KeyID !== '') {
            this.shipid2 = data[2].BSA_KeyID;
            this.shipaddress2 = data[2].BSA_Address;
            this.shipzip2 = data[2].BSA_Zip;
            this.shipcity2 = data[2].BSA_City;
            this.shipstate2 = data[2].BSA_State;
            this.shipcountry2 = data[2].BSA_Country;
            this.shipname2=data[2].BSA_Name;
            this.shipname2old = data[2].BSA_Name;

            this.shipaddress2old = data[2].BSA_Address;
            this.shipzip2old = data[2].BSA_Zip;
            this.shipcity2old = data[2].BSA_City;
            this.shipstate2old = data[2].BSA_State;
            this.shipcountry2old = data[2].BSA_Country;

          }

          if (data[3].BSA_KeyID != '') {
            this.shipid3 = data[3].BSA_KeyID;
            this.shipaddress3 = data[3].BSA_Address;
            this.shipzip3 = data[3].BSA_Zip;
            this.shipcity3 = data[3].BSA_City;
            this.shipstate3 = data[3].BSA_State;
            this.shipcountry3 = data[3].BSA_Country;
            this.shipname3=data[3].BSA_Name;
            this.shipname3old = data[3].BSA_Name;

            this.shipaddress3old = data[3].BSA_Address;
            this.shipzip3old = data[3].BSA_Zip;
            this.shipcity3old = data[3].BSA_City;
            this.shipstate3old = data[3].BSA_State;
            this.shipcountry3old = data[3].BSA_Country;
          }

          if (data[4].BSA_KeyID != '') {
            this.shipid5 = data[4].BSA_KeyID;
            this.shipaddress5 = data[4].BSA_Address;
            this.shipzip5 = data[4].BSA_Zip;
            this.shipcity5 = data[4].BSA_City;
            this.shipstate5 = data[4].BSA_State;
            this.shipcountry5 = data[4].BSA_Country;
            this.shipname5=data[4].BSA_Name;
            this.shipname5old = data[4].BSA_Name;

            this.shipaddress5old = data[4].BSA_Address;
            this.shipzip5old = data[4].BSA_Zip;
            this.shipcity5old = data[4].BSA_City;
            this.shipstate5old = data[4].BSA_State;
            this.shipcountry5old = data[4].BSA_Country;

          }
        }
         else if (itm ==4) {
            //console.log("hi im here only");
            if (data[0].BSA_Type == 'Shipping' && data[0].BSA_Type !== '') {
              this.shipid4 = data[0].BSA_KeyID;
              this.shipaddress4old = data[0].BSA_Address;
              this.shipaddress4 = data[0].BSA_Address;
              this.shipzip4 = data[0].BSA_Zip;
              this.shipzip4old = data[0].BSA_Zip;
              this.shipcity4 = data[0].BSA_City;
              this.shipcity4old = data[0].BSA_City;
              this.shipstate4 = data[0].BSA_State;
              this.shipstate4old = data[0].BSA_State;
              this.shipcountry4 = data[0].BSA_Country;
              this.shipcountry4old = data[0].BSA_Country;
              this.shipname4=data[0].BSA_Name;
              this.shipname4old = data[0].BSA_Name;
            }




            if (data[1].BSA_Type == 'Shipping') {
              this.shipid1 = data[1].BSA_KeyID;

              this.shipaddress1 = data[1].BSA_Address;
              this.shipzip1 = data[1].BSA_Zip;
              this.shipcity1 = data[1].BSA_City;
              this.shipstate1 = data[1].BSA_State;
              this.shipcountry1 = data[1].BSA_Country;
              this.shipname1=data[1].BSA_Name;
              this.shipname1old = data[1].BSA_Name;

              this.shipaddress1old = data[1].BSA_Address;
              this.shipzip1old = data[1].BSA_Zip;
              this.shipcity1old = data[1].BSA_City;
              this.shipstate1old = data[1].BSA_State;
              this.shipcountry1old = data[1].BSA_Country;
            }



            if (data[2].BSA_KeyID !== '') {
              this.shipid2 = data[2].BSA_KeyID;
              this.shipaddress2 = data[2].BSA_Address;
              this.shipzip2 = data[2].BSA_Zip;
              this.shipcity2 = data[2].BSA_City;
              this.shipstate2 = data[2].BSA_State;
              this.shipcountry2 = data[2].BSA_Country;
              this.shipname2=data[2].BSA_Name;
              this.shipname2old = data[2].BSA_Name;
              this.shipaddress2old = data[2].BSA_Address;
              this.shipzip2old = data[2].BSA_Zip;
              this.shipcity2old = data[2].BSA_City;
              this.shipstate2old = data[2].BSA_State;
              this.shipcountry2old = data[2].BSA_Country;

            }

            if (data[3].BSA_KeyID != '') {
              this.shipid3 = data[3].BSA_KeyID;
              this.shipaddress3 = data[3].BSA_Address;
              this.shipzip3 = data[3].BSA_Zip;
              this.shipcity3 = data[3].BSA_City;
              this.shipstate3 = data[3].BSA_State;
              this.shipcountry3 = data[3].BSA_Country;
              this.shipname3=data[3].BSA_Name;
              this.shipname3old = data[3].BSA_Name;

              this.shipaddress3old = data[3].BSA_Address;
              this.shipzip3old = data[3].BSA_Zip;
              this.shipcity3old = data[3].BSA_City;
              this.shipstate3old = data[3].BSA_State;
              this.shipcountry3old = data[3].BSA_Country;
            }


              this.shipid5 = '';
              this.shipaddress5 = '';
              this.shipzip5 = '';
              this.shipcity5 = '';
              this.shipstate5 ='';
              this.shipcountry5 = '';
            this.shipname5='';

              this.shipaddress5old = '';
              this.shipzip5old = '';
              this.shipcity5old ='';
              this.shipstate5old = '';
              this.shipcountry5old ='';
            this.shipname5old='';


          }
          else if (itm == 3) {
            //console.log("hi im here only");
            if (data[0].BSA_Type == 'Shipping' && data[0].BSA_Type !== '') {
              this.shipid4 = data[0].BSA_KeyID;
              this.shipaddress4old = data[0].BSA_Address;
              this.shipaddress4 = data[0].BSA_Address;
              this.shipzip4 = data[0].BSA_Zip;
              this.shipzip4old = data[0].BSA_Zip;
              this.shipcity4 = data[0].BSA_City;
              this.shipcity4old = data[0].BSA_City;
              this.shipstate4 = data[0].BSA_State;
              this.shipstate4old = data[0].BSA_State;
              this.shipcountry4 = data[0].BSA_Country;
              this.shipcountry4old = data[0].BSA_Country;
              this.shipname4=data[0].BSA_Name;
              this.shipname4old = data[0].BSA_Name;
            }
            if (data[1].BSA_Type == 'Shipping') {
              this.shipid1 = data[1].BSA_KeyID;

              this.shipaddress1 = data[1].BSA_Address;
              this.shipzip1 = data[1].BSA_Zip;
              this.shipcity1 = data[1].BSA_City;
              this.shipstate1 = data[1].BSA_State;
              this.shipcountry1 = data[1].BSA_Country;
              this.shipname1=data[1].BSA_Name;
              this.shipname1old = data[1].BSA_Name;

              this.shipaddress1old = data[1].BSA_Address;
              this.shipzip1old = data[1].BSA_Zip;
              this.shipcity1old = data[1].BSA_City;
              this.shipstate1old = data[1].BSA_State;
              this.shipcountry1old = data[1].BSA_Country;

            }



            if (data[2].BSA_KeyID !== '') {
              this.shipid2 = data[2].BSA_KeyID;
              this.shipaddress2 = data[2].BSA_Address;
              this.shipzip2 = data[2].BSA_Zip;
              this.shipcity2 = data[2].BSA_City;
              this.shipstate2 = data[2].BSA_State;
              this.shipcountry2 = data[2].BSA_Country;
              this.shipname2=data[2].BSA_Name;
              this.shipname2old = data[2].BSA_Name;

              this.shipaddress2old = data[2].BSA_Address;
              this.shipzip2old = data[2].BSA_Zip;
              this.shipcity2old = data[2].BSA_City;
              this.shipstate2old = data[2].BSA_State;
              this.shipcountry2old = data[2].BSA_Country;

            }


              this.shipid3 = '';
              this.shipaddress3 = '';
              this.shipzip3 = '';
              this.shipcity3 = '';
              this.shipstate3 = '';
              this.shipcountry3 = '';
            this.shipname3='';
            this.shipname3old='';

              this.shipaddress3old ='';
              this.shipzip3old = '';
              this.shipcity3old = '';
              this.shipstate3old = '';
              this.shipcountry3old ='';



              this.shipid5 = '';
              this.shipaddress5 = '';
              this.shipzip5 = '';
              this.shipcity5 = '';
              this.shipstate5 = '';
              this.shipcountry5 = '';

              this.shipaddress5old ='';
              this.shipzip5old = '';
              this.shipcity5old = '';
              this.shipstate5old = '';
              this.shipcountry5old = '';


          }
          else if (itm == 2) {
            if (data[0].BSA_Type == 'Shipping' && data[0].BSA_Type !== '') {
              this.shipid4 = data[0].BSA_KeyID;
              this.shipaddress4old = data[0].BSA_Address;
              this.shipaddress4 = data[0].BSA_Address;
              this.shipzip4 = data[0].BSA_Zip;
              this.shipzip4old = data[0].BSA_Zip;
              this.shipcity4 = data[0].BSA_City;
              this.shipcity4old = data[0].BSA_City;
              this.shipstate4 = data[0].BSA_State;
              this.shipstate4old = data[0].BSA_State;
              this.shipcountry4 = data[0].BSA_Country;
              this.shipcountry4old = data[0].BSA_Country;
              this.shipname4=data[0].BSA_Name;
              this.shipname4old = data[0].BSA_Name;

            }




            if (data[1].BSA_Type == 'Shipping') {
              this.shipid1 = data[1].BSA_KeyID;

              this.shipaddress1 = data[1].BSA_Address;
              this.shipzip1 = data[1].BSA_Zip;
              this.shipcity1 = data[1].BSA_City;
              this.shipstate1 = data[1].BSA_State;
              this.shipcountry1 = data[1].BSA_Country;
              this.shipname1=data[1].BSA_Name;
              this.shipname1old = data[1].BSA_Name;

              this.shipaddress1old = data[1].BSA_Address;
              this.shipzip1old = data[1].BSA_Zip;
              this.shipcity1old = data[1].BSA_City;
              this.shipstate1old = data[1].BSA_State;
              this.shipcountry1old = data[1].BSA_Country;
            }




              this.shipid2 = '';
              this.shipaddress2 = '';
              this.shipzip2 = '';
              this.shipcity2 = '';
              this.shipstate2 = '';
              this.shipcountry2 = '';
            this.shipname2='';
            this.shipname2old='';

              this.shipaddress2old = '';
              this.shipzip2old = '';
              this.shipcity2old = '';
              this.shipstate2old ='';
              this.shipcountry2old = '';




              this.shipid3 = '';
              this.shipaddress3 = '';
              this.shipzip3 = '';
              this.shipcity3 = '';
              this.shipstate3 = '';
              this.shipcountry3 = '';
            this.shipname3='';
            this.shipname3old='';

              this.shipaddress3old = '';
              this.shipzip3old = '';
              this.shipcity3old = '';
              this.shipstate3old = '';
              this.shipcountry3old = '';



              this.shipid5 = '';
              this.shipaddress5 = '';
              this.shipzip5 = '';
              this.shipcity5 = '';
              this.shipstate5 = '';
              this.shipcountry5 = '';
            this.shipname5='';
            this.shipname5old='';

              this.shipaddress5old = '';
              this.shipzip5old = '';
              this.shipcity5old = '';
              this.shipstate5old ='';
              this.shipcountry5old = '';


          }
          else if (itm == 1) {
            //console.log("hi im here only");
            if (data[0].BSA_Type == 'Shipping' && data[0].BSA_Type !== '') {
              this.shipid4 = data[0].BSA_KeyID;
              this.shipaddress4old = data[0].BSA_Address;
              this.shipaddress4 = data[0].BSA_Address;
              this.shipzip4 = data[0].BSA_Zip;
              this.shipzip4old = data[0].BSA_Zip;
              this.shipcity4 = data[0].BSA_City;
              this.shipcity4old = data[0].BSA_City;
              this.shipstate4 = data[0].BSA_State;
              this.shipstate4old = data[0].BSA_State;
              this.shipcountry4 = data[0].BSA_Country;
              this.shipcountry4old = data[0].BSA_Country;
              this.shipname4=data[0].BSA_Name;
              this.shipname4old = data[0].BSA_Name;

            }





              this.shipid1 = '';

              this.shipaddress1 ='';
              this.shipzip1 = '';
              this.shipcity1 = '';
              this.shipstate1 = '';
              this.shipcountry1 = '';
this.shipname1='';
            this.shipname1old='';

              this.shipaddress1old = '';
              this.shipzip1old = '';
              this.shipcity1old = '';
              this.shipstate1old = '';
              this.shipcountry1old = '';





              this.shipid2 = '';
              this.shipaddress2 = '';
              this.shipzip2 = '';
              this.shipcity2 = '';
              this.shipstate2 = '';
              this.shipcountry2 = '';
            this.shipname2='';
            this.shipname2old='';

              this.shipaddress2old = '';
              this.shipzip2old = '';
              this.shipcity2old = '';
              this.shipstate2old ='';
              this.shipcountry2old = '';




              this.shipid3 = '';
              this.shipaddress3 = '';
              this.shipzip3 = '';
              this.shipcity3 = '';
              this.shipstate3 = '';
              this.shipcountry3 = '';
            this.shipname3='';
            this.shipname3old='';

              this.shipaddress3old = '';
              this.shipzip3old = '';
              this.shipcity3old = '';
              this.shipstate3old = '';
              this.shipcountry3old = '';

              this.shipid5 = '';
              this.shipaddress5 = '';
              this.shipzip5 = '';
              this.shipcity5 = '';
              this.shipstate5 = '';
              this.shipcountry5 = '';
            this.shipname5='';
            this.shipname5old='';

              this.shipaddress5old = '';
              this.shipzip5old = '';
              this.shipcity5old = '';
              this.shipstate5old ='';
              this.shipcountry5old = '';


          }

          else if (itm ==0) {
            //console.log("hi im here only");

              this.shipid4 = '';
              this.shipaddress4old ='';
              this.shipaddress4 = '';
              this.shipzip4 = '';
              this.shipzip4old ='';
              this.shipcity4 = '';
              this.shipcity4old = '';
              this.shipstate4 = '';
              this.shipstate4old = '';
              this.shipcountry4 = '';
              this.shipcountry4old = '';
            this.shipname4='';
            this.shipname4old='';
               this.shipid1 = '';

              this.shipaddress1 ='';
              this.shipzip1 = '';
              this.shipcity1 = '';
              this.shipstate1 = '';
              this.shipcountry1 = '';

            this.shipname1='';
            this.shipname1old='';
              this.shipaddress1old = '';
              this.shipzip1old = '';
              this.shipcity1old = '';
              this.shipstate1old = '';
              this.shipcountry1old = '';

              this.shipid2 = '';
              this.shipaddress2 = '';
              this.shipzip2 = '';
              this.shipcity2 = '';
              this.shipstate2 = '';
              this.shipcountry2 = '';
            this.shipname2='';
            this.shipname2old='';
              this.shipaddress2old = '';
              this.shipzip2old = '';
              this.shipcity2old = '';
              this.shipstate2old ='';
              this.shipcountry2old = '';


              this.shipid3 = '';
              this.shipaddress3 = '';
              this.shipzip3 = '';
              this.shipcity3 = '';
              this.shipstate3 = '';
              this.shipcountry3 = '';
            this.shipname3='';
            this.shipname3old='';

              this.shipaddress3old = '';
              this.shipzip3old = '';
              this.shipcity3old = '';
              this.shipstate3old = '';
              this.shipcountry3old = '';

              this.shipid5 = '';
              this.shipaddress5 = '';
              this.shipzip5 = '';
              this.shipcity5 = '';
              this.shipstate5 = '';
              this.shipcountry5 = '';
            this.shipname5='';
            this.shipname5old='';

              this.shipaddress5old = '';
              this.shipzip5old = '';
              this.shipcity5old = '';
              this.shipstate5old ='';
              this.shipcountry5old = '';


          }



        }
    );

}
  upBranch(){
    $('#loader').show();
    //console.log(this.latitude,this.longitude);
      this.branchupdate.UpdateBranch(this.BranchId,this.branchcode,this.branchname,this.address,this.city,this.state,this.country,this.zip,this.phone,this.fax,this.accounttype,this.confrom,this.conto,this.description,this.latitude,this.longitude,this.branchemail,this.home,this.mobile, this.biladdress, this.bilcity, this.bilstate, this.bilcountry, this.bilzip,this.bilname,this.shipname1, this.shipaddress1, this.shipcity1, this.shipstate1, this.shipcountry1, this.shipzip1, this.shipaddress2, this.shipcity2, this.shipstate2, this.shipcountry2, this.shipzip2,this.shipname2,this.shipname3, this.shipaddress3, this.shipcity3, this.shipstate3, this.shipcountry3, this.shipzip3, this.shipaddress4, this.shipcity4, this.shipstate4, this.shipcountry4, this.shipzip4,this.shipname4,this.shipname5, this.shipaddress5, this.shipcity5, this.shipstate5, this.shipcountry5, this.shipzip5,this.bilid,this.shipid1,this.shipid2,this.shipid3,this.shipid4,this.shipid5,this.private_description).subscribe(
          data => {
            this.results = data;
            if(this.results[0].result =="success")
            {
              $('#loader').hide();
              $("#loader").css("visibility", "hidden");
              swal({
                title: "Updated!",
                text: "Branch Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.router.navigate(['branch/overview/'],{ queryParams: { id: this.BranchId } });
            }

          }
      );
  }
  Navigation()
  {
      this.router.navigate(['branch/overview/'],{ queryParams: { id: this.BranchId } });

  }

  GoogleAddress(city,state) {
      let address: any;
      if (state === '') {
          address = city;
      } else {
          address = city + ',' + state;
      }
    this.branchupdate.LoadGoogleMapAddress(address).subscribe(
        data => {
          let addresslength: any;
          addresslength = data.results[0].address_components.length;
          for ( let i = 0; i < addresslength; i++) {
            //console.log(i);
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
  GoogleAddressbil(city) {
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
  GoogleAddressship5(city) {
    this.branchupdate.LoadGoogleMapAddress(city).subscribe(
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
          this.shipzoom5 = 12;
        });
      });
    });
  }
}
