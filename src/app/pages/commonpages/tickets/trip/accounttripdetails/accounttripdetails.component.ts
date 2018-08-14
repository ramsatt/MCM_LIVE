import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TripService } from '../service/trip/trip.service';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';
declare const $;
declare const google;
declare const swal;

@Component({
  selector: 'app-accounttripdetails',
  templateUrl: './accounttripdetails.component.html',
  styleUrls: ['./accounttripdetails.component.scss']
})
export class AccounttripdetailsComponent implements OnInit, OnChanges {
    @Input() TicketID;
    @ViewChild('schedule_date') Date: ElementRef;
    @ViewChild('schedule_time') Time: ElementRef;
    TripArray: any = [];
    TripID: any = '';
    Technician: any = '';
    TechnicianID: any = '';
    Source: any = '';
    Destination: any = '';
    TripCreated: any = '';
    TripCode: any = '';
    SourceLatitude: any;
    SourceLongitude: any;
    DestinationLatitude: any;
    DestinationLongitude: any;
    TripStatusCode: any;
    TripStatus: any = '';
    TripScheduleDate: any = '';
    TripScheduleTime: any = '';

    /*Schedule Form*/
    Schedule_Form: FormGroup;
    SheduleModelBoxBtn: any = '';
    SheduleModelBoxTitle: any = '';
    TechniciansArray: any = [];

    /*Incident Report Form*/
    IR_Form: FormGroup;

    /*Signature Pad*/
    @ViewChildren(SignatureFieldComponent) public sigs: QueryList<SignatureFieldComponent>;
    @ViewChildren('sigContainer') public sigContainer: QueryList<ElementRef>;

  constructor(private tripService: TripService, private fb: FormBuilder) {
      this.Schedule_Form = this.fb.group({
          'Technician': [null, Validators.required],
          'Schedule_Date': [null, Validators.required],
          'Schedule_Time': [null, Validators.required]
      });

      this.IR_Form = this.fb.group({
          'Ticket_SR_Status': ['', Validators.required],
          'Ticket_Reason': ['', Validators.required],
          'Sign': ['', Validators.required]
      });
  }

  ngOnInit() {
      $(function () {
          $('.owl-carousel').owlCarousel({
              loop: true,
              navigation : true,
              autoWidth: true,
              lazyLoad: true,
              margin: 5,
              responsive: {
                  0: {
                      items: 1
                  },
                  600: {
                      items: 2
                  },
                  1000: {
                      items: 4
                  }
              }
          });
          $('.datepicker-only-init').datetimepicker({
              widgetPositioning: {
                  horizontal: 'left'
              },
              icons: {
                  time: 'fa fa-clock-o',
                  date: 'fa fa-calendar',
                  up: 'fa fa-arrow-up',
                  down: 'fa fa-arrow-down',
                  previous: 'fa fa-arrow-left',
                  next: 'fa fa-arrow-right'
              },
              format: 'LL'
          });
          $('.timepicker-init').datetimepicker({
              widgetPositioning: {
                  horizontal: 'left'
              },
              icons: {
                  time: 'fa fa-clock-o',
                  date: 'fa fa-calendar',
                  up: 'fa fa-arrow-up',
                  down: 'fa fa-arrow-down',
                  previous: 'fa fa-arrow-left',
                  next: 'fa fa-arrow-right'
              },
              format: 'LT'
          });
          $('.owl-carousel').on('mousewheel', '.owl-stage', function (e) {
              if (e.deltaY > 0) {
                  $('.owl-carousel').trigger('next.owl');
              } else {
                  $('.owl-carousel').trigger('prev.owl');
              }
              e.preventDefault();
          });
      });
  }

    public beResponsive() {
         this.size(this.sigContainer.first, this.sigs.first);
    }

    public size(container: ElementRef, sig: SignatureFieldComponent) {
        sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
        sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
    }

    public setOptions() {
        this.sigs.first.signaturePad.set('penColor', 'rgb(255, 0, 0)');
        this.sigs.last.signaturePad.set('penColor', 'rgb(255, 255, 0)');
        this.sigs.last.signaturePad.set('backgroundColor', 'rgb(0, 0, 255)');
        this.sigs.last.signaturePad.clear();
        /*clearing is needed to set the background colour*/
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.LoadTripList(this.TicketID);
    }

