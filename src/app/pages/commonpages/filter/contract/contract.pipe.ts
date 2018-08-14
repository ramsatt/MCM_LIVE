import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'contract'
})
export class ContractPipe implements PipeTransform {

  transform(contractarray: any, conname?: any): any {
    if( conname === undefined) return contractarray;

    return contractarray.filter(function (ContractSrray)
    {

      return ContractSrray.CM_Name.toLowerCase().includes(conname.toLocaleLowerCase())||
          ContractSrray.AM_Name.toLowerCase().includes(conname.toLocaleLowerCase())||
          ContractSrray.CMContype.toLowerCase().includes(conname.toLocaleLowerCase());


    })
  }

}
