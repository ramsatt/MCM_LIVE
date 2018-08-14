import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'supplier'
})
export class SupplierPipe implements PipeTransform {

  transform(tickstatusarray: any, tickfil_status?: any): any {
    if( tickfil_status === undefined) return tickstatusarray;

    return tickstatusarray.filter(function (Tickstatusarry)
    {
      return Tickstatusarry.SUM_Name.toLowerCase().includes(tickfil_status.toLocaleLowerCase())||
       Tickstatusarry.SUM_Address1.toLowerCase().includes(tickfil_status.toLocaleLowerCase())||
          Tickstatusarry.SUM_Address2.toLowerCase().includes(tickfil_status.toLocaleLowerCase())||

          Tickstatusarry.SUM_Email.toLowerCase().includes(tickfil_status.toLocaleLowerCase());


    })
  }

}
