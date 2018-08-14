import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseroverviewComponent } from './useroverview/useroverview.component';
import { CreateuserComponent } from './createuser/createuser.component';
import { UsertypeComponent } from './usertype/usertype.component';
import { CreatemcmstaffComponent } from './createmcmstaff/createmcmstaff.component';
import { CreatemanufacturerComponent } from './createmanufacturer/createmanufacturer.component';
import { CreatemanagementComponent } from './createmanagement/createmanagement.component';
import { CreatecustomersComponent } from './createcustomers/createcustomers.component';
import { CreatedispatchComponent } from './createdispatch/createdispatch.component';
import { CreatetechnicianComponent } from './createtechnician/createtechnician.component';
import { CreatebranchComponent } from './createbranch/createbranch.component';
import { CreatesiteuserComponent } from './createsiteuser/createsiteuser.component';
import { Routes, RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MenuModule} from '../../../component/menu/menu.module';
import {FilterModule} from '../../commonpages/filter/filter.module';
import {UserService} from "../services/users/user.service";


export const routes: Routes = [
  { path: 'users/mcmstaff/create', component: CreatemcmstaffComponent },
  { path: 'users/manufecturer/create', component: CreatemanufacturerComponent },
  { path: 'users/management/create', component: CreatemanagementComponent },
  { path: 'users/customer/create', component: CreatecustomersComponent },
  { path: 'users/dispatch/create', component: CreatedispatchComponent },
  { path: 'users/technician/create', component: CreatetechnicianComponent },
  { path: 'users/branch/create', component: CreatebranchComponent },
  { path: 'users/site/create', component: CreatesiteuserComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    HttpModule,
    MenuModule,
    FilterModule,
  ],
  declarations: [
    UseroverviewComponent,
    CreateuserComponent,
    UsertypeComponent,
    CreatemcmstaffComponent,
    CreatemanufacturerComponent,
    CreatemanagementComponent,
    CreatecustomersComponent,
    CreatedispatchComponent,
    CreatetechnicianComponent,
    CreatebranchComponent,
    CreatesiteuserComponent
  ],
  exports: [
    UseroverviewComponent,
    CreateuserComponent,
    UsertypeComponent,
    CreatemcmstaffComponent,
    CreatemanufacturerComponent,
    CreatemanagementComponent,
    CreatecustomersComponent,
    CreatedispatchComponent,
    CreatetechnicianComponent,
    CreatebranchComponent,
    CreatesiteuserComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
