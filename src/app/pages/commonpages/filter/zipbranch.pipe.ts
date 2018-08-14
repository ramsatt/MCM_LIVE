import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zipbranch'
})
export class ZipbranchPipe implements PipeTransform {

  transform(zipbrancharray: any, zipbranch_name?: any): any {
    if( zipbranch_name === undefined) return zipbrancharray;

    return zipbrancharray.filter(function (ZipbranchArray)
    {
      return ZipbranchArray.BM_Branch_Name.toLowerCase().includes(zipbranch_name.toLocaleLowerCase()) ||
          ZipbranchArray.BM_City.toLowerCase().includes(zipbranch_name.toLocaleLowerCase())||
          ZipbranchArray.BM_State.toLowerCase().includes(zipbranch_name.toLocaleLowerCase())||

          ZipbranchArray.BM_Phone.toLowerCase().includes(zipbranch_name.toLocaleLowerCase())||

          ZipbranchArray.BM_Zip.toLowerCase().includes(zipbranch_name.toLocaleLowerCase())||

          ZipbranchArray.dist.toLowerCase().includes(zipbranch_name.toLocaleLowerCase());


    })
  }
}
