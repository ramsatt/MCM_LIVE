import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { MenuModule } from './../../../component/menu/menu.module';
import { AccountingoverviewComponent } from './accountingoverview/accountingoverview.component';
import { GoodsreceiptComponent } from './goodsreceipt/goodsreceipt.component';
import {FilterModule} from "../filter/filter.module";
import {DataTableModule} from "angular2-datatable";


export const routes: Routes = [
  { path: 'accounting/overview', component: AccountingoverviewComponent },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuModule,
    DataTableModule,
    RouterModule.forChild(routes),
    FilterModule
  ],
  declarations: [AccountingoverviewComponent, GoodsreceiptComponent]
})
export class AccountingModule { }



