import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'asr'
})
export class AsrPipe implements PipeTransform {

  transform(NameArray: any, name?: any): any {
    if ( name === undefined ) return NameArray;
    return NameArray.filter(function (nameArray)
    {
      return nameArray.ASRM_Name.toLowerCase().includes(name.toLocaleLowerCase());
    });
  }

}
