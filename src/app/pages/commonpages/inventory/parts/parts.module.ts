import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../../component/menu/menu.module';
import { FilterModule } from './../../filter/filter.module';
import { PartsoverviewComponent } from './partsoverview/partsoverview.component';
import { PartslistComponent } from './partslist/partslist.component';
import { CreatepartComponent } from './createpart/createpart.component';
import { UpdatepartComponent } from './updatepart/updatepart.component';
import { PartsService } from './services/parts.service';
import {Ng2UploaderModule} from "ng2-uploader/src/module/ng2-uploader.module";
import { AssignsupplierComponent } from './assignsupplier/assignsupplier.component';
import {AgmCoreModule} from "angular2-google-maps/core";
import {SupplierModule} from "../supplier/supplier.module";
import {OrderedpartsComponent} from "../supplier/orderedparts/orderedparts.component";
import {DataTableModule} from "angular2-datatable";

export const routes: Routes = [
  { path: 'part/list', component: PartslistComponent },
  { path: 'part/create', component: CreatepartComponent },
  { path: 'part/edit/:id', component: UpdatepartComponent },
  { path: 'part/overview', component: PartsoverviewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forChild(routes),
    MenuModule,
    SupplierModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    }),
    FilterModule,
    Ng2UploaderModule
  ],
  declarations: [
    PartsoverviewComponent,
    PartslistComponent,
    CreatepartComponent,
    UpdatepartComponent,
    AssignsupplierComponent,

  ],
  exports:[
      CreatepartComponent
  ],
  providers: [
    PartsService,
    OrderedpartsComponent
  ]
})
export class PartsModule { }
