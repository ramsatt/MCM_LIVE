import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'models'
})
export class ModelsPipe implements PipeTransform {

  transform(ModelsArray: any, model_name?: any): any {
    if (model_name === undefined) return ModelsArray;
    return ModelsArray.filter(function (modelArray) {
      return modelArray.MM_Model_Name.toLowerCase().includes(model_name.toLocaleLowerCase())||modelArray.MM_Description.toLowerCase().includes(model_name.toLocaleLowerCase())||modelArray.MM_KeyID.toLowerCase().includes(model_name.toLocaleLowerCase());
    })
  }

}
