import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedsrPipe } from './selectedsr.pipe';
import { SelectedkiPipe } from './selectedki.pipe';
import { AssignedkiPipe } from './assignedki.pipe';
import { UnassignedkiPipe } from './unassignedki.pipe';
import { SelectedsolPipe } from './selectedsol.pipe';
import { SelectedpartPipe } from './selectedpart.pipe';
import { SelectedinsPipe } from './selectedins.pipe';
import { SelectedimgPipe } from './selectedimg.pipe';
import { SelectedvideoPipe } from './selectedvideo.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
      SelectedsrPipe,
      SelectedkiPipe,
      AssignedkiPipe,
      UnassignedkiPipe,
      SelectedsolPipe,
      SelectedpartPipe,
      SelectedinsPipe,
      SelectedimgPipe,
      SelectedvideoPipe],
    exports: [
        SelectedsrPipe,
        SelectedkiPipe,
        AssignedkiPipe,
        UnassignedkiPipe,
        SelectedsolPipe,
        SelectedpartPipe,
        SelectedinsPipe,
        SelectedimgPipe,
        SelectedvideoPipe
    ]
})
export class TicketfiltersModule { }
