import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TicketstatusService } from '../services/ticketstatus/ticketstatus.service';
import { TicketstatusComponent } from './ticketstatus/ticketstatus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterModule } from '../../commonpages/filter/filter.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FilterModule,
    ReactiveFormsModule
  ],
  declarations: [
      TicketstatusComponent
  ],
  providers: [
      TicketstatusService
  ],
  exports: [
      TicketstatusComponent
  ]
})
export class TicketstatusModule { }
