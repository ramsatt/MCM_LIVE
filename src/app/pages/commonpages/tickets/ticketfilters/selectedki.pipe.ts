import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedki'
})
export class SelectedkiPipe implements PipeTransform {

  transform(KnownIssuesArray: any, knownissue?: any): any {
      if ( knownissue === undefined ) return KnownIssuesArray;
      return KnownIssuesArray.filter(function (knownIssuesArray)
      {
          return knownIssuesArray.TKIM_Known_Issue.toLowerCase().includes(knownissue.toLocaleLowerCase());
      });
  }

}
