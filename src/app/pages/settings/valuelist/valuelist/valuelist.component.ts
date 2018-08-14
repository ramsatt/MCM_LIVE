import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ValuelistService} from "../../services/valuelist/valuelist.service";
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-valuelist',
  templateUrl: './valuelist.component.html',
  styleUrls: ['./valuelist.component.scss']
})
export class ValuelistComponent implements OnInit {
    alltechcer:any;
    status:any;
    loadtech:any;
    e_techcer_name:any='';
    tech_cer_name:any='';
    Editid:any;
    results:any;
    alltechexp:any;
    tech_exp:any='';
    e_tech_exp:any='';
    res:any;
    loadexp:any;
    Editexpid:any;
    alltechsec:any;
    tech_sec:any='';
    e_tech_sec:any='';
    resultssec:any;
    loadsec:any;
    Editsecid:any;

    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;

  constructor(public router:Router,public tech_cer:ValuelistService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.Loadbuttons();
  }

  ngOnInit() {
    this.viewall();
  }
  viewall(){
    this.viewtechcer();
    this.viewtechexp();
    this.viewtechsec();

  }
  viewtechcer()
  {
    this.tech_cer.Loadtechcer().subscribe(
        data => {
          this.alltechcer = data;
           if(this.alltechcer != null)
          {
            this.status = 'active';


          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
  LoadtechDetails(id)
  {
    this.tech_cer.tech(id).subscribe(
        data => {
          this.loadtech = data;
          this.e_techcer_name = this.loadtech.TCM_Technician_Certifications_Name;

        }
    );


  }
  open(editid){
    this.Editid=editid;
    this.LoadtechDetails(editid)
  }
  add()
  {

    if(this.tech_cer_name == '')
    {
      $.notify({
        title: '<strong> Name Required</strong><br>',
        message: 'Please enter the Name.'
      },{
        type: 'danger',
        placement: {
          from: "bottom",
          //align: "left"
        }
      });
    }




    else {
      this.tech_cer.CreateTech(this.tech_cer_name).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Technician Certification Name added successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewtechcer();
              $('#addtech').modal("hide");
              $("#addtechcerform").trigger("reset");
              //$('.modal-backdrop').hide();
            }

          } );

    }}
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Technician Certification Details will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.tech_cer.Deltech(id).subscribe(
              data => {
                this.deltech = data;

                if(this.deltech != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Technician Certification has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewtechcer();
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
  uptech()
  {
    if( this.e_techcer_name == ''   )
    {
      if(this.e_techcer_name == '')
      {
        $.notify({
          title: '<strong>Name Required</strong><br>',
          message: 'Please enter the Name.'
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

      this.tech_cer.Edittech(this.e_techcer_name,this.Editid).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Technician Certification Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewtechcer();
              $('#edittech').modal("hide");
            }

          }
      );
    }
  }
  ///.................Technician Experience
  viewtechexp()
  {
    this.tech_cer.Loadtechexp().subscribe(
        data => {
          this.alltechexp = data;

          if(this.alltechexp != null)
          {
            this.status = 'active';


          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
  LoadexpDetails(id)
  {
    this.tech_cer.techexp(id).subscribe(
        data => {
          this.loadexp = data;
          this.e_tech_exp= this.loadexp.TEM_Technician_Experiences_Name;

        }
    );


  }
  openexp(editexpid){
    this.Editexpid=editexpid;
    this.LoadexpDetails(editexpid);
  }
  addexp()
  {
    if( this.tech_exp == ''   )
    {
      if(this.tech_exp == '')
      {
        $.notify({
          title: '<strong> Technician Experience Required</strong><br>',
          message: 'Please enter the Technician Experience Name.'
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
      this.tech_cer.CreateTechexp(this.tech_exp).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Technician Experience added successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewtechexp();
              $('#addtechexp').modal("hide");
              $("#addtechexpform").trigger("reset");
              //$('.modal-backdrop').hide();
            }

          } );

    }}
  Deleteexp(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Technician Experience Details will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.tech_cer.Deltechexp(id).subscribe(
              data => {
                this.deltech = data;


                if(this.deltech != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Technician Experience has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewtechexp();
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
  upexp()
  {
    if( this.e_tech_exp == ''   )
    {
      if(this.e_tech_exp == '')
      {
        $.notify({
          title: '<strong>Technician Experience Required</strong><br>',
          message: 'Please enter Technician Experience.'
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

      this.tech_cer.Edittechexp(this.e_tech_exp,this.Editexpid).subscribe(
          data => {
            this.res = data;

            if (this.res[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Technician Experience Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewtechexp();
              $('#editexp').modal("hide");
            }

          }
      );
    }
  }
  ///Tech security

  viewtechsec()
  {
    this.tech_cer.Loadtechsec().subscribe(
        data => {
          this.alltechsec = data;
            if(this.alltechsec != null)
          {
            this.status = 'active';


          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
  LoadsecDetails(id)
  {
    this.tech_cer.techsec(id).subscribe(
        data => {
          this.loadsec = data;

          this.e_tech_sec= this.loadsec.TSCM_Technician_Security_Clearances_Name;

        }
    );


  }
  opentechsec(editsecid){
    this.Editsecid=editsecid;
    this.LoadsecDetails(editsecid);
  }
  addtechsec()
  {
    if( this.tech_sec == ''   )
    {
      if(this.tech_sec == '')
      {
        $.notify({
          title: '<strong> Technician Security clearances Required</strong><br>',
          message: 'Please enter the Technician Security clearances Name.'
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
      this.tech_cer.CreateTechsec(this.tech_sec).subscribe(
          data => {
            this.resultssec = data;
            //console.log(this.model.part_img);
            if(this.resultssec[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Technician Security clearances added successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewtechsec();
              $('#addtechsec').modal("hide");
              $("#addtechsecform").trigger("reset");
              //$('.modal-backdrop').hide();
            }

          } );

    }}
  Deletetechsec(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Technician Security Clearances Details will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.tech_cer.Deltechsec(id).subscribe(
              data => {
                this.deltechsec = data;

                if(this.deltechsec != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Technician Security Clearances has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewtechsec();
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
  uptechsec()
  {
    if( this.e_tech_sec == ''   )
    {
      if(this.e_tech_sec == '')
      {
        $.notify({
          title: '<strong>Technician Security Clearances Required</strong><br>',
          message: 'Please enter Technician Security Clearances.'
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

      this.tech_cer.Edittechsec(this.e_tech_sec,this.Editsecid).subscribe(
          data => {
            this.res = data;
            if (this.res[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Technician Security Clearances Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewtechsec();
              $('#edittechsec').modal("hide");
            }

          }
      );
    }
  }
    Loadbuttons() {
        this.menu.Loadbutton(12,56,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;

            }
        );

    }
}
