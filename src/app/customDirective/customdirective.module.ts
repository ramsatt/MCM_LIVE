import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileValueAccessorDirective} from './FileValueAccessor.Directive';
import {FileValidatorDirective} from './FileValidator.Directive';
import { DropifyfileDirective } from './dropifyfile.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileValueAccessorDirective,
    FileValidatorDirective,
    DropifyfileDirective
  ],
  exports: [
    FileValueAccessorDirective,
    FileValidatorDirective,
    DropifyfileDirective
  ]
})
export class CustomdirectiveModule { }
