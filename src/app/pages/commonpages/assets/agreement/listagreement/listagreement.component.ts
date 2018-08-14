import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { RequestOptions, Headers } from '@angular/http';
import {AccountsService} from "../../../../../services/accounts/accounts.service";
import {AssetsService} from "../../../assets/services/assets.service";
import {AgreementService} from "../../../account/agreement/services/agreement.service";


@Component({
  selector: 'app-listagreement',
  templateUrl: './listagreement.component.html',
  styleUrls: ['./listagreement.component.css']
})


export class ListagreementComponent implements OnInit, OnChanges {
  @Input() id;
  @Input() AMID;
  @Input() AGMStatus;
  @Input() AssName;
  isSet: any = true;
  allagreement: any;
  searchTerm: any;
  // Accounts
  AssArray: any;
  AssID: any;
  umkeyid:any;
  urmid:any;

  selectedRow: Number = 0;
  setClickedRow: Function;

  constructor( public router: Router, public ass: AssetsService, routing: ActivatedRoute,  public agreement: AgreementService,public accService: AccountsService ) {
    this.setClickedRow = function(index){
      this.selectedRow = index;
    };
    this.umkeyid=localStorage.getItem('umid');
    this.urmid=localStorage.getItem('urmid');
  }

  ngOnInit() {
    this.LoadAssets();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.viewAgreement(this.id);
  }

  LoadAssets()
  {
    this.ass.LoadAssets(this.umkeyid,this.urmid).subscribe(
        data=>
        {
          this.AssArray = data;
          this.AssID=this.AssArray[0].ASM_KeyID;
          this.viewAgreement(this.id);

        }
    );
  }

  /* LoadAccounts() {
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
   ,
   err => {
   console.log(err);
   },
   () => console.log('Accounts Loaded')
   );
   console.log('ACIDS:'+this.AccountID);
   }*/

  /* View Tickets */
  viewAgreement(asstid){
    this.agreement.viewAgreementasset(asstid).subscribe(
        data => {
          this.allagreement = data;
          this.allagreement.sort((a, b) => {
            if (a.AGM_Agreement_Name < b.AGM_Agreement_Name) return -1;
            else if (a.AGM_Agreement_Name > b.AGM_Agreement_Name) return 1;
            else return 0;
          });
          //console.log(data);
        }
        // () => console.log('Agreement Search Complete')
    );

      if(this.AGMStatus=='Y')
      {
          this.isSet = false;
      }
      else
      {
          this.isSet = true;
      }
  }

  SlectedAccount(accid)
  {
    this.AssID = accid;
    this.viewAgreement(this.id);
  }

  openagreementlink(link) {
    this.router.navigate([link]);
  }

}
