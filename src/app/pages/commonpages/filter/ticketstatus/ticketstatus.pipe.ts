import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketstatus'
})
export class TicketstatusPipe implements PipeTransform {

  transform(tickstatusarray: any, tickfil_status?: any): any {
    if (tickfil_status === undefined) return tickstatusarray;
    return tickstatusarray.filter(function (Tickstatusarry)
    {
      return Tickstatusarry.TSM_Status.toLowerCase().includes(tickfil_status.toLocaleLowerCase());
    });
  }

}
