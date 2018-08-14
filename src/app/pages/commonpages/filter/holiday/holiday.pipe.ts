import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'holiday'
})
export class HolidayPipe implements PipeTransform {

  transform(holidayarray: any, holifil_name?: any): any {
    if( holifil_name === undefined) return holidayarray;

    return holidayarray.filter(function (Holidayarray)
    {
      return Holidayarray.HM_Date.toLowerCase().includes(holifil_name.toLocaleLowerCase())||
            Holidayarray.HM_Festival_Name.toLowerCase().includes(holifil_name.toLocaleLowerCase())||                   Holidayarray.HM_Day.toLowerCase().includes(holifil_name.toLocaleLowerCase());


    })
  }

}
