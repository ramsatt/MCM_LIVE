import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedsr'
})
export class SelectedsrPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
