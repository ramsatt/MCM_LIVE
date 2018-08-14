import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aipdf'
})
export class AipdfPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.AIPDFM_Name.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
