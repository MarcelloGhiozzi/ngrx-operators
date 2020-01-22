import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[block-host]',
})
export class BlockDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
