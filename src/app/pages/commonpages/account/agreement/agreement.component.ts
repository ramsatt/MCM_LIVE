import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agreement',
  template: '<app-listagreement [id]="AM_KeyID"></app-listagreement>'
})
export class AgreementComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
