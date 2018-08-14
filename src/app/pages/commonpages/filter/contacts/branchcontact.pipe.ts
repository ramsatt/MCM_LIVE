import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchcontact'
})
export class BranchcontactPipe implements PipeTransform {

  transform(BranchArray: any, branchcontact_name?: any): any {
    if( branchcontact_name === undefined) return BranchArray;

    return BranchArray.filter(function (branchArray) {
      return branchArray.UM_First_Name.toLowerCase().includes(branchcontact_name.toLocaleLowerCase());
    })
  }
}
