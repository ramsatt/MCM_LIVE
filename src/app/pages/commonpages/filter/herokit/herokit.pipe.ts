import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'herokit'
})
export class HerokitPipe implements PipeTransform {

  transform(herokitarray: any, herokitname?: any): any {
    if( herokitname === undefined) return herokitarray;

    return herokitarray.filter(function (Herokitarray)
    {
      return Herokitarray.HKM_Name.toLowerCase().includes(herokitname.toLocaleLowerCase());
    })
  }

}
