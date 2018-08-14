import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'solution'
})
export class SolutionPipe implements PipeTransform {

  transform(SolutionsArray: any, sol_name?: any): any {
    if ( sol_name === undefined ) return SolutionsArray;
    return SolutionsArray.filter(function (solutionsArray)
    {
      return solutionsArray.SOM_Solution.toLowerCase().includes(sol_name.toLocaleLowerCase());
    });
  }

}
