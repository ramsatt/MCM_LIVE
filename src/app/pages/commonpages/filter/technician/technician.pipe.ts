import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'technician'
})
export class TechnicianPipe implements PipeTransform {

  transform(technicianArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return technicianArray;
    return technicianArray.filter(function (technicianArray)
    {
      return technicianArray.UM_First_Name.toLowerCase().includes(RequestName.toLocaleLowerCase());
    });
  }

}
