import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { AgreementService } from './../services/agreement.service';
import { RequestOptions, Headers } from '@angular/http';
import {AccountsService} from "../../../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../../menumanagement/service/menumanagement.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-listagreement',
  templateUrl: './listagreement.component.html',
  styleUrls: ['./listagreement.component.scss']
})

export class ListagreementComponent implements OnInit, OnChanges {
@Input() id;

    allagreement: any;
    searchTerm: any;
    // Accounts
    AccountsArray: any;
    AccountID: any;
    selectedRow: Number = 0;
    setClickedRow: Function;
    Asssubmenu:any;
    Asssubbutton:any;
    add:any;
    edit:any;
    delete:any;
    viewbtn:any;
    sessid:any;
    umid:any;

    constructor( public router: Router, routing: ActivatedRoute,  public agreement: AgreementService,public accService: AccountsService,public menu:MenumanagementService) {
        this.umid=localStorage.getItem('umid');
        this.sessid=localStorage.getItem('ucmid');
        this.Loadbuttons();
        this.setClickedRow = function(index){
            this.selectedRow = index;
        };
    }

  ngOnInit() {
      this.LoadAccounts();
  }

    ngOnChanges(changes: SimpleChanges): void {
        this.viewAgreement(this.id);
    }

    LoadAccounts() {
        this.accService.LoadAccounts().subscribe(
            data => {
                this.AccountsArray = data;
                this.AccountsArray.sort((a, b) => {
                    if (a.AM_Name < b.AM_Name) return -1;
                    else if (a.AM_Name > b.AM_Name) return 1;
                    else return 0;
                });
                this.AccountID = this.AccountsArray[0].AM_KeyID;
                this.viewAgreement(this.AccountsArray[0].AM_KeyID);
                //this.LoadSites(this.AccountID);
            }

            //() => console.log('Accounts Loaded')
        );
    }

    /* View Tickets */
    viewAgreement(accid){
        this.agreement.viewAgreement(accid).subscribe(
            data => {
                this.allagreement = data;
                this.allagreement.sort((a, b) => {
                    setTimeout(function() {
                        var $table = $('.demo');
                        $table.floatThead({
                            //useAbsolutePositioning: true,
                            scrollContainer: function ($table) {
                                return $table.closest('.cover1');
                            }
                        });
                    }, 1000);
                    if (a.AGM_Agreement_Name < b.AGM_Agreement_Name) return -1;
                    else if (a.AGM_Agreement_Name > b.AGM_Agreement_Name) return 1;
                    else return 0;
                });
                //console.log(data);
            }
           // () => console.log('Agreement Search Complete')
        );
    }

    SlectedAccount(accid)
    {
        this.AccountID = accid;
        this.viewAgreement(accid);
    }

    open(link) {
        this.router.navigate([link]);
        //this.router.navigate(['agreement/create/'+this.AccountID]);
    }
    Loadbuttons() {
        this.menu.Loadbutton(2,5,this.sessid).subscribe(
            data => {
                this.Asssubbutton = data;
                this.add=this.Asssubbutton[0].MA_Add;
                this.edit=this.Asssubbutton[0].MA_Edit;
                this.delete=this.Asssubbutton[0].MA_Delete;
                this.viewbtn=this.Asssubbutton[0].MA_View;
            }
            //() => console.log('site loaded')
        );

    }

    // Un assign Account from site
    deleteAgreement(agmId,accId) {

        const that = this;
        swal({
                title: 'Are you sure?',
                text: 'This agreement will not recover in future. If any assets link with this agreement, it can’t be delete.',
                type: 'warning',
                showCancelButton: true,
                cancelButtonClass: 'btn-default',
                confirmButtonClass: 'btn-warning',
                confirmButtonText: 'Delete',
                closeOnConfirm: false
            },
            function() {
                that.agreement.deleteAgreement(agmId).subscribe(
                    data => {

                        if (data.result === 'success') {
                            that.viewAgreement(accId);
                            swal({
                                title: 'Deleted!',
                                text: 'Agreement Deleted Successfully',
                                type: 'success',
                                confirmButtonClass: 'btn-success'
                            });
                        } else if (data.result === 'warning') {
                            swal({
                                title: 'Can not delete!',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        } else if (data.result === 'error') {
                            swal({
                                title: 'Not able to delete account',
                                text: data.message,
                                type: 'error',
                                confirmButtonClass: 'btn-danger'
                            });
                        }
                    }
                );
            });
    }
}