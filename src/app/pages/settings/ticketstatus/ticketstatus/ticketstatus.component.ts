import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TicketstatusService} from '../../services/ticketstatus/ticketstatus.service';
import {MenumanagementService} from '../../../commonpages/menumanagement/service/menumanagement.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $;
declare var swal;

@Component({
  selector: 'app-ticketstatus',
  templateUrl: './ticketstatus.component.html',
  styleUrls: ['./ticketstatus.component.scss']
})
export class TicketstatusComponent implements OnInit {
  submitted = false;
  active = true;
  alltickets: any;
  checkbox: any = '';
  status: any;
  results: any;
  id: any;
  deltick: any;
  Asssubmenu: any;
  Asssubbutton: any;
  b_add: any;
  edit: any;
  delete: any;
  sessid: any;
  Status_Name: any = '';
  Status_ID: any = '';
  Modal_Tittle: any = '';
  Modal_Button_Pri: any = '';
  Modal_Button_Sec: any = '';
  ticketStatus_Form: FormGroup;

  constructor(public router: Router, private fb: FormBuilder, public tick_ser: TicketstatusService, public menu: MenumanagementService) {
      this.sessid = localStorage.getItem('ucmid');
      this.ticketStatus_Form = this.fb.group({
          'Status': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])]
      });
  }

  ngOnInit() {
    this.Load_All_Status();
    this.Loadbuttons();
  }

  Create_Ticket_Status() {
      this.Modal_Tittle = 'Create Ticket Status';
      this.Modal_Button_Pri = 'Create';
      this.Modal_Button_Sec = 'Cancel';
      this.ticketStatus_Form = this.fb.group({
          'Status': ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])]
      });
      $(function () {
          $('#Status_Model').modal();
      });
  }

  Update_Ticket_Status(Status_ID) {
      this.Modal_Tittle = 'Update Ticket Status';
      this.Modal_Button_Pri = 'Update';
      this.Modal_Button_Sec = 'Cancel';
      const formData = new FormData();
      formData.append('statusID', Status_ID);
      this.tick_ser.Load_Ticket_Status_Details(formData).subscribe(
          data => {
              this.Status_ID = data.TSM_KeyID;
              this.Status_Name = data.TSM_Status;
              this.ticketStatus_Form = this.fb.group({
                  'Status': [this.Status_Name, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(1500)])]
              });
              $(function () {
                  $('#Status_Model').modal();
              });
          }
      );
  }

  SaveStatus(value) {
      if (this.Modal_Button_Pri === 'Create') {
          const formData = new FormData();
          formData.append('status', value.Status);
          this.tick_ser.Create_Status(formData).subscribe(
              data => {
                  if (data.result === 'success') {
                      this.Load_All_Status();
                      swal({
                          title: 'Created!',
                          text: 'Ticket status has been created',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                      $(function () {
                          $('#Status_Model').modal('hide');
                      });
                  }
              }
          );
      } else if (this.Modal_Button_Pri === 'Update') {
          const formData = new FormData();
          formData.append('status', value.Status);
          formData.append('statusID', this.Status_ID);
          this.tick_ser.Update_Status(formData).subscribe(
              data => {
                  if (data.result === 'success') {
                      this.Load_All_Status();
                      swal({
                          title: 'Updated!',
                          text: 'Ticket status has been updated',
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                      $(function () {
                          $('#Status_Model').modal('hide');
                      });
                  }
              }
          );

      }
  }

  Load_All_Status() {
    this.tick_ser.Load_All_Status().subscribe(
        data => {
          this.alltickets = data;
          if (this.alltickets != null) {
            this.status = 'active';
          }
        } );
  }

  Delete(id) {
    const that = this;
    const formData = new FormData();
    formData.append('statusID', id);
    swal({
          title: 'Are you sure?',
          text: 'This Ticket will not be able to recover this future!',
          type: 'warning',
          showCancelButton: true,
          cancelButtonClass: 'btn-default',
          confirmButtonClass: 'btn-warning',
          confirmButtonText: 'Delete',
          closeOnConfirm: false
        },
        function() {
          that.tick_ser.Deltick(formData).subscribe(
              data => {
                this.deltick = data;
                if (this.deltick !== null) {
                    swal({
                      title: 'Deleted!',
                      text: 'Ticket has been deleted',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                    });
                    that.Load_All_Status();
                }
              }
          );
        });
  }

  Loadbuttons() {
        this.menu.Loadbutton(12, 53, this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.b_add = this.Asssubbutton[0].MA_Add;
                this.edit = this.Asssubbutton[0].MA_Edit;
                this.delete = this.Asssubbutton[0].MA_Delete;
            }
        );
    }
}
