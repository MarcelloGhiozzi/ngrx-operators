import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { BlockNames } from '../../core/workspace.operators';
import { CreateFeatureComponent } from '../blocks/create-feature/create-feature.component';
import { BlockDirective } from './block.directive';
import { Store, select } from '@ngrx/store';
import { WorkspaceFeature } from '../../core/workspace.feature';
import { map } from 'rxjs/operators';

export const BlockComponents = {
  [BlockNames.CreateFeature]: CreateFeatureComponent
};

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() name: BlockNames;
  @Input() committed = false;
  @ViewChild(BlockDirective, {static: true}) host: BlockDirective;

  metadata = this.store.pipe(
    select(WorkspaceFeature.selectors.toolbox),
    map(ops => ops.find(op => op.id === this.name))
  );

  constructor(
    private store: Store<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BlockComponents[this.name]);
    // const viewContainerRef = this.host.viewContainerRef;
    // viewContainerRef.createComponent(componentFactory);
  }

}
