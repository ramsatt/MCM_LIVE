import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geninspdf'
})
export class GeninspdfPipe implements PipeTransform {

  transform(GenIndPDFArray: any, PDF_Name?: any): any {
    if ( PDF_Name === undefined) return GenIndPDFArray;
    return GenIndPDFArray.filter(function (genIndPDFArray)
    {
      return genIndPDFArray.GGIPDF_Name.toLowerCase().includes(PDF_Name.toLocaleLowerCase());
    });
  }

}
