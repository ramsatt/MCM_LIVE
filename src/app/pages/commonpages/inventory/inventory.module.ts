import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartsModule } from './parts/parts.module';
import {SupplierModule} from "./supplier/supplier.module";
import {FilterModule} from "../filter/filter.module";
import {TextMaskModule} from "angular2-text-mask";



@NgModule({
  imports: [
    CommonModule,
    PartsModule,
    SupplierModule,
    FilterModule,
      TextMaskModule
  ],
  declarations: []
})
export class InventoryModule { }
