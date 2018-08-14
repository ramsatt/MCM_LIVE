import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { AccountModule } from './account/account.module';
import { SiteModule } from './site/site.module';
import { BranchModule } from './branch/branch.module';
import { InventoryModule } from './inventory/inventory.module';
import { AssetsModule } from './assets/assets.module';
import { TicketsModule } from './tickets/tickets.module';
import { AccountingModule } from './accounting/accounting.module';
import { ReportsModule } from './reports/reports.module';
import { MenumanagementModule } from './menumanagement/menumanagement.module';
import { ContractorModule } from './contractor/contractor.module';
import { DetailpagesModule } from './detailpages/detailpages.module';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    AccountModule,
    SiteModule,
    BranchModule,
    InventoryModule,
    AssetsModule,
    TicketsModule,
    AccountingModule,
    MenumanagementModule,
    ContractorModule,
    ReportsModule,
      DetailpagesModule
  ],
  declarations: [],
  exports: []
})
export class CommonpagesModule { }
