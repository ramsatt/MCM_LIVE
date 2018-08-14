import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tickets'
})
export class TicketsPipe implements PipeTransform {

  transform(TicketsArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return TicketsArray;
    return TicketsArray.filter(function (TicketsArray)
    {
      return TicketsArray.TSLM_Status.toLowerCase().includes(RequestName.toLocaleLowerCase());

      /*return TicketsArray.TSLM_Status.toLowerCase().includes(RequestName.toLocaleLowerCase())||
            TicketsArray.idval.toLowerCase().includes(RequestName.toLocaleLowerCase())||
            TicketsArray.Hours.toLowerCase().includes(RequestName.toLocaleLowerCase())||
            TicketsArray.Minutes.toLowerCase().includes(RequestName.toLocaleLowerCase());*/
    });
  }

}
