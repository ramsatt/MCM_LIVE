import { Component, OnInit,Input,Output,OnChanges,EventEmitter} from '@angular/core';
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
  selector: 'app-assignherokit',
  templateUrl: './assignherokit.component.html',
  styleUrls: ['./assignherokit.component.scss']
})
export class AssignherokitComponent implements OnInit, OnChanges {
  @Input() id;
  @Input() name;
  @Input() brStatus;
  @Output() raisedRequestsval = new EventEmitter<{any}>();
  @Input() branch_name;
  @Input() changeid;
  @Input() b_name;
    status:any;
    allparts:any;
    AccountID:any;
    checkbox: any = [];
    demoChk: any = [];
    PartID:any;
    supplier:any;
    Supplier_ID:any;
    suppartid:any;
    setClickedRow:any;
    selectedEntry:any;
    _prevSelected:any;
    viewasspart:any;
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
    hasBaseDropZoneOver: boolean = false;
    LogoExt: any;
    AccountArray:any;heroid
    Branch_Name:any;
    allheropart:any;
    //heroid:any;
    /* Account Details */
    AccountDetailsArray:any;
    kitexist:any;
    /* File Upload */
    uploadFile: any = '';
    options: Object;
    requestmulcity: any=[];
    requestmulstate: any=[];
    locationmul:any=[];
    mulmiles: any=[];
    PartId: any;
    allbranch: any;
    delheroassignedpart: any;
    allpartsinfo: any;
    partsid: any;
    partsname: any;
    frombranch: any;
    herorequest: any = '0';
    herokitid: any;
    herobranchid: any;
    PartName: any;
    BranchDetails: any;
    checkedpartid:any;
    demoselect: any = [];
    sizeLimit = 2000000;
    randomval: any = Math.floor((Math.random() * 1000000) + 1);
    herokitparts: any;
    raisedRequests:any;
    public photo: any;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    // Herokit Part Request Variables
    hkmid:any=[];
    values:any;
    location: any;
    requestcity: any;
    requeststate: any;
    BranchIdval: any = 0;
    herokitidval: any = 0;
    hblat:any;
    hblon:any;
    hmiles:any;
    allbranchval: any='';
    requesttype: any;
    mulherokitlist: any='';
    allheroassignedpart:any='';
    allheroassignedpartreq:any;
    quantity:any;
    selherokitid:any;
    viewassaccsuppart:any=[];
    herononherokitstatus: any = 'Y';
    selectedRow: Number = 0;
    urmid:any='';

  constructor(public router: Router,public asskit:HerokitService,public accountService:AccountsService,public branchService:BranchService,public requestService:RequestService,private bncoverviewhero:BranchoverviewComponent,public menu:MenumanagementService) {
      this.sessid=localStorage.getItem('ucmid');
      this.urmid=localStorage.getItem('urmid');
      this.Loadbuttons();
    this.setClickedRow = function(index){
      this.selectedRow = index;
  }}

