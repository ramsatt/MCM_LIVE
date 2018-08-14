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
import {AgreementService} from "../../account/agreement/services/agreement.service";


export const routes: Routes = [
  { path: 'agreement/list', component: ListagreementComponent },
  { path: 'asset/agreement/create/:astid/:accid', component: CreateagreementComponent },
  { path: 'asset/agreement/edit/:id', component: EditagreementComponent }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule.forChild(routes),
    MenuModule,
    FilterModule,
    Ng2UploaderModule
  ],
  declarations: [
    ListagreementComponent,
    CreateagreementComponent,
    EditagreementComponent
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
