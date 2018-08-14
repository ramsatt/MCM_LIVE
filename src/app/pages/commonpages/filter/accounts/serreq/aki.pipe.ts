import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aki'
})
export class AkiPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.AKIM_Known_Issue.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
