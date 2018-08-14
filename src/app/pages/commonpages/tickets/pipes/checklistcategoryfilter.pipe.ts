import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'checklistcatagoryfilter'
})
export class ChecklistCategoryfilterPipe implements PipeTransform {

    transform(ChecklistCategoryArray: any, searchText?: any): any {
        if(!ChecklistCategoryArray) return [];
        if(!searchText) return ChecklistCategoryArray;
        if( searchText === undefined) return ChecklistCategoryArray;

        return ChecklistCategoryArray.filter(function (checklistArray) {
            return checklistArray.CLCM_Category_Name.toLowerCase().includes(searchText.toLocaleLowerCase());
        })
    }

}