import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'techsec'
})
export class TechsecPipe implements PipeTransform {

  transform(tecsecarray: any, tech_secfil?: any): any {
    if( tech_secfil === undefined) return tecsecarray;

    return tecsecarray.filter(function (Techsecarray)
    {
      return Techsecarray.TSCM_Technician_Security_Clearances_Name.toLowerCase().includes(tech_secfil.toLocaleLowerCase());


    })
  }

}
