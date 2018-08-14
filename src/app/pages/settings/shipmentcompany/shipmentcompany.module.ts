import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FilterModule} from "../../commonpages/filter/filter.module";
import {FormsModule} from "@angular/forms";
import {ShipmentcompanyService} from "../services/shipmentcompany/shipmentcompany.service";
import {ShipmentcompanyComponent} from "./shipmentcompany/shipmentcompany.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FilterModule
  ],
  declarations: [ShipmentcompanyComponent],
  providers:[ShipmentcompanyService],
  exports:[ShipmentcompanyComponent]
})
export class ShipmentcompanyModule { }
