import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MenuModule } from './../../../component/menu/menu.module';

import {ReportsComponent} from "./reports/reports.component";
import {FilterModule} from "../filter/filter.module";
import {DataTableModule} from "angular2-datatable";


export const routes: Routes = [
    {path: 'reports/reports', component: ReportsComponent},
];


@NgModule({
  imports: [
      CommonModule,
      DataTableModule,
      FormsModule,
      HttpModule,
      MenuModule,
      RouterModule.forChild(routes),
      FilterModule
  ],
  declarations: [ReportsComponent]
})
export class ReportsModule { }
