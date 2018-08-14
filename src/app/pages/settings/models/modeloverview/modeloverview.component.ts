import { Component, OnInit } from '@angular/core';
import {MenumanagementService} from "../../../commonpages/menumanagement/service/menumanagement.service";

@Component({
  selector: 'app-modeloverview',
  templateUrl: './modeloverview.component.html',
  styleUrls: ['./modeloverview.component.css']
})
export class ModeloverviewComponent implements OnInit {
Chilmenu:any;
  constructor(public menu:MenumanagementService) { }

  ngOnInit() {
    this.Loadchildmenu();
  }
  Loadchildmenu() {
    this.menu.Loadchildmenu(12,'N').subscribe(
        data => {
          this.Chilmenu = data;
        }
    );
  }
}
