import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopmenuComponent } from './topmenu/topmenu.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { RightmenuComponent } from './rightmenu/rightmenu.component';
import { FooterComponent } from './footer/footer.component';
import { FooterService } from './services/footer/footer.service';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    TopmenuComponent,
    LeftmenuComponent,
    RightmenuComponent,
    FooterComponent
  ],
  exports: [
    TopmenuComponent,
    LeftmenuComponent,
    RightmenuComponent,
    FooterComponent
  ],
  providers: [
    FooterService
  ]
})
export class MenuModule { }
