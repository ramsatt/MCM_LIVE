import { Component, OnInit, ViewChild, OnChanges, Input, SimpleChanges } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { PartsService } from './../services/parts.service';
import {GlobalVariable} from "../../../../../global/global";
declare var swal;
declare var $;

@Component({
  selector: 'app-updatepart',
  templateUrl: './updatepart.component.html',
  styleUrls: ['./updatepart.component.css']
})
export class UpdatepartComponent implements OnInit {
  submitted = false;
  active = true;

  partsid: any;
  editparts: any;
  partname: any;
  mfgpartnumber: any;
  part_model: any;
  internalcost: any;
  part_price: any;
  internalnotes: any;
  part_description: any;
  part_image: any;
  results: any;
  LogoExt: any;
  uploadFile: any;
  hasBaseDropZoneOver: boolean = false;
  options: Object;
  PartDetailsArray: any;
  sizeLimit = 2000000;
  empty='';
  @ViewChild("fileInput") fileInput;
  constructor( public router: Router, public routing: ActivatedRoute, public parts_ser: PartsService ) {
    this.partsid = routing.snapshot.params['id'];
    this.options = {
      /* url: 'https://rcc.mcmservice.com/mcmbackend/web/partimg.php?part_id='+this.partsid */
      url: GlobalVariable.BASE_FILE_API + 'partimg.php?part_id=' + this.partsid
    };
    this.LoadPartsDetails();
  }

  ngOnInit() {
  }

  handleUpload(data): void {
    if (data && data.response) {
      data = JSON.parse(data.response);
      this.uploadFile = data;
      this.LoadPartsDetails();

    }
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
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
  LoadPartsDetails() {
    this.parts_ser.EditParts(this.partsid).subscribe(
        data => {
          this.editparts = data;
          this.partname = data.PM_Part_Name;
          this.mfgpartnumber = data.PM_MFG_Part_No;
          this.part_model = data.PM_Model;
          this.internalcost = data.PM_Internal_Cost;
          this.part_price = data.PM_Price;
          this.internalnotes = data.PM_Internal_Notes;
          this.part_description = data.PM_Description;
          this.LogoExt = 'assets/uploads/parts/' + this.partsid + '/image/' + data.PM_Part_Image_Path;

        }
    );
  }
  upParts() {
      $('#loader').show();
    let fi = this.fileInput.nativeElement;
    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
    this.parts_ser.updateParts(this.partname, this.mfgpartnumber, this.part_model, this.internalcost, this.part_price, this.internalnotes, this.part_description, fileToUpload, this.partsid).subscribe(
        data => {
          this.results = data;

          if ( this.results[0].result === 'success' ) {
              $('#loader').hide();
              $("#loader").css("visibility", "hidden");
            swal({
              title: 'Updated!',
              text: 'Part Details Updated Successfully',
              type: 'success',
              confirmButtonClass: 'btn-success'
            });
            this.router.navigate(['part/overview'],{ queryParams: { id: this.partsid } });
          }
        }
    );
  }
  else{
      this.parts_ser.updateParts(this.partname, this.mfgpartnumber, this.part_model, this.internalcost, this.part_price, this.internalnotes, this.part_description, '', this.partsid).subscribe(
          data => {
            this.results = data;
           // console.log(fileToUpload);
            if ( this.results[0].result === 'success' ) {
                $('#loader').hide();
                $("#loader").css("visibility", "hidden");
              swal({
                title: 'Updated!',
                text: 'Part Details Updated Successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['part/overview'],{ queryParams: { id: this.partsid } });
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
    }}
  Navigation() {
      this.router.navigate(['part/overview'],{ queryParams: { id: this.partsid } });

  }
  onSubmit() {
    this.submitted = true;
  }
}
