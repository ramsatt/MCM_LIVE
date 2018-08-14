import {Component, OnInit, Input, Output, OnChanges, ViewChild, AfterViewInit} from '@angular/core';
import {Router} from '@angular/router';
import {PartsService} from '../../inventory/parts/services/parts.service';
import {BranchService} from '../services/branch.service';
import {RequestService} from '../services/request.service';

//import {Parts} from './parts';
import {BranchoverviewComponent} from '../branchoverview/branchoverview.component';
import {NgModel} from '@angular/forms';
import {MenumanagementService} from '../../menumanagement/service/menumanagement.service';
import EventEmitter = NodeJS.EventEmitter;
import {Subject} from "rxjs";

declare var $;
declare var swal;

@Component({
  selector: 'app-assignpart',
  templateUrl: './assignpart.component.html',
  styleUrls: ['./assignpart.component.scss']
})
export class AssignpartComponent implements OnInit, OnChanges,AfterViewInit  {

   // dtOptions: DataTables.Settings = {};
   // dtTrigger: Subject<any> = new Subject();

    @Input() id;
    @Input() name;
    @Input() brStatus;
    @Output() childVal;
    @Input() changeid;
    qtval:any;
    qtval1:any=[];
    repl:any;
    replval1:any=[];
    status:any;
    allparts:any;
    qaty:any
    chkpartqty:any;
    checkbox: any = [];
    demoChk: any = [];
    rplChk: any = [];
    PartID:any;
    PartName:any;
    supplier:any;
    Supplier_ID:any;
    suppartid:any;
    setClickedRow:any;
    selectedEntry:any;
    _prevSelected:any;
    viewasspart:any = [];
    comboval:any;
    submitted = false;
    active = true;
    partname: any = '';
    mfgpartnumber: any = '';
    part_model: any = '';
    internalcost: any = '';
    part_price: any = '';
    internalnotes: any = '';
    part_description: any = '';
    part_image: any;
    results: any;
    successresults:any;
    hasBaseDropZoneOver: boolean = false;
    LogoExt: any;
    BranchDetails:any;
    Branch_Name:any;
    SiteID:any;
    allbranch: any;
    PartId: any;
    AccType: any;
    /* Account Details */
    AccountDetailsArray:any;
    //BranchIdvals:any='';
    /* File Upload */
    uploadFile: any = '';
    locationmul:any=[];
    options: Object;
    partsid: any;
    partsname: any;
    Checkbocval:any;
    frombranch: any;
    quantity:any;
    values1:any='';
    values2:any = '';
    sizeLimit = 2000000;
    random: any = Math.floor((Math.random() * 1000000) + 1);
    PartsMsg:any = 'Parts List Empty';
    public photo: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    requestmulcity: any=[];
    requestmulstate: any=[];
    // Non Herokit Request Variables
    nonherokitstatus: any = 'N';
    request: any = '0';
    values:any='';
    hkm1id:any=[];
    herokitid: any = '';
    requestcity: any;
    requeststate: any;
    location: any;
    BranchIdval: any = 0;
    blat: any;
    blon: any;
    miles: any;
    mulmiles: any=[];
    viewasspoppart:any;
    branchid: any;
    requesttype: any;
    allbranchval: any;
    allpartsinfo: any;
    selherokitid:any;
    nonviewassaccsuppart:any=[];
    urmid:any='';
    bncpartid:any='';

  constructor( public router: Router,public asspart:PartsService,public branchService:BranchService,public requestService:RequestService,private bncoverview:BranchoverviewComponent,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.urmid=localStorage.getItem('urmid');
      this.Loadbuttons();
      this.setClickedRow = function(index){
      this.selectedRow = index;
    };
      this.assignedparts(this.id);
  }

    ngOnInit() {
       /* this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10
        };*/

        var $table = $('.demo');
        $table.floatThead({
            //useAbsolutePositioning: true,
            scrollContainer: function ($table) {
                return $table.closest('.cover1');
            }
        });
        /*$(document).ready(function () {
            var $table = $('.covernew1 table');

            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.covernew1');
                }
            });

        });*/
    }
    ngOnChanges()
    {

        this.assignedparts(this.id);
        this.branchinfo(this.id);
        if(this.bncpartid=='')
        {
        this.bncpartid=this.id;
        }
        else{
            this.bncpartid=this.id;
        }
        if(this.changeid==1)
        {
            this.assignedparts(this.id);
            /*setTimeout(function() {
                var $table = $('.demo');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover2');
                    }
                });
            }, 1000);*/

        }
        else {

        }
    }
    ngAfterViewInit() {


    }

