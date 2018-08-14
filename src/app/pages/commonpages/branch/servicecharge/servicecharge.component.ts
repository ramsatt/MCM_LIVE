import { Component, NgZone, OnInit, OnChanges, Input } from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import {Router} from '@angular/router';
import  { BranchService } from './../services/branch.service';
import {ServicechargeService} from "../services/servicecharge.service";
import {AgreementService} from "../../account/agreement/services/agreement.service";
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";



declare var  $;
declare var  swal;

@Component({
  selector: 'app-servicecharge',
  templateUrl: './servicecharge.component.html',
  styleUrls: ['./servicecharge.component.scss']
})

export class ServicechargeComponent implements OnInit, OnChanges {

    @Input() id;
    @Input() brStatus;
    allservicecharge:any;
    allservicechargebranch: any;
    BranchArray:any;
    Branch_ID:any;
    BASCD_Fee_Type:any = '0';
    BASCD_Rate:any;
    results:any;
    comboval:any;
    allservicechargeexist: any = false;
    selectedRow: Number = 0;
    setClickedRow: Function;
    umkeyid:any;
    /* Agreement Details */
    agreementid: any;
    AGM_KeyID: any;
    AGM_Agreement_Name: any = '';
    AGM_EffectiveDate: any = '';
    AGM_EndDate: any = '';
    AGM_Renewal_AlertDate: any = '';
    AGM_Holiday_Include: any = '';
    AGM_WorkingHours_StartTime_Hours: any = '';
    AGM_WorkingHours_StartTime_Minutes: any = '';
    AGM_WorkingHours_StartTime_Sessions: any = 'AM';
    AGM_WorkingHours_EndTime_Hours: any = '';
    AGM_WorkingHours_EndTime_Minutes: any = '';
    AGM_WorkingHours_EndTime_Sessions: any = 'AM';
    AGM_OneWeek_Response_Service: any='';
    AGM_Response_Time_Hours: any='';
    AGM_Response_Time_Minutes: any='';
    AGM_SameDay_Service_Request: any='';
    AGM_Service_Request: any='';
    AGM_IsActive: any;
    AGM_Renewal_Years:any;
    AGM_Auto_Renewal:any;
    AGM_AM_KeyID:any;
    editagreement:any;
    TempDate:any;
    minutesArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59');
    hoursArray = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
    tfhoursArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24');
    /* Agreement Miles Charge */
    permilecharge:any = '0.55';
    ffmilesfrom1: any = '0';
    ffmilesfrom2: any = '31';
    ffmilesfrom3: any = '51';
    ffmilesfrom4: any = '70';
    ffmilesto1: any = '30';
    ffmilesto2: any = '50';
    ffmilesto3: any = '71';
    ffmilesto4: any = '100';
    fffee1:any = '30';
    fffee2:any = '50';
    fffee3:any = '70';
    fffee4:any = '100';
    fffee5:any = '120';
    Feetype: any = 'Trip';
    travelFee: any = '0';
    BACGD_Beyond_Miles:any = '101 and Beyond';

    Asssubmenu: any;
    Asssubbutton: any;
    add: any;
    edit: any;
    delete: any;
    sessid: any;
    viewbtn:any;
    urmid:any='';

    constructor(public router: Router,public agreement:AgreementService,
                public branchService: BranchService, public servicecharge: ServicechargeService,
                private ngZone: NgZone,public menu:MenumanagementService) {
      this.setClickedRow = function(index){
          this.selectedRow = index;
      };
      this.umkeyid=localStorage.getItem('umid');
        this.sessid=localStorage.getItem('ucmid');
        this.urmid=localStorage.getItem('urmid');
      this.Loadbuttons();
  }

  ngOnInit()
  {
      $(function(){
          $('#amt').mask("0000000", {reverse: true});
      });
      this.ListServicecharges(this.id);
  }
  ngOnChanges()
  {
      this.ListServicecharges(this.id);
  }

