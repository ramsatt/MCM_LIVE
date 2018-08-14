import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedins'
})
export class SelectedinsPipe implements PipeTransform {

  transform(InsArray: any, insname?: any): any {
          if ( insname === undefined ) return InsArray;
          return InsArray.filter(function (insArray)
          {
              return insArray.TIM_Name.toLowerCase().includes(insname.toLocaleLowerCase());
          });
  }

}
