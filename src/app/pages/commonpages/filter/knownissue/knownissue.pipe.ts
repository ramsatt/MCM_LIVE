import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'knownissue'
})
export class KnownissuePipe implements PipeTransform {

  transform(KnownIssuesArray: any, known_issue?: any): any {
    if ( known_issue === undefined ) return KnownIssuesArray;
    return KnownIssuesArray.filter(function (knownIssuesArray)
    {
      return knownIssuesArray.KIM_Known_Issue.toLowerCase().includes(known_issue.toLocaleLowerCase());
    });
  }

}
