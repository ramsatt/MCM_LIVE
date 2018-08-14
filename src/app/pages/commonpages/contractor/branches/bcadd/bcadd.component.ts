import {Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, ViewChild} from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import {Form, FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {SignaturefieldComponent} from "../../signaturefield/signaturefield.component";
import {ContractorService} from "../../services/contractor.service";


declare var  $;
declare var jQuery: any;
declare var  swal;
@Component({
  selector: 'app-bcadd',
  templateUrl: './bcadd.component.html',
  styleUrls: ['./bcadd.component.css']
})
export class BcaddComponent implements OnInit,AfterViewInit {

  public form: FormGroup;
  // contractname:any='';
  UserImage:any='';
  imageUrl: any;
  date: any = '';
  allval: any;
  filesToUpload: Array<File> = [];
  arrayfile:any[];
  resultArray:any;
  UserImage1:any;
  contype:any='';
  sessid:any='';
  contractid:any='';
  loader:any='';
  agreetype:any;
  agreementtype:any;
  chkval:any;
  enableval:any;
  // public secondSig: SignaturefieldComponent;
  @ViewChildren(SignaturefieldComponent) public sigs: QueryList<SignaturefieldComponent>;
  @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;
  @ViewChild("textarea") texteditor;
  @ViewChild("pdffile") pdffile;
  @ViewChild("pdffile1") pdffile1;
  scannedcopy:any;
  constructor(public router: Router, private fb: FormBuilder, public routing:ActivatedRoute,public cons: ContractorService) {
    this.sessid=localStorage.getItem('urmid');
    this.contractid = routing.snapshot.params['id'];
    this.form = fb.group({
      properties: this.fb.array([]),
      signaturefield1: ['', Validators.required],

      ambmkeyid: ['', Validators.required],
      texteditor: [''],
      contractname: ['', Validators.required],
      date: ['', Validators.required],
      contype:['', Validators.required],
      pname:['', Validators.required],
      title:['', Validators.required],
      submit:[''],
      contype1:['']




    });


    window['app'] = this;
  }

  ngOnInit() {
    this.enableval=1;
    this.enable();
    this.loader=false;
    this.findBranchall();
   if(this.sessid==4)
   {
     //this.form.controls['title'].disable();
     //this.form.controls['date'].disable();
     this.form.controls['ambmkeyid'].disable();
     this.form.controls['contractname'].disable();
     //this.form.controls['signaturefield1'].disable();
     this.form.controls['texteditor'].disable();
     this.form.controls['contype'].disable();
     this.enableval=0;

   }
    $(function() {
      $('.summernote').summernote({
        height: 350,
        toolbar: [
          [ 'style', [ 'style' ] ],
          [ 'font', [ 'bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear'] ],
          [ 'fontname', [ 'fontname' ] ],
          [ 'fontsize', [ 'fontsize' ] ],
          [ 'color', [ 'color' ] ],
          [ 'para', [ 'ol', 'ul', 'paragraph', 'height' ] ],
          [ 'table', [ 'table' ] ],
          [ 'insert', [ 'link'] ],
          [ 'view', [ 'undo', 'redo', 'fullscreen', 'codeview', 'help' ] ]
        ]
      });
    });

    setTimeout(function () {
      $('.datepicker-only-init').datetimepicker({
        widgetPositioning: {
          horizontal: 'left'
        },
        icons: {
          time: "fa fa-clock-o",
          date: "fa fa-calendar",
          up: "fa fa-arrow-up",
          down: "fa fa-arrow-down"
        },
        format: 'MM/DD/Y'
      });
    }, 1000)
  }
  Checkboxvalue(event)
  {


    this.form.controls['title'].disable();
    if(event.target.checked)
    {


      $("#bncform").trigger("reset");
      $('#ckboxes').attr('checked', true);
      this.sigs.first.clear();
      this.form.controls['title'].disable();
      this.form.controls['date'].disable();
      this.form.controls['signaturefield1'].disable();
      this.form.controls['pname'].disable();
      this.form.controls['signaturefield1'].disable();
      this.form.controls['texteditor'].disable();

      $("#name").hide();
      $("#title").hide();
      $("#date").hide();
      $("#updf").show();
      $("#sign").hide();
      $("#addendum").hide();
      $("#texteditor").hide();
      $("#pname").hide();
      $("#umpdf").hide();
      this.scannedcopy=1;
      this.enableval=1;
    }
    else
    {
      $("#bncform").trigger("reset");
      $('#ckboxes').attr('checked', false);
      this.form.controls['title'].enable();
      this.form.controls['date'].enable();
      this.form.controls['signaturefield1'].enable();
      this.form.controls['pname'].enable();
      this.form.controls['signaturefield1'].enable();
      this.form.controls['texteditor'].enable();
      this.enableval=1;
      this.scannedcopy=0;
      $("#name").show();
      $("#title").show();
      $("#date").show();
      $("#updf").show();
      $("#sign").show();
      $("#addendum").show();
     // $("#texteditor").show();
      $("#umpdf").show();
      $("#pname").show();
    }
  }
  checkdup(event)
  {
    this.cons.checkunique(event,this.agreementtype).subscribe(
        data => {
          this.chkval = data;
          if(this.agreementtype=='MA')
          {
            this.agreetype='Member Agreement';
          }
          if(this.agreementtype=='MB')
          {
            this.agreetype='Member Handbook';
          }
          if(this.agreementtype=='NDA')
          {
            this.agreetype='Non Disclosure Agreement';
          }
          if(this.agreementtype=='SA')
          {
            this.agreetype='Disclosure Agreement';
          }
          if ((this.chkval != '') && (this.agreementtype!='SA')) {
            //this.HideCreateUserModel();
            swal({
              title: 'Sorry!',
              text: this.agreetype+' already created for this branch!',
              type: 'error',
              confirmButtonClass: 'btn-danger'
            });
            //this.findBranchall();
            $('#bncname').prop('selectedIndex',0);
          }

        },
    );
  }
  open(link) {
    this.router.navigate([link]);

  }
  onAddProperty() {
    for (var i = 1; i <= 1; i++) {
      const control = <FormArray>this.form.controls['properties'];
      control.push(new FormControl());

    }
  }

  Navication(link) {
    this.router.navigate([link]);
  }

  public ngAfterViewInit() {

    this.beResponsive();
    this.setOptions();
  }

  public beResponsive() {
    this.size(this.sigContainer1.first, this.sigs.first);

  }

  public size(container: ElementRef, sig: SignaturefieldComponent) {
    sig.signaturePad.set('canvasWidth', container.nativeElement.clientWidth);
    sig.signaturePad.set('canvasHeight', container.nativeElement.clientHeight);
  }

  public setOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(0,0,0)');
    this.sigs.first.signaturePad.set('backgroundColor', 'rgba(255, 255, 255, 1)');


  }

  findBranchall() {

    this.cons.findBranch().subscribe(
        data => {
          this.allval = data;

        },
    );
  }
  onImageChangeFromFile(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];
      //validation here then attribute the value to your model
      let fileName = file.type;
      if(fileName!='application/pdf')
      {
        this.enableval=1;
        $("#existerror").show();
        return false;
      }
      else
      {
        this.enableval=0;
        $("#existerror").hide();
        return true;
      }
    }
  }
  enable()
  {
    if((this.enableval==1) && (this.agreementtype!='MB'))
    {
      return false;
    }
    else if((this.enableval==1) && (this.agreementtype=='MB'))
    {

      return false;
    }
    else{
      return true;
    }
  }
  handbook(val)
  {
    $('#bncname').prop('selectedIndex',0);
    this.agreementtype=val;
    if((val=='MB') && (this.scannedcopy!=1))
    {
     this.enableval=0;

      $("#texteditor").show();
      $("#pname").show();
      $("#title").show();
      $("#date").show();
      $("#updf").hide();
      $("#umpdf").hide();
    }
    else if(this.scannedcopy!=1) {

      $("#texteditor").hide();
      $("#pname").show();
      $("#title").show();
      $("#date").show();
      $("#updf").show();
      $("#umpdf").show();
      //this.enableval=1;
    }
    else if((val=='MB') && (this.scannedcopy==1))
    {

      $("#name").hide();
      $("#title").hide();
      $("#date").hide();
      $("#updf").show();
      $("#sign").hide();
      $("#addendum").hide();
      $("#texteditor").hide();
      $("#pname").hide();
      $("#umpdf").hide();
      this.scannedcopy=1;
      this.enableval=1;
      //this.enable();
    }
  }
  onFileChange(e, i) {
    let reader = new FileReader();

    let file = e.target.files[0];
    reader.onloadend = () => {
      //const imageNameArray = [];
      //Assign the result to variable for setting the src of image element
      this.imageUrl = reader.result;
      // imageNameArray.push(this.imageUrl);
      // console.log(imageNameArray)
    }
    reader.readAsDataURL(file);
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;


    /*for(let i=0 ; i< this.filesToUpload.length; i++)
    {
     if (this.filesToUpload[i].type != "application/pdf")
      {
        console.log("User Found" , this.filesToUpload.length);
        let arrfile=this.filesToUpload[i].type;
        this.enableval=1;
        $("#existerror1").show();
      //this.arrayfile.push(arrfile);
       return false;

     // this.demoChk.push(chBox);
     }


    }*/
   // console.log(this.arrayfile);
    //this.product.photo = fileInput.target.files[0]['name'];
  }

  //this.form.controls['properties'][i].setValue($event.target.files[0].name); // <-- Set Value for Validation

  public submit(value) {
    $('#loader').show();
    //console.log(value);
    // value.submit.disabled = true;
    //value.submit = "Please wait...";
    //return true;

    if (this.scannedcopy != 1)
    {
      if (value.contype != 'MB') {
        if (this.sessid != 4) {
          if(this.filesToUpload.length<1)
          {

            const Image = this.pdffile.nativeElement;


            this.UserImage = Image.files[0];

            const imageFile: File = this.UserImage;

           // const Image1 = this.pdffile1.nativeElement;
           // this.UserImage1 = Image1.files[0];

           // const imageFile1: File = this.UserImage1;
            const formData: FormData = new FormData();
            // formData.append("uploads[]", files[0], files[0]['name']);
            //  this.address.documents = files.toString();

            formData.append('Date', value.date);
            formData.append('Name', value.contractname);
            formData.append('Type', this.contype);
            formData.append('texteditor', value.pname);
            formData.append('title', value.title);

            formData.append('contype', "Branch");


            formData.append('keyid', value.ambmkeyid);

            formData.append('userImageFiles', imageFile, imageFile.name);
           // formData.append('userImageFiles1', imageFile1, imageFile1.name);
            formData.append('Signaturefield', value.signaturefield1);

            const headers = new Headers();
            headers.append('enctype', 'multipart/form-data');
            headers.append('Accept', 'application/json');

            const options = new RequestOptions({headers: headers});
            this.cons.createcontractorwoaddendum(formData).subscribe(
                data => {
                  $('#loader').hide();
                  $("#loader").css("visibility", "hidden");
                  this.resultArray = data;
                  if (this.resultArray.result === 'success') {


                    swal({
                      title: 'Created!',
                      text: 'Contract Created Successfully',
                      type: 'success',
                      confirmButtonClass: 'btn-success'
                    });
                    this.router.navigate(['contract/overview']);
                  }

                }
            );

          }
          else
            {

          const Image = this.pdffile.nativeElement;


          this.UserImage = Image.files[0];

          const imageFile: File = this.UserImage;
          const files: Array<File> = this.filesToUpload;

          const Image1 = this.pdffile1.nativeElement;
          this.UserImage1 = Image1.files[0];

          const imageFile1: File = this.UserImage1;
          const formData: FormData = new FormData();

          // formData.append("uploads[]", files[0], files[0]['name']);
          //  this.address.documents = files.toString();

          formData.append('Date', value.date);
          formData.append('Name', value.contractname);
          formData.append('Type', this.contype);
          formData.append('texteditor', value.pname);
          formData.append('title', value.title);

          formData.append('contype', "Branch");


          formData.append('keyid', value.ambmkeyid);

          formData.append('userImageFiles', imageFile, imageFile.name);
          formData.append('userImageFiles1', imageFile1, imageFile1.name);
          formData.append('Signaturefield', value.signaturefield1);
          for (let i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i]['name']);
          }
          const headers = new Headers();
          headers.append('enctype', 'multipart/form-data');
          headers.append('Accept', 'application/json');

          const options = new RequestOptions({headers: headers});
          this.cons.createcontractor(formData).subscribe(
              data => {
                $('#loader').hide();
                $("#loader").css("visibility", "hidden");
                this.resultArray = data;
                if (this.resultArray.result === 'success') {


                  swal({
                    title: 'Created!',
                    text: 'Contract Created Successfully',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                  });
                  this.router.navigate(['contract/overview']);
                }

              }
          );
        }
        }
        else {


          const formData: FormData = new FormData();
          // formData.append("uploads[]", files[0], files[0]['name']);
          //  this.address.documents = files.toString();

          formData.append('Date', value.date);


          formData.append('texteditor', value.pname);
          formData.append('title', value.title);

          formData.append('contractid', this.contractid);

          formData.append('sessionid', this.sessid);


          formData.append('Signaturefield', value.signaturefield1);

          const headers = new Headers();
          headers.append('enctype', 'multipart/form-data');
          headers.append('Accept', 'application/json');

          const options = new RequestOptions({headers: headers});
          this.cons.createcontractor(formData).subscribe(
              data => {
                this.resultArray = data;
                if (this.resultArray.result === 'success') {

                  $('#loader').hide();
                  $("#loader").css("visibility", "hidden");
                  swal({
                    title: 'Created!',
                    text: 'Contract Created Successfully',
                    type: 'success',
                    confirmButtonClass: 'btn-success'
                  });
                  this.router.navigate(['contract/overview']);
                }

              }
          );
        }
      }

    else
      {

        const formData: FormData = new FormData();
        let text = $('.summernote').summernote('code');
        // formData.append("uploads[]", files[0], files[0]['name']);
        //  this.address.documents = files.toString();

        formData.append('Date', value.date);


        formData.append('memhandbook', text);

        formData.append('pname', value.pname);
        formData.append('title', value.title);
        formData.append('contractid', this.contractid);

        formData.append('sessionid', this.sessid);


        formData.append('contype', "Branch");

        formData.append('Name', value.contractname);

        formData.append('keyid', value.ambmkeyid);
        formData.append('Signaturefield', value.signaturefield1);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({headers: headers});
        this.cons.createhandbook(formData).subscribe(
            data => {
              this.resultArray = data;
              if (this.resultArray.result === 'success') {

                $('#loader').hide();
                $("#loader").css("visibility", "hidden");
                swal({
                  title: 'Created!',
                  text: 'Contract Created Successfully',
                  type: 'success',
                  confirmButtonClass: 'btn-success'
                });
                this.router.navigate(['contract/overview']);
              }

            }
        );
      }
  }
  else
    {

      const formData: FormData = new FormData();
      // formData.append("uploads[]", files[0], files[0]['name']);
      //  this.address.documents = files.toString();


      const Image = this.pdffile.nativeElement;
      this.UserImage = Image.files[0];

      const imageFile: File = this.UserImage;
      const files: Array<File> = this.filesToUpload;
      const Image1 = this.pdffile1.nativeElement;
      this.UserImage1 = Image1.files[0];

      const imageFile1: File = this.UserImage1;
      formData.append('Date', value.date);
      formData.append('Name', value.contractname);
      formData.append('Type', this.contype);
      formData.append('texteditor', value.pname);
      formData.append('title', value.title);
      formData.append('contype', "Branch");
      formData.append('scanned', "scancopy");



      formData.append('keyid', value.ambmkeyid);

      formData.append('userImageFiles', imageFile, imageFile.name);
      const headers = new Headers();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      const options = new RequestOptions({headers: headers});
      this.cons.createcontractor(formData).subscribe(
          data => {
            this.resultArray = data;
            if (this.resultArray.result === 'success') {

              $('#loader').hide();
              $("#loader").css("visibility", "hidden");
              swal({
                title: 'Created!',
                text: 'Contract Created Successfully',
                type: 'success',
                confirmButtonClass: 'btn-success'
              });
              this.router.navigate(['contract/overview']);
            }

          }
      );
    }
  }




  public clear() {
    this.sigs.first.clear();

    this.sigs.last.clear();
  }
}
