import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';
import { FilterModule } from '../../commonpages/filter/filter.module';
import { SrmService } from './servicerequest/services/srm.service';
import { PartsService } from '../../commonpages/inventory/parts/services/parts.service';
import {CustomdirectiveModule} from '../../../customDirective/customdirective.module';


export const routes: Routes = [
  { path: 'settings/sr', component: ServicerequestComponent},
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    FilterModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    CustomdirectiveModule
  ],
  declarations: [ServicerequestComponent,],
  providers: [SrmService, PartsService],
  exports: [ServicerequestComponent]
})
export class InstructionlistModule { }
