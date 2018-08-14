import {Component, OnInit, ViewChildren, ElementRef, AfterViewInit, QueryList, ViewChild} from '@angular/core';
import { RequestOptions, Headers } from '@angular/http';
import {Form, FormBuilder, FormGroup, Validators, FormArray, FormControl, AbstractControl} from '@angular/forms';
import {Router, ActivatedRoute} from "@angular/router";
import {SignaturefieldComponent} from "./signaturefield/signaturefield.component";
import {ContractorService} from "./services/contractor.service";
import {FileValidatorDirective} from "../../../customDirective/FileValidator.Directive";

declare var  $;
declare var jQuery: any;
declare var  swal;
@Component({
  selector: 'app-contractor',
  templateUrl: './contractor.component.html',
  styleUrls: ['contractor.component.scss']
})
export class ContractorComponent implements OnInit,AfterViewInit {
    public form: FormGroup;
    // contractname:any='';
    UserImage:any='';
    imageUrl: any;
    date: any = '';
    allval: any;
    filesToUpload: Array<File> = [];
    resultArray:any;
    UserImage1:any;
    contype:any='';
    contractid:any='';
    sessid:any='';
    loader:any='';
    agreetype:any;
    scannedcopy:any;
    chkaccval:any;
    enableval:any;
    agvalue:any;
    checkboxCtrl: FormControl;
    // public secondSig: SignaturefieldComponent;
    @ViewChildren(SignaturefieldComponent) public sigs: QueryList<SignaturefieldComponent>;
    @ViewChildren('sigContainer1') public sigContainer1: QueryList<ElementRef>;
    @ViewChild("textarea") texteditor;
    @ViewChild("pdffile") pdffile;
    @ViewChild("pdffile1") pdffile1;


    constructor(public router: Router,public routing:ActivatedRoute,private fb: FormBuilder, public cons: ContractorService) {
        this.enableval=1;
        this.enable();
        this.sessid=localStorage.getItem('urmid');
        this.contractid = routing.snapshot.params['id'];
        this.form = fb.group({
            properties: this.fb.array([]),
            signaturefield1: ['', Validators.required],

            ambmkeyid: ['',Validators.required],
            texteditor: [''],
            contractname: ['',Validators.required],
            date: ['',Validators.required],
            contype:['',Validators.required],
            pname:['',Validators.required],
            title:['',Validators.required],
            contype1:[''],
            pdffile:[''],
            addendum:['']

        });

        //this.checkboxCtrl = this.form.get('contype1');
        //console.log(this.checkboxCtrl);
        window['app'] = this;
    }

    ngOnInit() {
        this.loader=false;
        if(this.sessid==2)
        {
            //this.form.controls['title'].disable();
            //this.form.controls['date'].disable();
            this.form.controls['ambmkeyid'].disable();
            this.form.controls['contractname'].disable();
            //this.form.controls['signaturefield1'].disable();
            //this.form.controls['texteditor'].disable();
            this.form.controls['contype'].disable();
            this.enableval=0;

        }
        this.findBranchall();
        $(function() {
            $('.dropify').dropify();
            $('.summernote').summernote({
                height: 350
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
    aggretype(aggvalue)
    {
        this.agvalue=aggvalue;
        $('#accname').prop('selectedIndex',0);
        if(aggvalue=='MA')
        {
            this.agvalue=aggvalue
            this.agreetype='Master Agreement';
        }
        if(aggvalue=='NDA')
        {
            this.agreetype='Non Disclosure Agreement';
        }
    }
    open(link) {
        this.router.navigate([link]);

    }
    Checkboxvalue(event)
    {

        this.form.controls['title'].disable();
        if(event.target.checked)
        {

            $("#accform").trigger("reset");
            $('#ckboxes').attr('checked', true);
            this.sigs.first.clear();
            this.form.controls['title'].disable();
            this.form.controls['date'].disable();
            this.form.controls['signaturefield1'].disable();
            this.form.controls['pname'].disable();
           // this.form.controls['signaturefield1'].disable();
            this.form.controls['texteditor'].disable();

            $("#name").hide();
            $("#title").hide();
            $("#date").hide();
            $("#pdf").hide();
            $("#sign").hide();
            $("#addendum").hide();
            this.scannedcopy=1;
        }
        else
        {
            this.form.controls['title'].enable();
            this.form.controls['date'].enable();
            this.form.controls['signaturefield1'].enable();
            this.form.controls['pname'].enable();
            this.form.controls['signaturefield1'].enable();
            this.form.controls['texteditor'].enable();

            this.scannedcopy=0;
            $("#name").show();
            $("#title").show();
            $("#date").show();
            $("#pdf").show();
            $("#sign").show();
            $("#addendum").show();
        }
    }
    onAddProperty() {
        for (var i = 1; i <= 1; i++) {
            const control = <FormArray>this.form.controls['properties'];
            control.push(new FormControl());

        }
    }
    checkdup(accname)
    {
        this.cons.checkaccunique(accname,this.agvalue).subscribe(
            data => {
                this.chkaccval = data;
                if (this.chkaccval != '') {
                    //this.HideCreateUserModel();
                    swal({
                        title: 'Sorry!',
                        text: this.agreetype+' already created for this Account!',
                        type: 'error',
                        confirmButtonClass: 'btn-danger'
                    });
                    //this.findBranchall();
                    $('#accname').prop('selectedIndex',0);
                }

            },
        );
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
        this.sigs.first.signaturePad.set('penColor', 'rgb(0, 0, 0)');
        this.sigs.first.signaturePad.set('backgroundColor', 'rgba(255, 255, 255, 1)');


    }
    onImageChangeFromFile(event) {
        if (event.target.files && event.target.files[0]) {
            let file = event.target.files[0];
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
        if(this.enableval==1)
        {

            return false;
        }
        else{
            return true;
        }
    }
    findBranchall() {

        this.cons.findBranchall().subscribe(
            data => {
                this.allval = data;
                },
        );
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
        //this.product.photo = fileInput.target.files[0]['name'];
    }

    //this.form.controls['properties'][i].setValue($event.target.files[0].name); // <-- Set Value for Validation

    public submit(value) {
        //console.log(value);
if(this.scannedcopy!=1) {
    if (this.sessid != 2) {
        if(this.filesToUpload.length<1)
        {
            $('#loader').show();
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

            formData.append('contype', "Manufacturer");


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

        }else{
            $('#loader').show();

        const Image = this.pdffile.nativeElement;
        let text = $('.summernote').summernote('code');


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
        formData.append('contype', "Manufacturer");


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
                $('#loader').show();
                const formData: FormData = new FormData();
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
        $('#loader').show();

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
        formData.append('contype', "Manufacturer");
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
