import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'partfilter'
})
export class PartfilterPipe implements PipeTransform {

  transform(partarray: any, partfil_name?: any): any {
    if( partfil_name === undefined) return partarray;
    return partarray.filter(function (Partarray)
    {
        return Partarray.PM_Part_Name.toLowerCase().includes(partfil_name.toLocaleLowerCase())||
          Partarray.PM_MFG_Part_No.toLowerCase().includes(partfil_name.toLocaleLowerCase())||
          Partarray.PM_Model.toLowerCase().includes(partfil_name.toLocaleLowerCase())||
          Partarray.PM_Part_Name.toLowerCase().includes(partfil_name.toLocaleLowerCase());
    })
  }

}
