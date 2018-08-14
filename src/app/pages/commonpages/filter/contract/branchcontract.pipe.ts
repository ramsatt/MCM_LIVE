import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'branchcontract'
})
export class BranchcontractPipe implements PipeTransform {

  transform(contractarray: any, conname?: any): any {
    if( conname === undefined) return contractarray;

    return contractarray.filter(function (ContractSrray)
    {

      return ContractSrray.CM_Name.toLowerCase().includes(conname.toLocaleLowerCase())||
          ContractSrray.BM_Branch_Name.toLowerCase().includes(conname.toLocaleLowerCase())||
          ContractSrray.CMContype.toLowerCase().includes(conname.toLocaleLowerCase());


    })
  }

}
