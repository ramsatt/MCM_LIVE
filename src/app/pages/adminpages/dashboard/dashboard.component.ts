import { Component, OnInit } from '@angular/core';
import { CountService } from './../../../services/dashboard/count.service';
import {Router} from '@angular/router';
import {CreateuserService} from '../../commonpages/account/services/accountuser/createuser.service';
import {AccountsService} from "../../../services/accounts/accounts.service";
import {MenumanagementService} from "../../commonpages/menumanagement/service/menumanagement.service";
import {LeftmenuComponent} from "../../../component/menu/leftmenu/leftmenu.component";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    countResult: any;
    accountCount: any = [];
    siteCount: any;
    BranchCount: any;
    PartCount: any;
    AssetCount: any;
    SupplierCount: any;
    usercat: any;
    Asssubmenu: any;
    subm: any;
    rpmCount: any;
    rpdCount: any;
    ticketsCount: any;
    userid: any;
  constructor( public countService: CountService, public router: Router, public user: CreateuserService, public acc: AccountsService, public menuass: MenumanagementService, private lmc: LeftmenuComponent) {
      this.usercat = localStorage.getItem('ucmid');
      this.userid = localStorage.getItem('umid');

    }
  ngOnInit() {
      this.Loadsubmenu();
      this.Loadmenu();
      this.lmc.Loadmenu(this.usercat);
      const formData = new FormData();
      formData.append('userID', this.userid);
      this.countService.AccountCount(formData).subscribe(
        data => {
            this.countResult = data;

            this.accountCount = this.countResult[0].account;
            this.siteCount = this.countResult[0].site;
            this.BranchCount = this.countResult[0].branch;
            this.PartCount = this.countResult[0].part;
            this.AssetCount = this.countResult[0].asset;
            this.SupplierCount = this.countResult[0].supplier;
            this.rpmCount = this.countResult[0].rpm;
            this.rpdCount = this.countResult[0].rpd;
            this.ticketsCount = this.countResult[0].tickets;
        }

        );
  }

  Navigation(link) {
      this.router.navigate([link]);

  }
    Loadsubmenu() {
        this.acc.Loadmenu(1).subscribe(
            data => {
                this.subm = data;

            }
        );

    }
    Loadmenu() {
        this.menuass.LoadMainenu(this.usercat).subscribe(
            data => {
                this.Asssubmenu = data;

                let i:any='';
                for(i=0;i<=this.Asssubmenu.length;i++)
                {
                    if (this.Asssubmenu[i].MMM_Name == 'Accounts') {

                        $("#accountcolum").show();
                    }


                    if(this.Asssubmenu[i].MMM_Name == 'Sites')
                    {
                        $("#sitecolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Branch')
                    {
                        $("#branchcolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Inventory')
                    {
                        $("#inventorycolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Assets')
                    {
                        $("#assetcolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Tickets')
                    {
                        $("#ticketcolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Accounting')
                    {
                        $("#accountingcolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Accounting')
                    {
                        $("#pocolum").show();
                    }
                    if(this.Asssubmenu[i].MMM_Name == 'Inventory')
                    {
                        $("#suppliercolum").show();
                    }

                }

            }
        );

    }
}
