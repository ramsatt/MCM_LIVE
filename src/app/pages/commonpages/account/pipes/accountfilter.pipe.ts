import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountfilter'
})
export class AccountfilterPipe implements PipeTransform {

  transform(AccountsArray: any, account_name?: any): any {
    if( account_name === undefined) return AccountsArray;

    return AccountsArray.filter(function (accountArray) {
        return accountArray.AM_Name.toLowerCase().includes(account_name.toLocaleLowerCase()) || accountArray.AM_City.toLowerCase().includes(account_name.toLocaleLowerCase()) || accountArray.AM_State.toLowerCase().includes(account_name.toLocaleLowerCase()) || accountArray.AM_Country.toLowerCase().includes(account_name.toLocaleLowerCase()) || accountArray.AM_Zip.toLowerCase().includes(account_name.toLocaleLowerCase()) || accountArray.AM_Address.toLowerCase().includes(account_name.toLocaleLowerCase());
    });
  }
}
