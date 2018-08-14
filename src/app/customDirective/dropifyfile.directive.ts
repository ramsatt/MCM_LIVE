import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDropifyfile]'
})
export class DropifyfileDirective {
    constructor(private el: ElementRef) {
  }

}
