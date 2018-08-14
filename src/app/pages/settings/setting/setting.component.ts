import { Component, OnInit } from '@angular/core';
import {AccountsService} from "../../../services/accounts/accounts.service";


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  Asssubmenu:any;
  sessid:any;
    submenuactive:any;
  constructor(public acc:AccountsService) { }

  ngOnInit() {
    this.sessid=localStorage.getItem('ucmid');
    this.Loadsubmenu();
  }
  Loadsubmenu() {
    this.acc.Loadmenu(12).subscribe(
        data => {
          this.Asssubmenu = data;
            this.submenuactive=this.Asssubmenu[0].SUB_Name;

        }
    );

  }


}
