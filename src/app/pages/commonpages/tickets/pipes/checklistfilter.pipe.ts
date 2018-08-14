import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checklistfilter'
})
export class ChecklistfilterPipe implements PipeTransform {

    transform(CheckListArray: any, searchText?: any): any {
        if(!CheckListArray) return [];
        if(!searchText) return CheckListArray;
        if( searchText === undefined) return CheckListArray;

        return CheckListArray.filter(function (checklistArray) {
            return checklistArray.CLM_Check_List_Description.toLowerCase().includes(searchText.toLocaleLowerCase());
        })
    }

}