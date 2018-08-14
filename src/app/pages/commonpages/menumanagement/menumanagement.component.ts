import { Component, OnInit } from '@angular/core';
import {MenumanagementService} from "./service/menumanagement.service";
declare var $;
declare var swal;
@Component({
  selector: 'app-menumanagement',
  templateUrl: './menumanagement.component.html',
  styleUrls: ['./menumanagement.component.css']
})
export class MenumanagementComponent implements OnInit {
menuarr:any;
  status:any;
  submenu:any;
  selectedRow: Number = 0;
  setClickedRow: Function;
  demoChk: any = [];
  results:any;
  menuid:any;
    u_role:any;
    submenuid:any;
    checkenable:any;
    menuselect:any;
    user_role:any;
    role:any;
    user_category:any;
    submenu1:any;
  constructor( public menumaster:MenumanagementService)
  {

      this.selectedRow = -1;
    this.status = 'active';
    this.setClickedRow = function (index) {
      this.selectedRow = index;

    };
  }

  ngOnInit() {

      this.viewuserrole();
      //this.demoChk=[];
  }
  Loadmenu() {
    this.menumaster.Loadmenu().subscribe(
        data => {
          this.menuarr = data;

        }
    );
  }
    viewrolemenu(ucmkeyid)
    {
        this.Loadmenu();
        this.menumaster.Loadsubmenu(ucmkeyid,this.menuid).subscribe(
            data => {
                this.submenu = data;
                this.menuselect=ucmkeyid;

            }
        );
    }
  selectmenu(id,id1){
    this.menumaster.Loadsubmenu(id1,id).subscribe(
        data => {
          this.submenu = data;
this.menuid=id;
            this.submenuid=this.submenu[0].MMM_KeyID;


        }
    );

  }
  checkedopt(id,id1){
      this.menumaster.Loadcheckmenu(id1,id).subscribe(
          data => {
              this.submenu1 = data;
}
      );

  }
    checkmenuall(ev)
    {
        if (ev.target.checked) {
            this.submenu.forEach(x => x.MA_Is_Active = 'Y');
            this.submenu.forEach(x => x.MA_Add = 'Y');
            this.submenu.forEach(x => x.MA_Edit = 'Y');
            this.submenu.forEach(x => x.MA_Delete = 'Y');
            this.submenu.forEach(x => x.MA_View = 'Y');
            this.submenu.forEach(x => x.MA_Unassign = 'Y');

        }
        else{
            this.submenu.forEach(x => x.MA_Is_Active = 'N');

            this.submenu.forEach(x => x.MA_Add = 'N');
            this.submenu.forEach(x => x.MA_Edit = 'N');
            this.submenu.forEach(x => x.MA_Delete = 'N');
            this.submenu.forEach(x => x.MA_View = 'N');
            this.submenu.forEach(x => x.MA_Unassign = 'N');

        }

    }
    checkmenu(ev)
    {
        if (ev.target.checked) {
            this.submenu.forEach(x => x.MA_Is_Active = 'Y');

        }
        else{
            this.submenu.forEach(x => x.MA_Is_Active = 'N');

        }

    }
    checkadd(ev)
    {
        if (ev.target.checked) {

            this.submenu.forEach(x => x.MA_Add = 'Y');

        }
        else{


            this.submenu.forEach(x => x.MA_Add = 'N');

        }

    }
    checkedit(ev)
    {
        if (ev.target.checked) {

            this.submenu.forEach(x => x.MA_Edit = 'Y');

        }
        else{

            this.submenu.forEach(x => x.MA_Edit = 'N');

        }

    }
    checkdelete(ev)
    {
        if (ev.target.checked) {

            this.submenu.forEach(x => x.MA_Delete = 'Y');
        }
        else{

            this.submenu.forEach(x => x.MA_Delete = 'N');
        }

    }
    checkunassign(ev)
    {
        if (ev.target.checked) {

            this.submenu.forEach(x => x.MA_Unassign = 'Y');
        }
        else{

            this.submenu.forEach(x => x.MA_Unassign = 'N');
        }

    }
    checkview(ev)
    {
        if (ev.target.checked) {

            this.submenu.forEach(x => x.MA_View = 'Y');
        }
        else{

            this.submenu.forEach(x => x.MA_View = 'N');
        }

    }

    checkAll(ev) {

        $("#checkAllmenu").change(function(){
            if(this.checked){
                $(".checkSingle"+ev).each(function(){
                    this.checked=true;
                })
            }else{
                $(".checkSingle"+ev).each(function(){
                    this.checked=false;
                })
            }
        });
    }

    updateCheckedOptions(chBox, event) {

    if(event.target.checked) {

      this.demoChk.push(chBox);
    }
    else if (!event.target.checked){


      let indexx = this.demoChk.indexOf(chBox);
      this.demoChk.splice(indexx,1);
    }

  }
  updateOptions(form){
    this.menumaster.updatemenu(form).subscribe(
        data => {
          this.results = data;
          if(this.results[0].result =="success")
          {
            swal({
              title: "Assigned!",
              text: " Menu Assigned Successfully",
              type: "success",
              confirmButtonClass: "btn-success"
            });
            //this.assignedparts(this.id);
             // $('#assmenuform').trigger('reset');

            //this.viewassignparts(AccID);
          }
          //this.demoChk=[];
        }
    );
  }
    viewusercategory(userrole)
    {
        this.menumaster.Loadusercategory(userrole).subscribe(
            data => {
                this.user_category = data;


            }
        );
    }

    viewuserrole()
    {
        this.menumaster.Loaduserrorle().subscribe(
            data => {
                this.user_role = data;


            }
        );
    }
}
