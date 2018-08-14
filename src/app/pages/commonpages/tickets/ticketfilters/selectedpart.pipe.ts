import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedpart'
})
export class SelectedpartPipe implements PipeTransform {
  transform(PartArray: any, part_name?: any): any {
      if ( part_name === undefined ) return PartArray;
      return PartArray.filter(function (partArray)
      {
          return partArray.PM_Part_Name.toLowerCase().includes(part_name.toLocaleLowerCase());
      });
  }
}
