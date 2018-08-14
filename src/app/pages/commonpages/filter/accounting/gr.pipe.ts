import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gr'
})
export class GrPipe implements PipeTransform {

  transform(GRArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return GRArray;
    return GRArray.filter(function (GRArray)
    {
      return GRArray.fromnameval.toLowerCase().includes(RequestName.toLocaleLowerCase())||
          GRArray.fornameval.toLowerCase().includes(RequestName.toLocaleLowerCase());

    });
  }

}
