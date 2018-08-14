import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import {RequestService} from "../services/request.service";
import {PartsService} from "../../inventory/parts/services/parts.service";
import {BranchoverviewComponent} from "../branchoverview/branchoverview.component";
import {Router} from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';

declare var $;
declare var swal;

@Component({
  selector: 'app-nonhkrequest',
  templateUrl: './nonhkrequest.component.html',
  styleUrls: ['./nonhkrequest.component.css']
})

export class NonhkrequestComponent implements OnInit,OnChanges {

    @Input() id;
    //@Input() name;
    //@Input() blat;
    //@Input() blon;
    miles: any;
    hkm1id:any=[];
    values:any='';
    location: any;
    requestcity: any;
    requeststate: any;
    viewasspoppart:any = '';
    BranchIdval: any = 0;
    requesttype: any;
    allbranchval: any;
    branchid: any;
    allpartsinfo: any;
    request: any = '0';
    nonherokitstatus: any = 'N';
    herokitid: any = '';
    selherokitid:any;
    nonviewassaccsuppart:any=[];
    rows: any[] = [];
    name: any;
    blat: any;
    blon: any;
    branchValues: any;
    selectid:any;
    DefaultDistanceMessage: any;
    ticketId: any = '';
    directshipment: any = 'N';
    checkreqstock: any = 1;

  constructor(public router: Router,public requestService:RequestService,public asspart:PartsService,private bncoverview:BranchoverviewComponent) { }

  ngOnInit() {
      this.nonhkformreset();
      this.branchinfobyid();
  }
  ngOnChanges()
  {
      this.branchinfobyid();
  }


  enable1()
  {
      if((this.hkm1id.length > 0) && (this.values.length>0) && (this.viewasspoppart.length>0)){
          return false;
      }else{
          return true;
      }
  }

