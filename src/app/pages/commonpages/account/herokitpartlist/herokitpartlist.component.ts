import { Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HerokitService} from '../services/herokit/herokit.service';
import {Router} from '@angular/router';
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
MenumanagementService
declare var swal;
declare var $;

@Component({
  selector: 'app-herokitpartlist',
  templateUrl: './herokitpartlist.component.html',
  styleUrls: ['herokitpartlist.component.scss']
})
export class HerokitpartlistComponent implements OnInit, OnChanges{
    @Input() heroid;
    @Input() acc_id;
    @Input() hername;
    allheropart: any;
    data: any;
    checkbox: any = [];
    demoChk: any = [];
    results: any;
    allheroassignedpart: any;
    delheroassignedpart: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    hkpdelete:any;
    sessid:any;
    values:any='';
    checkqtyval:any;
    totalqty:any = [];

  constructor(public router: Router, public hero_ser: HerokitService,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid')
      this.Loadbuttons();
  }

  ngOnInit() {
  }
    ngOnChanges(changes: SimpleChanges): void{
        this.viewassignedpart(this.heroid);
    }

  viewassignedpart(heroid){

    this.hero_ser.viewheroassignedpart(heroid).subscribe(
        data => {
          this.allheroassignedpart = data;
          //this.heroid = this.alltickets.HKM_KeyID;
        } );
  }

  viewassignpart(heroid){
    this.demoChk = [];

    this.hero_ser.viewheropart(heroid,this.acc_id).subscribe(
        data => {
          this.allheropart = data;
          //this.heroid = this.alltickets.HKM_KeyID;
        } );
  }

  updateCheckedOptions(chBox, event,i) {

    if(event.target.checked) {
      //$("#allqty"+i).prop("readonly", false);
      this.demoChk.push(chBox);

    }
    else if (!event.target.checked){

        let indexx = this.demoChk.indexOf(chBox);
        this.demoChk.splice(indexx,1);

        /*$("#allqty"+i).prop("readonly", true);
        $("#allqty"+i).val('');
        let indexx2 = this.totalqty.indexOf( $("#allqty"+i).val('') );
        this.totalqty.splice(indexx,1);*/
    }

  }
  updateOptions(form){

      this.hero_ser.Assignparts(form).subscribe(
          data => {
              if ( data.result == 'success' ) {
                  swal({
                      title: 'Assigned!',
                      text: 'Herokit Part Assigned Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
                  this.viewassignedpart(this.heroid);
              }

              this.demoChk=[];
              this.viewassignpart(this.heroid);
          },
          err => {
              swal({
                  title: 'Error',
                  text: 'Error occurs, please try after some time.',
                  type: 'error',
                  confirmButtonClass: 'btn-danger'
              });

          },
      );
    /*this.hero_ser.Assignparts(this.demoChk,this.heroid).subscribe(
        data => {
          this.results = data;
          console.log(data);
          if(this.results[0].result =="success")
          {
            swal({
              title: "Assigned!",
              text: " Herokit Part Assigned Successfully",
              type: "success",
              confirmButtonClass: "btn-success"
            });
            this.viewassignedpart(this.heroid);
          }
          this.demoChk=[];
            this.viewassignpart(this.heroid)
        }
    );*/
  }
    enable()
    {
        if(this.demoChk.length > 0 ){
            return false;
        }else{
            return true;
        }
    }
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "Do you want to delete this herokit part?",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.hero_ser.Delheroassignedpart(id).subscribe(
              data => {
                this.delheroassignedpart = data;
                  if (data.result === 'success') {
                      that.viewassignedpart(that.heroid);
                      swal({
                          title: 'Deleted!',
                          text: 'Part Deleted Successfully',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                  } else if (data.result === 'warning') {
                      swal({
                          title: 'Can not delete!',
                          text: data.message,
                          type: 'error',
                          confirmButtonClass: 'btn-danger'
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
    Loadbuttons() {
        this.menu.Loadbutton(2,73,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.hkpdelete=this.Asssubbutton[0].MA_Delete;

            }
            //() => console.log('site loaded')
        );

    }

    textenable(i,event:any)
    {
        this.values=$("#allqty"+i).val();
        //this.totalqty.push( $("#allqty"+i).val() );
    }

    ytbquantity(i)
    {
        if(parseInt($("#allqty"+i).val())>parseInt($("#ytbty"+i).val()))
        {
            $("#ytbqtymsg"+i).html('Quantity should not be greater than Yet to be Available Parts');
            this.checkqtyval=0;
        }
        else
        {
            $("#ytbqtymsg"+i).html('');
            this.checkqtyval=1;
        }
    }


    checkqty()
    {
        if(this.checkqtyval==1){
            return false;
        }else{
            return true;
        }
    }
}
