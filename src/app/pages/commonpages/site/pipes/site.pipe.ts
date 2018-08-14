import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'site'
})
export class SitePipe implements PipeTransform {

  transform(SitesArray: any, site_name?: any): any {
    if ( site_name === undefined) return SitesArray;

    return SitesArray.filter(function (siteArray) {
      return siteArray.SM_SiteName.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_Address.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_City.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_State.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_Zip.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_Country.toLowerCase().includes(site_name.toLocaleLowerCase()) || siteArray.SM_KeyID.toLowerCase().includes(site_name.toLocaleLowerCase());
    });
  }
}
