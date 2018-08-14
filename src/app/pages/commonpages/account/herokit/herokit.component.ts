import { Component, OnInit, Input,OnChanges } from '@angular/core';
import {Router} from "@angular/router";
import {HerokitService} from "../services/herokit/herokit.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;
@Component({
  selector: 'app-herokit',
  templateUrl: './herokit.component.html',
  styleUrls: ['./herokit.component.scss']
})
export class HerokitComponent implements OnInit, OnChanges {
  @Input() acc_id;
    @Input() name;
  submitted = false;
  active = true;
  alltickets:any;
  tick_status:any='';
  e_tick_status:any='';

  status:any;
  results:any;
  id:any;
  Editid:any;

  loadtick:any;
  deltick:any;
  e_name:any='';
    account_id:any;
    setClickedRow:any;
    heroid:any;
    hername:any;
    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    deletehk:any;
    sessid:any;
  constructor(public router:Router,public hero_ser:HerokitService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.Loadbuttons();
      this.setClickedRow = function(index){
          this.selectedRow = index;

  }}

  ngOnInit() {

  }
    ngOnChanges(){
        this.viewhero(this.acc_id);

this.account_id=this.acc_id;
    }
    Slectedherokit(id,name)
    {
        this.heroid=id;
        this.hername=name;
        $("#herokitpartslist").show();
    }
  viewhero(id)
  {
    this.hero_ser.hero(this.acc_id).subscribe(
        data => {
          this.alltickets = data;
            $("#herokitpartslist").hide();
            //this.heroid = this.alltickets.HKM_KeyID;



        } );

  }
  refresh(){
      $("#addtickform").trigger("reset");
  }
  LoadtickDetails(id)
  {
    this.hero_ser.edithero(id).subscribe(
        data => {
          this.loadtick = data;

          this.e_tick_status = this.loadtick[0].HKM_Name;

        }

    );


  }
  open(editid){
    this.Editid=editid;
    this.LoadtickDetails(editid)
  }
  viewtick1()
  {
    this.hero_ser.Loadhero().subscribe(
        data => {
          this.alltickets = data;
            if(this.alltickets != null)
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
    if( this.tick_status == ''   )
    {

      $.notify({
        title: '<strong> Status Required</strong><br>',
        message: 'Please enter the Herokit Name.'
      },{
        type: 'danger',
        placement: {
          from: "bottom",
          //align: "left"
        }
      });



    }
    else {
      this.hero_ser.Createhero(this.account_id,this.tick_status).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Herokit Name Created Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewhero(this.acc_id);
              $('#addtick').modal("hide");
              $("#addtickform").trigger("reset");

                $("#herokitpartslist").hide();

              //$('.modal-backdrop').hide();
            }
            else if(this.results[0].result=="fail"){
                swal({
                    title: "Error!",
                    text: "Herokit Already Exists",
                    type: "error",
                    confirmButtonClass: "btn-danger"
                });
                //$("#addtickform").trigger("reset");
            }

          } );

    }}
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Herokit will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.hero_ser.Deltick(id).subscribe(
              data => {
                this.deltick = data;
                if(this.deltick[0].result =="success")
                {

                    swal({
                      title: "Deleted!",
                      text: "Herokit has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewhero(this.acc_id);
                      $("#herokitpartslist").hide();


                }
                else {
                    swal({
                        title: "Cannot delete Herokit!",
                        text: "This Herokit assigned to branch. Please delete herokit from the branch",
                        type: "error",
                        confirmButtonClass: "btn-danger"
                    });
                }

                /* $('#accounts').DataTable({
                 responsive: true
                 });
                 */
              }


          );
        });
  }
  onSubmit() {
    this.submitted = true;
  }
  uptick()
  {
    if( this.e_tick_status == ''   )
    {
      if(this.e_tick_status == '')
      {
        $.notify({
          title: '<strong>Status Required</strong><br>',
          message: 'Please enter the Herokit Name.'
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

      this.hero_ser.Edittick(this.e_tick_status,this.Editid,this.acc_id).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Herokit Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewhero(this.acc_id);
              $('#edittick').modal("hide");
            }
            else if(this.results[0].result=="fail"){
                swal({
                    title: "Error!",
                    text: "Herokit Name Already Exists",
                    type: "error",
                    confirmButtonClass: "btn-danger"
                });
                //$("#addtickform").trigger("reset");
            }

          }
      );
    }
  }
    Loadbuttons() {
        this.menu.Loadbutton(2,73,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.deletehk=this.Asssubbutton[0].MA_Delete;
                //console.log('deletvalue'+this.delete);

            }
        );

    }
}
