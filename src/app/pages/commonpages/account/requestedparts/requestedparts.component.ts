import { Component, OnInit,Input,OnChanges} from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from "../../branch/services/request.service";
import {ShipmentService} from "../../branch/services/shipment.service";


declare var $;
declare var swal;

@Component({
  selector: 'app-requestedpartslist',
  templateUrl: './requestedparts.component.html',
  styleUrls: ['./requestedparts.component.scss']
})
export class RequestedpartsComponent implements OnInit,OnChanges {
  @Input() id;
  @Input() changed;
  receivedRequests: any;
    partsrequests: any;
    selectedRow: Number = 0;
    setClickedRow: Function;

  constructor(public router: Router,public requestService:RequestService, public shipmentserv:ShipmentService)
  {
      this.setClickedRow = function (index) {
          this.selectedRow = index;
      };
  }

  ngOnInit() {
    this.receivedRequest(this.id);
    this.LoadPartrequests('','');
  }

  ngOnChanges(){
      console.log(this.changed);
      if(this.changed==2){
          this.receivedRequest(this.id);
          this.LoadPartrequests('','');
      }
      this.receivedRequest(this.id);
      this.LoadPartrequests('','');


  }

  receivedRequest(id) {
    this.requestService.receivedRequest(id,'Manufacturer').subscribe(
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

}
