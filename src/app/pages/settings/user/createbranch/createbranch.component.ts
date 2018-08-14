import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-createbranch',
  templateUrl: './createbranch.component.html',
  styleUrls: ['./createbranch.component.css']
})
export class CreatebranchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('.dropify').dropify();
    });
  }

}
