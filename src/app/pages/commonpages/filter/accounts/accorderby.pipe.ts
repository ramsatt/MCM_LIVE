import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accorderby'
})
export class AccorderbyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
