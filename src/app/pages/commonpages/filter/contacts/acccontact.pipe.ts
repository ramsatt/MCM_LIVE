import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acccontact'
})
export class AcccontactPipe implements PipeTransform {

  transform(AccArray: any, acccontact_name?: any): any {
    if( acccontact_name === undefined) return AccArray;

    return AccArray.filter(function (accArray) {
      return accArray.UM_First_Name.toLowerCase().includes(acccontact_name.toLocaleLowerCase())||
          accArray.URM_Role_Name.toLowerCase().includes(acccontact_name.toLocaleLowerCase())||
          accArray.UCM_Category_Name.toLowerCase().includes(acccontact_name.toLocaleLowerCase());
    })
  }

}
