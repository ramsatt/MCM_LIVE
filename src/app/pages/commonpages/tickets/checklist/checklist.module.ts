import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {RepairchecklistComponent} from './repairchecklist/repairchecklist.component';
import {InspectionchecklistComponent} from './inspectionchecklist/inspectionchecklist.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InspectionService} from './service/inspection/inspection.service';
import {RepairService} from './service/repair/repair.service';
import {ChecklistcategoryComponent} from './checklistcategory/checklistcategory.component';
import {ChecklistComponent} from './checklist/checklist.component';
import {FilterModule} from "../../filter/filter.module";

export const routes: Routes = [
    {path: 'checklist/repair', component: RepairchecklistComponent},
    {path: 'checklist/inspection', component: InspectionchecklistComponent},
];


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        FilterModule
    ],
    declarations: [
        RepairchecklistComponent,
        InspectionchecklistComponent,
        ChecklistcategoryComponent,
        ChecklistComponent
    ],
    providers: [
        InspectionService,
        RepairService
    ],
    exports: [
        RepairchecklistComponent,
        InspectionchecklistComponent,
        ChecklistcategoryComponent,
        ChecklistComponent
    ]
})
export class ChecklistModule {
}
