import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assignedki'
})
export class AssignedkiPipe implements PipeTransform {

  transform(KnownIssuesArray: any, knownissue?: any): any {
      if ( knownissue === undefined ) return KnownIssuesArray;
      return KnownIssuesArray.filter(function (knownIssuesArray)
      {
          return knownIssuesArray.AKIM_Name.includes(knownissue);
      });
  }

}
