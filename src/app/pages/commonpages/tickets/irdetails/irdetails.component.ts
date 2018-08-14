import { Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-irdetails',
  templateUrl: './irdetails.component.html',
  styleUrls: ['./irdetails.component.scss']
})
export class IrdetailsComponent implements OnInit {
    IR_ID;
    IRListArray: any = [];

    constructor(private actRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.IR_ID = this.actRoute.snapshot.params['irID'];
    }
}

