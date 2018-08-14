import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'techniciancertification'
})
export class TechniciancertificationPipe implements PipeTransform {

  transform(techniciancertificationarry: any, tech_cername?: any): any {
    if( tech_cername === undefined) return techniciancertificationarry;

    return techniciancertificationarry.filter(function (Techniciancertificationarry)
    {
      return Techniciancertificationarry.TCM_Technician_Certifications_Name.toLowerCase().includes(tech_cername.toLocaleLowerCase());


    })
  }

}
