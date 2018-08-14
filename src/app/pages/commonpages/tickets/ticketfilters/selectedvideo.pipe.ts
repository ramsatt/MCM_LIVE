import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selectedvideo'
})
export class SelectedvideoPipe implements PipeTransform {
  transform(VideoArray: any, videoName?: any): any {
      if ( videoName === undefined ) return VideoArray;
      return VideoArray.filter(function (videoArray)
      {
          return videoArray.TGGIPDF_Name.toLowerCase().includes(videoName.toLocaleLowerCase());
      });
  }
}
