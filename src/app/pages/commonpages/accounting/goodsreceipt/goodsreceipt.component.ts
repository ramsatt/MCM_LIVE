import { ElementRef,Component, OnInit, ViewChild, Input,OnChanges } from '@angular/core';
import {Router} from '@angular/router';
import {ShipmentService} from "../../branch/services/shipment.service";
import {DomSanitizer} from "@angular/platform-browser";
import {GlobalVariable} from "../../../../global/global";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;


@Component({
  selector: 'app-goodsreceipt',
  templateUrl: './goodsreceipt.component.html',
  styleUrls: ['./goodsreceipt.component.scss']
})
export class GoodsreceiptComponent implements OnInit,OnChanges {

  selectedRow: Number = 0;
  setClickedRow: Function;
  GR_ID:any;
  shippedbranches: any;
  Receiveforid: any = 0;
  shipmentfrom:any;
  requesttype:any;
  shipments:any;
  accountshipments:any;
  branchshipments:any;
  suppliershipments:any;
    ReceiveFors: any = 0;
    Receivefrom:any = 0;
    requestallgr:any;
    Requestinfo:any;
    requesttypeaccount: any = 'Manufacturer';
    requesttypebranch: any = 'Branch';
    requesttypesupplier: any = 'Supplier';
    random: any = Math.floor((Math.random() * 1000000) + 1);
    GRM_KeyID: any;
    Request_Type:any;
    forname:any;
    fromname:any;
    GRM_Receive_From_Type:any;
    GRM_Receipt_Date: any;
    RequestForType:any='Branch';
    shipmentsbygr:any;
    GRM_GoodsReceipt_Path:any;
    partsid: any = [];
    accpartsid: any = [];
    brpartsid: any = [];
    suppartsid: any = [];
    genpartsid: any = [];
    checkqtyval:any=1;
    brcheckqtyval:any=1;
    supcheckqtyval:any=1;
    acccheckqtyval: any = 1;

    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    viewbtn:any;
    delete:any;
    sessid:any;


