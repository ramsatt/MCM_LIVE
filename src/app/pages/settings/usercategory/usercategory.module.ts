import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {UsercategoryComponent} from "./usercategory.component";
import {FormsModule} from "@angular/forms";

import {FilterModule} from "../../commonpages/filter/filter.module";
import {UsercatserviceService} from "./services/usercatservice.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    FilterModule
  ],
  declarations: [UsercategoryComponent],
  providers:[UsercatserviceService],
  exports:[UsercategoryComponent]
})
export class UsercategoryModule { }
