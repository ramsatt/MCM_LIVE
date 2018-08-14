import { Component, OnInit,Input,OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from "../services/request.service";
import {ShipmentService} from "../services/shipment.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-receivedrequest',
  templateUrl: './receivedrequest.component.html',
  styleUrls: ['./receivedrequest.component.scss']
})
export class ReceivedrequestComponent implements OnInit, OnChanges {
  @Input() id;
  @Input() name;
  @Input() brStatus;
    @Input() changeid;
  receivedRequests: any;
    partsrequests: any;
    selectedRow: Number = 0;
    setClickedRow: Function;

  constructor(public router: Router,public requestService:RequestService, public shipmentserv:ShipmentService) {
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };
  }

  ngOnInit() {
      this.receivedRequest(this.id);
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
      //console.log(this.changeid);
      if(this.changeid==4)
      {
          this.receivedRequest(this.id);
          this.LoadPartrequests('','');
      }
    this.receivedRequest(this.id);
      this.LoadPartrequests('','');
  }

  receivedRequest(id) {
    this.requestService.receivedRequest(id,'Branch').subscribe(
        data => {
          this.receivedRequests = data;
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

    LoadPartrequests(rpdid,partid) {
     // alert('ddee');
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


}
