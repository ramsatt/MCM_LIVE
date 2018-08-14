import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from '../../../component/menu/menu.module';
import { FilterModule } from '../filter/filter.module';
import { AccountsService } from '../../../services/accounts/accounts.service';
import { CreateuserService } from '../account/services/accountuser/createuser.service';
import { TicketdetailsComponent } from './ticketdetails/ticketdetails.component';
import { SiteService } from '../site/service/site.service';
import { AssetsService } from '../assets/services/assets.service';
import { BranchService } from '../branch/services/branch.service';
import { AssignbranchService } from '../branch/services/assignbranch.service';
import { BranchuserService } from '../branch/services/branchuser/branchuser.service';
import { AsrmService } from '../account/accservicerequest/services/asrm.service';
import {TicketService} from './service/ticket.service';
import { ServicerequestdetailsComponent } from './servicerequestdetails/servicerequestdetails.component';
import {TsrmService} from './service/tsrm.service';
import { CustomdirectiveModule } from '../../../customDirective/customdirective.module';
import { TripModule } from './trip/trip.module';
import { RemoveTicketDetailsService } from './service/remove-ticket-details.service';
import { AccountticketsComponent } from './accounttickets/accounttickets.component';
import { BranchticketsComponent } from './branchtickets/branchtickets.component';
import { AccountticketdetailsComponent } from './accountticketdetails/accountticketdetails.component';
import { BranchticketdetailsComponent } from './branchticketdetails/branchticketdetails.component';
import { IncidentreportComponent } from './incidentreport/incidentreport.component';
import {IncidentreportService} from './service/incidentreport.service';
import {SignaturePadModule} from 'angular2-signaturepad';
import { TestComponent } from './test/test.component';
import {ChecklistModule} from './checklist/checklist.module';
import {DetailpagesModule} from '../detailpages/detailpages.module';
import { BranchModule } from '../branch/branch.module';
import {BranchoverviewComponent} from '../branch/branchoverview/branchoverview.component';
import {RecaptchaModule} from 'ng-recaptcha';
import { IrdetailsComponent } from './irdetails/irdetails.component';
import { IrviewComponent } from './irview/irview.component';
import {TripoverviewComponent} from './trip/tripoverview/tripoverview.component';
import {AssetsModule} from '../assets/assets.module';
import { TripService } from './trip/service/trip/trip.service';
import { SrdetailsComponent } from './srdetails/srdetails.component';
import {TicketfiltersModule} from './ticketfilters/ticketfilters.module';
import {EditTicketService} from './service/edit-ticket.service';
import { ShimmerComponent } from './shimmer/shimmer.component';
import { EditirComponent } from './editir/editir.component';
import {TicketcontactService} from './service/ticketcontact.service';
import {TextMaskModule} from 'angular2-text-mask';
import {HttpClientModule} from "@angular/common/http";

export const routes: Routes = [
  {path: 'tickets/create', component: CreateComponent},
  {path: 'tickets/edit', component: EditComponent},
  {path: 'tickets/overview', component: OverviewComponent},
  {path: 'tickets/account/overview/:id', component: AccountticketsComponent},
  {path: 'tickets/branch/overview/:id', component: BranchticketsComponent},
  {path: 'tickets/incident_report/:ticket_id/:trip_id', component: IncidentreportComponent},
  {path: 'tickets/test', component: TestComponent},
  {path: 'tickets/ir/view/:irID', component: IrdetailsComponent},
  {path: 'tickets/sr', component: SrdetailsComponent},
  {path: 'tickets/edit/:ticketID/:tripID', component: EditComponent},
  {path: 'tickets/edit_ticket/:ticketID/:tripID/:type', component: EditComponent},
  {path: 'tickets/edit_ir/:ticketID/:tripID', component: EditirComponent},
  {path: 'tickets/resubmit_ir/:ticketID/:tripID/:resubmit', component: EditirComponent}
];


@NgModule({
  imports: [
    CommonModule,
    TextMaskModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    MenuModule,
    FilterModule,
    RouterModule.forChild(routes),
    CustomdirectiveModule,
    TripModule,
    SignaturePadModule,
    ChecklistModule,
    DetailpagesModule,
    BranchModule,
    RecaptchaModule,
    AssetsModule,
    TicketfiltersModule
  ],
  declarations: [
    OverviewComponent,
    CreateComponent,
    EditComponent,
    TicketdetailsComponent,
    ServicerequestdetailsComponent,
    AccountticketsComponent,
    BranchticketsComponent,
    AccountticketdetailsComponent,
    BranchticketdetailsComponent,
    IncidentreportComponent,
    TestComponent,
    IrdetailsComponent,
    IrviewComponent,
    SrdetailsComponent,
    ShimmerComponent,
    EditirComponent
  ],
  providers: [
    AccountsService,
    CreateuserService,
    SiteService,
    AssetsService,
    BranchService,
    AssignbranchService,
    BranchuserService,
    AsrmService,
    TicketService,
    TsrmService,
    RemoveTicketDetailsService,
    IncidentreportService,
    BranchoverviewComponent,
    TripoverviewComponent,
    OverviewComponent,
    TripService,
    CreateComponent,
    EditTicketService,
      EditComponent,
      TicketcontactService
  ],
  exports: [
    OverviewComponent,
    CreateComponent,
    EditComponent,
    TicketdetailsComponent,
    AccountticketsComponent,
    BranchticketsComponent,
    AccountticketdetailsComponent,
    BranchticketdetailsComponent,
    IrdetailsComponent,
    IrviewComponent,
      SrdetailsComponent
  ]
})
export class TicketsModule { }
