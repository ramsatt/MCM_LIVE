import { Component, OnInit } from '@angular/core';
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";

@Component({
  selector: 'app-mailmanagement',
  templateUrl: './mailmanagement.component.html',
  styleUrls: ['./mailmanagement.component.css']
})
export class MailmanagementComponent implements OnInit {

  Chilmenu:any;

  constructor(public menu:MenumanagementService) { }

  ngOnInit() {
    this.Loadchildmenu();
  }
  Loadchildmenu() {
    this.menu.Loadchildmenu(12,'mailcontent').subscribe(
        data => {
          this.Chilmenu = data;
        }
    );
  }

}
