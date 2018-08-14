import { ElementRef,Component, OnInit, ViewChild, Input,OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {ShipmentService} from "../services/shipment.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalVariable} from "../../../../global/global";


declare var $;
declare var swal;

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss']
})
export class ShipmentsComponent implements OnInit,OnChanges {

  /* Public Variable */
  @ViewChild('ShipmentDate') public ShipmentDate: ElementRef;

  @Input() id;
  @Input() name;
  @Input() brStatus;
  selectedRow: Number = 0;
  setClickedRow: Function;

  requestedbranches: any;
  shipmentcompanies: any;
  parts: any;
  qtys: any=[];
  trackcode: any;
  shipmentcompany: any;
  shipmentdate:any;
  requestto: any;
  shipmentsresults: any;
  shipmentrequests: any;
  trackinfo: any;
  shipto:any;
  trackstatus:any;
  requesttoAddress: any;
  requesttype:any = 'Branch';
  UpdateTrackid: any;
  ShipmentId: any;
  Updatedtrackstatus: any;
  partsid: any = [];
  shpchk:any;
  checkqtyval:any=1;
    shipmentInfo: any;
    shipmentId: any;
    GRM_GoodsReceipt_Path: any;
    values:any='';
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    urmid:any='';
    companyID: any;
    showloadingbr: any = false;
    trackingAddressbr: any;
    grpdf: any;
    shipmentgr:any;
    requesttoCity:any;
    requesttoState:any;
    requesttoCountry:any;
    requesttoZip:any;
    fromdatem: any;
    todatem: any;
  constructor(public router: Router,private domSanitizer : DomSanitizer,public shipmentserv:ShipmentService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.urmid=localStorage.getItem('urmid');
      this.Loadbuttons();
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };
  }

  ngOnInit()
  {
    var dateNow = new Date();

    $('.datepicker-only-init').datetimepicker({
      format: 'MM/DD/Y',
      minDate: 0,
      defaultDate:dateNow,
      widgetPositioning: {
        horizontal: 'left'
      }
    });

      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });

    //this.LoadRequestedBranches(this.id);
   // this.LoadShipmentCompanies();
  }
  ngOnChanges() {
    this.LoadRequestedBranches(this.id);
    this.LoadShipmentCompanies();
    this.LoadShipments(this.id,'','');
  }

  LoadRequestedBranches(id) {
    this.shipmentserv.LoadRequestedBranches(id).subscribe(
        data => {
          this.requestedbranches = data;
        }
    );
  }

  LoadShipmentCompanies() {
    this.shipmentserv.LoadShipmentCompanies().subscribe(
        data => {
          this.shipmentcompanies = data;
        }
    );
  }

  LoadParts(requestfrom,requestto) {
    this.shipmentserv.LoadParts(requestfrom,requestto,'Branch').subscribe(
        data => {
          this.parts = data;
          //console.log('parts Data',data);
            setTimeout(function() {
                var $table = $('.demo1');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover1');
                    }
                });
            }, 1000);
        }
    );

      if(requestfrom!='')
      {
          this.shipmentserv.Findbranch(requestfrom).subscribe(
              data => {
                  if(data[0])
                  {
                      this.requesttoAddress = data[0]['shipAddress'];
                      this.requesttoCity = data[0]['city'];
                      this.requesttoState = data[0]['state'];
                      this.requesttoCountry = data[0]['country'];
                      this.requesttoZip = data[0]['zip'];
                  }
                  else
                  {
                      this.requesttoAddress = '';
                      this.requesttoCity = '';
                      this.requesttoZip = '';
                      this.requesttoState = '';
                      this.requesttoCountry = '';
                  }
              }
          );
      }

  }

  createShipment(form)
  {
    //console.log(form);
    //this.shipmentdate = this.ShipmentDate.nativeElement.value;
      //form.show.push(this.shipmentdate, this.ShipmentDate.nativeElement.value);
      //this.myForm.addControl(newName, data);

    this.shipmentserv.createShipment(form).subscribe(
        data => {
            this.shipmentInfo = data;
            this.shipmentId = this.shipmentInfo.shipmentid;
            this.partsid = [];
          if ( data.result === 'success' ) {
            swal({
              title: 'Created!',
              text: 'Shipment Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
              // Createg Auto GR
              this.Creategr(this.shipmentId);
             // this.LoadShipments(this.id);
          }
        },
        err => {
          swal({
            title: 'Error',
            text: "Please enter current stock, quantity.",
            type: 'error',
            confirmButtonClass: 'btn-danger'
          });
        },
    );
  }

    Creategr(id) {
        this.shipmentserv.Creategr(id).subscribe(
            data => {
                this.LoadShipments(this.id,'','');
            }
        );
    }

  LoadShipments(id,fromdate,todate) {
    this.shipmentserv.LoadShipments(id,fromdate,todate).subscribe(
        data => {
          this.shipmentsresults = data;
            var $table = $('.demo');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });
        }
    );
  }

    LoadShipmentrequests(id) {
        this.shipmentserv.LoadShipmentrequests(id).subscribe(
            data => {
                this.shipmentrequests = data;
            }
        );

        this.shipmentserv.LoadShipmentgr(id).subscribe(
            data => {
                this.shipmentgr = data;
                this.GRM_GoodsReceipt_Path = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API+data[0].GRM_GoodsReceipt_Path);
                this.grpdf = data[0].GRM_GoodsReceipt_Path;
            }
        );
    }

    /*trackId(id)
    {
        this.shipmentserv.trackId(id).subscribe(
            data => {
                this.trackinfo = data;
                this.trackstatus = this.trackinfo.TrackPackagesResponse.packageList[0].keyStatus;
                this.shipto = this.trackinfo.TrackPackagesResponse.packageList[0].shippedTo;
                if(this.shipto!=this.requesttoAddress)
                {
                    alert('Requested delivery address('+this.requesttoAddress+') and receipent delivery address('+this.shipto+') are not same');
                }
                //console.log(this.trackinfo.TrackPackagesResponse.packageList[0].keyStatus);
            }
        );
    }*/

    /*trackId(company,id)
    {
        this.shipmentserv.trackIdacc(company,id).subscribe(
            data => {
                this.trackinfo = data;
                this.trackstatus = this.trackinfo.result;
            }
        );
    }*/

     trackId(company,id,type)
     {

             this.showloadingbr = true;
             this.shipmentserv.trackIdacc(company,id).subscribe(
                 data => {
                     this.trackinfo = data;
                     this.trackstatus = this.trackinfo.result;
                     this.trackingAddressbr = this.trackinfo.address;
                     /*this.shipto = this.trackinfo.TrackPackagesResponse.packageList[0].shippedTo;
                      if(this.shipto!=this.requesttoAddress)
                      {
                      alert('Requested delivery address('+this.requesttoAddress+') and receipent delivery address('+this.shipto+') are not same');
                      }*/
                     console.log('Inside',this.trackinfo);
                     if(this.trackinfo.companytype==2) // for fedex
                     {
                         if(this.requesttoCity != this.trackinfo.city || this.requesttoZip != this.trackinfo.zip || this.requesttoCountry != this.trackinfo.country){
                             alert('Addresses do not match.');
                         }
                     }
                     else if(this.trackinfo.companytype==5) // for usps
                     {
                         if(this.requesttoCity != this.trackinfo.city || this.requesttoZip != this.trackinfo.zip || this.requesttoState != this.trackinfo.state ){
                             alert('Addresses do not match.');
                         }
                     }
                     else if(this.trackinfo.companytype==1) // for ups
                     {
                         if(this.requesttoCity != this.trackinfo.city || this.requesttoZip != this.trackinfo.zip || this.requesttoState != this.trackinfo.state ){
                             alert('Addresses do not match.');
                         }
                     }
                     this.showloadingbr = false;

                 }
                 ,
                 err => {
                     this.showloadingbr = false;
                 },
             );

         //this.showloadingbr = false;
         /*console.log('mid',this.trackinfo);
         setTimeout(function ()
         {
             alert('timeout');
             //this.showloadingbr = false;
             console.log('end',this.trackinfo);
         }, 7000);*/
    }

    setTrackid(trackId,shipmentid,address,companyid,shipmentto)
    {
        this.UpdateTrackid = trackId;
        this.ShipmentId = shipmentid;
        this.requesttoAddress = address;
        this.companyID = companyid;
        this.Findbranchinfo(shipmentto);
    }

    Findbranchinfo(requestfrom) {
        this.shipmentserv.Findbranch(requestfrom).subscribe(
            data => {
                if(data[0])
                {
                    this.requesttoAddress = data[0]['shipAddress'];
                    this.requesttoCity = data[0]['city'];
                    this.requesttoState = data[0]['state'];
                    this.requesttoCountry = data[0]['country'];
                    this.requesttoZip = data[0]['zip'];
                }
                else
                {
                    this.requesttoAddress = '';
                    this.requesttoCity = '';
                    this.requesttoZip = '';
                    this.requesttoState = '';
                    this.requesttoCountry = '';
                }

            }
        );
    }

    UpdateTrack(form)
    {
        this.shipmentserv.UpdateTrack(form).subscribe(
            data => {
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Updated!',
                        text: 'Track Code Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    //this.LoadShipments(this.id);
                    this.shipmentInfo = data;
                    this.shipmentId = this.shipmentInfo.shipmentid;
                    this.Creategr(this.shipmentId);

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
    textenable(i,event:any)
    {
        this.values=$("#shqty"+i).val();
    }
    updateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#shqty"+i).prop("readonly", false);
            $("#shqty"+i).val('');
            this.textenable(i,'');
            $("#ytbqtymsg"+i).html('Please enter the quantity');
            this.partsid.push(chBox);
        }
        else if (!event.target.checked){

            $("#shqty"+i).prop("readonly", true);
            $("#shqty"+i).val('');
            $("#ytbqtymsg"+i).html('');

            let indexx = this.partsid.indexOf(chBox);
            this.partsid.splice(indexx,1);
        }

        // Find any checkbox checked
        if ($('.shpchk :checkbox:checked').length > 0){
            this.shpchk=1;
        }
        else{
            this.shpchk=0;
        }
    }

    /* check service charge assigned */
    checkService()
    {
        /*if((this.partsid.length > 0) && (this.values.length>0)){
            return false;
        }else{
            return true;
        }*/

        if((this.partsid.length > 0)){
            //if((this.partsid.length > 0) && (this.checkedcount==this.partsid.length)){
            return false;
        }
        else{
            return true;
        }

    }

    ytbquantity(i)
    {
        if(parseInt($("#shqty"+i).val())>parseInt($("#ytbty"+i).val()))
        {
            $("#ytbqtymsg"+i).html('Shipment quantity should not be greater than Yet to be shipped quantity');
            this.checkqtyval=0;
        }
        else if( parseInt($("#shqty"+i).val()) > parseInt($("#crs"+i).val()) )
        {
            $("#ytbqtymsg"+i).html('Shipment quantity should not be greater than current stock');
            this.checkqtyval=0;
        }
        else if( isNaN( parseInt($("#shqty"+i).val()) ) )
        {
            $("#ytbqtymsg"+i).html('Please enter the quantity');
            this.checkqtyval=0;
            //console.log('3');
        }
        else
        {
            $("#ytbqtymsg"+i).html('');
            this.checkqtyval=1;
        }

    }

    checkqty()
    {
        /*if(this.checkqtyval==1){
            return false;
        }else{
            return true;
        }*/

        var arr = [];
        $(".spancls").each(function(index, elem){

            if($(this).text()!='')
            {
                arr.push($(this).text());
            }

        });

        if(arr.length==0){
            return false;
        }else{
            return true;
        }
    }

    fromref()
    {
        if(this.brStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Part cannot be shipped",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            $(function () {
                $('#addshipment').modal();
            });
            $("#track_code").val('');
            $('#shipment_to').prop('selectedIndex', 0);
            $('#shipment_company').prop('selectedIndex', 0);
            this.LoadParts('', '');
            this.trackstatus = '';
            this.trackingAddressbr = '';
            this.requesttoAddress = '';
            this.trackcode = '';
        }
    }
    Loadbuttons() {
        this.menu.Loadbutton(8,30,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
            }
            //() => console.log('site loaded')
        );

    }

    filter(from,to)
    {
        //console.log(from,to);
        this.LoadShipments(this.id,from,to);
    }

    resetfilter(from,to)
    {
        console.log(from,to);
        this.fromdatem = '';
        this.todatem = '';
        this.LoadShipments(this.id,'','');
    }

}
