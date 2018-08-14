import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router, NavigationStart, NavigationEnd, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { CommonpagesModule } from './pages/commonpages/commonpages.module';
import { AdminpagesModule } from './pages/adminpages/adminpages.module';
import { SettingsModule } from './pages/settings/settings.module';
import {MenuModule} from './component/menu/menu.module';
import {LoginModule} from './pages/commonpages/login/login.module';
import {LeftmenuComponent} from './component/menu/leftmenu/leftmenu.component';
import {RecaptchaModule} from 'ng-recaptcha';
import {DataTableModule} from 'angular2-datatable';
import {ChartsModule} from './pages/charts/charts.module';
import {TextMaskModule} from "angular2-text-mask";
import {GlobalModule} from './global/global/global.module';
import {HttpClientModule} from "@angular/common/http";

declare var NProgress: any;

@NgModule({
  declarations: [
      AppComponent,
      ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    routing,
    CommonpagesModule,
    AdminpagesModule,
    SettingsModule,
    DataTableModule,
    MenuModule,
    LoginModule,
    RecaptchaModule.forRoot(),
    ChartsModule,
      TextMaskModule,
    GlobalModule,
    HttpClientModule
  ],
  providers: [LoginModule, LeftmenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        NProgress.start();
      }
      if (event instanceof NavigationEnd) {
        setTimeout(function(){
          NProgress.done();
        }, 200);
      }
    });
  }
}
