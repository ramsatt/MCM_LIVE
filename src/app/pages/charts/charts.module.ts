import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {TicketchartComponent} from './ticketchart/ticketchart.component';
export const routes: Routes = [
    { path: 'chart/ticket', component: TicketchartComponent},
];

@NgModule({
  imports: [
    CommonModule,
      RouterModule.forChild(routes)
  ],
  declarations: [TicketchartComponent]
})
export class ChartsModule { }
