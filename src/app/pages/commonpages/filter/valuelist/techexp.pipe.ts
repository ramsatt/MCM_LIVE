import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'techexp'
})
export class TechexpPipe implements PipeTransform {

  transform(techexparray: any, techexp_name?: any): any {
    if( techexp_name === undefined) return techexparray;

    return techexparray.filter(function (Techexparray)
    {
      return Techexparray.TEM_Technician_Experiences_Name.toLowerCase().includes(techexp_name.toLocaleLowerCase());


    })
  }

}
