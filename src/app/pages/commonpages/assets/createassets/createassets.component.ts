import {Component, ElementRef, OnInit, ViewChild, Output, Inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AccountsService} from "../../../../services/accounts/accounts.service";
import {AssetsService} from "../services/assets.service";
import {SiteService} from "../../site/service/site.service";
import {CreateSiteComponent} from "../create-site/create-site.component";

declare var $;
declare var swal;@Injectable()
@Component({
  selector: 'app-createassets',
  templateUrl: './createassets.component.html',
  styleUrls: ['./createassets.component.css']
})
export class CreateassetsComponent implements OnInit {
    sadkeyid:any;
    siteexist:any;
    AccountArray:any;
    ass_site:any;
    results:any;
    ass_name:any;
    ass_model:any;
    ass_sno:any;
    submitted = false;
    active = true;
    siteid:any;
    modresults:any;
    modelid:any;
    modelarray:any;
    siteresults:any;
    sitename:any;
    siteaccid:any;
    siteaccountid:any;
    ass_to:any;
    ass_from:any;
    siteassresults:any;
    siteaccdetid:any;
    ass_iden:any='';
    modelexist:any;
    allserialno:any='';
    agreementarray: any;
    resultsinfo:any;
    AGMID: any;
    umkeyid:any;
    urmid:any;
    @ViewChild("assf_date") public CDateFrom: ElementRef;
    @ViewChild("dfesto_date") public CDateTo: ElementRef;

    constructor(public router: Router,public accountService:AccountsService,public ass_service:AssetsService,public site:SiteService) {
        this.umkeyid=localStorage.getItem('umid');
        this.urmid=localStorage.getItem('urmid');
    }
    ModelID="";

  ngOnInit() {
      setTimeout(function() {
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
      this.LoadAccounts();

  }
    opensite(accid){
        this.siteaccountid=accid;
    }
    crsite()
{
        $('#showsite').modal("hide");

    }

    viewassignsite(accid)
    {
        $("#createsite").show();
        this.siteaccid=accid;
        this.opensite(accid);
        // this.viewsuppliers();
        this.ass_service.Loadallaccsite(this.siteaccountid,this.umkeyid,this.urmid).subscribe(
            data => {
                this.results = data;
                if(this.results.length > 0){
                    this.siteexist =  true;
                }else{
                    this.siteexist =  false;
                }
                this.siteid=this.results.SM_KeyID;
                this.siteaccdetid=this.results.SAD_KeyID;
            },
        );
    }
    viewid(id){
        this.modelid=id;
    }
    viewsiteass(siteid,accid){
        this.ass_service.Loadsiteasset(siteid,accid).subscribe(
            data => {
                this.siteassresults = data;
                this.siteid=this.siteresults.SM_KeyID;
                this.sitename=this.siteresults.SM_SiteName;

            },
        );

    }

    viewagreements(accid){
        this.ass_service.Loadagreements(accid).subscribe(
            data => {
                this.agreementarray = data;

            },
        );

    }
    viewsite(siteid){
        $("#assetform").trigger("reset");
        this.site.LoadSinglesite(siteid).subscribe(
            data => {
                this.siteresults = data;
                this.siteid=this.siteresults.SM_KeyID;
                this.sitename=this.siteresults.SM_SiteName;
                },
        );

    }
    Addassets(siteid,accid,sadkeyid){
        this.viewsite(siteid);
        this.viewsiteass(siteid,accid);
        this.viewagreements(accid);
        this.sadkeyid=sadkeyid;
        this.ass_service.Loadallaccmodel(accid).subscribe(
            data => {
                const ModelNameArray = [];
                this.modelarray = data;
                if(this.modelarray.length > 0){
                    this.modelexist =  true;
                }else{
                    this.modelexist =  false;
                }
                for (const models of this.modelarray)
                {
                    ModelNameArray.push(models['MM_Model_Name']);
                }
                setTimeout(function() {
                    $.typeahead({
                        input: '#example1',
                        order: 'asc',
                        minLength: 1,
                        source: {
                            data: ModelNameArray
                        },
                        cancelButton: false
                    });

                }, 2000);

            },
        );
    }
    LoadAccounts() {
        const formData = new FormData();
        formData.append('userID', this.umkeyid);
        this.accountService.LoadAccounts_byUsers(formData).subscribe(
            data => {
                const AccountNameArray = [];
                this.AccountArray = data;
                for (const accounts of this.AccountArray)
                {
                    AccountNameArray.push(accounts['AM_Name']);
                }
                setTimeout(function() {
                    $.typeahead({
                        input: '#example1',
                        order: 'asc',
                        minLength: 1,
                        source: {
                            data: AccountNameArray
                        },
                        cancelButton: false
                    });

                }, 2000);
            }
        );
    }
    onSubmit() {
        this.submitted = true;
    }
    viewserialno(id)
    {
        this.ass_service.LoadAllserial(this.ass_sno).subscribe(
            data => {
                this.allserialno= data;
                if(this.allserialno.length!=0)
                {
                    $("#existerror").show();
                    return false;
                }
                else{
                    $("#existerror").hide();
                    return true;
                }
            }
        );
    }
    enable()
    {
        if(this.allserialno.length==0)
        {

            return false;
        }
        else{

            return true;
        }
    }
    createAss(accid,siteid){
        this.ass_from = this.CDateFrom.nativeElement.value;
        this.ass_to = this.CDateTo.nativeElement.value;
        let assidentif:any;
        if(this.ass_iden=='null')
        {
            assidentif='';
        }
        else
            {
                assidentif=this.ass_iden;
            }

        this.ass_service.Createass( this.ass_name, this.modelid, this.ass_sno,siteid,this.ass_from,this.ass_to,assidentif,this.AGMID,this.umkeyid).subscribe(data => {
                this.resultsinfo = data;
                if ( this.resultsinfo[0].result === 'success') {
                    swal({
                        title: 'Created!',
                        text: 'Assets Created Successfully',
                        type: 'success',
                        confirmButtonClass: 'btn-success'
                    });
                    this.viewassignsite(this.siteaccountid);
                    this.viewsiteass(siteid,accid);
                    this.ModelID ="";
                   $('#showpart').modal("hide");
                    $("#assetform").trigger("reset");

                }

            }
        );
    }
}
