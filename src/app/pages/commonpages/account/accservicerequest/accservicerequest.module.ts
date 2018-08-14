import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FilterModule } from '../../filter/filter.module';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';
import { ModelsService } from '../../../settings/models/services/models.service';
import {AsrmService} from './services/asrm.service';
import { CustomdirectiveModule } from '../../../../customDirective/customdirective.module';
import {HttpClientModule} from "@angular/common/http";



export const routes: Routes = [
  { path: 'account/asr', component: ServicerequestComponent},
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    FilterModule,
    RouterModule.forChild(routes),
    CustomdirectiveModule
  ],
  declarations: [ServicerequestComponent],
  exports: [ServicerequestComponent],
  providers: [
    ModelsService,
    AsrmService
  ]
})
export class AccservicerequestModule { }
