import { Component, OnInit, ComponentFactoryResolver, Input, ViewChild } from '@angular/core';
import { BlockNames, Block } from '../../core/workspace.operators';
import { CreateFeatureComponent } from '../blocks/create-feature/create-feature.component';
import { BlockDirective } from './block.directive';
import { Store, select } from '@ngrx/store';
import { WorkspaceFeature } from '../../core/workspace.feature';
import { map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mapObject } from '../../core/utils';

export const BlockComponents = {
  [BlockNames.CreateFeature]: CreateFeatureComponent
};

@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() block: Block;
  @Input() committed = false;
  @ViewChild(BlockDirective, {static: true}) host: BlockDirective;

  form: FormGroup;
  metadata = this.store.pipe(
    select(WorkspaceFeature.selectors.toolbox),
    map(ops => ops.find(op => op.tag === this.block.tag)),
    map(block => ({
      ...block,
      args: Object.keys(block.args).map(name => ({
        name,
        type: block.args[name].type
      }))
    }))
  );

  constructor(
    private store: Store<any>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    // this.form = new FormGroup(mapObject(this.block.args, val => new FormControl('', Validators.required)));
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BlockComponents[this.name]);
    // const viewContainerRef = this.host.viewContainerRef;
    // viewContainerRef.createComponent(componentFactory);
  }

  commit() {

  }

}
