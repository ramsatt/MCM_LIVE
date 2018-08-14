import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../../component/menu/menu.module';
import { FilterModule } from './../../filter/filter.module';
import {Ng2UploaderModule} from "ng2-uploader/src/module/ng2-uploader.module";

import { ListagreementComponent } from './listagreement/listagreement.component';
import { CreateagreementComponent } from './createagreement/createagreement.component';
import { EditagreementComponent } from './editagreement/editagreement.component';
import {AgreementService} from "./services/agreement.service";
import { UpdateagreementComponent } from './updateagreement/updateagreement.component';
import { ViewagreementComponent } from './viewagreement/viewagreement.component';
import {DataTableModule} from "angular2-datatable";



export const routes: Routes = [
  { path: 'agreement/list', component: ListagreementComponent },
  { path: 'agreement/create/:accid', component: CreateagreementComponent },
  { path: 'agreement/edit/:id', component: EditagreementComponent },
  { path: 'agreement/update/:id', component: UpdateagreementComponent },
  { path: 'agreement/view/:id', component: ViewagreementComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DataTableModule,
    RouterModule.forChild(routes),
    MenuModule,
    FilterModule,
    Ng2UploaderModule
  ],
  declarations: [
    ListagreementComponent,
    CreateagreementComponent,
    EditagreementComponent,
    UpdateagreementComponent,
    ViewagreementComponent
  ],
  providers: [
    AgreementService
  ],
    exports: [
        ListagreementComponent,
        CreateagreementComponent,
        EditagreementComponent
    ]
})
export class AgreementModule { }
