import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unassignedki'
})
export class UnassignedkiPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