  updateParts(form)
  {
    //$('#loader').show();

      /*const formData: FormData = new FormData();
      formData.append('tobranch', this.branchid);
      formData.append('frombranch', this.id);
      formData.append('request', this.request);
      formData.append('requesttype', this.requesttype);
      formData.append('herokitstatus', this.nonherokitstatus);
      formData.append('herokitid', this.herokitid);
      formData.append('ticketId', this.ticketId);
      formData.append('partsArray', this.rows);

      const headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      console.log('formData from comp',formData);*/

    this.asspart.UpdatenonheroPartrequest(form).subscribe(
        data => {
          if ( data.result == 'success' ) {
              $('#loader').hide();
              $("#loader").css("visibility", "hidden");

            swal({
              title: 'Created!',
              text: 'Request Parts Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });

            this.bncoverview.raisedreq();
            this.setLocation('','','','');
            this.assignedpartspopup('','','');
            $('#select').children('option').first().prop('selected', true)
            $('#select').trigger("chosen:updated");
          }
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
  }

  setLocation(Type,id,lat,lon)
  {
    this.requestService.setLocation(Type,id,lat,lon).subscribe(
        data => {
          this.location = data;
          this.requestcity= data.city;
          this.requeststate = data.state;
          this.miles=data.miles;
        },
    );
  }

  assignedpartspopup(requesttype,branchid,oldid)
  {
    this.asspart.Assignedbranchpopupparts(requesttype,branchid,oldid).subscribe(
        data => {
          this.viewasspoppart = data;
        },
    );
  }

  findBranchall(Type)
  {
    // reset all fields
      if(Type=='Manufacturer')
      {
          this.DefaultDistanceMessage = 'Above will be the closest(miles) Account for the selected branch';
      }
      else
      {
          this.DefaultDistanceMessage = 'Above will be the closest(miles) '+Type+ ' for the selected branch';
      }


    if(this.BranchIdval.length > 0){
      this.BranchIdval =  0;
    }
    this.hkm1id=[];
    $('#select option:selected').removeAttr('selected');
    this.setLocation('','','','');
    this.assignedpartspopup('','','');
    this.requestService.findBranchall(Type,this.id).subscribe(
        data => {
          this.requesttype = Type;
          this.allbranchval = data;
          if(data[0].city)
          {
              this.requestcity= data[0].city;
          }
          else
          {
              this.requestcity= ' ';
          }
            if(data[0].state)
            {
                this.requeststate= data[0].state;
            }
            else
            {
                this.requeststate= ' ';
            }
            if(data[0].distance)
            {
                this.miles= data[0].distance;
            }
            else
            {
                this.miles = ' ';
            }

            this.loadpartInfobytype(data[0].id,Type);
            this.selectid = data[0].id;
            this.BranchIdval = data[0].id;
        },
    );
  }

    loadpartInfobytype(branchid,requestype)
    {
        this.branchid = branchid;
        this.requesttype = requestype;
        this.requestService.loadpartInfo(branchid,requestype,'N',this.id).subscribe(
            data => {
                this.allpartsinfo = data;
            },
        );
        this.assignedpartspopup(requestype,branchid,this.id);
    }

    loadpartInfo(branchid,requestype)
    {
        this.DefaultDistanceMessage = '';
        this.values = '';
        this.branchid = branchid;
        this.requesttype = requestype;
        this.requestService.loadpartInfo(branchid,requestype,'N',this.id).subscribe(
            data => {
                this.allpartsinfo = data;
            },
        );

        this.setLocation(requestype,branchid,this.blat,this.blon);
        this.assignedpartspopup(requestype,branchid,this.id);
    }

    checknonpartid(i,chkBox,event){
      //console.log('I',i,' chkbox ',chkBox, ' evnt ',event);
        if(event.target.checked)
        {
            $("#qty"+i).prop("readonly", false);
            $("#idval"+i).find("option").css("display","block");
            this.textenable(i,'');

            this.asspart.partbncaccsuplist(chkBox,this.id,this.requesttype).subscribe(
                data => {
                    this.selherokitid=chkBox;
                    this.nonviewassaccsuppart[i] = data;
                },
            );
            this.hkm1id.push(chkBox);
        }
        else if (!event.target.checked){
            $("#qty"+i).val('');
            this.values=$("#qty"+i).val('');
            $("#qty"+i).attr("readonly", "readonly");
            $("#idval"+i).find("option").css("display","none");
            $("#msg"+i).removeClass('text-success');
            $("#msg"+i).addClass('text-danger');
            $("#msg"+i).html("Request cannot be raised");
            let ind = this.hkm1id.indexOf(chkBox);
            this.hkm1id.splice(ind,1);
            // Remove Partid values from checkbox
            let removeIndex = this.rows.map(function(item) { return item.partid; }).indexOf(chkBox);
            this.rows.splice(removeIndex, 1);
        }
    }

    addRequest(row,partid,quantity)
    {
        this.rows.push({
            partid,quantity
        })
    }

    textenable(i,event:any)
    {
        let vrs;
        let qty;
        let repl;
        if( parseInt($("#vrs"+i).val()) )
        {
            vrs = parseInt($("#vrs"+i).val());
        }
        else
        {
            vrs = 0;
        }
        if( parseInt($("#repl"+i).val()) )
        {
            repl = parseInt($("#repl"+i).val());
        }
        else
        {
            repl = 0;
        }
        if( parseInt($("#qty"+i).val()) )
        {
            qty = parseInt($("#qty"+i).val());
        }
        else
        {
            qty = 0;
        }

        this.values=$("#qty"+i).val();
        //console.log($("#vrs"+i).val(), $("#qty"+i).val(), $("#repl"+i).val());
        if( (vrs - qty ) < repl && $("#qty"+i).val())
        {
            $("#msg"+i).html("Request can be raised");
            $("#msg"+i).removeClass('text-danger');
            $("#msg"+i).addClass('text-success');
            this.checkreqstock=1;
        }
        else
        {
            $("#msg"+i).html("Request cannot be raised");
            $("#msg"+i).removeClass('text-success');
            $("#msg"+i).addClass('text-danger');
            this.checkreqstock=0;
        }
    }

    checkqty()
    {
        if(this.checkreqstock==1){
            return false;
        }else{
            return true;
        }
    }

    nonhkformreset()
    {
        $('#requestto1').prop('checked',false);
        $('#requestto2').prop('checked',false);
        $('#requestto3').prop('checked',false);
        $('#select option:selected').removeAttr('selected');
        //this.setLocation('','','','');
        this.location = '';
        this.requestcity= '';
        this.requeststate = '';
        this.miles='';
        //this.assignedpartspopup('','','');
        this.viewasspoppart = '';
       // this.findBranchall('');
        this.hkm1id=[];
        this.DefaultDistanceMessage = '';

        if(this.BranchIdval.length > 0){
            this.BranchIdval =  0;
        }
    }


    branchinfobyid()
    {
        //alert('Yes');

        this.requestService.branchinfobyid(this.id).subscribe(
            data => {
                this.branchValues = data;

                this.name = this.branchValues[0].BM_Branch_Name;
                this.blat= this.branchValues[0].BM_Latitude;
                this.blon = this.branchValues[0].BM_Longitude;
                //console.log('BRN ID',this.id,' Naem:', this.name,' Data:',data);
            },
        );


    }

}
