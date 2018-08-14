import { ElementRef,Component, NgZone, OnInit, ViewChild } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AgreementService } from './../services/agreement.service';
import { RequestOptions, Headers } from '@angular/http';
declare var  $;
declare var  swal;

@Component({
  selector: 'app-updateagreement',
  templateUrl: './updateagreement.component.html',
  styleUrls: ['./updateagreement.component.css']
})

export class UpdateagreementComponent implements OnInit {

  /* Public Variable */
  @ViewChild('EffectiveDate') public AGM_EffectiveDate_Arr: ElementRef;
  @ViewChild('EndDate') public AGM_EndDate_Arr: ElementRef;
  @ViewChild('Renewal_AlertDate') public AGM_Renewal_AlertDate_Arr: ElementRef;

  /* Declare Input variables */
  selectedRow: Number = 0;
  setClickedRow: Function;
  submitted = false;
  active = true;
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
  results: any;
  END_Date:any;
  Alert_Date:any;
  agreementid: any;
  options: Object;
  editagreement: any;
  alltickets: any;
  allticketslist: any;
  allmodelservice: any;
  Tickets_Minutes: any = '00';
  ModelButtonAction: any = '';
  ModelButtonPrimary: any = '';
  ServicechargeArray: any;
  AMSRD_KeyID: any;
  servicecharegeid: any = [];
  allservicecharge: any;
  AGM_Renewal_Years: any = '';
  AGM_Auto_Renewal: any;
  timediff: any;
  TempDate: any;
  AGM_AM_KeyID:any;
  servicecharegeidexist: any = false;
  serviceRequestid: any;
  TSLM_KeyID: any;
  Tickestid: any = [];
  idval: any;
  values: any = [];
  values1: any = [];
  tid:any;
  pid:any;
  mid:any;
  fid:any;
  total: any;
  umkeyid:any;
  minutesArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59');
  hoursArray = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
  tfhoursArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24');
  miles: any = '50';
  permilecharge:any = '0.55';
  chargefee: any = '27.50';
  ffmilesfrom1: any = '0';
    ffmilesfrom2: any = '31';
    ffmilesfrom3: any = '51';
    ffmilesfrom4: any = '71';
    ffmilesto1: any = '30';
    ffmilesto2: any = '50';
    ffmilesto3: any = '70';
    ffmilesto4: any = '100';
    fffee1:any = '30';
    fffee2:any = '50';
    fffee3:any = '70';
    fffee4:any = '100';
    fffee5:any = '120';
    Feename: any = 'Flat Fee';
    Feetype: any = 'Trip';

  constructor( public router: Router, routing: ActivatedRoute,  public agreement: AgreementService, private ngZone: NgZone ) {
    this.agreementid = routing.snapshot.params['id'];
    this.umkeyid=localStorage.getItem('umid');
    this.LoadAgreementDetails();
    //this.viewtickets();
    this.viewservicecharge();
    //this.ViewSerivce();

    this.setClickedRow = function(index){
      this.selectedRow = index;
    };
  }

