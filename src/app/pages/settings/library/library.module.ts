import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {LibraryComponent} from "./library/library.component";

import {FormsModule} from "@angular/forms";

import {FilterModule} from "../../commonpages/filter/filter.module";

import {LibraryService} from "../services/library.service";


@NgModule({
  imports: [
    CommonModule,
      RouterModule,
      FormsModule,
      FilterModule
  ],
  declarations: [LibraryComponent],
  providers:[LibraryService],
  exports: [LibraryComponent ]
})
export class LibraryModule { }
