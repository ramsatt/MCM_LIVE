import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ticketlist'
})
export class TicketlistPipe implements PipeTransform {

  transform(ticketArray: any, name?: any): any {
      if ( name === undefined) {
          return ticketArray;
      }
      return ticketArray.filter(function (TicketsArray)
      {
        return TicketsArray.NewTicketID.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_AM_KeyID.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_Internal_Reference_No.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_SM_KeyID.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_BM_KeyID.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.ASM_Asset_Name.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.ASM_Serial_No.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.MM_Model_Name.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.AM_Name.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.AM_City.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.AM_State.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.SM_SiteName.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_Status_Text.toLowerCase().includes(name.toLocaleLowerCase()) || TicketsArray.TM_Account_Ref_Number.toLowerCase().includes(name.toLocaleLowerCase());
      });
  }

}
