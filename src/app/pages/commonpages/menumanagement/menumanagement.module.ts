import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MenuModule } from './../../../component/menu/menu.module';
import { FilterModule } from './../filter/filter.module';
import { AgmCoreModule } from 'angular2-google-maps/core';
import {MenumanagementComponent} from "./menumanagement.component";
import {MenumanagementService} from "./service/menumanagement.service"
export const routes: Routes = [
  { path: 'menuassignment/overview', component: MenumanagementComponent }

];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MenuModule,
    RouterModule.forChild(routes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnahpwY4LRTYlzEHnER3B_Y8NR1HzmrVE',
      libraries: ['places']
    }),
    FilterModule
  ],
  declarations: [
    MenumanagementComponent
  ],
  providers:[
      MenumanagementService
  ],
  exports: [
    MenumanagementComponent
      ]
})
export class MenumanagementModule { }
