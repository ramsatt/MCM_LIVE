import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {RequestService} from "../../branch/services/request.service";
import {DomSanitizer} from "@angular/platform-browser";
import {AccountsService} from "../../../../services/accounts/accounts.service";


declare var $;
declare var swal;

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  brhrkparts: any;
  brparts: any;
  Asssubmenu:any;
  sessid:any;
    reportsLoaded: any = false;
  constructor(public router: Router,public acc: AccountsService,private domSanitizer : DomSanitizer, public requestService: RequestService) {
      this.sessid=localStorage.getItem('ucmid');
  }

  ngOnInit() {
      this.Loadbrparts();
    this.Loadbrhrkparts();

    this.Loadsubmenu();
  }
    Loadsubmenu() {
        this.acc.Loadmenu(10).subscribe(
            data => {
                this.Asssubmenu = data;

            }
        );

    }

  Loadbrhrkparts() {
    this.requestService.Loadbrhrkparts().subscribe(
        data => {
          this.brhrkparts = data;
            this.reportsLoaded=true;

           // console.log('report'+this.reportsLoaded)
            var $table = $('.demo2');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });
            //this.reportsLoaded=true;
          this.brhrkparts.sort((a, b) => {

            if (a.BM_Branch_Name < b.BM_Branch_Name) return -1;
            else if (a.BM_Branch_Name > b.BM_Branch_Name) return 1;
            else return 0;
          });


        }
    );
  }

  Loadbrparts() {
    this.requestService.Loadbrparts().subscribe(
        data => {
          this.brparts = data;

            var $table = $('.demo1');
            $table.floatThead({
                //useAbsolutePositioning: true,
                scrollContainer: function ($table) {
                    return $table.closest('.cover1');
                }
            });

          this.brparts.sort((a, b) => {
            if (a.BM_Branch_Name < b.BM_Branch_Name) return -1;
            else if (a.BM_Branch_Name > b.BM_Branch_Name) return 1;
            else return 0;
          });

        }
    );
  }

}
