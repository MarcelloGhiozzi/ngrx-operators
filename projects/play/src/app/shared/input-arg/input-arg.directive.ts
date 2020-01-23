import { Directive, ViewContainerRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Directive({
  selector: '[input-host]'
})
export class InputArgDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}


export class InputArg {

  @Input() name: string;
  @Input() control: FormControl;

}
