import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { SiteoverviewComponent } from './siteoverview/siteoverview.component';
import { CreatesiteComponent } from './createsite/createsite.component';
import { EditsiteComponent } from './editsite/editsite.component';
import { CreateadminsiteComponent } from './createadminsite/createadminsite.component';
import { SiteService } from './service/site.service';
import { EditsiteService } from './service/editsite.service';
import { FilterModule } from './../filter/filter.module';
import { AccountsService } from './../../../services/accounts/accounts.service';
import { BranchService } from './../branch/services/branch.service';
import { AssignbranchService } from './../branch/services/assignbranch.service';
import { AssignsecbranchService } from './../branch/services/assignsecbranch.service';
import { AdminsiteoverviewComponent } from './adminsiteoverview/adminsiteoverview.component';
import { SitemapdetailsComponent } from './sitemapdetails/sitemapdetails.component';
import { SiteuserComponent } from './siteuser/siteuser.component';
import {SiteuserService} from './service/siteuser/siteuser.service';
import { AccuserComponent } from './accuser/accuser.component';
import {AccuserService} from './service/accuser/accuser.service';
import {DataTableModule} from 'angular2-datatable';
import {TextMaskModule} from "angular2-text-mask";


export const routes: Routes = [
  { path: 'site/overview', component: SiteoverviewComponent },
  { path: 'site/overview/:id', component: AdminsiteoverviewComponent },
  { path: 'site/create', component: CreateadminsiteComponent },
  { path: 'site/create/:id', component: CreatesiteComponent },
  { path: 'site/edit/:id', component: EditsiteComponent }
];

@NgModule({
  imports: [
    CommonModule,
      TextMaskModule,
    FormsModule,
    HttpModule,
    MenuModule,
    DataTableModule,
    FilterModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    })
  ],
  declarations: [
    SiteoverviewComponent,
    CreatesiteComponent,
    EditsiteComponent,
    CreateadminsiteComponent,
    AdminsiteoverviewComponent,
    SitemapdetailsComponent,
    SiteuserComponent,
    AccuserComponent
  ],
  providers: [
    SiteService,
    AccountsService,
    EditsiteService,
    BranchService,
    AssignbranchService,
    AssignsecbranchService,
    SiteuserService,
    AccuserService
  ],
  exports: [
    SitemapdetailsComponent
  ]
})
export class SiteModule { }
