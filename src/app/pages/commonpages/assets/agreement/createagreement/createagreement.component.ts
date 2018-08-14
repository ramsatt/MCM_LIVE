import { ElementRef,Component, OnInit, ViewChild } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {AgreementService} from "../../../account/agreement/services/agreement.service";


declare var  $;
declare var  swal;

@Component({
  selector: 'app-createagreement',
  templateUrl: './createagreement.component.html',
  styleUrls: ['./createagreement.component.css']
})

export class CreateagreementComponent implements OnInit {

  /* Public Variable */
  @ViewChild('EffectiveDate') public AGM_EffectiveDate_Arr: ElementRef;
  @ViewChild('EndDate') public AGM_EndDate_Arr: ElementRef;
  @ViewChild('Renewal_AlertDate') public AGM_Renewal_AlertDate_Arr: ElementRef;

  /* Declare Input variables */
  submitted = false;
  active = true;
  AGM_Agreement_Name: any = '';
  AGM_EffectiveDate: any = '';
  AGM_EndDate: any = '';
  AGM_Renewal_AlertDate: any = '';
  AGM_Holiday_Include: any = '';
  AGM_WorkingHours_StartTime_Sessions: any= 'AM';
  AGM_WorkingHours_EndTime_Sessions: any = 'PM';
  AGM_OneWeek_Response_Service: any='5';
  AGM_Response_Time_Hours:any  = '09';
  AGM_Response_Time_Minutes: any = '00';
  AGM_SameDay_Service_Request: any='1';
  AGM_Service_Request: any='';
  AGM_IsActive: any = 'Y';
  results: any;
  END_Date:any;
  Alert_Date:any;
  AGM_AM_KeyID:any;
  AGM_ASM_KeyID:any;
  AGM_Renewal_Years: any = '1';
  AGM_Auto_Renewal: any;
  timediff : any;
  TempDate: any;
  TimeError: any;
  umkeyid:any;
  minutesArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59');
  AGM_WorkingHours_StartTime_Minutes = this.minutesArray[0];
  AGM_WorkingHours_EndTime_Minutes = this.minutesArray[0];

  hoursArray = new Array('01','02','03','04','05','06','07','08','09','10','11','12');
  AGM_WorkingHours_StartTime_Hours = this.hoursArray[7];
  AGM_WorkingHours_EndTime_Hours = this.hoursArray[4];

  tfhoursArray = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24');
  //AGM_Response_Time_Hours = this.tfhoursArray[7];

  constructor(public router: Router,routing: ActivatedRoute, public agreement: AgreementService) {
    this.AGM_AM_KeyID = routing.snapshot.params['accid'];
    this.AGM_ASM_KeyID = routing.snapshot.params['astid'];
    this.umkeyid=localStorage.getItem('umid');
  }


  /*ngAfterViewInit() {
   $('#datepicker').datetimepicker({
   //format: 'yyyy-mm-dd',
   format: 'MM/DD/Y',
   }).on('dp.change', (ev) => {
   this.TempDate = ev.date;
   var newdate = new Date(this.TempDate);
   this.changedate();
   //console.log('dudeme', ev.date.valueOf(), ev.date._i)
   });
   }*/

  ngOnInit() {

    //this.minutesArray = ['01'];
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

    $(function(){
      $('#reqdays').mask("00", {reverse: true});
    });
  }

  /*ngAfterViewInit() {
   var componentRef = this;

   $('.datepicker-only-init').datetimepicker({
   format: 'MM/DD/Y',
   //startDate: '2001-01-01',
   //autoclose: true
   }).on('changeDate', (ev) => {
   this.AGM_EffectiveDate = ev.date;
   console.log('dudeme', ev.date.valueOf(), ev.date);
   // componentRef.changedate();
   });
   }*/
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

    if(this.AGM_Response_Time_Hours=='00')
    {
      //this.TimeError = true;
    }
    else {
      //this.TimeError = false;
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

  requestDaysstatus() {
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

  createAgreement() {
    this.AGM_EffectiveDate = this.AGM_EffectiveDate_Arr.nativeElement.value;
    this.AGM_EndDate = this.AGM_EndDate_Arr.nativeElement.value;
    this.AGM_Renewal_AlertDate = this.AGM_Renewal_AlertDate_Arr.nativeElement.value;

    this.agreement.CreateAgrement(this.AGM_Agreement_Name, this.AGM_EffectiveDate, this.AGM_EndDate, this.AGM_Renewal_AlertDate,
        this.AGM_Holiday_Include, this.AGM_WorkingHours_StartTime_Hours,this.AGM_WorkingHours_StartTime_Minutes,this.AGM_WorkingHours_StartTime_Sessions,
        this.AGM_WorkingHours_EndTime_Hours,this.AGM_WorkingHours_EndTime_Minutes,this.AGM_WorkingHours_EndTime_Sessions, this.AGM_OneWeek_Response_Service,
        this.AGM_Response_Time_Hours,this.AGM_Response_Time_Minutes,this.AGM_Service_Request,
        this.AGM_SameDay_Service_Request, this.AGM_AM_KeyID,this.AGM_Renewal_Years,this.AGM_Auto_Renewal,this.AGM_ASM_KeyID,this.umkeyid).subscribe(
        data => {
          this.results = data;

          if ( this.results[0].result === 'success') {
            swal({
              title: 'Created!',
              text: 'Agreement Details Created Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.router.navigate(['asset/agreement/edit/'+this.results[0].id]);

          }

        }
        // () => console.log('Created')
    );
  }

  onSubmit() {
    this.submitted = true;
  }

  Navigation(link)
  {
    this.router.navigate([link]);
  }

  getCalendar(dateparam)
  {
    //var newdate = new Date(this.stupid_date);
    //console.log('Date Cal:'+dateparam+' Stupid Date:'+newdate);
  }
}
