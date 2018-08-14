import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asol'
})
export class AsolPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.ASOM_Solution.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