    GoogleMap() {
        const directionsService = new google.maps.DirectionsService;
        const directionsDisplay = new google.maps.DirectionsRenderer;
        const map = new google.maps.Map(document.getElementById('TripDirection'), {
            zoom: 10,
            center: {lat: parseFloat(this.SourceLatitude), lng: parseFloat(this.SourceLongitude)}
        });
        const SourceLatLng = new google.maps.LatLng(parseFloat(this.SourceLatitude),  parseFloat(this.SourceLongitude));
        const DestinationLatLng = new google.maps.LatLng(parseFloat(this.DestinationLatitude),  parseFloat(this.DestinationLongitude));
        directionsDisplay.setMap(map);
        directionsService.route({
            origin: SourceLatLng,
            destination: DestinationLatLng,
            travelMode: 'DRIVING'
        }, function(response, status) {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Directions request failed due to ' + status);
            }
        });
        setTimeout(
            function () {
                google.maps.event.addListenerOnce(map, 'mouseover', function() {
                    google.maps.event.trigger(map, 'resize');
                });
            }, 1000);
    }

    LoadTripList(TicketID){
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        this.tripService.Get_All_Trip(formData).subscribe(
            data => {
                this.TripArray = data;
            }
        );
    }

    Trip_Details(TripCode){
        this.TripID = TripCode;
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Get_Trip_Details(formData).subscribe(
            data => {
                this.TripCode = data.TRIP_Code;
                this.Technician = data.Tech_Name;
                this.Source = data.TRIP_Source;
                this.Destination = data.TRIP_Destination;
                this.TripCreated = data.TRIP_TimeStamp;
                this.SourceLatitude = data.TRIP_Source_Latitude;
                this.SourceLongitude = data.TRIP_Source_Longitude;
                this.DestinationLatitude = data.TRIP_Destination_Latitude;
                this.DestinationLongitude = data.TRIP_Destination_Longitude;
                this.TripStatusCode = data.TRIP_Status;
                this.TripStatus = data.TSM_Status;
                this.TripScheduleDate = data.TRIP_Shedule_Date;
                this.TripScheduleTime = data.TRIP_Scheduled_Time;
                this.TechnicianID = data.Tech_ID;
            }
        );



        this.GoogleMap();
    }

    SaveSchedule(value){
        if (this.SheduleModelBoxBtn === 'Create'){
            const formData: FormData = new FormData();
            formData.append('tripID', this.TripID);
            formData.append('techID', value.Technician);
            formData.append('date', value.Schedule_Date);
            formData.append('time', value.Schedule_Time);
            this.tripService.Create_Schedule(formData).subscribe(
                data => {
                    if (data.result === 'success'){
                        this.Trip_Details(this.TripID);
                        $(function () {
                            $('#ScheduleModalBox').modal('hide');
                        });
                    }
                }
            );

        }
    }


    CreateSchedule(){
        this.SheduleModelBoxBtn = 'Create';
        this.SheduleModelBoxTitle = 'Create Schedule';
        this.LoadTechnicians(this.TicketID);
        $(function () {
            $('#ScheduleModalBox').modal();
        });
    }

    LoadTechnicians(Ticket_ID){
        const formData: FormData = new FormData();
        formData.append('ticketID', this.TicketID);
        this.tripService.Get_Branch_Technicians(formData).subscribe(
            data => {
                this.TechniciansArray = data;
            }
        );
    }

    ReScheduleTrip(){
        this.SheduleModelBoxBtn = 'Create';
        this.SheduleModelBoxTitle = 'Re-Schedule';
        this.LoadTechnicians(this.TicketID);
        this.Schedule_Form = this.fb.group({
            'Technician': [this.TechnicianID, Validators.required],
            'Schedule_Date': [this.TripScheduleDate, Validators.required],
            'Schedule_Time': [this.TripScheduleTime, Validators.required]
        });
        $(function () {
            $('#ScheduleModalBox').modal();
        });
    }

    StartTrip(){
        const that = this;
        $(function () {
            swal({
                    title: 'Are you sure?',
                    text: 'This trip will be start here!',
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonClass: 'btn-success',
                    confirmButtonText: 'Start',
                    cancelButtonText: 'Cancel',
                    closeOnConfirm: false,
                    closeOnCancel: false
                },
                function(isConfirm) {
                    if (isConfirm) {
                        const formData: FormData = new FormData();
                        formData.append('tripID', that.TripID);
                        that.tripService.StartTrip(formData).subscribe(
                            data => {
                                if (data.result === 'success') {
                                    that.Trip_Details(that.TripID);
                                    swal({
                                        title: 'Trip Started!',
                                        text: 'Trip has been initiated.',
                                        type: 'success',
                                        confirmButtonClass: 'btn-success'
                                    });
                                }
                            }
                        );
                    } else {
                        swal({
                            title: 'Cancelled',
                            text: 'Trip has not initiated.',
                            type: 'error',
                            confirmButtonClass: 'btn-danger'
                        });
                    }
                });
        });
    }

    Tech_Delay(){
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Traffic_Delay(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    this.Trip_Details(this.TripID);
                    swal({
                        title: 'Status Updated',
                        text: 'Traffic delay updated.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    Tech_Reached(){
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Tech_Reached(formData).subscribe(
            data => {
                if (data.result === 'success'){
                    this.Trip_Details(this.TripID);
                    swal({
                        title: 'Status Updated',
                        text: 'Ticket and Trip status was updated.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }
            }
        );
    }

    Tech_checked_asset(){
    }

    Create_Incident_Report(){
        $(function () {
            $('#IRModalBox').modal();
        });
    }

    Save_Incident_Report(value){
        const formData: FormData = new FormData();
        formData.append('signImage', value.Sign);
        formData.append('tripID', this.TripID);
        formData.append('status', value.Ticket_SR_Status);
        formData.append('reason', value.Ticket_Reason);
        this.tripService.Save_IR_Report(formData).subscribe(
            data => {

                if (data.result === 'success'){
                    this.Send_Incident_Report_Mail();
                    $(function () {
                        $('#IRModalBox').modal('hide');
                    });
                }
            }
        );
    }

    /*Signature Pad*/

    Send_Incident_Report_Mail() {
        const formData: FormData = new FormData();
        formData.append('tripID', this.TripID);
        this.tripService.Send_IR_Report_mail(formData).subscribe(
            data => {
                if (data.result === 'success') {
                    this.Trip_Details(this.TripID);
                    swal({
                        title: 'Status Updated',
                        text: 'Ticket and Trip status was updated.',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                }

            }
        );
    }

}
