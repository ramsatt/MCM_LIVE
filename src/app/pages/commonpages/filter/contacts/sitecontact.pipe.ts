import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sitecontact'
})
export class SitecontactPipe implements PipeTransform {

  transform(SiteArray: any, sitecontact_name?: any): any {
    if( sitecontact_name === undefined) return SiteArray;

    return SiteArray.filter(function (siteArray) {
      return siteArray.UM_First_Name.toLowerCase().includes(sitecontact_name.toLocaleLowerCase());
    })
  }

}
