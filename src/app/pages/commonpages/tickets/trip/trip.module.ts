import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripcreateComponent } from './tripcreate/tripcreate.component';
import { TripoverviewComponent } from './tripoverview/tripoverview.component';
import { TripService } from './service/trip/trip.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {SignaturePadModule} from 'angular2-signaturepad';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { BranchtripdetailsComponent } from './branchtripdetails/branchtripdetails.component';
import { AccounttripdetailsComponent } from './accounttripdetails/accounttripdetails.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignaturePadModule,
  ],
  declarations: [
      TripcreateComponent,
      TripoverviewComponent,
      SignatureFieldComponent,
      BranchtripdetailsComponent,
      AccounttripdetailsComponent
  ],
  exports: [
      TripcreateComponent,
      TripoverviewComponent,
      BranchtripdetailsComponent,
      AccounttripdetailsComponent,
      SignatureFieldComponent
  ],
  providers: [TripService]
})
export class TripModule { }
