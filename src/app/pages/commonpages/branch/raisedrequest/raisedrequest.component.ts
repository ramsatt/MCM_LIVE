import { Component, OnInit,Input,OnChanges} from '@angular/core';
import {BranchoverviewComponent} from "../branchoverview/branchoverview.component";
import {RequestService} from "../services/request.service";
import {ShipmentService} from "../services/shipment.service";

import {Router} from '@angular/router';
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-raisedrequest',
  templateUrl: './raisedrequest.component.html',
  styleUrls: ['./raisedrequest.component.scss']
})

export class RaisedrequestComponent implements OnInit, OnChanges {
  @Input() id;
  @Input() name;
  @Input() raisedRequests;
  @Input() brStatus;
  partsrequests: any;
  selectedRow: Number = 0;
  setClickedRow: Function;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any
  constructor( public bncoverview:BranchoverviewComponent,public menu:MenumanagementService,public router: Router,public requestService:RequestService, public shipmentserv:ShipmentService) {
      this.sessid=localStorage.getItem('ucmid');
      this.Loadbuttons();
      $(document).ready(function(){
          $('[data-toggle="tooltip"]').tooltip();
      });

      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };

      this.LoadPartrequests('','');

  }

    ngAfterViewInit() {
        $('[data-toggle="tooltip"]').tooltip({container: 'body', html: true});
      var $table = $('.demo');
      $table.floatThead({
        //useAbsolutePositioning: true,
        scrollContainer: function ($table) {
          return $table.closest('.cover1');
        }
      });
    }

  ngOnInit() {
      //this.raisedRequest(this.id);
      this.LoadPartrequests('','');
      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });
  }

  ngOnChanges(){
      //this.raisedRequest(this.id);
      //this.bncoverview.raisedreq();
  }

  raisedValues(data)
  {
     // this.raisedRequests = data;
  }

  LoadPartrequests(rpdid,partid) {
      if(rpdid)
      {
          this.shipmentserv.LoadPartrequests(rpdid,partid).subscribe(
              data => {
                  this.partsrequests = data;
              }
          );
      }
      else
      {
          this.partsrequests = [];
      }

  }

    // Un assign Account from site
    cancelRequest(rpdid) {

        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'Do you want to cancel this part request?',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                closeOnConfirm: false
            },
            function() {
                that.shipmentserv.cancelRequest(rpdid).subscribe(
                    data => {

                        if (data.result === 'success') {
                            //that.viewAgreement(accId);
                            that.bncoverview.raisedreq();
                            swal({
                                title: 'Cancelled!',
                                text: 'Part Request Cancelled Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        } else if (data.result === 'warning') {
                            swal({
                                title: 'Can not cancel!',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        } else if (data.result === 'error') {
                            swal({
                                title: 'Not able to cancel',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }
    Loadbuttons() {
        this.menu.Loadbutton(8,28,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;

            }
        );

    }

}
