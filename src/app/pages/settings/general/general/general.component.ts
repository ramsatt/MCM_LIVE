import { Component, OnInit, ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';
import {GeneralsettingsService} from '../../services/generalsettings.service';
import { FormControl } from '@angular/forms';
import {GlobalVariable} from '../../../../global/global';

declare var  $;
declare var  swal;
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  submitted = false;
  active = true;
  app_name: any = '';
  company_copyright: any = '';
  company_email: any = '';
  dispatch: any = '';
  after_hours: any = '';
  gs_id: any;
  load_gen: any;
  results: any;
  UserImage: any;
  logoimg: any;
  gs_logo: any;
  admin_email: any = '';
    mask: any[] = ['(', /[0-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    @ViewChild('UserImage') UserImageInput;

  constructor(public router: Router,public genset: GeneralsettingsService) {
      this.LoadGenral();
  }

  ngOnInit() {
      $(function () {
          var drEvent = $('.dropify').dropify();

// called when you click on the "remove" button
          drEvent.on('dropify.beforeClear', function(event, element){
              // do something
          });

// called after the Dropify is clear
          drEvent.on('dropify.afterClear', function(event, element){
              // do something
          });

      });
  }
  LoadGenral() {
    this.genset.loadgeneral().subscribe(
        data => {
          this.load_gen = data;
          this.app_name = data[0].GS_Application_Name;
          this.company_copyright = data[0].GS_Company_Copyright;
          this.company_email = data[0].GS_Company_Email;
          this.admin_email = data[0].GS_Admin_Email;
          this.dispatch = data[0].GS_Dispatch;
          this.after_hours = data[0].GS_After_Hours;
          this.gs_id = data[0].GS_KeyID;
          this.gs_logo = data[0].GS_Logo;
          this.logoimg = GlobalVariable.BASE_FILE_API + 'uploads/logo/' + this.gs_logo;
        }
    );
  }

  onSubmit() {
      this.submitted = true;
  }

  updatesettings(id) {
      $('#loader').show();
      const formData: FormData = new FormData();
      const Image = this.UserImageInput.nativeElement;
      if (Image.files && Image.files[0]) {
          this.UserImage = Image.files[0];
          const imageFile: File = this.UserImage;
          formData.append('userImageFiles', imageFile, imageFile.name);
      }
      formData.append('appname', this.app_name);
      formData.append('copyright', this.company_copyright);
      formData.append('dispatch', this.dispatch);
      formData.append('gsid',  this.gs_id);
      formData.append('afterhours',  this.after_hours);
      formData.append('email', this.company_email);
      formData.append('adminemail', this.admin_email);
      const headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      const options = new RequestOptions({headers: headers});
      this.genset.Updategenset(formData).subscribe(
          data => {
              this.results = data;
              if (this.results[0].result === 'success') {
                  $('#loader').hide();
                  $('#loader').css('visibility', 'hidden');
                  swal({
                      title: 'Updated!',
                      text: 'General Settings updated successfully.Please Re-login to view the uploaded logo.',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                  });
                  this.router.navigate(['settings']);
                  }
              });
  }
}
