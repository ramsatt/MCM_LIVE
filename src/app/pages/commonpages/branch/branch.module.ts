import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { FilterModule } from './../filter/filter.module';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { BranchoverviewComponent } from './branchoverview/branchoverview.component';
import { CreatebranchComponent } from './createbranch/createbranch.component';
import { EditbranchComponent } from './editbranch/editbranch.component';
import { BranchService } from './services/branch.service';
import { UpdatebranchService } from './services/updatebranch.service';
import { AssignpartComponent } from './assignpart/assignpart.component';
import { AssignherokitComponent } from './assignherokit/assignherokit.component';
import { AssignbncherokitComponent } from './assignbncherokit/assignbncherokit.component';
import { ServicechargeComponent } from './servicecharge/servicecharge.component';
import {ServicechargeService} from "./services/servicecharge.service";
import { BranchuserComponent } from './branchuser/branchuser.component';
import { TechniciansComponent } from './technicians/technicians.component';
import {TechniciansService} from "./services/technicians.service";
import {BranchuserService} from "./services/branchuser/branchuser.service";
import { RaisedrequestComponent } from './raisedrequest/raisedrequest.component';
import { ReceivedrequestComponent } from './receivedrequest/receivedrequest.component';
import {RequestService} from "./services/request.service";
import { ShipmentsComponent } from './shipments/shipments.component';
import {ShipmentService} from "./services/shipment.service";
import { NonhkrequestComponent } from './nonhkrequest/nonhkrequest.component';
import { HkrequestComponent } from './hkrequest/hkrequest.component';
//import {DataTablesModule} from "angular-datatables";
import {DataTableModule} from "angular2-datatable";
import {TextMaskModule} from "angular2-text-mask";



export const routes: Routes = [
  { path: 'branch/overview', component: BranchoverviewComponent },
    { path: 'branch/overview/:id', component: BranchoverviewComponent },
  { path: 'branch/create', component: CreatebranchComponent },
  { path: 'branch/edit/:id', component: EditbranchComponent }
];


@NgModule({
  imports: [
    CommonModule,
      TextMaskModule,
    FormsModule,
    HttpModule,
    MenuModule,
    //DataTablesModule,
    DataTableModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    }),
    FilterModule,
  ],
  declarations: [
    BranchoverviewComponent,
    CreatebranchComponent,
    EditbranchComponent,
    AssignpartComponent,
    AssignherokitComponent,
    AssignbncherokitComponent,
    ServicechargeComponent,
    BranchuserComponent,
    TechniciansComponent,
    RaisedrequestComponent,
    ReceivedrequestComponent,
    ShipmentsComponent,
    NonhkrequestComponent,
    HkrequestComponent],
  providers: [
    BranchService,
    UpdatebranchService,
    ServicechargeService,
    BranchuserService,
    ServicechargeService,
    TechniciansService,
    RequestService,
    ShipmentService,
    RaisedrequestComponent

  ],
  exports: [
    ServicechargeComponent,
    TechniciansComponent,
    RaisedrequestComponent,
    NonhkrequestComponent,
    HkrequestComponent

  ]
})
export class BranchModule { }
