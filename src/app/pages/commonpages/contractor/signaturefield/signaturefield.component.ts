import {Component, OnInit, ViewChild, forwardRef, AfterViewInit} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SignaturePad }                            from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-signaturefield',
  templateUrl: './signaturefield.component.html',
  styleUrls: ['./signaturefield.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignaturefieldComponent),
      multi: true,
    },
  ],
})
export class SignaturefieldComponent implements OnInit,ControlValueAccessor, AfterViewInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;

  public options: Object = {
    'minWidth': 0.5,
    'canvasWidth': 100,
    'canvasHeight': 50
  };

  public _signature: any = null;

  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }

  set signature(value: any) {
    this._signature = value;
    this.propagateChange(this.signature);
  }

  public writeValue(value: any): void {
    if (!value) {
      return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(): void {
    // no-op
  }

  public ngAfterViewInit(): void {
    this.signaturePad.clear();
  }

  public drawBegin(): void {
    console.log('Begin Drawing');
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL('image/png', 0.5);
  }

  public clear(): void {
    this.signaturePad.clear();
    this.signature = '';
  }
  constructor() { }

  ngOnInit() {
  }

}
