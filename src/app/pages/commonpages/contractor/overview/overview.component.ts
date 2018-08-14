import { Component, OnInit } from '@angular/core';
import {ContractorService} from "../services/contractor.service";
import {Router} from "@angular/router";
import {GlobalVariable} from "../../../../global/global";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {AccountsService} from "../../../../services/accounts/accounts.service";

declare var $;
declare var swal;


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.scss']
})
export class OverviewComponent implements OnInit {
  allval:any='';
  url:any='';
  sessid='';
  Asssubbutton:any;
  add:any;
  edit:any;
    viewbtn:any;
    cmtype:any;
  delete:any;
  Asssubmenu:any;
    urmkeyid:any;
    umid:any;
  constructor(public cons:ContractorService,public router: Router,public menu:MenumanagementService,public acc:AccountsService) {
    this.sessid=localStorage.getItem('ucmid');
      this.urmkeyid=localStorage.getItem(('urmid'));
      this.umid=localStorage.getItem('umid');
  }

  ngOnInit() {
    this.viewall();
    this.Loadbuttons();
    this.Loadsubmenu();
    this.url=GlobalVariable.BASE_FILE_API+'/uploads/signaturepdf/';

  }
  open(link) {
    this.router.navigate([link]);

  }
  viewall() {
   // this.contype=type;

    this.cons.viewallcon(this.umid,this.urmkeyid).subscribe(
        data => {
          this.allval = data.product;
        },
    );
  }
  Loadsubmenu() {
    this.acc.Loadmenu(13).subscribe(
        data => {
          this.Asssubmenu = data;
        }
    );

  }
  Loadbuttons() {
    this.menu.Loadbutton(13,85,this.sessid).subscribe(
        data => {
          this.Asssubbutton = data;
          this.add=this.Asssubbutton[0].MA_Add;
          this.edit=this.Asssubbutton[0].MA_Edit;

          this.delete=this.Asssubbutton[0].MA_Delete;
            this.viewbtn=this.Asssubbutton[0].MA_View;
        },
    );

  }
}