   handleChange(combo) {
        this.comboval='';
        this.comboval=combo;
        //console.log(combo);
    }

    /* View Servicecharges */
    ListServicecharges(accid){
        this.servicecharge.ListServicecharges(accid).subscribe(
            data => {
                this.allservicechargebranch = data;
                var $table = $('.demo');
                $table.floatThead({
                    //useAbsolutePositioning: true,
                    scrollContainer: function ($table) {
                        return $table.closest('.cover1');
                    }
                });
                if(this.allservicechargebranch.length > 0){
                    this.allservicechargeexist = true;
                }else{
                    this.allservicechargeexist = false;
                }

                this.allservicechargebranch.sort((a, b) => {
                    if (a.AGM_Agreement_Name < b.AGM_Agreement_Name) return -1;
                    else if (a.AGM_Agreement_Name > b.AGM_Agreement_Name) return 1;
                    else return 0;
                });
                //console.log(data);
            }
        );
    }

    ServiceCharge(BASCD_Fee_Type,BASCD_Labour_Fees,BASCD_Travel_Fees_Type,BASCD_Travel_Fees,BASCD_Parking_Fees,BASCD_Miscellaneous,AASCD_KeyID)
    {
        //update agreement
        this.servicecharge.ServiceCharge(BASCD_Fee_Type,BASCD_Labour_Fees,BASCD_Travel_Fees_Type,BASCD_Travel_Fees,BASCD_Parking_Fees,BASCD_Miscellaneous,AASCD_KeyID,this.id,this.umkeyid).subscribe(
            data => {
                this.results = data;

                if ( this.results[0].result === 'success') {
                    swal({
                        title: 'Updated!',
                        text: 'Branch Service Charge Details Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    // this.router.navigate(['agreement/edit/'+this.results[0].id]);
                    this.comboval='1';
                }

            }
        );
    }

    checkfeeType(i,type){
        if(type=='3')
        {
            this.Feetype = 'Month';
            $("#Feetype"+i).html("/Month");
        }
        else if (type=='2'){
            this.Feetype = 'Hour';
            $("#Feetype"+i).html("/Hour");
        }
        else if (type=='1') {
            this.Feetype = 'Trip';
            $("#Feetype"+i).html("/Trip");
        }
    }

    settravelFee(travelFeetype,i)
    {
        if(travelFeetype==1)
        {
            $("#tid"+i).removeClass("clsdisabled");
        }
        else
        {
            $("#tid"+i).addClass("clsdisabled");
            $("#tid"+i).val('0');
        }
    }

    setAgreementId(id)
    {
        this.agreementid = id;
        this.LoadAgreementDetails();
        this.viewservicecharge(this.id);
        this.agreementCharge();
    }

    LoadAgreementDetails() {
        this.agreement.EditAgreement(this.agreementid).subscribe(
            data => {
                this.editagreement = data;
                this.AGM_Agreement_Name = data.AGM_Agreement_Name;

                var d = new Date(data.AGM_EffectiveDate);
                var op2 = (d.getMonth())+'/'+d.getDate()+'/'+(d.getFullYear());
                this.AGM_EffectiveDate = op2;
                this.TempDate = op2;

                var d2 = new Date(data.AGM_EndDate);
                var op4 = (d2.getMonth())+'/'+d2.getDate()+'/'+(d2.getFullYear());
                this.AGM_EndDate = op4;

                var d1 = new Date(data.AGM_Renewal_AlertDate);
                var op3 = (d1.getMonth())+'/'+d1.getDate()+'/'+(d1.getFullYear());
                this.AGM_Renewal_AlertDate = op3;
                this.AGM_Holiday_Include = data.AGM_Holiday_Include;
                this.AGM_Renewal_Years = data.AGM_Renewal_Years;
                this.AGM_Auto_Renewal = data.AGM_Auto_Renewal;
                this.AGM_WorkingHours_StartTime_Hours = data.AGM_WorkingHours_StartTime_Hours;
                this.AGM_WorkingHours_StartTime_Minutes = data.AGM_WorkingHours_StartTime_Minutes;
                this.AGM_WorkingHours_StartTime_Sessions = data.AGM_WorkingHours_StartTime_Sessions;
                this.AGM_WorkingHours_EndTime_Hours = data.AGM_WorkingHours_EndTime_Hours;
                this.AGM_WorkingHours_EndTime_Minutes = data.AGM_WorkingHours_EndTime_Minutes;
                this.AGM_WorkingHours_EndTime_Sessions = data.AGM_WorkingHours_EndTime_Sessions;
                this.AGM_OneWeek_Response_Service = data.AGM_OneWeek_Response_Service;
                this.AGM_Response_Time_Hours = data.AGM_Response_Time_Hours;
                this.AGM_Response_Time_Minutes = data.AGM_Response_Time_Minutes;
                this.AGM_SameDay_Service_Request = data.AGM_Service_Request_Type;
                this.AGM_Service_Request = data.AGM_Service_Request;
                this.AGM_IsActive = data.AGM_IsActive;
                this.AGM_AM_KeyID = data.AGM_AM_KeyID
            }
            // () => console.log('Agreement Loaded')
        );
    }

    viewservicecharge(accid){
        this.servicecharge.Listbranchsc(accid,this.agreementid).subscribe(
            data => {
                this.allservicecharge = data;
            }
        );
    }

    updatesc(formAgreement,formServiceCharge) {
        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        const options = new RequestOptions({ headers: headers });

        // update Service Charge
        //console.log('Miles', formServiceCharge);
        //console.log('form', formAgreement);
        // update branch agreement service charge
        this.servicecharge.UpdateServicecharge(formServiceCharge,options).subscribe(
            data => {
                this.results = data;
            },
            err => {
                // console.log(err);
            },
        );

        // update branch agreement charge
        this.servicecharge.UpdateAgreementcharge(formAgreement).subscribe(
            data => {
                this.results = data;
                if ( this.results.result === 'success') {
                    swal({
                        title: 'Updated!',
                        text: 'Branch Agreement Details Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    // this.router.navigate(['agreement/edit/'+this.results[0].id]);
                }
            }
        );

        $(function () {
            $('#TicketStatus').modal('hide');
        });

    }

    /* View Agreement charge for Agreement */
    agreementCharge(){
        this.servicecharge.agreementCharge(this.agreementid).subscribe(
            data => {
                if(data[0])
                {
                    this.permilecharge = data[0].BACGD_Per_Miles_Charge;
                    this.ffmilesfrom1 = data[0].BACGD_FromMiles1;
                    this.ffmilesfrom2 = data[0].BACGD_FromMiles2;
                    this.ffmilesfrom3 = data[0].BACGD_FromMiles3;
                    this.ffmilesfrom4 = data[0].BACGD_FromMiles4;
                    this.ffmilesto1 = data[0].BACGD_ToMiles1;
                    this.ffmilesto2 = data[0].BACGD_ToMiles2;
                    this.ffmilesto3 = data[0].BACGD_ToMiles3;
                    this.ffmilesto4 = data[0].BACGD_ToMiles4;
                    this.fffee1 = data[0].BACGD_Fee1;
                    this.fffee2 = data[0].BACGD_Fee2;
                    this.fffee3 = data[0].BACGD_Fee3;
                    this.fffee4 = data[0].BACGD_Fee4;
                    this.fffee5 = data[0].BACGD_Fee5;
                    this.BACGD_Beyond_Miles = data[0].BACGD_Beyond_Miles;
                }

            }
        );
    }
    Loadbuttons() {
        this.menu.Loadbutton(8, 32, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add =  this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
                this.viewbtn=this.Asssubbutton[0].MA_View;

            }
        );

    }
}
