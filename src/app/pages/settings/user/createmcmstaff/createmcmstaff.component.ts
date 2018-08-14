import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-createmcmstaff',
  templateUrl: './createmcmstaff.component.html',
  styleUrls: ['./createmcmstaff.component.css']
})
export class CreatemcmstaffComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('.dropify').dropify();
    });
  }

}
