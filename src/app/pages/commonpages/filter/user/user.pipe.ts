import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(userdetailarray: any, userdetail?: any): any {
    if( userdetail === undefined) return userdetailarray;

    return userdetailarray.filter(function (Userdetailarray)
    {
      return Userdetailarray.UM_Login_Name.toLowerCase().includes(userdetail.toLocaleLowerCase())
          ||Userdetailarray.UM_EmailID.toLowerCase().includes(userdetail.toLocaleLowerCase())
          ||Userdetailarray.URM_Role_Name.toLowerCase().includes(userdetail.toLocaleLowerCase())
          ||Userdetailarray.UCM_Category_Name.toLowerCase().includes(userdetail.toLocaleLowerCase())
          ||Userdetailarray.UM_TimeStamp.toLowerCase().includes(userdetail.toLocaleLowerCase());


    })
  }

}
