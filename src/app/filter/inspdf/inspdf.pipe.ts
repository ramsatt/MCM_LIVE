import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inspdf'
})
export class InspdfPipe implements PipeTransform {

  transform(InsPDFArray: any, InsPDF_Name?: any): any {
    if ( InsPDF_Name === undefined) return InsPDFArray;
    return InsPDFArray.filter(function (insPDFArray)
    {
      return insPDFArray.IPDFM_Name.toLowerCase().includes(InsPDF_Name.toLocaleLowerCase());
    });
  }

}
