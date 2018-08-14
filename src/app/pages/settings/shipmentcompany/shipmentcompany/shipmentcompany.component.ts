import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ShipmentcompanyService} from "../../services/shipmentcompany/shipmentcompany.service";
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";
declare var $;
declare var swal;

@Component({
  selector: 'app-shipmentcompany',
  templateUrl: './shipmentcompany.component.html',
  styleUrls: ['./shipmentcompany.component.scss']
})
export class ShipmentcompanyComponent implements OnInit {
  submitted = false;
  active = true;
  allship:any;
  shipname:any='';
  url:any='';
  status:any;
  results:any;
  id:any;
  Editid:any;
  e_shipname:any='';
  e_url:any='';
  loadship:any;
  e_shipurl:any;
  e_shiname:any;

    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;

  constructor(public router:Router,public ship:ShipmentcompanyService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.Loadbuttons();
  }

  ngOnInit() {
    this.viewship();
  }
  viewship()
  {
    this.ship.Loadship().subscribe(
        data => {
          this.allship = data;

          if(this.allship != null)
          {
            this.status = 'active';

            setTimeout(function() {
              $('#ship').DataTable({
                responsive: true
              });
            }, 1000);
          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
  onSubmit() {
    this.submitted = true;
  }
  viewship1()
  {
    this.ship.Loadship().subscribe(
        data => {
          this.allship = data;

          if(this.allship != null)
          {
            this.status = 'active';


          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }

  add()
  {
    if( this.shipname == '' || this.url == ''  )
    {
      if(this.shipname == '')
      {
        $.notify({
          title: '<strong>Companay Name Required</strong><br>',
          message: 'Please enter the Company name.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }
      if(this.url == '')
      {
        $.notify({
          title: '<strong>URL Required</strong><br>',
          message: 'Please enter the URL.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }


    }
    else {
      this.ship.CreateShip(this.shipname,this.url).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Shipment Company created successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewship();
              $('#addship').modal("hide");
              $("#addshipform").trigger("reset");
              //$('.modal-backdrop').hide();
            }

          } );

    }}

  LoadShipDetails(id)
  {
    this.ship.ship(id).subscribe(
        data => {
          this.loadship = data;
          this.e_shipname = this.loadship.SC_Company_Name;
          this.e_url = this.loadship.SC_Company_URL;

        }
    );


  }
  settings(){
    this.router.navigate(['settings']);
  }
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Company will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.ship.Delcompany(id).subscribe(
              data => {
                this.delcompanay = data;

                if(this.delcompanay != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Company has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewship();
                  }

                }

                /* $('#accounts').DataTable({
                 responsive: true
                 });
                 */
              }


          );
        });
  }
  open(editid){
    this.Editid=editid;
    this.LoadShipDetails(editid)
  }
  upship()
  {
    if( this.e_shipname == '' || this.e_url == ''  )
    {
      if(this.e_shipname == '')
      {
        $.notify({
          title: '<strong>Companay Name Required</strong><br>',
          message: 'Please enter the Company name.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }
      if(this.e_url == '')
      {
        $.notify({
          title: '<strong>URL Required</strong><br>',
          message: 'Please enter URL.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }


    }
    else {

      this.ship.EditCompany(this.e_shipname, this.e_url,this.Editid).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Shipment Company Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewship();
              $('#editship').modal("hide");
            }

          }
      );
    }
  }
    Loadbuttons() {
        this.menu.Loadbutton(12,54,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
            }
        );

    }
}
