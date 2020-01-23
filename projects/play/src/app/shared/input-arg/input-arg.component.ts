import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { BlockArgs } from '../../core/workspace.operators';
import { InputStringComponent } from '../input-string/input-string.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { InputObjectComponent } from '../input-object/input-object.component';
import { InputActionComponent } from '../input-action/input-action.component';
import { InputArgDirective } from './input-arg.directive';


export const ArgComponents = {
  [BlockArgs.String]: InputStringComponent,
  [BlockArgs.Number]: InputNumberComponent,
  [BlockArgs.Object]: InputObjectComponent,
  [BlockArgs.Action]: InputActionComponent
};

@Component({
  selector: 'app-input-arg',
  templateUrl: './input-arg.component.html',
  styleUrls: ['./input-arg.component.scss']
})
export class InputArgComponent implements OnInit {

  @ViewChild(InputArgDirective, {static: true}) host: InputArgDirective;
  @Input() arg: {
    name: string,
    type: BlockArgs
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ArgComponents[this.arg.type]);
    const viewContainerRef = this.host.viewContainerRef;
    viewContainerRef.createComponent(componentFactory);
  }

}
