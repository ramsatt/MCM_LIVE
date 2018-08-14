import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmailcontentComponent } from './emailcontent/emailcontent.component';
import { MailmanagementComponent } from './mailmanagement/mailmanagement.component';
import { EmailsettingsComponent } from './emailsettings/emailsettings.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {EmailcontentService} from "../services/emailcontent.service";
import {MailcontentPipe} from "../filter/mailcontent.pipe";
import { EmailalertassignmentComponent } from './emailalertassignment/emailalertassignment.component';

export const routes: Routes = [
    { path: 'email/emailcontent', component: EmailcontentComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [EmailcontentComponent, MailmanagementComponent, EmailsettingsComponent, MailcontentPipe, EmailalertassignmentComponent],
  exports: [
    EmailcontentComponent, MailmanagementComponent, EmailsettingsComponent, MailcontentPipe
  ],
    providers: [EmailcontentService]
})
export class MailmanagementModule { }
