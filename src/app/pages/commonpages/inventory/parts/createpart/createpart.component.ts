import { Component, OnInit , ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import { PartsService } from './../services/parts.service';

declare var  $;
declare var  swal;


@Component({
  selector: 'app-createpart',
  templateUrl: './createpart.component.html',
  styleUrls: ['./createpart.component.css']
})
export class CreatepartComponent implements OnInit {
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
  sessid:any='';

  /* Account Details */
  AccountDetailsArray:any;

  /* File Upload */
  uploadFile: any = '';

  options: Object;

  sizeLimit = 2000000;
  public photo: any;
  constructor( public router: Router, public parts: PartsService ) {
    this.sessid=localStorage.getItem('umid');
  }

  ngOnInit() {
  }
  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;

    }
  }
  open(link) {
    this.router.navigate([link]);

  }
  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.sizeLimit) {
      uploadingFile.setAbort();
      swal({
        title: 'Error!',
        text: 'File size is too large.',
        type: 'danger',
        confirmButtonClass: 'btn-danger'
      });
    }
  }

  createParts() {
    $('#loader').show();

    this.parts.CreateParts( this.partname, this.mfgpartnumber, this.part_model, this.internalcost, this.part_price, this.internalnotes, this.part_description, this.photo,this.sessid).subscribe(
        data => {
          this.results = data;
          if ( this.results[0].result === 'success') {
            $('#loader').hide();
            $("#loader").css("visibility", "hidden");
            swal({
              title: 'Created!',
              text: 'Part created successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.router.navigate(['part/overview'],{ queryParams: { id: this.results[0].pmid } });
          }

        },
        err => {
          swal({
            title: 'Error',
            text: 'Error occurs, please try after some time.',
            type: 'error',
            confirmButtonClass: 'btn-danger'
          });

        }
    );
  }

  fileOverBase( e: any ): void {
    this.hasBaseDropZoneOver = e;
  }
  Navigation(link) {
    this.router.navigate([link]);
  }

  onSubmit() {
    this.submitted = true;
  }

}
