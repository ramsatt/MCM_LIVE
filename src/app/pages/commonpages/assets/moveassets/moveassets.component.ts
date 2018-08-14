import { Component, OnInit, OnChanges, SimpleChanges,Input  } from '@angular/core';
import {Router} from '@angular/router';
import {MoveassetsService} from "../services/moveassets.service";

declare var $;
declare var swal;

@Component({
  selector: 'app-moveassets',
  templateUrl: './moveassets.component.html',
  styleUrls: ['./moveassets.component.scss']
})
export class MoveassetsComponent implements OnInit,OnChanges {

  @Input() id;
  @Input() asStatus;
  AccountsArray: any;
  AccountID: any;
  OLD_SM_KeyID: any;
  ASM_KeyID:any;
  ASM_Asset_Name: any;
  ASM_SAD_KeyID: any;
  SAD_KeyID: any;
  SAD_SM_KeyID: any;
  SAD_AM_KeyID: any;
  SM_KeyID: any;
  SM_SiteName: any;
  AM_KeyID: any;
  AM_Name: any;
  assets:any;
  results:any;
  logs: any;
  selectid:any = '';
  assetsexist:any = false;
  ASM_Agreement_Status: any;
  msg: any;
  umkeyid:any;
  urmid:any;


  constructor(public router: Router, public accService: MoveassetsService) {
      this.umkeyid=localStorage.getItem('umid');
      this.urmid=localStorage.getItem('urmid');
  }

  ngOnInit() {
    //this.LoadAccounts();
    //this.LoadAssets();
   // this.LoadLog();
  }

    ngOnChanges(changes: SimpleChanges): void {
        this.LoadAccounts(this.id);
        this.LoadAssets(this.id);
        this.LoadLog(this.id);
    }

  LoadAccounts(id) {
    this.accService.LoadAccounts(id).subscribe(
        data => {
          this.AccountsArray = data;
          this.AccountsArray.sort((a, b) => {
            if (a.AM_Name < b.AM_Name) return -1;
            else if (a.AM_Name > b.AM_Name) return 1;
            else return 0;
          });
          this.AccountID = this.AccountsArray[0].AM_KeyID;
          this.ASM_Asset_Name = this.AccountsArray[0].ASM_Asset_Name;
          this.ASM_SAD_KeyID = this.AccountsArray[0].ASM_SAD_KeyID;
          this.SAD_KeyID = this.AccountsArray[0].SAD_KeyID;
          this.SAD_SM_KeyID = this.AccountsArray[0].SAD_SM_KeyID;
          this.SAD_AM_KeyID = this.AccountsArray[0].SAD_AM_KeyID;
          this.SM_KeyID = this.AccountsArray[0].SM_KeyID;
          this.SM_SiteName = this.AccountsArray[0].SM_SiteName;
          this.AM_KeyID = this.AccountsArray[0].AM_KeyID;
          this.AM_Name = this.AccountsArray[0].AM_Name;
          this.OLD_SM_KeyID = this.AccountsArray[0].SM_KeyID;
          this.ASM_KeyID = this.AccountsArray[0].ASM_KeyID;
          this.ASM_Agreement_Status = this.AccountsArray[0].ASM_Agreement_Status;

         // this.viewAgreement(this.AccountsArray[0].AM_KeyID);
        }

    );
      this.selectid = '';
  }

  LoadAssets(id) {
    //console.log('Selectaccount'+this.id);
    this.accService.LoadAssets(id).subscribe(
        data => {
          this.assets = data;
            if(this.assets.length > 0){
                this.assetsexist =  true;
            }else{
                this.assetsexist =  false;
            }
          this.AccountsArray.sort((a, b) => {
            if (a.AM_Name < b.AM_Name) return -1;
            else if (a.AM_Name > b.AM_Name) return 1;
            else return 0;
          });
          //this.assets = this.AccountsArray[0].AM_KeyID;
        }

    );

  }

  LoadLog(id) {
    //console.log('Selectaccount'+this.id);
      var $table = $('.demo');
      $table.floatThead({
          //useAbsolutePositioning: true,
          scrollContainer: function ($table) {
              return $table.closest('.cover1');
          }
      });
    this.accService.LoadLog(id).subscribe(
        data => {
          this.logs = data;
          this.AccountsArray.sort((a, b) => {
            if (a.AM_Name < b.AM_Name) return -1;
            else if (a.AM_Name > b.AM_Name) return 1;
            else return 0;
          });
        }

    );
  }

  createLog(NewSiteid,amId,sadId,ASM_KeyID,ASM_Agreement_Status)
  {
      if(this.asStatus=='N' && this.urmid!=1)
      {
          swal({
              title: "Asset cannot be moved",
              text: 'This Asset is deactivated',
              type: 'error',
              confirmButtonClass: 'btn-danger'
          });
      }
      else {
          //console.log(NewSiteid+','+amID);
          if (ASM_Agreement_Status == 'Y') {
              this.msg = "Both Asset and Agreement Moved Successfully";
          }
          else if (ASM_Agreement_Status == 'N') {
              this.msg = "Asset Moved Successfully";
          }

          this.accService.CreateLog(NewSiteid, amId, sadId, ASM_KeyID, this.umkeyid).subscribe(
              data => {
                  this.results = data;

                  if (this.results[0].result === 'success') {
                      swal({
                          title: 'Moved!',
                          text: this.msg,
                          type: 'success',
                          confirmButtonClass: 'btn-success'
                      });
                      this.LoadAccounts(ASM_KeyID);
                      this.LoadAssets(ASM_KeyID);
                      this.LoadLog(ASM_KeyID);
                  }

              }
          );
      }
  }

    SlectedAccount(id)
    {
        this.LoadAccounts(id);
        this.LoadAssets(id);
        this.LoadLog(id);
    }

    enableid()
    {
        this.selectid = 'true';
    }

    enable()
    {
        if(this.selectid.length > 0){
            return false;
        }else{
            return true;
        }
    }

}
