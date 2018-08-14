import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mailcontent'
})

export class MailcontentPipe implements PipeTransform {

  transform(emcarray: any, emailContent?: any): any {
    if( emailContent === undefined) return emcarray;
    return emcarray.filter(function (emcarray)
    {
      return emcarray.TSM_Status.toLowerCase().includes(emailContent.toLocaleLowerCase())||
          emcarray.role.toLowerCase().includes(emailContent.toLocaleLowerCase())||
          emcarray.ECM_Subject.toLowerCase().includes(emailContent.toLocaleLowerCase());
    })
  }

}
