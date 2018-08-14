import { Component, OnInit, ViewChildren, ViewChild } from '@angular/core';
import {EmailcontentService} from "../../services/emailcontent.service";
import { RequestOptions, Headers } from '@angular/http';

declare var $;
declare var swal;

@Component({
  selector: 'app-emailcontent',
  templateUrl: './emailcontent.component.html',
  styleUrls: ['./emailcontent.component.css']
})
export class EmailcontentComponent implements OnInit {

  @ViewChild("textarea") texteditor;
  emailcontents: any;
  sessid:any;
  umkeyid:any;
  title:any='';
    subject:any='';
    content:any;
    emailcontentid: any;
    userrole:any;
    userroleid:any='';
    ticketstatus:any;
    ticketstatustitle:any;
    roletitle: any;
    accounts:any='0';
    accountslist: any;
    firstacc : any;
    emailType: any = false;
    selectType : any = '1';
    currentaccid: any;

  constructor(public emailcontentservice:EmailcontentService) {
      this.sessid=localStorage.getItem('ucmid');
      this.umkeyid=localStorage.getItem('umid');
      var accid = '';
      //this.loademailcontent(this.firstacc);
      this.loaduserrole();
      this.loadticketstatus();
      this.viewaccounts();
  }

  ngOnInit() {

      $(function() {
          $('.textarea').summernote({
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


  }

    viewaccounts()
    {
        this.emailcontentservice.loadaccounts().subscribe(
            data => {
                this.accountslist = data;
                //this.accounts = data[0].AM_KeyID;
                //this.firstacc = data[0].AM_KeyID;
            }
        );
    }

    addemailcontent(form)
    {
        const formData: FormData = new FormData();
        let text = $('.textarea').summernote('code');
        formData.append('content', this.content);
        formData.append('title', this.title);
        formData.append('subject', this.subject);
        formData.append('createdby', this.umkeyid);
        formData.append('userroleid', this.userroleid);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({headers: headers});

        $('#loader').show();
        this.emailcontentservice.addemailcontent(formData).subscribe(
            data => {
                if ( data.result == 'success' ) {
                    $('#loader').hide();
                    $("#loader").css("visibility", "hidden");

                    swal({
                        title: 'Created!',
                        text: 'Email Content Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    let accid = '';
                    this.loademailcontent(this.currentaccid);
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

    editemailcontent(form)
    {
        const formData: FormData = new FormData();
        let text = $('.textareaedit').summernote('code');
        formData.append('content', this.content);
        //formData.append('title', this.title);
        formData.append('subject', this.subject);
        formData.append('emailcontentid', this.emailcontentid);
        formData.append('createdby', this.umkeyid);

        const headers = new Headers();
        headers.append('enctype', 'multipart/form-data');
        headers.append('Accept', 'application/json');

        const options = new RequestOptions({headers: headers});

        $('#loader').show();
        this.emailcontentservice.editemailcontent(formData).subscribe(
            data => {
                if ( data.result == 'success' ) {
                    $('#loader').hide();
                    $("#loader").css("visibility", "hidden");


                    swal({
                        title: 'Updated!',
                        text: 'Email Content Updated Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    let accid = '';
                    this.loademailcontent(this.currentaccid);
                    //this.HideCreateUserModel();

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

    HideCreateUserModel() {
        $(function () {
            $('#addemailcontent').modal('hide');
        });
    }
    clear(addemailcontentform)
    {
        addemailcontentform.reset();
        /*
        this.userroleid = '';
        this.title = '';
        this.subject = '';
        this.content = '';

        $(function () {
            $('#editemailcontentform').trigger('reset');
            //$('#addemailcontent').modal('hide');
        });*/
    }

    loademailcontent(accid)
    {
        //console.log(this.firstacc,'AccID');
        // Table Design
        var $table = $('.demo');
        $table.floatThead({
            //useAbsolutePositioning: true,
            scrollContainer: function ($table) {
                return $table.closest('.cover1');
            }
        });

        this.emailcontentservice.loademailcontent(accid).subscribe(
            data => {
                this.emailcontents = data;
            },
        );
    }

    loadbyid(id)
    {
        this.emailcontentservice.loadbyid(id).subscribe(
            data => {

                this.title = data[0]['ECM_Title'];
                this.subject = data[0]['ECM_Subject'];
                this.content = data[0]['ECM_MessageBody'];
                this.emailcontentid = data[0]['ECM_KeyID'];
                this.ticketstatustitle = data[0]['TSM_Status'];
                this.roletitle = data[0]['role'];
                this.currentaccid = data[0]['ECM_AM_KeyID'];

                let content2 = 'Parameters';
                let content = this.content;
                //console.log(content2,'CCC',content,this.content);
                // Load Editor with content
                $('.textareaedit').summernote({
                    height: 350,
                    callbacks: {
                        onChange: (content, $editable)=> {
                            $('.textareaedit').val(content);
                        }
                    },
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

                $('#textareaedit').val(content);
            },
        );
    }

    delete(id) {

        let that = this;
        swal({
                title: 'Are you sure?',
                text: 'This Email Content will not be able to recover in future!',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.emailcontentservice.delete(id).subscribe(
                    data => {

                        if (data.result === 'success') {
                            let accid = '';
                            that.loademailcontent(this.firstacc);
                            swal({
                                title: 'Deleted!',
                                text: 'Email Content Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        }
                    }
                    // () => console.log('Agreement Loaded')
                );
            });
    }

    loaduserrole()
    {
        this.emailcontentservice.loaduserrole().subscribe(
            data => {
                this.userrole = data;
            },
        );
    }

    loadticketstatus()
    {
        this.emailcontentservice.loadticketstatus().subscribe(
            data => {
            this.ticketstatus = data;
            },
        );
    }

    fromref()
    {

    }

    emailTypeset(param)
    {
        /*this.title='';
        this.subject='';
        this.userroleid='';*/
        this.accounts = '';

        if(param==2)
        {
            this.emailType = true;
            this.loademailcontent('');
        }
        else
        {
            this.emailType = false;
            this.loademailcontent('0');
            //this.emailcontents='';
        }
    }

}
