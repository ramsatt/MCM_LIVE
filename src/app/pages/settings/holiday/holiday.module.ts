import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HolidayComponent} from "./holiday/holiday.component";
import {FormsModule} from "@angular/forms";
import {HolidayService} from "../services/holiday.service";
import {FilterModule} from "../../commonpages/filter/filter.module";





@NgModule({
  imports: [
    CommonModule,
      FormsModule,
    FilterModule
  ],
  declarations: [HolidayComponent],
  providers:[HolidayService],
  exports: [HolidayComponent ]
})
export class HolidayModule { }
