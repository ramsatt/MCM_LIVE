import { Component, OnInit } from '@angular/core';
import {ContractorService} from "../../services/contractor.service";
import {GlobalVariable} from "../../../../../global/global";
import {Router} from "@angular/router";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;
@Component({
  selector: 'app-bcoverview',
  templateUrl: './bcoverview.component.html',
  styleUrls: ['bcoverview.component.scss']
})
export class BcoverviewComponent implements OnInit {

  allval:any='';
  url:any='';
  sessid='';
  Asssubbutton:any;
  add:any;
  edit:any;
    urmkeyid:any;
  delete:any;
    viewbtn:any;
    umid:any;
  constructor(public cons:ContractorService,public router: Router,public menu:MenumanagementService) {
    this.sessid=localStorage.getItem('ucmid');
      this.umid=localStorage.getItem('umid');
      this.urmkeyid=localStorage.getItem(('urmid'));
  }

  ngOnInit() {
    this.viewall();
    this.Loadbuttons();
    this.url=GlobalVariable.BASE_FILE_API+'/uploads/signaturepdf/';

  }
  open(link) {
    this.router.navigate([link]);

  }
  viewall() {
    // this.contype=type;

    this.cons.viewallbccon(this.umid,this.urmkeyid).subscribe(
        data => {
          this.allval = data.product;

        },
    );
  }
  Loadbuttons() {
    this.menu.Loadbutton(13,86,this.sessid).subscribe(
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
