import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-createmanagement',
  templateUrl: './createmanagement.component.html',
  styleUrls: ['./createmanagement.component.css']
})
export class CreatemanagementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('.dropify').dropify();
    });
  }

}
