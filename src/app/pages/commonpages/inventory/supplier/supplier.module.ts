import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../../component/menu/menu.module';
import { FilterModule } from './../../filter/filter.module';
import {SupplierComponent} from "./supplier.component";
import { CreateComponent } from './create/create.component';
import {SupplierserviceService} from "./service/supplierservice.service";

import { EditsupplierComponent } from './editsupplier/editsupplier.component';
import {EditsupplierService} from "./service/editsupplier.service";
import { OrderedpartsComponent } from './orderedparts/orderedparts.component';
import {AgmCoreModule} from "angular2-google-maps/core";
import { ShipmentsComponent } from './shipments/shipments.component';
import { SupUsersComponent } from './sup-users/sup-users/sup-users.component';
import {SupUserService} from "./service/sup-user/sup-user.service";
import {DataTableModule} from "angular2-datatable";
import {TextMaskModule} from "angular2-text-mask";


export const routes: Routes = [
  { path: 'supplier/list', component: SupplierComponent },

  { path: 'supplier/update/:id', component: EditsupplierComponent },
  { path: 'supplier/orderedparts', component: OrderedpartsComponent }

];
@NgModule({
  imports: [

    CommonModule,
    FormsModule,
      TextMaskModule,
    HttpModule,
    RouterModule.forChild(routes),
    MenuModule,
    DataTableModule,
    AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
          libraries: ['places']
    }),
    FilterModule
  ],
    exports:[OrderedpartsComponent],
  declarations: [
      SupplierComponent,
      CreateComponent,
      EditsupplierComponent,
      OrderedpartsComponent,
      ShipmentsComponent,
      SupUsersComponent
  ],
  providers:[SupplierserviceService, EditsupplierService, SupUserService]
})
export class SupplierModule { }
