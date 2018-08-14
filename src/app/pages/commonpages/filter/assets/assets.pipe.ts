import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assets'
})
export class AssetsPipe implements PipeTransform {

  transform(assetarray: any, assetname?: any): any {
    if( assetname === undefined) return assetarray;

    return assetarray.filter(function (Assetarray)
    {
      return Assetarray.ASM_Asset_Name.toLowerCase().includes(assetname.toLocaleLowerCase())||
             Assetarray.ASM_Datefrom.toLowerCase().includes(assetname.toLocaleLowerCase())||
             Assetarray.ASM_Dateto.toLowerCase().includes(assetname.toLocaleLowerCase());
    })
  }

}