  ngOnInit() {
    this.LoadAccounts(this.id);
    this.branchinfo(this.id);
      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });
  }
    ngOnChanges(){
      this.assignedkit(this.id);
      this. LoadBranchDetails(this.id);
      this.LoadAccounts(this.id);
      this.branchinfo(this.id);
        if(this.changeid==2)
        {
            this.assignedkit(this.id);
        }
        else {

        }
    }
  refreshhero()
  {
      if(this.brStatus=='N' && this.urmid!=1)
      {
          swal({
              title: "Herokit cannot be added",
              text: 'This branch is deactivated',
              type: 'error',
              confirmButtonClass: 'btn-danger'
          });
      }
      else
      {
          // Load Modal
          $(function () {
              $('#asskit').modal();
          });
          this.viewassignkit(0);
          $('#selacc').prop('selectedIndex',0);
      }
  }

    branchinfo(Branch_ID) {
        this.requestService.branchinfo(Branch_ID).subscribe(
            data => {
                this.hblat = data.blat;
                this.hblon = data.blon;
            }
        );
    }

    viewassignpart(heroid,id){
        //this.demoChk = [];

        this.asskit.viewheropart(heroid,id).subscribe(
            data => {
                this.allheropart = data;
            } );


    }

  viewassignkit(accid)
  {

    this.asskit.Loadallbnckit(accid,this.id).subscribe(
        data => {
          this.results = data;
            if(this.results.length > 0){
                this.kitexist =  true;
            }else{
                this.kitexist =  false;
            }
                 },
    );
  }
  LoadBranchDetails(Branch_ID) {
    this.branchService.ViewBranch(Branch_ID).subscribe(
        data => {
          this.BranchDetails = data;

          this.Branch_Name = this.BranchDetails.BM_Branch_Name;
        }
    );
  }

  LoadAccounts(branchid) {
    this.branchService.Loadbncaccounts(branchid).subscribe(
        data => {
          const AccountNameArray = [];
          this.AccountArray = data;
          for (const accounts of this.AccountArray)
          {
            AccountNameArray.push(accounts['AM_Name']);
          }
          setTimeout(function() {
            $.typeahead({
              input: '#example1',
              order: 'asc',
              minLength: 1,
              source: {
                data: AccountNameArray
              },
              cancelButton: false
            });

          }, 2000);
        }
    );
  }
    enable()
    {
        if((this.demoChk.length > 0) && (this.values.length>0)){
            return false;
        }else{
            return true;
        }
    }
  updateCheckedOptions(chBox, event) {

    if(event.target.checked) {

      this.demoChk.push(chBox);
    }
    else if (!event.target.checked){
      let indexx = this.demoChk.indexOf(chBox);
      this.demoChk.splice(indexx,1);
    }
  }


  assignedkit(PartsID)
  {
      //this.Slectedherokit(0);
    this.asskit.Assignedbnckit(this.id).subscribe(
        datas => {
          this.viewasspart = datas;
            this.selectedRow = 0;
            //console.log('FM Data',datas);
            if(datas.length>0)
            {
                //console.log('YES Data');
                this.Slectedherokit(datas[0]['BHKD_HKM_KeyID']);
            }
            else
             {
                 //console.log('NO Data');
                 //this.Slectedherokit('');
                 this.allheroassignedpartreq = '';
             }

        },
    );
  }
  updateOptions(AccID){
    this.asskit.Assignbnckit(this.demoChk,this.id).subscribe(
        data => {
          this.results = data;
          if(this.results[0].result =="success")
          {
              $('#asskit').modal('hide');
            swal({
              title: "Assigned!",
              text: " Herokit Assigned Successfully",
              type: "success",
              confirmButtonClass: "btn-success"
            });
            this.assignedkit(this.id);
            this.viewassignkit(AccID);
          }
          else{
              swal({
                  title: "Failed!",
                  text: "Please Select atleast one Herokit",
                  type: "error",
                  confirmButtonClass: "btn-danger"
              });
              this.viewassignkit(AccID);
          }
          this.demoChk=[];
        }
    );
  }
  Delete(id){

    let that = this;
    swal({
          title: "Are you sure?",
          text: "Do you want to delete this herokit?",
          type: "warning",
          showCancelButton: true,
          cancelButtonClass: "btn-default",
          confirmButtonClass: "btn-warning",
          confirmButtonText: "Delete",
          closeOnConfirm: false
        },
        function() {
          that.asskit.Delheroassignedbnc(id).subscribe(
              data => {
                this.delheroassignedpart = data;

                if(this.delheroassignedpart != null)
                {
                  {
                    swal({
                      title: "Deleted!",
                      text: "Herokit  has been deleted",
                      type: "success",
                      confirmButtonClass: "btn-success"
                    });
                    that.assignedkit(that.id);
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

    setPartID(PartIDval,PartNameval)
    {
        this.PartId = PartIDval;
        this.PartName = PartNameval;
        /*$(function () {
            $('#reqpart').modal();
        });*/
    }

    findBranch(Type)
    {
        this.requestService.findBranch(this.PartId,Type,this.id,'0').subscribe(
            data => {
                this.allbranch = data;
            },
        );
    }


    setmulLocation(i,Type,id,hblat,hblon)
    {
        this.requestService.setLocation(Type,id,hblat,hblon).subscribe(
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
        if(confirm("Do you want to Create Request  Part/PO?")) {

            this.requestService.createRequest(type,tobranch,qty,this.id,this.PartId,'0',this.heroid,'Y').subscribe(
                data => {
                    if ( data.result === 'success' ) {
                        swal({
                            title: 'Created!',
                            text: 'Request Parts Created Successfully',
                            type: 'success',
                            confirmButtonClass: 'btn-success'
                        });

                       // this.heroraisedreq.raisedRequest(this.id);
                        this.bncoverviewhero.raisedreq();
                        //this.HideModel();
                        //this.raisedreq.raisedRequest(this.id);
                        //this.raisedRequest(this.id);
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
    }



    // Hide Modal and reset Form
    HideModel() {
         $(function () {
            /*$('#mulreqpartformherokit').trigger('reset');*/
            $("#requestto").prop('checked', false);
            $('#requestto').removeAttr('checked');
            $("#requestto").val('');
           // $('#reheromulreqpart').modal('hide');
        });
        this.requestcity='';
        this.requeststate='';
        this.hmiles='';

        if(this.allbranchval.length > 0){
            this.allbranchval.length =  0;
        }
        if(this.mulherokitlist.length > 0){
            this.mulherokitlist.length =  0;
        }
        if(this.allheroassignedpart.length > 0){
            this.allheroassignedpart.length =  0;
        }
    }

    fromref2()
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
        else
        {
            // Load Modal
            $(function () {
                //$('#reheromulreqpart').modal();
            });
            $('#herorequestto1').prop('checked', false);
            $('#herorequestto2').prop('checked', false);
            $('#herorequestto3').prop('checked', false);
            $('#select').prop('selectedIndex', 0);
            this.hkmid = [];
            //this.setLocation('','','','');
            if (this.BranchIdval.length > 0) {
                this.BranchIdval = 0;
            }
            if (this.herokitidval.length > 0) {
                this.herokitidval = 0;
            }
            if (this.allbranchval.length > 0) {
                this.allbranchval.length = 0;
            }
            if (this.mulherokitlist.length > 0) {
                this.mulherokitlist.length = 0;
            }
            if (this.allheroassignedpart.length > 0) {
                this.allheroassignedpart.length = 0;
            }
        }

    }

    Slectedherokit(id)
    {
        // Table Design
        var $table = $('.demo');
        $table.floatThead({
            //useAbsolutePositioning: true,
            scrollContainer: function ($table) {
                return $table.closest('.cover1');
            }
        });


        this.heroid=id;
        this.asskit.viewheroaccassignedpart(id,this.id).subscribe(
            data => {
                this.allheroassignedpartreq = data;
            } );

    }

    OpenModel() {
        $(function () {
           // $('#reheromulreqpart').modal('show');
        });
    }

    raisedRequest(id) {
        this.requestService.raisedRequest(id).subscribe(
            data => {
                this.raisedRequestsval.emit(data);
                this.raisedRequests = data;
            }
        );
    }

    // Update Replenishment
    updateReplNh(qty,rpdid,herokit,qnttype,hkmid)
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
                            message: 'Vitual Stock Updated Successfully'
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
                    this.Slectedherokit(hkmid);

                    //this.Requestbyid(this.RPM_KeyID,this.Request_Type);
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
        this.menu.Loadbutton(8,25,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;

            }
        );

    }
    enable2()
    {
        if((this.demoChk.length > 0) && (this.demoChk.length>0)){
            return false;
        }else{
            return true;
        }
    }
}
