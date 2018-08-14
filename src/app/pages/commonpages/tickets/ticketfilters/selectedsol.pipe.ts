import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedsol'
})
export class SelectedsolPipe implements PipeTransform {

  transform(SolutionArray: any, sol_name?: any): any {
      if ( sol_name === undefined ) return SolutionArray;
      return SolutionArray.filter(function (solArray)
      {
          return solArray.TSOM_Solution.toLowerCase().includes(sol_name.toLocaleLowerCase());
      });
  }

}
