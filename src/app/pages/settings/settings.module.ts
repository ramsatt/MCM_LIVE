import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from './general/general.module';
import { ModelsModule } from './models/models.module';
import { InstructionlistModule } from './instructionlist/instructionlist.module';
import { SettingModule } from './setting/setting.module';
import { LibraryModule } from './library/library.module';
import { HolidayModule } from './holiday/holiday.module';
import { TicketstatusModule } from './ticketstatus/ticketstatus.module';
import { ShipmentcompanyModule } from './shipmentcompany/shipmentcompany.module';
import { ValuelistModule } from './valuelist/valuelist.module';
import { UsersModule } from './user/users.module';
import {UsercategoryModule} from './usercategory/usercategory.module';
import {TextMaskModule} from "angular2-text-mask";


@NgModule({
  imports: [
    CommonModule,
    GeneralModule,
    ModelsModule,
    InstructionlistModule,
    SettingModule,
    LibraryModule,
    HolidayModule,
    TicketstatusModule,
    ShipmentcompanyModule,
    ValuelistModule,
    UsersModule,
    UsercategoryModule,
      TextMaskModule
  ],
  declarations: []
})
export class SettingsModule { }
