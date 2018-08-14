import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractorComponent } from './contractor.component';
import {SignaturePadModule} from "angular2-signaturepad";
import { Routes, RouterModule } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { FilterModule } from './../filter/filter.module';
import {AgmCoreModule} from "angular2-google-maps/core";
import { SignaturefieldComponent } from './signaturefield/signaturefield.component';
import {BrowserModule} from "@angular/platform-browser";
import {ContractorService} from "./services/contractor.service";
import { OverviewComponent } from './overview/overview.component';
import { BcoverviewComponent } from './branches/bcoverview/bcoverview.component';
import { BcaddComponent } from './branches/bcadd/bcadd.component';
import {DataTableModule} from "angular2-datatable";


export const routes: Routes = [
  { path: 'contract/overview', component: OverviewComponent },
 { path: 'contract/add', component: ContractorComponent },
  { path: 'contract/branch/add', component: BcaddComponent },
  { path: 'contract/branch/edit/:id', component: BcaddComponent },
  { path: 'contract/edit/:id', component: ContractorComponent }
];
@NgModule({
  imports: [
    CommonModule,
    SignaturePadModule,
    FormsModule,
      ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    MenuModule,
    BrowserModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    }),
    FilterModule
  ],
  providers:[ContractorService],
  exports: [
   SignaturefieldComponent
  ],
  declarations:
      [ContractorComponent,
    SignaturefieldComponent,
    OverviewComponent,
    BcoverviewComponent,
    BcaddComponent]
})
export class ContractorModule { }
