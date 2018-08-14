import {NgModule, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MenuModule } from './../../../component/menu/menu.module';
import { DefaultModule } from './../../../component/default/default.module';

import { CountService } from './../../../services/dashboard/count.service';
import {CreateuserService} from '../../commonpages/account/services/accountuser/createuser.service';

export const routes: Routes = [
  { path: 'admin/dashboard', component: DashboardComponent}

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenuModule,
    DefaultModule
  ],
  declarations: [
    DashboardComponent
  ],
  providers: [
    CountService,
    CreateuserService,


  ],
})
export class DashboardModule { }
