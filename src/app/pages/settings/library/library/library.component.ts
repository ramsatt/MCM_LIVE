import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LibraryService} from "../../services/library.service";


import {FormControl} from "@angular/forms";
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";

declare var $;
declare var swal;
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  submitted = false;
  active = true;
  alllibrary:any;
  libname:any='';
  desc:any='';
  status:any;
  results:any;
  id:any;
  Editid:any;
  e_libname:any='';
  e_desc:any='';
  loadlib:any;
  dellib:any;
  e_name:any='';

    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;

  constructor(public router:Router,public lib_ser:LibraryService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.Loadbuttons();
  }

  ngOnInit() {
    this.viewlib1();
  }
  viewlib()
  {
    this.lib_ser.Loadlib().subscribe(
        data => {
          this.alllibrary = data;
            if(this.alllibrary != null)
          {
            this.status = 'active';

            setTimeout(function() {
              $('#lib').DataTable({
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
  LoadlibDetails(id)
  {
    this.lib_ser.lib(id).subscribe(
        data => {
          this.loadlib = data;
          this.e_libname = this.loadlib.LM_Name;
          this.e_desc = this.loadlib.LM_Description;

        }
    );


  }
  onSubmit() {
    this.submitted = true;
  }
  open(editid){
    this.Editid=editid;
    this.LoadlibDetails(editid)
  }
  viewlib1()
  {
    this.lib_ser.Loadlib().subscribe(
        data => {
          this.alllibrary = data;
          if(this.alllibrary != null)
          {
            this.status = 'active';
          }
        } );

  }
  add()
  {
    if( this.libname == '' || this.desc == ''  )
    {
      if(this.libname == '')
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
      if(this.desc == '')
      {
        $.notify({
          title: '<strong>Description Required</strong><br>',
          message: 'Please enter the Description.'
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
      this.lib_ser.CreateLib(this.libname,this.desc).subscribe(
          data => {
            this.results = data;
            //console.log(this.model.part_img);
            if(this.results[0].result =="success")
            {
              swal({
                title: "Created!",
                text: "Library created successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });


              this.viewlib1();
              $('#addlib').modal("hide");
              $("#add").trigger("reset");
              //$('.modal-backdrop').hide();
            }

          } );

    }}
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "This Library will not be able to recover this future!",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.lib_ser.Dellib(id).subscribe(
              data => {
                this.dellib = data;
                if(this.dellib != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Library has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.viewlib1();
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
  uplib()
  {
    if( this.e_libname == '' || this.e_desc == ''  )
    {
      if(this.e_libname == '')
      {
        $.notify({
          title: '<strong>Name Required</strong><br>',
          message: 'Please enter the Library name.'
        },{
          type: 'danger',
          placement: {
            from: "bottom",
            //align: "left"
          }
        });
      }
      if(this.e_desc == '')
      {
        $.notify({
          title: '<strong>Description Required</strong><br>',
          message: 'Please enter Description.'
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

      this.lib_ser.EditLib(this.e_libname, this.e_desc,this.Editid).subscribe(
          data => {
            this.results = data;
            if (this.results[0].result == "success") {
              swal({
                title: "Updated!",
                text: "Library Details Updated Successfully",
                type: "success",
                confirmButtonClass: "btn-success"
              });
              this.viewlib1();
              $('#editlib').modal("hide");
            }

          }
      );
    }
  }
    Loadbuttons() {
        this.menu.Loadbutton(12,49,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;
            }
        );

    }


}
