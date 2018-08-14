import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'useroverview'
})
export class UseroverviewPipe implements PipeTransform {

    transform(useroverviewarray: any, useroverview?: any): any {
        if( useroverview === undefined) return useroverviewarray;

        return useroverviewarray.filter(function (Useroverview)
        {
            return Useroverview.UM_First_Name.toLowerCase().includes(useroverview.toLocaleLowerCase())
                ;


        })
    }

}
