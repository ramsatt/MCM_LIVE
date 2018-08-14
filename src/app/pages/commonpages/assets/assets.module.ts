import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { FilterModule } from './../filter/filter.module';


import { AssetsComponent } from './assets/assets.component';
import { CreateassetsComponent } from './createassets/createassets.component';
import {AssetsService} from "./services/assets.service";
import { CreateSiteComponent } from './create-site/create-site.component';
import {AgmCoreModule} from "angular2-google-maps/core";
import { MoveassetsComponent } from './moveassets/moveassets.component';
import {MoveassetsService} from "./services/moveassets.service";
import { MapComponent } from './map/map.component';
import { AgreementComponent } from './agreement/agreement.component';
import {AgreementModule} from "./agreement/agreement.module";
import { AssetdetailsComponent } from './assetdetails/assetdetails.component';
import {DataTableModule} from "angular2-datatable";


export const routes: Routes = [
  { path: 'assets', component: AssetsComponent },
  { path: 'assets/create', component: CreateassetsComponent },
  { path: 'assets/createsite', component: CreateSiteComponent }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuModule,
    DataTableModule,
    RouterModule.forChild(routes),
    AgreementModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    }),
    FilterModule
  ],

  declarations: [AssetsComponent, CreateassetsComponent, CreateSiteComponent, MoveassetsComponent, MapComponent, AgreementComponent, AssetdetailsComponent],
  providers: [AssetsService, MoveassetsService],
    exports: [AssetdetailsComponent]
})
export class AssetsModule { }
