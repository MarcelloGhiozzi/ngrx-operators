import { Component, Input, OnDestroy, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription, fromEvent, interval } from 'rxjs';
import { map, takeUntil, switchMap } from 'rxjs/operators';
import { WorkspaceFeature } from '../../core/workspace.feature';
import { Block } from '../../core/workspace.operators';
import { mapObject } from '../../core/workspace.utils';


@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit, OnDestroy {

  @Input() block: Block;
  @Input() committed = false;

  sub: Subscription = new Subscription();
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
    private element: ElementRef,
    private store: Store<any>,
  ) { }

  ngOnInit() {
    this.form = new FormGroup(mapObject(this.block.args, val => new FormControl(val.value, Validators.required)));
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  commit() {
    const form = this.form.getRawValue();
    this.store.dispatch(WorkspaceFeature.actions.commit({block: ({
      ...this.block,
      args: mapObject(this.block.args, (value, key) => ({
        ...value,
        value: form[key]
      }))
    })}));
  }

}
