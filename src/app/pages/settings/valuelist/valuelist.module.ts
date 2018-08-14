import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {ValuelistComponent} from "./valuelist/valuelist.component";
import {ValuelistService} from "../services/valuelist/valuelist.service";
import {FormsModule} from "@angular/forms";

import {FilterModule} from "../../commonpages/filter/filter.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FilterModule
  ],
  declarations: [ValuelistComponent],
  providers:[ValuelistService],
  exports:[ValuelistComponent]
})
export class ValuelistModule { }
