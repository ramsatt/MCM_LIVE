import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agreement'
})
export class AgreementPipe implements PipeTransform {

  transform(AgreementArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return AgreementArray;
    return AgreementArray.filter(function (AgreementArray)
    {
      return AgreementArray.AGM_Agreement_Name.toLowerCase().includes(RequestName.toLocaleLowerCase());
    });
  }

}
