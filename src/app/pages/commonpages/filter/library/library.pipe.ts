import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'library'
})
export class LibraryPipe implements PipeTransform {

  transform(libraryfilterarr: any, libfil_name?: any): any {
    if( libfil_name === undefined) return libraryfilterarr;

    return libraryfilterarr.filter(function (Libraryfilterarr)
    {
      return Libraryfilterarr.LM_Name.toLowerCase().includes(libfil_name.toLocaleLowerCase())|| Libraryfilterarr.LM_Description.toLowerCase().includes(libfil_name.toLocaleLowerCase());


    })
  }

}
