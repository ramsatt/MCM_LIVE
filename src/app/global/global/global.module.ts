import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatacoversionService} from '../datacoversion.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [DatacoversionService]
})
export class GlobalModule {
}
