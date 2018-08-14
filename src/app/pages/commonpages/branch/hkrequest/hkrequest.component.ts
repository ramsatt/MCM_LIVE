import { Component, OnInit,Input,OnChanges } from '@angular/core';
import {HerokitService} from "../../account/services/herokit/herokit.service";
import {Router} from '@angular/router';
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {BranchService} from "../services/branch.service";
import {RequestService} from "../services/request.service";
import {BranchoverviewComponent} from "../branchoverview/branchoverview.component";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-hkrequest',
  templateUrl: './hkrequest.component.html',
  styleUrls: ['./hkrequest.component.css']
})
export class HkrequestComponent implements OnInit, OnChanges {

    @Input() id;
    //@Input() name;
    //@Input() hblat;
    //@Input() hblon;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umid:any;
    hkmid:any=[];
    values:any;
    location: any;
    requestcity: any;
    requeststate: any;
    BranchIdval: any = 0;
    herokitidval: any = 0;
    name: any;
    hblat:any;
    hblon:any;
    hmiles:any;
    allbranchval: any='';
    requesttype: any;
    mulherokitlist: any='';
    allheroassignedpart:any='';
    branchid:any;
    heroid:any;
    allheroassignedpartreq:any;
    quantity:any;
    selherokitid:any;
    viewassaccsuppart:any=[];
    herononherokitstatus: any = 'Y';
    branchValues: any;
    selectid:any;
    DefaultDistanceMessage: any;
    ticketId: any = '';
    directshipment: any = '';
    hrcheckreqstock: any = 1;

  constructor(public router: Router,public asskit:HerokitService,public accountService:AccountsService,public branchService:BranchService,public requestService:RequestService,private bncoverviewhero:BranchoverviewComponent,public menu:MenumanagementService) {
      //this.branchinfobyid();
      this.sessid=localStorage.getItem('ucmid');
      this.Loadbuttons();
  }

  ngOnInit() {
      this.herokitfromreset();
      this.branchinfobyid();
  }
    ngOnChanges()
  {
      this.branchinfobyid();
      //this.herokitfromreset();
  }

  /* check if any box checked */
  checkService()
  {
    if((this.hkmid.length > 0)&& (this.values.length>0)){
      return false;
    }else{
      return true;
    }
  }

