import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'agpdf'
})
export class AgpdfPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.AGGIPDF_Name.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
