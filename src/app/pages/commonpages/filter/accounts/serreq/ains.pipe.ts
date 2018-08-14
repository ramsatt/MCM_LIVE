import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ains'
})
export class AinsPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.AIM_Name.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
