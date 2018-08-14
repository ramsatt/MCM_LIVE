import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponent } from './general/general.component';

import {GeneralsettingsService} from "../services/generalsettings.service";

import {FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";


@NgModule({
  imports: [
    CommonModule,
      FormsModule,
      TextMaskModule
  ],
  declarations: [GeneralComponent],
  providers: [
GeneralsettingsService
  ],
  exports:[GeneralComponent],
})
export class GeneralModule { }
