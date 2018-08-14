import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { AccountoverviewComponent } from './accountoverview/accountoverview.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { EditaccountComponent } from './editaccount/editaccount.component';
import { AccountsService } from './../../../services/accounts/accounts.service';
import { FilterModule } from './../filter/filter.module';
import { EditaccountService } from './services/editaccount.service';
import { LogoComponent } from './logo/logo.component';
import { Ng2UploaderModule } from 'ng2-uploader';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { HerokitComponent } from './herokit/herokit.component';
import { HerokitoverviewComponent } from './herokitoverview/herokitoverview.component';
import { AccountpartlistComponent } from './accountpartlist/accountpartlist.component';
import { DateValueAccessorModule } from 'angular-date-value-accessor/src/module';
import { ModelComponent } from './model/model.component';
import { ModelsService } from '../../settings/models/services/models.service';
import { EditmodelService } from '../../settings/models/services/editmodel.service';
import { AccinstructionlistComponent } from './accinstructionlist/accinstructionlist.component';
import { AccountservicerequestService } from './services/accserreq/accountservicerequest.service';
import { AccmapComponent } from './accmap/accmap.component';
import { AgreementModule } from './agreement/agreement.module';
import { HerokitService } from './services/herokit/herokit.service';
import { PartsModule } from '../inventory/parts/parts.module';
import { HerokitpartlistComponent } from './herokitpartlist/herokitpartlist.component';
import { AccountusersComponent } from './accountusers/accountusers.component';
import { CreateuserService } from './services/accountuser/createuser.service';
import { AccservicerequestModule } from './accservicerequest/accservicerequest.module';
import { RequestedpartsComponent } from './requestedparts/requestedparts.component';
import { AccmodelComponent } from './accmodel/accmodel.component';
import { CustomdirectiveModule } from '../../../customDirective/customdirective.module';
import { ShipmentsComponent } from './shipments/shipments.component';
import { ChecklistModule } from '../tickets/checklist/checklist.module';
import {DataTableModule} from "angular2-datatable";
import {DataTablesModule} from "angular-datatables";
import {TextMaskModule} from "angular2-text-mask";
import { TickservicereqComponent } from './tickservicereq/tickservicereq.component';
import {TickservicereqService} from "./tickservicereq/services/tickservicereq.service";


export const routes: Routes = [
  { path: 'account/overview', component: AccountoverviewComponent},
  { path: 'account/overview/:acc_id', component: AccountoverviewComponent},
  { path: 'account/create', component: CreateaccountComponent },
  { path: 'account/edit/:id', component: EditaccountComponent },
  { path: 'account/logo/:id', component: LogoComponent },
  { path: 'account/model', component: AccmodelComponent }
];

@NgModule({
  imports: [
    CommonModule,
      TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MenuModule,
    FilterModule,
    RouterModule.forChild(routes),
    Ng2UploaderModule,
    DateValueAccessorModule,
    DataTableModule,
    AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
          libraries: ['places']
      }),
    Ng2OrderModule,
    AgreementModule,
      PartsModule,
      AccservicerequestModule,
      CustomdirectiveModule,
      ChecklistModule
  ],
  declarations: [
      AccountoverviewComponent,
      CreateaccountComponent,
      EditaccountComponent,
      LogoComponent,
      HerokitComponent,
      HerokitoverviewComponent,
      ModelComponent,
      AccinstructionlistComponent,
      HerokitoverviewComponent,
      AccountpartlistComponent,
      AccmapComponent,
      HerokitpartlistComponent,
      AccountusersComponent,
      RequestedpartsComponent,
      AccmodelComponent,
      ShipmentsComponent,
      TickservicereqComponent,

  ],
  providers: [
      AccountsService,
      EditaccountService,
      ModelsService,
      EditmodelService,
      AccountservicerequestService,
      HerokitService,
      AccountpartlistComponent,
      CreateuserService,
      TickservicereqService
  ],
    exports: [
        ModelComponent,
        AccinstructionlistComponent,
        AccountusersComponent,
        AccmodelComponent,

        ShipmentsComponent
    ]
})
export class AccountModule { }
