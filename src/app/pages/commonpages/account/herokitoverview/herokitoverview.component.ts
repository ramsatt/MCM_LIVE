import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {MenumanagementService} from "../../menumanagement/service/menumanagement.service";
import {AccountpartlistComponent} from "../accountpartlist/accountpartlist.component";


@Component({
  selector: 'app-herokitoverview',
  templateUrl: './herokitoverview.component.html',
  styleUrls: ['./herokitoverview.component.css']
})
export class HerokitoverviewComponent implements OnInit {
  @Input() id;
  @Input() name;
  Chilmenu:any;
  changeid:any='';
  constructor(public menu:MenumanagementService,public accpart:AccountpartlistComponent) { }

  ngOnInit() {
      this.Loadchildmenu();
  }
  ngOnChanges(){

  }
  refresh(menuname)
  {

    if(menuname=='Parts')
    {
      this.changeid=1;
    }
    else if(menuname=='Received Request')
    {
      this.changeid=2;
    }
    else {
      this.changeid=3;
    }
  }
  Loadchildmenu() {
    this.menu.Loadchildmenu(2,'N').subscribe(
        data => {
          this.Chilmenu = data;



        },
        err => {
          console.log(err);
        },
        () => console.log('site loaded')
    );

  }
}
