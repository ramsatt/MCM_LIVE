import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchfilter'
})
export class BranchfilterPipe implements PipeTransform {

  transform(BranchesArray: any, branch_name?: any): any {
    if( branch_name === undefined) return BranchesArray;

    return BranchesArray.filter(function (branchArray) {
      return branchArray.BM_Branch_Name.toLowerCase().includes(branch_name.toLocaleLowerCase())||
          branchArray.BM_City.toLowerCase().includes(branch_name.toLocaleLowerCase())||
          branchArray.BM_State.toLowerCase().includes(branch_name.toLocaleLowerCase())||
          branchArray.BM_Country.toLowerCase().includes(branch_name.toLocaleLowerCase())||
          branchArray.BM_KeyID.toLowerCase().includes(branch_name.toLocaleLowerCase())||
          branchArray.BM_Zip.toLowerCase().includes(branch_name.toLocaleLowerCase());
    })
  }

}
