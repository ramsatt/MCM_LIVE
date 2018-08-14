import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { PartsService } from './../services/parts.service';

declare var $;
declare var swal;

@Component({
  selector: 'app-partslist',
  templateUrl: './partslist.component.html',
  styleUrls: ['./partslist.component.css']
})
export class PartslistComponent implements OnInit {
  allparts: any;
  status: any;
  id: any;
  delparts: any;
  Parts_Logo_Path: any;
  PartID: any;
  imgdetail: any;
  Imgpath: any;
  Partname: any;

  constructor( public router: Router, public par: PartsService) {
    this.viewparts();
  }

  ngOnInit() {
  }
  viewparts(){
    this.par.LoadParts().subscribe(
        data => {
          this.allparts = data;

          this.PartID = this.allparts[0].PM_KeyID;

          this.Parts_Logo_Path = 'http://localhost/assets/uploads/parts/'+this.PartID+'image/'+this.allparts[0].PM_Part_Image_Path;

          if(this.allparts != null)
          {
            this.status = 'active';

            setTimeout(function() {
              $('#parts').DataTable({
                responsive: true
              });
            }, 1000);
          }

          /* $('#accounts').DataTable({
           responsive: true
           });
           */
        }
    );


  }
  imgpopup(Part_ID){

    this.par.EditParts(Part_ID).subscribe(
        data => {
          this.imgdetail = data;
          this.PartID = this.imgdetail.PM_KeyID;
          if(this.imgdetail.PM_Part_Image_Path!=null)
          {
            this.Imgpath = 'http://localhost/assets/uploads/parts/' + this.imgdetail.PM_KeyID + '/image/' + this.imgdetail.PM_Part_Image_Path;
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
  open(link) {
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
          that.par.DelParts(id).subscribe(
              data => {
                this.delparts = data;
                that.viewparts();
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

}
