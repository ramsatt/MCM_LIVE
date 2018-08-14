import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instruction'
})
export class InstructionPipe implements PipeTransform {

  transform(InstructionArray: any, instruction_name?: any): any {
    if ( instruction_name === undefined) return InstructionArray;
    return InstructionArray.filter(function (instructionArray)
    {
      return instructionArray.ILM_Name.toLowerCase().includes(instruction_name.toLocaleLowerCase());
    });
  }
}
