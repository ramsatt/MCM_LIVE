import { Component, OnInit,Input,OnChanges,SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import {PartsService} from "../../inventory/parts/services/parts.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {Subject} from "rxjs";

declare var $;
declare var swal;
@Component({
    selector: 'app-accountpartlist',
    templateUrl: './accountpartlist.component.html',
    styleUrls: ['./accountpartlist.component.scss']
})

export class AccountpartlistComponent implements OnInit, OnChanges {
    //dtOptionsacc: DataTables.Settings = {};
    //dtTriggeracc: Subject<any> = new Subject();

    //dtOptionsaccparts: DataTables.Settings = {};
    //dtTriggeraccparts: Subject<any> = new Subject();

    @Input() id;
    @Input() name;
    @Input() changed;
    status:any;
    allparts:any;
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
    chkpartqty:any;
    optionbox:any='';
    values1:any='';
    values2:any = '';
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
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    sessid:any;
    umid:any;
    qtval:any;
    qtval1:any;
    replval:any;
    replval1:any;
    rplChk: any = [];
    /* Account Details */
    AccountDetailsArray:any;

    /* File Upload */
    uploadFile: any = '';

    options: Object;

    sizeLimit = 2000000;
    public photo: any;
    constructor( public router: Router,public asspart:PartsService,public menu:MenumanagementService) {
        this.umid=localStorage.getItem('umid');
        this.sessid=localStorage.getItem('ucmid');
        this.Loadbuttons();
        this.setClickedRow = function(index){
            this.selectedRow = index;
            //console.log(this.selectedRow);
        };
    }

    ngOnInit() {



        //this.assignedparts(this.id);
        /*this.dtOptionsacc = {
         destroy: true,
         pagingType: 'full_numbers',
         pageLength: 10,
         retrieve: true,
         };*/

        /*this.dtOptionsaccparts = {
         destroy: true,
         pagingType: 'full_numbers',
         pageLength: 10,
         retrieve: true,
         };*/

        // this.dtOptionsacc.destroy();

    }


    assignedparts(partid)
    {

        this.asspart.Assignedparts(partid).subscribe(
            data => {
                this.viewasspart = data;
                $(()=>{
                    console.log(data);
                    /*setTimeout(() => {
                     $('#accpartlist').DataTable(
                     {
                     "ordering": false,
                     "paging":false,
                     "scrollY": 600,
                     "scrollX": true,
                     columnDefs: [
                     { width: '20%', targets: 0 }
                     ],
                     }
                     );
                     }, 1000);*/
                    setTimeout(function() {
                        var $table = $('.demo');
                        $table.floatThead({
                            //useAbsolutePositioning: true,
                            scrollContainer: function ($table) {
                                return $table.closest('.cover1');
                            }
                        });
                    }, 1000);
                });
                //this.dtTriggeracc.next();
            },
        );

    }

    viewassignparts(id)
    {
        $(function () {
            $('#accpart').dataTable().fnDestroy();
        });
        this.demoChk=[];

        this.comboval='0';
        this.viewsuppliers();
        this.asspart.Loadallparts(id).subscribe(
            data => {
                this.results = data;
                setTimeout(function () {
                    $(function () {
                        $('#accpart').DataTable(
                            {
                                paging: true,
                                searching: true
                            }
                        );
                    });
                }, 1000);

            },
        );

    }

    createParts() {
        if(this.part_model==null)
        {
            this.part_model='';
        }
        if(this.mfgpartnumber==null)
        {
            this.mfgpartnumber='';
        }
        if(this.internalnotes==null)
        {
            this.internalnotes='';
        }
        if(this.part_description==null)
        {
            this.part_description='';
        }
        this.asspart.CreateParts( this.partname, this.mfgpartnumber, this.part_model, this.internalcost, this.part_price, this.internalnotes, this.part_description, this.photo,this.umid).subscribe(
            data => {
                this.results = data;
                if ( this.results[0].result === 'success') {
                    swal({
                        title: 'Created!',
                        text: 'Part created successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.viewassignparts(this.id);
                    $('#partlistshow').show();
                    $('#partlistbut1').show();
                    $('#part').show();
                    $('#partform').hide();
                    $("#addpartform").trigger("reset");
                }

            }
        );
    }

    fileOverBase( e: any ): void {
        this.hasBaseDropZoneOver = e;
    }
    onSubmit() {
        this.submitted = true;
    }

    ngOnChanges(){

        if(this.changed==1)
        {
            this.assignedparts(this.id);


        }

        this.assignedparts(this.id);
        // this.dtOptionsacc.destroy();

    }
    onSelectionChange(entry) {
        this.selectedEntry = entry;

    }

    partaction(){
        $('#part').hide();
        $('#partform').show();
        $('#partformbut').show();
        $('#partlistbut1').hide();
        $('#partlistshow').hide();

        $('#sear').hide();


    }
    partdislist(){
        $('#partform').hide();
        $('#part').show();
        $('#partlistbut1').show();
        $('#partformbut').hide();
        $('#partlistshow').show();
        $('#sear').show();

    }
    Delete(id,partid)
    {

        let that = this;
        swal({
                title: "Are you sure?",
                text: "You want to delete this Part?",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Delete",
                closeOnConfirm: false
            },
            function() {

                that.asspart.deleteaccpart(partid,id).subscribe(
                    data => {

                        this.depart = data;
                        if(this.depart.result =="success")
                        {

                            swal({
                                title: "Deleted!",
                                text: "This part is deleted successfully",
                                type: "success",
                                confirmButtonClass: "btn-success"
                            });

                            that.assignedparts(id);


                            //$('.modal-backdrop').hide();
                        }
                        else
                        {
                            swal({
                                title: "Part cannot delete.!",
                                text: "Part may be assigned in Service Request or Herokit or Part request has been received for this part",
                                type: "error",
                                confirmButtonClass: "btn-danger"
                            });
                        }


                    });
            } );

    }
    Deactivate(id)
    {

        let that = this;
        swal({
                title: "Are you sure?",
                text: "You want to deactivate this Part?",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Deactivate",
                closeOnConfirm: false
            },
            function() {

                that.asspart.deactivatepart(id,'N').subscribe(
                    data => {

                        this.depart = data;
                        if(this.depart[0].result =="success")
                        {
                            {
                                swal({
                                    title: "Deactivated!",
                                    text: "This part is deactivated successfully",
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });

                                that.assignedparts(this.id);
                            }

                            //$('.modal-backdrop').hide();
                        }


                    });
            } );

    }
    activate(id)
    {
        let that = this;
        swal({
                title: "Are you sure?",
                text: "You want to activate this Part?",
                type: "warning",
                showCancelButton: true,
                cancelButtonClass: "btn-default",
                confirmButtonClass: "btn-warning",
                confirmButtonText: "Activate",
                closeOnConfirm: false
            },
            function() {

                that.asspart.deactivatepart(id,'Y').subscribe(
                    data => {

                        this.depart = data;
                        if(this.depart[0].result =="success")
                        {
                            {
                                swal({
                                    title: "Activated!",
                                    text: "This part is activated successfully",
                                    type: "success",
                                    confirmButtonClass: "btn-success"
                                });

                                that.assignedparts(this.id);
                            }

                            //$('.modal-backdrop').hide();
                        }

                    });
            } );
    }

    viewsuppliers()
    {
        this.asspart.viewsupplier().subscribe(
            data => {
                this.supplier = data;
                this.Supplier_ID = this.supplier.SM_KeyID;


            },
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
    updateCheckedOptions(i,chBox, event) {

        if(event.target.checked) {

            $("#hero"+i).prop("disabled", false);
            $("#nonhero"+i).prop("disabled", false);

            this.demoChk.push(chBox);
            this.rplChk.push(chBox);
        }
        else {
            this.optionbox=0;
            this.results[i].qaty='';
            this.results[i].repl='';
            $("#qaty"+i).val('');
            $("#repl"+i).val('');
            $("#qaty"+i).val('');
            $("#hero"+i).prop("checked", false);
            $("#nonhero"+i).prop("checked", false);
            $("#hero"+i).prop("disabled", true);
            $("#nonhero"+i).prop("disabled", true);
            $("#qaty"+i).attr("readonly", "readonly");
            $("#repl"+i).attr("readonly", "readonly");
            let indexx = this.demoChk.indexOf(chBox);
            this.demoChk.splice(indexx,1);

            let indexx2 = this.rplChk.indexOf(chBox);
            this.rplChk.splice(indexx2,1);
        }
    }
    handleChange(combo) {
        this.comboval='';
        this.comboval=combo;

    }

    viewqty(i,event)
    {
        this.qtval=$("#qaty"+i).val();
        this.qtval1.push(this.qtval);

    }

    vierepl(i,event)
    {
        this.replval=$("#repl"+i).val();
        this.replval1.push(this.replval);

    }

    setButton(i,event,value)
    {
        this.values1='';
        this.values2='';
        $("#qaty"+i).prop("readonly", false);
        $("#repl"+i).prop("readonly", false);
        //this.values1=$("#qaty"+i).val('');
        if(value==1)
        {
            this.values1= $("#qaty"+i).val("0");
            this.values2= $("#repl"+i).val("0");
            this.optionbox=1;

        }
        else if(value==0)
        {
            this.values1='';
            $("#qaty"+i).val("");
            $("#repl"+i).val("");
//console.log("len"+this.values1.length,this.values1)
            this.optionbox=1;
        }

    }

    enable(i)
    {

        if((this.demoChk.length > 0) ){
            return false;
        }else{
            return true;
        }
    }

    assingsupp(PartID){
        this.suppartid=PartID;
    }
    SlectedAccount(PartID)
    {
        this.suppartid=PartID;
    }
    updateOptions(form){

        this.asspart.Assignpart(form).subscribe(
            data => {

                if(data[0].result =="success")
                {
                    swal({
                        title: "Assigned!",
                        text: " Part Assigned Successfully",
                        type: "success",
                        confirmButtonClass: "btn-success"
                    });
                    this.demoChk=[];
                    $('#showpart').modal('hide');
                    this.assignedparts(this.id);
                    this.viewassignparts(this.id);
                    this.comboval='0';
                }
                else
                {
                    swal({
                        title: "Error!",
                        text: 'Please enter opening balance and replenishment quantity for the selected Part.',
                        type: "error",
                        confirmButtonClass: "btn-danger"
                    });

                }

            },
            err => {
                swal({
                    title: 'Sorry',
                    text: 'Please enter opening balance and replenishment quantity for the selected Part.',
                    type: 'error',
                    confirmButtonClass: 'btn-danger'
                });

            },
        );
    }
    Loadbuttons() {
        this.menu.Loadbutton(2,2,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
            }
        );

    }

    // Update Replenishment
    updateReplAcc(qty,rpdid,herokit,qnttype,hktype,pmid)
    {
        this.asspart.updateReplAcc(qty,rpdid,herokit,qnttype,hktype,pmid).subscribe(
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
                }
                this.assignedparts(this.id);
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


