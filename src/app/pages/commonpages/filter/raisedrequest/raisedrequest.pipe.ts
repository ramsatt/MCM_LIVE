import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'raisedrequest'
})
export class RaisedrequestPipe implements PipeTransform {

  transform(RaisedRequestArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return RaisedRequestArray;
    return RaisedRequestArray.filter(function (RaisedRequestArray)
    {
      return RaisedRequestArray.PM_Part_Name.toLowerCase().includes(RequestName.toLocaleLowerCase())||
          RaisedRequestArray.RPM_KeyID.toLowerCase().includes(RequestName.toLocaleLowerCase())||
          RaisedRequestArray.BM_Branch_Name.toLowerCase().includes(RequestName.toLocaleLowerCase());

    });
  }

}
