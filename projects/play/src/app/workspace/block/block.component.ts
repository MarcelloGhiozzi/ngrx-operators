import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { mapObject } from '../../core/utils';
import { WorkspaceFeature } from '../../core/workspace.feature';
import { Block, BlockNames } from '../../core/workspace.operators';


@Component({
  selector: 'block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {

  @Input() block: Block;
  @Input() committed = false;

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
  ) { }

  ngOnInit() {
    this.form = new FormGroup(mapObject(this.block.args, val => new FormControl(val.value, Validators.required)));
  }

  commit() {

  }

}
