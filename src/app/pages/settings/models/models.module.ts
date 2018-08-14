import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModeloverviewComponent } from './modeloverview/modeloverview.component';
import { ModelsComponent } from './models/models.component';
import { InstuctionlistComponent } from './instuctionlist/instuctionlist.component';
import { ModelsService } from './services/models.service';
import { FilterModule } from '../../commonpages/filter/filter.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Ng2UploaderModule } from 'ng2-uploader';
import { EditmodelService } from './services/editmodel.service';
import { ServicerequestService } from './services/servicerequest.service';
import { EditservicerequestService } from './services/editservicerequest.service';
import { KnownissueService } from './services/knownissue.service';
import { EditknownissueService } from './services/editknownissue.service';
import { SolutionService } from './services/solution.service';
import { EditsolutionService } from './services/editsolution.service';
import { PartsService } from '../../commonpages/inventory/parts/services/parts.service';
import { InstructionlistService } from './services/instructionlist.service';
import { InstructionpdfService } from './services/instructionpdf.service';
import { GeninspdfService } from './services/geninspdf.service';
import { InstructionlistModule } from '../instructionlist/instructionlist.module';
import {AccountModule} from '../../commonpages/account/account.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    FilterModule,
    ModalModule,
    Ng2UploaderModule,
    InstructionlistModule,
    AccountModule
  ],
  declarations: [
    ModeloverviewComponent,
    ModelsComponent,
    InstuctionlistComponent
  ],
  exports: [
    ModeloverviewComponent,
    ModelsComponent,
    InstuctionlistComponent
  ],
  providers: [
    ModelsService,
    EditmodelService,
    ServicerequestService,
    EditservicerequestService,
    KnownissueService,
    EditknownissueService,
    SolutionService,
    EditsolutionService,
    PartsService,
    InstructionlistService,
    InstructionpdfService,
    GeninspdfService
  ]
})
export class ModelsModule { }
