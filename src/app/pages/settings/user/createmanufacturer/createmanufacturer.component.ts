import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-createmanufacturer',
  templateUrl: './createmanufacturer.component.html',
  styleUrls: ['./createmanufacturer.component.css']
})
export class CreatemanufacturerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('.dropify').dropify();
    });
  }

}
