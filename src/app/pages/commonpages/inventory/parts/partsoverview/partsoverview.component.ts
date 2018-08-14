import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PartsService} from "../services/parts.service";
import {GlobalVariable} from "../../../../../global/global";
import {AccountsService} from "../../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";


declare var $: any;
declare var jQuery: any;
declare var swal: any;
@Component({
  selector: 'app-partsoverview',
  templateUrl: './partsoverview.component.html',
  styleUrls: ['./partsoverview.component.scss']
})
export class PartsoverviewComponent implements OnInit {
  status:any='active';
  partdetail:any;
  Partmodel:any;
  Partmfg:any;
  PartID:any='';
  Partopeningbal:any;
  Parttotalsold:any;
  PartArray:any;
  Partprice:any;
  Internalcost:any;
  Description:any;
  Imgpath:any;
  imgdetail:any;
  Partname:any;
    normal = '';
    selectedRow: Number = 0;
    setClickedRow: Function;
    delparts:any;
    duplid:any;
showimg:any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umid:any;
    Chilmenu:any;
  constructor(public router:Router,public actroute:ActivatedRoute,public part:PartsService,public acc:AccountsService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.umid=localStorage.getItem('umid');
      this.setClickedRow = function(index){
          this.selectedRow = index;
          this.status = 'active';

      };



  }

  ngOnInit() {
      if (!this.actroute.snapshot.queryParams['id'])
      {
          this.PartID='';
      }
      else
      {
          this.PartID = this.actroute.snapshot.queryParams['id'];
      }
      this.LoadParts(this.PartID);
      this.Loadsubmenu();
      this.Loadbuttons();
      this.Loadchildmenu();

  }
  viewparts(Part_ID){
    this.part.EditParts(Part_ID).subscribe(
        data => {
          this.partdetail = data;
          this.PartID = this.partdetail.PM_KeyID;
            this.Partname = this.partdetail.PM_Part_Name;
          this.Partmodel = this.partdetail.PM_Model;
          this.Partmfg = this.partdetail.PM_MFG_Part_No;
          this.Partopeningbal = this.partdetail.PM_Opening_Balance;
          this.Parttotalsold = this.partdetail.PM_Total_Sold;
          this.Partprice = this.partdetail.PM_Price;
          this.Internalcost = this.partdetail.PM_Internal_Cost;
          this.Description = this.partdetail.PM_Description;
          this.Imgpath = this.partdetail.PM_Part_Image_Path;
            this.showimg=GlobalVariable.BASE_FILE_API;

        }
    );


  }
  Selectedpart(Part_ID)
  {
    this.viewparts(Part_ID);

  }
    imgpopup(Part_ID){

        this.part.EditParts(Part_ID).subscribe(
            data => {
                this.imgdetail = data;
                this.PartID = this.imgdetail.PM_KeyID;
                if(this.imgdetail.PM_Part_Image_Path!=null)
                {
                    this.Imgpath = this.showimg+ this.imgdetail.PM_KeyID + '/image/' + this.imgdetail.PM_Part_Image_Path;
                }
                else{
                    this.Imgpath = 'assets/modules/core/img/noimagefound.jpg';
                }
                this.Partname=this.imgdetail.PM_Part_Name
                this.Partname=this.imgdetail.PM_Part_Name;
                swal({
                    title: this.Partname,

                    confirmButtonClass: "btn-success",
                    imageUrl: this.Imgpath
                });



            });
    }

  LoadParts(partid)
  {
    this.part.LoadParts().subscribe(
        data=>
        {
          this.PartArray = data;
          if(partid=='')
          {
              this.PartID = this.PartArray[0].PM_KeyID;
              this.viewparts(this.PartID);
          }
          else

          {
          if(this.PartID=='' || this.PartID=='undefined')
          {
              this.PartID = this.PartArray[0].PM_KeyID;

          }
              this.viewparts(this.PartID);
          }



        }
    );
  }
    get self() { return this; }
  ref(){

      this.duplid=9;

  }
  real(){
      this.duplid=8;

  }
    Navication(link)
    {
        this.router.navigate([link]);
    }
    Delete(id)
    {
        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Part will not be able to recover this future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.part.DelParts(id).subscribe(
                    data => {
                        this.delparts = data;

                        that.LoadParts('');
                        if(this.delparts != null)
                        {
                            {
                                swal({
                                    title: 'Deleted!',
                                    text: 'Part has been deleted',
                                    type: 'success',
                                    confirmButtonClass: 'btn-success'
                                });
                            }
                        }
                    }


                );
            });
    }
    Loadsubmenu() {
        this.acc.Loadmenu(11).subscribe(
            data => {
                this.Asssubmenu = data;

            }
        );

    }
    Loadchildmenu() {
        this.menu.Loadchildmenu(11,'N').subscribe(
            data => {
                this.Chilmenu = data;



            }
        );

    }
    Loadbuttons() {
        this.menu.Loadbutton(11,75,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;




            }
        );

    }
}
