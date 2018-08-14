import { Component, OnInit, ViewChild, forwardRef, AfterViewInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';
import {SignaturePad} from 'angular2-signaturepad/signature-pad';

@Component({
  selector: 'app-signature-field',
  templateUrl: './signature-field.component.html',
  styleUrls: ['./signature-field.component.css'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => SignatureFieldComponent),
          multi: true,
      },
  ]
})
export class SignatureFieldComponent implements OnInit, ControlValueAccessor, AfterViewInit {
  @ViewChild(SignaturePad) public signaturePad: SignaturePad;
  public options: object = {};
  public _signature: any = null;
  public propagateChange: Function = null;

  get signature(): any {
    return this._signature;
  }
  set signature(value: any) {
      this._signature = value;
      this.propagateChange(this.signature);
  }

  constructor() { }

  ngAfterViewInit(): void {
      this.signaturePad.set('penColor', 'rgb(0, 0, 255)');
      this.signaturePad.set('backgroundColor', 'rgb(228, 255, 243)');
      this.signaturePad.clear();
  }

  ngOnInit() {
  }

  writeValue(value: any): void {
    if (!value) {
        return;
    }
    this._signature = value;
    this.signaturePad.fromDataURL(this.signature);
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  public drawBegin(): void {
  }

  public drawComplete(): void {
    this.signature = this.signaturePad.toDataURL();
  }

  public clear(): void {
        this.signaturePad.clear();
        this.signature = '';
  }

}