    branchinfo(Branch_ID) {
        this.requestService.branchinfo(Branch_ID).subscribe(
            data => {
                this.blat = data.blat;
                this.blon = data.blon;
            }
        );
    }

    textenable1(i,event:any)
    {
        this.values1=$("#qaty"+i).val();
    }

    textenable2(i,event:any)
    {
        this.values2=$("#repl"+i).val();
    }

  viewassignparts(id)
  {
    console.log("branchesid"+id);
    if(this.brStatus=='N'&& this.urmid!=1)
    {
        swal({
            title: "Part cannot be added",
            text: 'This branch is deactivated',
            type: 'error',
            confirmButtonClass: 'btn-danger'
        });
    }
    else
    {
        // Load Modal
        this.demoChk=[];
        this.rplChk=[];
        this.LoadBranchDetails(this.id);
        $(function () {

            $('#showpart').modal();
            //$('#muleqpartform').trigger('reset');

        });
        if(this.bncpartid=='')
        {
            this.bncpartid=this.id;
        }
        else{
            this.bncpartid=this.id;
        }
        this.asspart.Loadallbncparts(this.id).subscribe(
            data => {
                this.results = data;

                setTimeout(() => {
                    $('#part').DataTable(

                        {
                           // "destroy": true,
                          "searching":false,

                            "paging":false,
                            "scrollY": 600,
                            "scrollX": true
                        }

                    );
                }, 1000);
            },
        );
    }
      this.bncpartid=this.id;
    console.log('Fnia',this.bncpartid);
  }
    enable()
    {
        //console.log('dmeo:',this.demoChk.length,' Repl:',this.rplChk.length)
        if((this.demoChk.length > 0) && (this.rplChk.length > 0) ){
            return false;
        }else{
            return true;
        }
    }

  LoadBranchDetails(Branch_ID) {
    this.branchService.ViewBranch(Branch_ID).subscribe(
        data => {
          this.BranchDetails = data;
          this.Branch_Name = this.BranchDetails.BM_Branch_Name;
          this.frombranch = this.BranchDetails.BM_KeyID;
        }
    );
  }

