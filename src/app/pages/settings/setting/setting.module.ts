import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './setting.component';
import { MenuModule } from '../../../component/menu/menu.module';
import { ModelsModule } from '../models/models.module';
import { FilterModule } from '../../commonpages/filter/filter.module';
import {GeneralModule} from "../general/general.module";

import {LibraryModule} from "../library/library.module";
import {HolidayModule} from "../holiday/holiday.module";
import {TicketstatusModule} from "../ticketstatus/ticketstatus.module";
import {ShipmentcompanyModule} from "../shipmentcompany/shipmentcompany.module";
import {ValuelistModule} from "../valuelist/valuelist.module";
import {UsersModule} from "../user/users.module";
import {MenumanagementModule} from "../../commonpages/menumanagement/menumanagement.module";
import {UsercategoryModule} from "../usercategory/usercategory.module";
import {MailmanagementModule} from "../mailmanagement/mailmanagement.module";

export const routes: Routes = [
  { path: 'settings', component: SettingComponent}
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MenuModule,
    ModelsModule,
    FilterModule,
    GeneralModule,
    LibraryModule,
    HolidayModule,
    TicketstatusModule,
    ShipmentcompanyModule,
    ValuelistModule,
    UsersModule,
    MenumanagementModule,
    UsercategoryModule,
    MailmanagementModule
  ],
  declarations: [
    SettingComponent,


  ],
  providers: [],
  exports: [ SettingComponent ]

})
export class SettingModule { }
