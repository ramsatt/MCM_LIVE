import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valuelist'
})
export class ValuelistPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