  updateCheckedOptions(i,chBox, event) {

    if(event.target.checked) {
        console.log("checked");
        $("#qaty"+i).prop("readonly", false);
        $("#repl"+i).prop("readonly", false);
        $("#qaty"+i).val("0");
        $("#repl"+i).val("0");
        this.textenable1(i,'');
        this.demoChk.push(chBox);
        this.rplChk.push(chBox);
    }
    else if (!event.target.checked){
        $("#qaty"+i).val('');
        $("#repl"+i).val('');
        this.values1=$("#qaty"+i).val('');
        $("#qaty"+i).attr("readonly", "readonly");
        $("#repl"+i).attr("readonly", "readonly");
        let indexx = this.demoChk.indexOf(chBox);
        this.demoChk.splice(indexx,1);

        let indexx2 = this.rplChk.indexOf(chBox);
        this.rplChk.splice(indexx2,1);
    }
  }
  assignedparts(PartsID)
  {
    this.asspart.Assignedbncparts(this.id).subscribe(
        data => {
                this.viewasspart = data;
            /*setTimeout(function() {
                var $table = $('.demo');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover2');
                    }
                });
            }, 1000);*/

                //console.log('Datables',this.viewasspart,'Values',this.dtTrigger);
                // Calling the DT trigger to manually render the table
                //this.dtTrigger.next();

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
  updateOptions(form){
      this.asspart.Assignbncpart(form).subscribe(
          data => {
              this.successresults = data;
              if(this.successresults[0].result =="success")
              {
                  swal({
                      title: "Assigned!",
                      text: " Part Assigned Successfully",
                      type: "success",
                      confirmButtonClass: "btn-success"
                  });
                  this.assignedparts(this.id);
                 // this.demoChk=[];
                 // this.rplChk=[];
                  //$('#muleqpartform').trigger('reset');
              }


          }
      );
  }

    viewqty(i,event)
    {
        this.qtval=$("#qaty"+i).val();
        this.qtval1.push(this.qtval);
    }
    viewrepl(i,event)
    {
        this.repl=$("#repl"+i).val();
        this.replval1.push(this.repl);
    }
    setPartID(PartIDval,PartNameval)
    {
        this.PartId = PartIDval;
        this.PartName = PartNameval;
    }
    @ViewChild('nonherobranchall') private selectModel: NgModel;

  findBranchall(Type)
  {
      // reset all fields
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
            },
        );
  }

    findBranch(Type)
    {
        this.requestService.findBranch(this.PartId,Type,this.id,'1').subscribe(
            data => {
                this.allbranch = data;
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
    setmulLocation(i,Type,id,lat,lon)
    {
        this.requestService.setLocation(Type,id,lat,lon).subscribe(
            data => {
                this.locationmul[i] = data;
                this.requestmulcity[i]= data.city;
                this.requestmulstate[i] = data.state;
                this.mulmiles[i]=data.miles;
            },
        );
    }

    createRequest(type,tobranch,qty)
    {
        if(type=='Supplier')
        {
            var confirmmsg = 'Do you want to Create Request PO?';
        }
        else
        {
            var confirmmsg = 'Do you want to Create Request Part?';
        }

        if(confirm(confirmmsg)) {

            this.requestService.createRequest(type,tobranch,qty,this.id,this.PartId,'0','','N').subscribe(
                data => {
                    if ( data.result === 'success' ) {
                        swal({
                            title: 'Created!',
                            text: 'Request Parts Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });
                       // this.raisedreq.raisedRequest(this.id);
                        this.bncoverview.raisedreq();
                        $(function () {
                            $('#form').trigger('reset');
                        });
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
                //() => console.log('Complete')
            );
        }


    }

    loadpartInfo(branchid,requestype)
    {
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


    fromref()
    {
        if(this.brStatus=='N' && this.urmid!=1)
        {
            swal({
                title: "Cannot Request Part",
                text: 'This branch is deactivated',
                type: 'error',
                confirmButtonClass: 'btn-danger'
            });
        }
        else {
            // Load Modal
            $(function () {
                $('#mulreqpart').modal();
            });
            $('#requestto1').prop('checked', false);
            $('#requestto2').prop('checked', false);
            $('#requestto3').prop('checked', false);
            $('#select option:selected').removeAttr('selected');
            this.hkm1id = [];
            if (this.BranchIdval.length > 0) {
                this.BranchIdval = 0;
            }
        }

        this.bncpartid = this.id;
    }

    // Update Replenishment
    updateRepl(qty,rpdid,herokit,qnttype)
    {
        this.requestService.updateRepl(qty,rpdid,herokit,qnttype).subscribe(
            data => {
                if ( data.result === 'success' ) {

                    if(qnttype=='cr')
                    {
                        $.notify({
                            title: '<strong>Updated</strong><br>',
                            message: 'Current Stock Updated Successfully'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'top',
                                align: "left"
                            }
                        });
                    }
                    else if(qnttype=='tr')
                    {
                        $.notify({
                            title: '<strong>Updated</strong><br>',
                            message: 'Target Stock Updated Successfully'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'top',
                                align: "left"
                            }
                        });
                    }
                    else if(qnttype=='svs')
                    {
                        $.notify({
                            title: '<strong>Updated</strong><br>',
                            message: 'Virtual Stock Updated Successfully'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'top',
                                align: "left"
                            }
                        });
                    }
                    else if(qnttype=='trs')
                    {
                        $.notify({
                            title: '<strong>Updated</strong><br>',
                            message: 'Reserved Stock Updated Successfully'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'top',
                                align: "left"
                            }
                        });
                    }
                    else {
                        $.notify({
                            title: '<strong>Updated</strong><br>',
                            message: 'Replenishment Updated Successfully'
                        }, {
                            type: 'success',
                            placement: {
                                from: 'top',
                                align: "left"
                            }
                        });

                    }
                    this.assignedparts(this.id);
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
    Loadbuttons() {
        this.menu.Loadbutton(8,746,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;

            }
            //() => console.log('site loaded')
        );

    }

    deletePartassigned(bhdId,bmId,pmId,Type) {

        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Part will be deleted!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.requestService.deletePartassigned(bhdId,bmId,pmId,Type).subscribe(
                    data => {
                        if (data.result === 'success') {
                            that.assignedparts(this.id);
                            swal({
                                title: 'Deleted!',
                                text: 'Part Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        } else if (data.result === 'warning') {
                            swal({
                                title: 'Cannot delete!',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }
}