  findBranchall(Type,heroid)
  {
    // reset all previous values2
      if(Type=='Manufacturer')
      {
          this.DefaultDistanceMessage = 'Above will be the closest(miles) Account for the selected branch';
      }
      else
      {
          this.DefaultDistanceMessage = 'Above will be the closest(miles) '+Type+ ' for the selected branch';
      }

    $('#select').prop('selectedIndex',0);
    this.hkmid=[];
    //this.setLocation('','','','');
    if(this.BranchIdval.length > 0){
      this.BranchIdval =  0;
    }
    if(this.herokitidval.length > 0){
      this.herokitidval =  0;
    }
    if(this.allbranchval.length > 0){
      this.allbranchval.length =  0;
    }
    if(this.mulherokitlist.length > 0){
      this.mulherokitlist.length =  0;
    }
    if(this.allheroassignedpart.length > 0){
      this.allheroassignedpart.length =  0;
    }

    this.checkService();
    //this.Slectedherokit(heroid);
    this.requestService.findBranchall(Type,this.id).subscribe(
        data => {
          this.allbranchval = data;
          this.requesttype = Type;

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
                this.hmiles= data[0].distance;
            }
            else
            {
                this.hmiles = ' ';
            }
            this.findherokit(data[0].id);
            this.selectid = data[0].id;
            this.BranchIdval = data[0].id;
        },
    );
  }

  loadpartInfo(i,branchid,requestype)
  {
    this.branchid = branchid;
    this.requesttype = requestype;
    this.setLocation(requestype,branchid,this.hblat,this.hblon);
  }

  setLocation(Type,id,hblat,hblon)
  {
    this.DefaultDistanceMessage = '';
    this.requestService.setLocation(Type,id,hblat,hblon).subscribe(
        data => {
          this.location = data;
          this.requestcity= data.city;
          this.requeststate = data.state;
          this.hmiles=data.miles;
        },
    );

    if(Type)
    {
      this.findherokit(id);
    }
  }

  findherokit(id)
  {
    this.requestService.findherokit(id,this.requesttype,this.id).subscribe(
        data => {
          this.mulherokitlist = data;
        },
    );
  }

  findherokitparts(type,id,requestto)
  {
    this.requestService.findherokitparts(id,type,requestto,this.id).subscribe(
        data => {
          this.allheroassignedpart = data;
        },
    );

  }

    checkrdpartid(i,chkBox,herokitid,event){
        if(event.target.checked)
        {
            $("#nqty"+i).prop("readonly", false);
            $("#nidval"+i).find("option").css("display","block");
            this.quantity='nqty'+i;
            this.textenable(i,'');
            this.asskit.partbncaccsuplist(chkBox,herokitid,this.id,this.requesttype).subscribe(
                data => {
                    this.selherokitid=chkBox;
                    this.viewassaccsuppart[i] = data;
                },
            );
            this.hkmid.push(chkBox);
        }
        else if (!event.target.checked){

            $("#nqty"+i).val('');
            this.values=$("#nqty"+i).val('');
            $("#nqty"+i).attr("readonly", "readonly");
            $("#nidval"+i).find("option").css("display","none");
            $("#msg"+i).removeClass('text-success');
            $("#msg"+i).addClass('text-danger');
            $("#msg"+i).html("Request cannot be raised");
            let ind = this.hkmid.indexOf(chkBox);
            this.hkmid.splice(ind,1);
        }
        //console.log(this.hkmid);
    }

    textenable(i,event:any)
    {
        this.values=$("#nqty"+i).val();
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
        if( parseInt($("#nqty"+i).val()) )
        {
            qty = parseInt($("#nqty"+i).val());
        }
        else
        {
            qty = 0;
        }

        this.values=$("#nqty"+i).val();
        /*console.log($("#vrs"+i).val(), $("#nqty"+i).val(), $("#repl"+i).val());
        if( (vrs - qty ) < repl && $("#nqty"+i).val())
        {
            $("#msg"+i).html("Request Can be Raised");
            $("#msg"+i).removeClass('text-danger');
            $("#msg"+i).addClass('text-success');
            this.hrcheckreqstock=1;
        }
        else
        {
            $("#msg"+i).html("Request Can't be Raised");
            $("#msg"+i).removeClass('text-success');
            $("#msg"+i).addClass('text-danger');
            this.hrcheckreqstock=0;
        }*/
    }

    checkqty()
    {
        if(this.hrcheckreqstock==1){
            return false;
        }else{
            return true;
        }
    }

    updateParts(form)
    {
        $('#loader').show();
        this.requestService.Partrequest(form).subscribe(
            data => {
               // $('#reheromulreqpart').modal('hide');
                $('#loader').hide();
                $("#loader").css("visibility", "hidden");
                if ( data.result === 'success' ) {
                    swal({
                        title: 'Created!',
                        text: 'Request Parts Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });

                    this.bncoverviewhero.raisedreq();
                    this.herokitfromreset();
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

    // Reset Form
    herokitfromreset()
    {
        $('#herorequestto1').prop('checked',false);
        $('#herorequestto2').prop('checked',false);
        $('#herorequestto3').prop('checked',false);
        $('#select').prop('selectedIndex',0);
        this.hkmid=[];
        this.setLocation('','','','');
        if(this.BranchIdval.length > 0){
            this.BranchIdval =  0;
        }
        if(this.herokitidval.length > 0){
            this.herokitidval =  0;
        }
        if(this.allbranchval.length > 0){
            this.allbranchval.length =  0;
        }
        if(this.mulherokitlist.length > 0){
            this.mulherokitlist.length =  0;
        }
        if(this.allheroassignedpart.length > 0){
            this.allheroassignedpart.length =  0;
        }
        this.DefaultDistanceMessage = '';
    }

    branchinfobyid()
    {
        //alert('Yes');
        this.requestService.branchinfobyid(this.id).subscribe(
            data => {
                this.branchValues = data;
                this.name = this.branchValues[0].BM_Branch_Name;
                this.hblat= this.branchValues[0].BM_Latitude;
                this.hblon = this.branchValues[0].BM_Longitude;
            },
        );
    }
    Loadbuttons() {
        this.menu.Loadbutton(8,24,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;

                this.delete=this.Asssubbutton[0].MA_Delete;

            }
        );

    }

}
