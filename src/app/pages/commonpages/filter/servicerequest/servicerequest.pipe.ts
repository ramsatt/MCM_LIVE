import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'servicerequest'
})
export class ServicerequestPipe implements PipeTransform {

  transform(ServiceRequestArray: any, RequestName?: any): any {
    if ( RequestName === undefined ) return ServiceRequestArray;
    return ServiceRequestArray.filter(function (serviceRequestArray)
    {
      return serviceRequestArray.SRM_Name.toLowerCase().includes(RequestName.toLocaleLowerCase());
    });
  }

}
