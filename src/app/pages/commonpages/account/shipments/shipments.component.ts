import { ElementRef,Component, OnInit, ViewChild, Input,OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {ShipmentService} from "../../branch/services/shipment.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {RequestService} from "../../branch/services/request.service";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalVariable} from "../../../../global/global";
import {AccountpartlistComponent} from "../accountpartlist/accountpartlist.component";


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
    @ViewChild('dirShipmentDate') public dirShipmentDate: ElementRef;

    @Input() id;
    @Input() name;

    @ViewChild('EffectiveDate') public AGM_EffectiveDate_Arr: ElementRef;
    @ViewChild('EndDate') public AGM_EndDate_Arr: ElementRef;
    @ViewChild('Renewal_AlertDate') public AGM_Renewal_AlertDate_Arr: ElementRef;

    selectedRow: Number = 0;
    setClickedRow: Function;

    requestedbranches: any;
    dirrequestedbranches: any;
    shipmentcompanies: any;
    parts: any;
    qtys: any=[];
    trackcode: any;
    shipmentcompany: any;
    dirshipmentcompany: any;
    shipmentdate:any;
    dirshipmentdate:any;
    requestto: any;
    dirrequestto: any;
    shipmentsresults: any;
    shipmentrequests: any;
    trackinfo: any;
    shipto:any;
    trackstatus:any;
    requesttoAddress: any;
    requesttype:any = 'Manufacturer';
    UpdateTrackid:any;
    ShipmentId:any;
    partsid: any = [];
    shpchk:any;
    checkqtyval:any=0;
    values:any='';
    Asssubmenu:any;
    Asssubbutton:any;
    shipmentType:any = '1';
    HerokitTrue: any = false;
    RequestTrue: any = false;
    add:any;
    edit:any;
    delete:any;
    viewbtn: any;
    sessid:any;
    herokitid: any = '';
    dirherohitType: any = '';
    request: any = '0';
    ticketId: any = '';
    directshipment = 'Y';
    mulherokitlist: any='';
    allheroassignedpart: any = '';
    shipmentInfo: any;
    shipmentId: any;
    GRM_GoodsReceipt_Path: any;
    Spod_Path: any;
    companyId:any;
    formatedDate: Date;
    urmid:any='';
    showloading: any = false;
    grpdf: any;
    trackingAddress: any;
    shipmentgr: any;
    dirtrackcode: any;
    requesttoCity:any;
    requesttoZip:any;
    requesttoState: any;
    requesttoCountry: any;
    updatedtrackid:any;
    generaltrackid:any;
    checkedcount:any=0;
    seconds:any;
    qtyerror:any=0;
    spanval:any;
    existparts: any = [];
    fromdatem: any;
    todatem: any;
    spod: any;
    constructor(public accpar:AccountpartlistComponent,public router: Router,private domSanitizer : DomSanitizer,public shipmentserv:ShipmentService,public menu:MenumanagementService,public requestService:RequestService) {
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

        var dateNow2 = new Date();

        $('.datepicker-only-init2').datetimepicker({
            format: 'MM/DD/Y',
            minDate: 0,
            defaultDate:dateNow2,
            widgetPositioning: {
                horizontal: 'left'
            }
        });
        this.shipmentdate = (dateNow.getMonth()+1)+'/'+dateNow.getDate()+'/'+dateNow.getFullYear();
        this.dirshipmentdate = (dateNow.getMonth()+1)+'/'+dateNow.getDate()+'/'+dateNow.getFullYear();


        //console.log('Date',dateNow.getFullYear(),'/',dateNow.getMonth(),'/',dateNow.getDate());
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

    dirLoadRequestedBranches(id) {
        this.shipmentserv.dirLoadRequestedBranches(id).subscribe(
            data => {
                this.dirrequestedbranches = data;
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
        if(this.shipmentType=='1') // call only during requestedshipment
        {
            this.shipmentserv.LoadParts(requestfrom,requestto,'Manufacturer').subscribe(
                data => {
                    this.parts = data;

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

    LoadPartsshipments(requestfrom,requestto) {
        this.shipmentserv.LoadPartsshipments(requestfrom,requestto,'Manufacturer',this.shipmentType).subscribe(
            data => {
                this.parts = data;
            }
        );

        if(requestfrom!='')
        {
            this.shipmentserv.Findbranch(requestfrom).subscribe(
                data => {
                    this.requesttoAddress = data['BM_Address'];
                    //console.log(this.requesttoAddress);
                }
            );
        }
    }

    createShipment(form)
    {
        this.shipmentserv.createShipment(form).subscribe(
            data => {

                this.shipmentInfo = data;
                this.shipmentId = this.shipmentInfo.shipmentid;

                if ( data.result === 'success' ) {
                    swal({
                        title: 'Created!',
                        text: 'Shipment Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    // Createg Auto GR
                    this.accpar.assignedparts(this.id);
                    this.Creategr(this.shipmentId);

                    //console.log(this.shipmentId);
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: 'Please enter current stock, quantity.',
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

    Creategr(id) {
        this.shipmentserv.Creategr(id).subscribe(
            data => {
                this.LoadShipments(this.id,'','');
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
                this.Spod_Path = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API+data[0].RPSM_SPOD_Document);
            }
        );
    }


    trackId(company,id,type)
    {

            this.showloading = true;
            this.generaltrackid = id;
            this.shipmentserv.trackIdacc(company,id).subscribe(
                data => {
                    this.trackinfo = data;
                    this.trackingAddress = this.trackinfo.address;
                    this.trackstatus = this.trackinfo.result;
                    this.spod = this.trackinfo.spod;
                    /*if(this.generaltrackid == this.trackinfo.trackcode)
                    {
                        this.trackstatus = this.trackinfo.result;
                    }
                    else
                    {
                        this.trackstatus = '';
                    }*/

                    /*this.shipto = this.trackinfo.TrackPackagesResponse.packageList[0].shippedTo;
                     if(this.shipto!=this.requesttoAddress)
                     {
                     alert('Requested delivery address('+this.requesttoAddress+') and receipent delivery address('+this.shipto+') are not same');
                     }*/

                    //console.log('Inside',this.trackinfo);

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

                    this.showloading = false;
                    /*test*/
                }
                ,
                err => {
                    this.showloading = false;
                },
            );

    }

    setTrackid(trackId,shipmentid,address,companyId,shipmentto)
    {
        this.UpdateTrackid = trackId;
        this.ShipmentId = shipmentid;
        this.requesttoAddress = address;
        this.companyId = companyId;
        this.Findbranchinfo(shipmentto);

    }

    UpdateTrack(form)
    {
        this.shipmentserv.UpdateTrack(form).subscribe(
            data => {
                //console.log('Result',form);
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Updated!',
                        text: 'Track Code Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.shipmentInfo = data;
                    this.shipmentId = this.shipmentInfo.shipmentid;
                    this.Creategr(this.shipmentId);
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: "Error occurs, please try after some time",
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }
    textenable(i,event:any)
    {

        this.values=$("#shqty"+i).val();
        //console.log(i,this.values);

        console.log(this.partsid,this.values);
    }
    updateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#shqty"+i).prop("readonly", false);
            $("#shqty"+i).val('');
            this.textenable(i,'');
            $("#ytbqtymsg"+i).html('Please enter the quantity');
            this.partsid.push(chBox);
            this.checkedcount = this.checkedcount+1;
        }
        else if (!event.target.checked){
            $("#shqty"+i).prop("readonly", true);
            $("#shqty"+i).val('');
            $("#ytbqtymsg"+i).html('');

            let indexx = this.partsid.indexOf(chBox);
            this.partsid.splice(indexx,1);
            this.checkedcount = this.checkedcount-1
        }
        if(this.partsid)
        {
            //console.log(this.partsid);
        }

        // Find any checkbox checked
        if ($('.shpchk :checkbox:checked').length > 0){
            this.shpchk=1;
        }
        else{
            this.shpchk=0;
        }
        console.log('check',this.checkedcount);
    }

    /* check service charge assigned */
    checkService()
    {
        if((this.partsid.length > 0)){
        //if((this.partsid.length > 0) && (this.checkedcount==this.partsid.length)){
            return false;
        }
        else if(this.shipmentcompany=='')
        {
            return true;
        }
        else{
            return true;
        }
    }

    checkqty()
    {
        //console.log('QTY ERROR',this.qtyerror);
        /*if(this.checkqtyval==1){
            return false;
        }else{
            return true;
        }

        var inputs = $(".spancls");
        for(var i = 0; i < inputs.length; i++){
          // console.log(i,$(inputs[i]).val());
            if($(inputs[i]).text()!='')
            {
                this.qtyerror = this.qtyerror+1;
            }
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

        //var arr = [];
        /*$(".spancls").each(function(index, elem){
            this.spanval.push($(".spancls").text());
        });*/

       // console.log('sapn val',arr.length);
    }

    ytbquantity(i)
    {
        /*var crs = parseInt($("#crs"+i).val());
        if(isNaN(crs))
        {
            crs = 0;
        }*/

        if(parseInt($("#shqty"+i).val())>parseInt($("#ytbty"+i).val()))
        {
            $("#ytbqtymsg"+i).html('Shipment quantity should not be greater than Yet to be shipped quantity');
            this.checkqtyval=0;
            this.qtyerror=0;
        }
        else if( parseInt($("#shqty"+i).val()) > parseInt($("#crs"+i).val()) )
        {
            $("#ytbqtymsg"+i).html('Shipment quantity should not be greater than current stock');
            this.checkqtyval=0;
            this.qtyerror=0;
           // console.log('2');

        }
        else if( isNaN( parseInt($("#shqty"+i).val()) ) )
        {
            $("#ytbqtymsg"+i).html('Please enter the quantity');
            this.checkqtyval=0;
            this.qtyerror=0;
            //console.log('3');
        }
        else
        {
            $("#ytbqtymsg"+i).html('');
            this.checkqtyval=1;
            this.qtyerror=1;
            //console.log('4');
        }

        var apdid = parseInt( $("#apdid"+i).val() );
        var crs = parseInt( $("#crs"+i).val() );
        var shqty = parseInt( $("#shqty"+i).val() );
        var newarr = [];
        newarr.push(i, apdid, crs, shqty);

        this.existparts.push(newarr);
        //console.log(this.existparts);

        // calculate error count
        if( ( parseInt($("#shqty"+i).val())>parseInt($("#ytbty"+i).val()) ) || ( parseInt($("#shqty"+i).val()) > parseInt($("#crs"+i).val()) ) || ( isNaN( parseInt($("#shqty"+i).val()) ) ))
        {
            this.qtyerror=this.qtyerror+1;
        }
        else
        {
            this.qtyerror=this.qtyerror-1;
        }

        //console.log('Count Qty ERRROR:',this.qtyerror);

    }
    fromref()
    {
        $("#track_code").val('');
        $('#shipment_to').prop('selectedIndex',0);
        $('#shipment_company').prop('selectedIndex',0);
        $('#tobranch').prop('selectedIndex',0);
        $('#herokitid').prop('selectedIndex',0);
        this.LoadParts('','');
        this.LoadPartsshipments('','');
        //this.findherokit('');
        this.dirherohitType='';
        this.mulherokitlist = [];
        this.shipmentcompany='';
        this.dirshipmentcompany = '';
        this.dirtrackcode = '';
        this.trackcode = '';
        this.trackstatus = '';
        this.checkqtyval=0;
        this.trackingAddress = '';
        this.requesttoAddress = '';
        this.generaltrackid = '';

        /*setTimeout(function() {
           // document.getElementById("updatetrack").disabled = false;
            $( "#updatetrack" ).prop( "disabled", true );
            $( "#updatetrackcancel" ).prop( "readonly", true );
        }, 10000);*/

    }
    Loadbuttons() {
        this.menu.Loadbutton(2,72,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
                this.viewbtn=this.Asssubbutton[0].MA_View;
               // console.log('deletvalue'+this.delete);

            }
            //() => console.log('site loaded')
        );

    }

    shipmentTypeset(param)
    {
        this.dirshipmentcompany = '';
        this.dirtrackcode = '';

        if(param==2)
        {
            this.RequestTrue = true;
            this.dirLoadRequestedBranches(this.id);
            $("#herorequestto").val('');
            this.dirrequestto = '';
        }
        else
        {
            this.RequestTrue = false;
            this.HerokitTrue = false;
            $("#herorequestto").val('');
            this.requestto = 0;
        }

        this.parts = [];
        this.fromref();
    }

    herokitTypeset(param,shipmentto,id)
    {
        if(param=='Y')
        {
            this.HerokitTrue = true;
            //this.mulherokitlist = '';
            this.findherokit(shipmentto);
            this.LoadPartsshipments('','');
        }
        else
        {
            this.HerokitTrue = false;
            this.LoadPartsshipments(shipmentto,id);
            //this.mulherokitlist = '';
            this.findherokit('');

        }
    }

    createDirectShipment(form)
    {
        //$('#loader').show();
        this.shipmentserv.createDirectShipment(form).subscribe(
            data => {
                //console.log('Result',form);
                this.shipmentInfo = data;
                this.shipmentId = this.shipmentInfo.shipmentid;

                if ( data.result === 'success' ) {
                    swal({
                        title: 'Created!',
                        text: 'Shipment Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    // Createg Auto GR
                    this.Creategr(this.shipmentId);
                    $('#loader').hide();
                }
            },
            err => {
                swal({
                    title: 'Error',
                    text: 'Please enter current stock, quantity.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }

    findherokit(id)
    {
        this.requestService.findherokit(this.id,this.requesttype,id).subscribe(
            data => {
                this.mulherokitlist = data;
            },
        );
    }

    findherokitparts(type,id,requestto)
    {
        this.requestService.findherokitparts(id,type,this.id,requestto).subscribe(
            data => {
                this.parts = data;
            },
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

    /*formatDate(obj) {
        this.formatedDate = new Date(obj.replace(/-/g, "/"));
        return this.formatedDate;
    }*/
}
