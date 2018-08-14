import { ElementRef, Component, OnInit,ViewChild } from '@angular/core';
import {Router} from "@angular/router";
import {HolidayService} from "../../services/holiday.service";
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";


declare var $;
declare var swal;

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss']
})
export class HolidayComponent implements OnInit {
    submitted = false;
    active = true;
  allholiday:any;
  fes_name:any='';
  fes_date:any='';

  status:any;
  results:any;
  id:any;
  Editid:any;
  e_fesname:any='';
  e_date:any='';
  loadholi:any;
  delholi:any;
  e_name:any='';
    festo_date:any='';
    fes_notes:any='';
    e_fes_notes:any='';
    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;
  @ViewChild("dfes_date") public CDateFrom: ElementRef;
    @ViewChild("dfesto_date") public CDateTo: ElementRef;
    @ViewChild("e_dfes_date") public edate: ElementRef;

    constructor(public router:Router,public holi_ser:HolidayService,public menu:MenumanagementService) {
        this.sessid=localStorage.getItem('ucmid')
        this.Loadbuttons();

  }

  ngOnInit() {
      $('#multiple').hide();
      $('#single').show();

    this.viewholi1();
    setTimeout(function() {
      $('.datepicker-only-init').datetimepicker({
        widgetPositioning: {
          horizontal: 'left'
        },
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down"
        },
        format: 'MM/DD/Y'
      });
    }, 1000)
  }
  viewholi()
  {
    this.holi_ser.Loadholiday().subscribe(
        data => {
          this.allholiday = data;
           if(this.allholiday != null)
          {
            this.status = 'active';

            setTimeout(function() {
              $('#holi').DataTable({
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
  viewholi1()
  {
    this.holi_ser.Loadholiday().subscribe(
        data => {
          this.allholiday = data;
            var $table = $('.demo');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });


          if(this.allholiday != null)
          {
            this.status = 'active';

          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
  LoadholiDetails(id)
  {
    this.holi_ser.holi(id).subscribe(
        data => {
          this.loadholi = data;
          this.e_fesname = this.loadholi[0].HM_Festival_Name;
          this.e_date = this.loadholi[0].HM_Date;
            this.e_fes_notes=  this.loadholi[0].HM_Notes;

        }
    );


  }
  open(editid){
    this.Editid=editid;
    this.LoadholiDetails(editid)
  }
  add()
  {
    this.fes_date = this.CDateFrom.nativeElement.value;
      this.festo_date = this.CDateTo.nativeElement.value;


    if( this.fes_name == '' || this.fes_date == ''  )
    {
      if(this.fes_name == '')
      {
        $.notify({
          title: '<strong> Festival Name Required</strong><br>',
          message: 'Please enter the Festival Name.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            class:"alert alert-danger p",
            //align: "left"
          }
        });
      }
      if(this.fes_date == '')
      {
        $.notify({
          title: '<strong>Date Required</strong><br>',
          message: 'Please enter the Date.'
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
      this.holi_ser.Createholi(this.fes_name,this.fes_date,this.festo_date,this.fes_notes).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Event Created successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewholi1();
              $('#addholi').modal("hide");
              $("#addholidayform").trigger("reset");

              //$('.modal-backdrop').hide();
            }

          } );

    }}
    formrefresf(){
        $("#addholidayform").trigger("reset");
        $("#addholidayformmulti").trigger("reset");


    }
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Event will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.holi_ser.Delholi(id).subscribe(
              data => {
                this.delholi = data;
                if(this.delholi != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Holiday has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewholi1();
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
    handleChange(evt) {
        var target = evt.target;
        if (target.checked) {

           $('#multiple').hide();
            $('#single').show();
           // $("#single").prop('disabled', true);
        }
    }
    handleChange1(evt) {
        var target = evt.target;

        if (target.checked) {

            $('#single').hide();
            $('#multiple').show();
            // $("#single").prop('disabled', true);
        }
    }
  upholi()
  {
    this.e_date = this.edate.nativeElement.value;
    if( this.e_fesname == '' || this.e_date == ''  )
    {
      if(this.e_fesname == '')
      {
        $.notify({
          title: '<strong>Festival Name Required</strong><br>',
          message: 'Please enter the Festival name.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }
      if(this.e_date == '')
      {
        $.notify({
          title: '<strong>Date Required</strong><br>',
          message: 'Please enter Date.'
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

      this.holi_ser.Editholi(this.e_fesname, this.e_date,this.e_fes_notes,this.Editid).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Event Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewholi1();
              $('#editholi').modal("hide");
            }

          }
      );
    }
  }
    Loadbuttons() {
        this.menu.Loadbutton(12,52,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
                  }
        );

    }


}
