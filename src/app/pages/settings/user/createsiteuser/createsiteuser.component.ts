import { Component, OnInit } from '@angular/core';
declare var $;

@Component({
  selector: 'app-createsiteuser',
  templateUrl: './createsiteuser.component.html',
  styleUrls: ['./createsiteuser.component.css']
})
export class CreatesiteuserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $(function () {
      $('.dropify').dropify();
    });
  }

}
