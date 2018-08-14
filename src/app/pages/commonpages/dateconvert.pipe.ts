import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconvert'
})
export class DateconvertPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return new Date(value.replace(/-/g, "/"));
  }

}
