import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { SitedetailsComponent } from './sitedetails/sitedetails.component';
import { BranchdetailsComponent } from './branchdetails/branchdetails.component';
import { DetailpageService } from './service/detailpage.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      AccountdetailsComponent,
      SitedetailsComponent,
      BranchdetailsComponent,
  ],
    providers: [
        DetailpageService
    ],
    exports: [
        AccountdetailsComponent,
        SitedetailsComponent,
        BranchdetailsComponent,
    ]
})
export class DetailpagesModule { }
