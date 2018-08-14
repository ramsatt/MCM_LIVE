import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepblockComponent } from './stepblock/stepblock.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StepblockComponent],
  exports: [
    StepblockComponent
  ]
})
export class DefaultModule { }