  ngOnInit() {
    //For Date picker
    var componentRef = this;
    $('.datepicker-only-init').datetimepicker({
      format: 'MM/DD/Y',
      minDate: 0,
      widgetPositioning: {
        horizontal: 'left'
      }
    }).on('dp.change', function (ev) {
      componentRef.TempDate = ev.date;
      componentRef.changedate();
    });
    // for money validation
    $(function(){
      $('#reqdays').mask("00", {reverse: true});
    });

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

  /* update Agreement */

  updateAgreement(formAgreement,formServiceCharge,formTicketsupdate) {
    this.AGM_EffectiveDate = this.AGM_EffectiveDate_Arr.nativeElement.value;
    this.AGM_EndDate = this.AGM_EndDate_Arr.nativeElement.value;
    this.AGM_Renewal_AlertDate = this.AGM_Renewal_AlertDate_Arr.nativeElement.value;
    this.AGM_KeyID = this.agreementid;

    //update agreement
    this.agreement.UpdateAgrement(this.AGM_KeyID, this.AGM_Agreement_Name, this.AGM_EffectiveDate, this.AGM_EndDate, this.AGM_Renewal_AlertDate,
        this.AGM_Holiday_Include, this.AGM_WorkingHours_StartTime_Hours,this.AGM_WorkingHours_StartTime_Minutes,this.AGM_WorkingHours_StartTime_Sessions,
        this.AGM_WorkingHours_EndTime_Hours,this.AGM_WorkingHours_EndTime_Minutes,this.AGM_WorkingHours_EndTime_Sessions, this.AGM_OneWeek_Response_Service,
        this.AGM_Response_Time_Hours,this.AGM_Response_Time_Minutes,this.AGM_Service_Request,
        this.AGM_SameDay_Service_Request, this.AGM_Renewal_Years,this.AGM_Auto_Renewal,this.AGM_IsActive,this.umkeyid).subscribe(
        data => {
          this.results = data;

          if ( this.results[0].result === 'success') {
            swal({
              title: 'Updated!',
              text: 'Agreement Details Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            // this.router.navigate(['agreement/edit/'+this.results[0].id]);
          }

        }
        //() => console.log('Created')
    );

    const headers = new Headers();
    headers.append('enctype', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = new RequestOptions({ headers: headers });

    // update Service Charge
    this.agreement.UpdateServicecharge(formServiceCharge,options).subscribe(
        data => {
          this.results = data;
        }
    );

    // update Tickets
    this.agreement.UpdateTickets(formTicketsupdate).subscribe(
        data => {
          this.results = data;
        }
    );


  }

  /* View Tickets */
  viewtickets(id){
    this.serviceRequestid = id;
    this.agreement.LoadTickets(id).subscribe(
        data => {
          this.alltickets = data;
        }
    );
  }

  setTicketId(id)
  {
    this.serviceRequestid = id;
  }

  /* View Model-Service */
  ViewSerivce() {
    this.agreement.LoadService(this.AGM_AM_KeyID,this.agreementid).subscribe(
        data => {
          this.allmodelservice = data;
          if(this.allmodelservice.length > 0){
            this.servicecharegeidexist = true;
          }else{
            this.servicecharegeidexist = false;
          }
        }
    );

  }

  FormAction() {
    if ( this.ModelButtonPrimary === 'Create') {
      this.CreateServicecharge();
    } else if ( this.ModelButtonPrimary === 'Update') {
      //this.UpdateModel();
    }
  }

  /* Push checkbox ids into array for adding service charge*/
  updateCheckedOptions(chBox, event) {

    if(event.target.checked) {

      this.servicecharegeid.push(chBox);
    }
    else if (!event.target.checked){
      let indexx = this.servicecharegeid.indexOf(chBox);
      this.servicecharegeid.splice(indexx,1);
    }
    if(this.servicecharegeid)
    {

    }
  }

  /* check service charge assigned */
  checkService()
  {
    if(this.servicecharegeid.length > 0){
      return false;
    }else{
      return true;
    }

  }

  /* Add Service Charge*/
  public CreateServicecharge() {
    this.agreement.CreateServicecharge(this.servicecharegeid,this.agreementid,this.AGM_AM_KeyID,this.umkeyid).subscribe(
        data => {
          this.ServicechargeArray = data;
          if(this.ServicechargeArray[0].result == 'success')
          {
            swal({
              title: 'Added!',
              text: 'Service Requested Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.viewservicecharge();
          }
          this.servicecharegeid = [];

        }
    );
  }

  /* View Service charge for Agreement */
  viewservicecharge(){
    this.agreement.LoadServicecharge(this.agreementid).subscribe(
        data => {
          this.allservicecharge = data;
          this.viewtickets(data[0].AASCD_KeyID);
        }
    );
  }

  /* View Service charge for Agreement */
  ViewTicketsList(id){
    this.agreement.ViewTickets(id).subscribe(
        data => {
          this.allticketslist = data;
          this.serviceRequestid = id;

        }
        //() => console.log('Movie Search Complete')
    );
  }


  Navigation(link)
  {
    this.router.navigate([link]);
  }

  changedate()
  {
    //console.log('date:'+this.TempDate);

    let yearval = parseInt(this.AGM_Renewal_Years);
    let EffectiveDateval = new Date(this.TempDate);
    if(EffectiveDateval)
    {
      var d = new Date(EffectiveDateval);
      var op2 = (d.getMonth()+1)+'/'+d.getDate()+'/'+(d.getFullYear()+yearval);
      var dt = new Date(op2);
      var date = new Date(dt);
      var newdate = new Date(date);
      newdate.setDate(newdate.getDate() - 15);
      var dd = newdate.getDate();
      var mm = newdate.getMonth() + 1;
      var y = newdate.getFullYear();
      var someFormattedDate = mm + '/' + dd + '/' + y;
      //op2.toString('MM/DD/Y');
      this.END_Date = op2;
      this.Alert_Date = someFormattedDate;
    }
  }

  responseTime(val)
  {
    let startHour =  this.AGM_WorkingHours_StartTime_Hours;
    let startMinute =  this.AGM_WorkingHours_StartTime_Minutes;
    let startSession =  this.AGM_WorkingHours_StartTime_Sessions;
    let endHour =  this.AGM_WorkingHours_EndTime_Hours;
    let endMinute =  this.AGM_WorkingHours_EndTime_Minutes;
    let endSession =  this.AGM_WorkingHours_EndTime_Sessions;
    var param = this.AGM_SameDay_Service_Request;

    if(val!=3)
    {
      this.agreement.timeDiff(startHour,startMinute,startSession,endHour,endMinute,endSession).subscribe(
          data => {
            this.timediff = data;
            this.AGM_Response_Time_Hours = data.hours;
            this.AGM_Response_Time_Minutes = data.minutes;

          }

      );

      this.AGM_Service_Request = '0';
    }
    else
    {
      this.AGM_Response_Time_Hours = '00';
      this.AGM_Response_Time_Minutes = '00';
    }


  }

  buttonState() {
    var param = this.AGM_SameDay_Service_Request;
    // console.log('Param value:'+param);

    if(param==1)
    {
      return false;
    }
    else if(param==2)
    {
      return true;
    }
    else
    {
      return true;
    }
  }

  requestDaysstatus()
  {
    var param = this.AGM_SameDay_Service_Request;

    if(param==1)
    {
      return true;
    }
    else if(param==2)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  OnlyNumbers(event)
  {

    let charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31
        && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  onSubmit() {
    this.submitted = true;
  }
  sumof(AASCD_Rate,AASCD_Travel_Fees,AASCD_Parking_Fees,AASCD_Miscellaneous) {
    //console.log('yes');
    let rateval:any = '0';
    let travefeeval:any = '0';
    let parkingfeeval:any = '0';
    let misval:any = '0';

    if(AASCD_Rate)
    {
      rateval = AASCD_Rate
    }
    if(AASCD_Travel_Fees)
    {
      travefeeval = AASCD_Travel_Fees
    }if(AASCD_Parking_Fees)
    {
      parkingfeeval = AASCD_Parking_Fees
    }if(AASCD_Miscellaneous)
    {
      misval = AASCD_Miscellaneous
    }
    return parseFloat(rateval)+parseFloat(travefeeval)+parseFloat(parkingfeeval)+parseFloat(misval);
  }


  addTickets(form)
  {

    this.agreement.addTickets(form).subscribe(
        data => {

          if ( data.result === 'success' ) {
            this.viewtickets(form.serviceRequestid);
            swal({
              title: 'Created!',
              text: 'Ticket Status Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });

            $(function () {
              $('#formTicketsnew').trigger('reset');
            });

            this.Tickestid = [];
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

  updateTickets(form)
  {
    this.agreement.UpdateTickets(form).subscribe(
        data => {

          if ( data.result === 'success' ) {
            swal({
              title: 'Updated!',
              text: 'Ticket Status Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
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
    );
  }
  clearTickets()
  {
    this.Tickestid = [];
  }

  /* Push checkbox ids into array for adding tickets */
  updateTickedChecked(j,chBox, event) {
    if(event.target.checked)
    {
      $("#hr"+j).attr("readonly", false);
      $("#min"+j).attr("readonly", false);
      this.values=$("#hr"+j).val('');
      this.values1=$("#min"+j).val('');
      this.Tickestid.push(chBox);

      // Reset Values to Empty
      if(this.values1.length > 0){
        this.values1 =  0;
      }
      if(this.values.length > 0){
        this.values =  0;
      }
    }
    else if (!event.target.checked)
    {
      let indexx = this.Tickestid.indexOf(chBox);
      this.Tickestid.splice(indexx,1);

      this.values=$("#hr"+j).val('');
      this.values1=$("#min"+j).val('');
      $("#hr"+j).attr("readonly", "readonly");
      $("#min"+j).attr("readonly", "readonly");
    }

  }

  textenable(i,event:any)
  {
    this.values = $("#hr"+i).val();
   }

  textenable2(i,event:any)
  {
    this.values1 = $("#min"+i).val();
    }

  /* check tickets charge assigned */
  checkTickets()
  {
    if((this.Tickestid.length > 0) && (this.values.length>0) && (this.values1.length>0)){
      return false;
    }else{
      return true;
    }

  }

  /* check if any box checked */
  checkTime()
  {
    if((this.values.length>0)){
      return false;
    }else{
      return true;
    }
  }

  checkfeeType(i,type){
    if(type=='3')
    {
        this.Feename = 'None';
        this.Feetype = 'Month';
        $("#travelFeediv"+i).css("display", "none");
        $("#parkingFee"+i).css("display", "none");
        $("#parkingFeespan"+i).css("display", "block");
        $("#parkingFeediv"+i).css("display", "none");
        $("#miscFee"+i).css("display", "none");
        $("#miscFeediv"+i).css("display", "none");
      /*$("#tid"+i).prop("readonly", false);
       $("#tid"+i).removeClass("clsdisabled");
       $("#pid"+i).prop("readonly", false);
       $("#pid"+i).removeClass("clsdisabled");
       $("#mid"+i).prop("readonly", false);
       $("#mid"+i).removeClass("clsdisabled");*/

      $("#pid"+i).val(0);
    }
    else if (type=='2'){
        this.Feename = 'Portal to Portal';
        this.Feetype = 'Hour';
      //$("#tid"+i).prop("readonly", false);
      //$("#tid"+i).removeClass("clsdisabled");

      $("#pid"+i).val('');
      //$("#pid"+i).prop("readonly", true);
      //$("#pid"+i).addClass("clsdisabled");

      //$("#mid"+i).prop("readonly", false);
      //$("#mid"+i).removeClass("clsdisabled");
       // $("#travelFeediv"+i).Hide();
        $("#parkingFee"+i).css("display", "block");
        $("#parkingFeespan"+i).css("display", "block");

        $("#parkingFeediv"+i).css("display", "block");

        $("#travelFeediv"+i).css("display", "none");

        $("#miscFee"+i).css("display", "block");
        $("#miscFeediv"+i).css("display", "block");

    }
    else if (type=='1') {
        this.Feename = 'Flat Fee';
        this.Feetype = 'Trip';
        $("#parkingFee"+i).css("display", "none");
        $("#parkingFeespan"+i).css("display", "none");
        $("#parkingFeediv"+i).css("display", "block");

        $("#travelFeediv"+i).css("display", "block");
        $("#miscFee"+i).css("display", "block");
        $("#miscFeediv"+i).css("display", "block");

      $("#tid"+i).val('');
      //$("#tid"+i).prop("readonly", true);
      //$("#tid"+i).addClass("clsdisabled");

      $("#pid"+i).val('');
      //$("#pid"+i).prop("readonly", true);
      //$("#pid"+i).addClass("clsdisabled");

      $("#mid"+i).val('');
      //$("#mid"+i).prop("readonly", true);
      //$("#mid"+i).addClass("clsdisabled");
    }
    /*if($("#tid"+i).val())
     {
     this.tid = $("#tid"+i).val();
     }
     else
     {
     this.tid = 0;
     }
     if($("#pid"+i).val())
     {
     this.pid = $("#pid"+i).val();
     }
     else
     {
     this.pid = 0;
     }
     if($("#mid"+i).val())
     {
     this.mid = $("#mid"+i).val();
     }
     else
     {
     this.mid = 0;
     }*/

    //var total = parseFloat($("#fid"+i).val())+parseFloat(this.tid)+parseFloat(this.pid)+parseFloat(this.mid);

    //$("#total"+i).val(total);
    //this.sumof($("#fid"+i).val(),this.tid,this.pid,this.mid);
    //$("#pid"+i).val(0);
    //this.pid = 0;
    this.sumof2(i);
  }

  sumof2(i)
  {
    if($("#tid"+i).val())
    {
      this.tid = $("#tid"+i).val();
    }
    else
    {
      this.tid = 0;
    }
    if($("#pid"+i).val())
    {
      this.pid = $("#pid"+i).val();
    }
    else
    {
      this.pid = 0;
    }
    if($("#mid"+i).val())
    {
      this.mid = $("#mid"+i).val();
    }
    else
    {
      this.mid = 0;
    }
    if($("#fid"+i).val())
    {
      this.fid = $("#fid"+i).val();
    }
    else
    {
      this.fid = 0;
    }
    //this.pid = 0;

    this.allservicecharge[i].AASCD_Travel_Fees = this.tid;
    this.allservicecharge[i].AASCD_Parking_Fees = this.pid;
    this.allservicecharge[i].AASCD_Miscellaneous = this.mid;
    this.allservicecharge[i].AASCD_Rate = this.fid;

    var total = parseFloat(this.fid)+parseFloat(this.tid)+parseFloat(this.pid)+parseFloat(this.mid);
    //var res = Number.isInteger(123) + ": 123<br>";
    this.total = total;

    if(this.total>=0)
    {
      $("#total"+i).val(total);
    }
    else
    {
      $("#total"+i).val(0);
    }

  }


}
