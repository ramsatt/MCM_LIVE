import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedimg'
})
export class SelectedimgPipe implements PipeTransform {

  transform(ImageArray: any, imgName?: any): any {
      if ( imgName === undefined ) return ImageArray;
      return ImageArray.filter(function (imageArray)
      {
          return imageArray.TIPDFM_Name.toLowerCase().includes(imgName.toLocaleLowerCase());
      });
  }

}
