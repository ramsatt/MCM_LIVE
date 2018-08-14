import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UsercatserviceService} from "./services/usercatservice.service";
import {MenumanagementService} from "../../commonpages/menumanagement/service/menumanagement.service";
declare var $;
declare var swal;
@Component({
  selector: 'app-usercategory',
  templateUrl: './usercategory.component.html',
  styleUrls: ['usercategory.component.scss']
})
export class UsercategoryComponent implements OnInit {
  submitted = false;

  active = true;
  status:any;
  results:any;
  user_role:any;
  user_cat:any;
  euser_cat:any;
  allcat:any;
    euser_id:any;
    loadcat:any;
    loaduniquecat:any;
    loaduniquecatlen:any;
    usersrole:any;
    Asssubmenu:any;
    Asssubbutton:any;
    b_add:any;
    edit:any;
    delete:any;
    sessid:any;
  constructor(public  menu:MenumanagementService,public router:Router,public userser:UsercatserviceService) {
      this.sessid = localStorage.getItem('ucmid');

  }

  ngOnInit() {
    this.viewuserrole();
    this.viewcat();
      this.Loadbuttons();
  }
  viewuserrole()
  {
    this.menu.Loaduserrorle().subscribe(
        data => {
          this.usersrole = data;


        }
    );
  }
  cat_add()
  {
    this.userser.Createcat(this.user_role,this.user_cat).subscribe(
        data => {
          this.results = data;
          //console.log(this.model.part_img);
            this.viewcat();
          if(this.results[0].result =="success")
          {
            swal({
              title: "Created!",
              text: "User Category Created successfully",
              type: "success",
              confirmButtonClass: "btn-success"
            });

            this.viewcat();

          }

        } );

  }
    checkunique(role,cat)
    {
        this.userser.checkunique(role,cat).subscribe(
            data => {

                this.loaduniquecat = data;
                this.loaduniquecatlen=this.loaduniquecat.length;
                if(this.loaduniquecat.length!=0)
                {
                    $("#existerror").show();
                    return false;
                }
                else{
                    $("#existerror").hide();
                    return true;
                }

            }
        );
    }
    enable()
    {

        if(this.loaduniquecatlen==0)
        {

            return false;
        }
        else{

            return true;
        }
    }
    formrefresf()
    {
        $("#addcatform").trigger("reset");
        this.viewuserrole();
    }
  cat_update()
  {
    this.userser.Updatecat(this.euser_id,this.euser_cat).subscribe(
        data => {
          this.results = data;
          //console.log(this.model.part_img);
          if(this.results[0].result =="success")
          {
            swal({
              title: "Updated!",
              text: "User Category Updated successfully",
              type: "success",
              confirmButtonClass: "btn-success"
            });

            this.viewcat();

          }

        } );

  }
  LoadcatDetails(id)
  {
    this.userser.catdetails(id).subscribe(
        data => {
          this.loadcat = data;
          this.euser_cat = this.loadcat[0].UCM_Category_Name;
         this.euser_id=this.loadcat[0].UCM_KeyID;

        }
    );


  }
  viewcat()
  {
    this.userser.viewcat().subscribe(
        data => {
          this.allcat = data;
          var $table = $('.demo');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });
          if(this.allcat != null)
          {
            this.status = 'active';

          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        } );

  }
    Delete(id){

        let that = this;
        swal({
                title: "Are you sure?",
                text: "This Category will not be able to recover this future!",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Delete",
                closeOnConfirm: false
            },
            function() {
                that.userser.Delcat(id).subscribe(
                    data => {
                        this.delholi = data;
                        if(this.delholi != null)
                        {
                            {
                                swal({
                                    title: "Deleted!",
                                    text: "Usercategory has been deleted",
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });
                                that.viewcat();
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
    Loadbuttons() {
        this.menu.Loadbutton(12,55,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;

            }
        );

    }
}
