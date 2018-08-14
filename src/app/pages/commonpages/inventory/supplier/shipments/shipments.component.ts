import { ElementRef,Component, OnInit, ViewChild, Input,OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {ShipmentService} from "../../../branch/services/shipment.service";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";

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
  requesttype:any = 'Supplier';
  UpdateTrackid:any;
  ShipmentId:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    partsid: any = [];
    shpchk:any;
    checkqtyval:any=1;
    values:any='';
    Asssubbutton:any;
    fromdatem: any;
    todatem: any;
  constructor(public router: Router,public shipmentserv:ShipmentService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
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
    this.shipmentserv.LoadParts(requestfrom,requestto,'Supplier').subscribe(
        data => {
          this.parts = data;
        }
    );

    if(requestfrom!='')
    {
        this.shipmentserv.Findbranch(requestfrom).subscribe(
            data => {
                this.requesttoAddress = data['BM_Address'];
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
          if ( data.result === 'success' ) {
            swal({
              title: 'Created!',
              text: 'Shipment Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
              this.LoadShipments(this.id,'','');
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

  LoadShipments(id,fromdate,todate) {
    this.shipmentserv.LoadShipments(id,fromdate,todate).subscribe(
        data => {
          this.shipmentsresults = data;
        }
    );
  }

  LoadShipmentrequests(id) {
    this.shipmentserv.LoadShipmentrequests(id).subscribe(
        data => {
          this.shipmentrequests = data;
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

  trackId(id)
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
  }

    setTrackid(trackId,shipmentid,address)
    {
        this.UpdateTrackid = trackId;
        this.ShipmentId = shipmentid;
        this.requesttoAddress = address;
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
                    this.LoadShipments(this.id,'','');
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
            $("#ytbqtymsg"+i).html('');
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
        if((this.partsid.length > 0)&& (this.values.length>0)){
            return false;
        }else{
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
        else
        {
            $("#ytbqtymsg"+i).html('');
            this.checkqtyval=1;
        }
    }

    checkqty()
    {
        if(this.checkqtyval==1){
            return false;
        }else{
            return true;
        }
    }
    fromref()
    {
        $("#track_code").val('');
        $('#shipment_to').prop('selectedIndex',0);
        $('#shipment_company').prop('selectedIndex',0);
        this.LoadParts('','');
    }

    Loadbuttons() {
        this.menu.Loadbutton(11,80,this.sessid).subscribe(
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
