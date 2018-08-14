import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usercategory'
})
export class UsercategoryPipe implements PipeTransform {

  transform(usercategoryarray: any, usercategory?: any): any {
    if( usercategory === undefined) return usercategoryarray;

    return usercategoryarray.filter(function (Usercategoryarray)
    {
      return Usercategoryarray.UCM_Category_Name.toLowerCase().includes(usercategory.toLocaleLowerCase());


    })
  }

}
