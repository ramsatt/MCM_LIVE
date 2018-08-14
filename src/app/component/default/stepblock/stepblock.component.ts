import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stepblock',
  templateUrl: './stepblock.component.html',
  styleUrls: ['./stepblock.component.css']
})
export class StepblockComponent implements OnInit {
  @Input() title;
  @Input() icon;
  @Input() count;
  @Input() bgcolor;

  constructor() { }

  ngOnInit() {
  }

}