  constructor(public router: Router,private domSanitizer : DomSanitizer,public shipmentserv:ShipmentService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.Loadbuttons();
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };
  }

  ngOnInit() {

    var dateNow = new Date();

    $('.datepicker-only-init2').datetimepicker({
      format: 'MM/DD/Y',
      minDate: 0,
      defaultDate:dateNow,
      widgetPositioning: {
        horizontal: 'left'
      }
    });

      this.LoadShippedBranches();
      this.LoadGr();

      //$('#random').val(Math.floor((Math.random() * 1000000) + 1));
      //console.log($('#random').val());
     // document.getElementById('random').val = Math.floor((Math.random() * 1000000) + 1);
  }

  ngOnChanges() {
    this.LoadShippedBranches();
    this.LoadGr();
  }

    LoadGr() {
        this.shipmentserv.LoadGr(this.requesttypeaccount,this.requesttypebranch,this.requesttypesupplier).subscribe(
            data => {
                this.requestallgr = data;
                this.GR_ID = this.requestallgr[0].GRM_KeyID;
                this.Request_Type = this.requestallgr[0].GRM_Receive_From_Type;
                this.Requestbyid(this.GR_ID,this.Request_Type);
               //this.Shipmentbygrid(this.GR_ID);
            }
        );
    }

    Requestbyid(id,type) {
        this.shipmentserv.Requestbyid(id,type).subscribe(
            data=> {
                this.Requestinfo = JSON.stringify(data);

               this.GRM_KeyID = data[0].GRM_KeyID;
                var d = new Date(data[0].GRM_Receipt_Date);
                var op2 = (d.getMonth()+1)+'/'+d.getDate()+'/'+(d.getFullYear());
                this.GRM_Receipt_Date = data[0].GRM_Receipt_Date;

               //this.GRM_Receipt_Date = data[0].GRM_Receipt_Date;
               this.forname = data[0].forname;
               this.fromname = data[0].fromname;
               this.GRM_Receive_From_Type = data[0].GRM_Receive_From_Type;
               this.GRM_GoodsReceipt_Path = this.domSanitizer.bypassSecurityTrustResourceUrl(GlobalVariable.BASE_FILE_API+data[0].GRM_GoodsReceipt_Path);
               }
        );
        // Load Shipments Details in bottom of the page
        this.shipmentserv.Shipmentbygrid(id).subscribe(
            data=> {
                this.shipmentsbygr = data;
            }
        );

    }

    changeAccount(event) {
        if (event.target.checked) {
            this.requesttypeaccount = 'Manufacturer';
        } else if (!event.target.checked) {
            this.requesttypeaccount = '';
        }
        this.LoadGr();
    }

    changeSupplier(event) {
        if (event.target.checked) {
            this.requesttypesupplier = 'Supplier';
        } else if (!event.target.checked) {
            this.requesttypesupplier = '';
        }
        this.LoadGr();
    }

    changeBranch(event) {
        if (event.target.checked) {
            this.requesttypebranch = 'Branch';
        } else if (!event.target.checked) {
            this.requesttypebranch = '';
        }
        this.LoadGr();
    }

  LoadShippedBranches() {
    this.shipmentserv.LoadShippedBranches().subscribe(
        data => {
          this.shippedbranches = data;
        }
    );
  }

    setReceiveforid(id)
    {
        this.Receiveforid=id;
    }

    multisetReceiveforid(id)
    {
        this.Receiveforid=id;
        this.findShipmentfromaccount('Manufacturer');
        this.findShipmentfrombranch('Branch');
        this.findShipmentfromsupplier('Supplier');
    }

   findShipmentfromaccount(type)
    {
        this.shipmentserv.loadshipmentsbytype(type,this.Receiveforid).subscribe(
            data => {
                this.accountshipments = data;
            }
        );
    }

    findShipmentfrombranch(type)
    {
        this.shipmentserv.loadshipmentsbytype(type,this.Receiveforid).subscribe(
            data => {
                this.branchshipments = data;
            }
        );
    }

    findShipmentfromsupplier(type)
    {
        this.shipmentserv.loadshipmentsbytype(type,this.Receiveforid).subscribe(
            data => {
                this.suppliershipments = data;
            }
        );
    }

    findShipmentfrom(type)
    {
        this.requesttype = type;
        this.shipmentserv.findShipmentfrom(type,this.Receiveforid).subscribe(
            data => {
                this.shipmentfrom = data;
            }
        );
    }

    loadshipments(Receivefrom,type)
    {
        this.shipmentserv.loadshipments(Receivefrom,type,this.Receiveforid).subscribe(
            data => {
                this.shipments = data;
            }
        );
    }

    createGR(form)
    {
        this.shipmentserv.createGR(form).subscribe(
            data => {
                 if ( data.result === 'success' ) {
                    swal({
                        title: 'Created!',
                        text: 'Goods Receipt Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.LoadGr();
                    //this.LoadShipments(this.id);
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

        //form.reset();
        //this.random = Math.floor((Math.random() * 1000000) + 1);
        $('#singlegr').modal("hide");
    }

    createGRmultiple(formaccount,formbranch,formsupplier)
    {

        let formsvalue = [formaccount,formbranch,formsupplier];
        var keyword = this;
        formsvalue.forEach(function(form) {

            keyword.shipmentserv.createGRmultiple(form).subscribe(
                data => {
                    //console.log('Result',form);
                    if ( data.result === 'success' ) {
                        swal({
                            title: 'Created!',
                            text: 'Goods Receipt Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                        keyword.LoadGr();
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

        });
        this.random = Math.floor((Math.random() * 1000000) + 1);

    }

    updateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#shqty"+i).prop("readonly", false);
            $("#shqty"+i).val(0);
            $("#ytbqtymsg"+i).html('');
            this.partsid.push(chBox);
        }
        else if (!event.target.checked){
            $("#shqty"+i).prop("readonly", true);
            $("#shqty"+i).val(0);
            $("#ytbqtymsg"+i).html('');

            let indexx = this.partsid.indexOf(chBox);
            this.partsid.splice(indexx,1);
        }
        if(this.partsid)
        {

        }

    }

    ytbquantity(i)
    {
        if(parseInt($("#shqty"+i).val())>parseInt($("#ytbty"+i).val()))
        {
            $("#ytbqtymsg"+i).html('Received quantity should not be greater than Yet to be Shipped quantity');
            this.checkqtyval=0;
            //this.checkqty();
        }
        else
        {
            $("#ytbqtymsg"+i).html('');
            this.checkqtyval=1;
            //this.checkqty();
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

    /* check check box is enabled*/
    checkService()
    {
        if(this.partsid.length > 0){
            return false;
        }else{
            return true;
        }

    }

    fromref2()
    {

        $('#requestto1').prop('checked',false);
        $('#requestto2').prop('checked',false);
        $('#requestto3').prop('checked',false);
        $('#select1 option:selected').removeAttr('selected');
        $('#select2 option:selected').removeAttr('selected');

        this.shipments=[];
        this.shipmentfrom=[];
    }

    // Multiple GR
    fromref3()
    {
        $('#selectmultiple option:selected').removeAttr('selected');
        this.accountshipments=[];
        this.branchshipments=[];
        this.suppliershipments=[];
    }

    accupdateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#accshqty"+i).prop("readonly", false);
            $("#accshqty"+i).val(0);
            $("#accytbqtymsg"+i).html('');
            this.genpartsid.push(chBox);
        }
        else if (!event.target.checked){
            $("#accshqty"+i).prop("readonly", true);
            $("#accshqty"+i).val(0);
            $("#accytbqtymsg"+i).html('');

            let indexx = this.genpartsid.indexOf(chBox);
            this.genpartsid.splice(indexx,1);
        }
    }

    accytbquantity(i)
    {
        if(parseInt($("#accshqty"+i).val())>parseInt($("#accytbty"+i).val()))
        {
            $("#accytbqtymsg"+i).html('Received quantity should not be greater than Shipment quantity');
            this.acccheckqtyval=0;
            //this.checkqty();
        }
        else
        {
            $("#accytbqtymsg"+i).html('');
            this.acccheckqtyval=1;
            //this.checkqty();
        }


    }

    acccheckqty()
    {
        if(this.acccheckqtyval==1){
            return false;
        }else{
            return true;
        }
    }

    acccheckService()
    {
        if(this.accpartsid.length > 0){
            return false;
        }else{
            return true;
        }

    }

    brupdateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#brshqty"+i).prop("readonly", false);
            $("#brshqty"+i).val(0);
            $("#brytbqtymsg"+i).html('');
            this.genpartsid.push(chBox);
        }
        else if (!event.target.checked){
            $("#brshqty"+i).prop("readonly", true);
            $("#brshqty"+i).val(0);
            $("#brytbqtymsg"+i).html('');

            let indexx = this.genpartsid.indexOf(chBox);
            this.genpartsid.splice(indexx,1);
        }
    }

    brytbquantity(i)
    {
        if(parseInt($("#brshqty"+i).val())>parseInt($("#brytbty"+i).val()))
        {
            $("#brytbqtymsg"+i).html('Received quantity should not be greater than Yet to be Shipment quantity');
            this.brcheckqtyval=0;
            //this.checkqty();
        }
        else
        {
            $("#brytbqtymsg"+i).html('');
            this.brcheckqtyval=1;
            //this.checkqty();
        }


    }

    brcheckqty()
    {
        if(this.brcheckqtyval==1){
            return false;
        }else{
            return true;
        }
    }

    brcheckService()
    {
        if(this.brpartsid.length > 0){
            return false;
        }else{
            return true;
        }

    }

    supupdateCheckedOptions(chBox, event,i) {

        if(event.target.checked) {
            $("#supshqty"+i).prop("readonly", false);
            $("#supshqty"+i).val(0);
            $("#supytbqtymsg"+i).html('');
            this.genpartsid.push(chBox);
        }
        else if (!event.target.checked){
            $("#supshqty"+i).prop("readonly", true);
            $("#supshqty"+i).val(0);
            $("#supytbqtymsg"+i).html('');

            let indexx = this.genpartsid.indexOf(chBox);
            this.genpartsid.splice(indexx,1);
        }
    }

    supytbquantity(i)
    {
        if(parseInt($("#supshqty"+i).val())>parseInt($("#supytbty"+i).val()))
        {
            $("#supytbqtymsg"+i).html('Received quantity should not be greater than Yet to be Shipment quantity');
            this.supcheckqtyval=0;
            //this.checkqty();
        }
        else
        {
            $("#supytbqtymsg"+i).html('');
            this.supcheckqtyval=1;
            //this.checkqty();
        }


    }

    supcheckqty()
    {
        if(this.supcheckqtyval==1){
            return false;
        }else{
            return true;
        }
    }

    supcheckService()
    {
        if(this.suppartsid.length > 0){
            return false;
        }else{
            return true;
        }

    }

    gencheckService()
    {
        if(this.genpartsid.length > 0){
            return false;
        }else{
            return true;
        }

    }
    Loadbuttons() {
        this.menu.Loadbutton(9,34,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
                this.viewbtn=this.Asssubbutton[0].MA_View;


            }
        );

    }

}
