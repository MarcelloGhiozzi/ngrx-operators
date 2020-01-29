import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { WorkspaceFeature } from '../core/workspace.feature';
import { Block } from '../core/workspace.operators';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {


  toolbox = this.store.pipe(select(WorkspaceFeature.selectors.toolbox));
  start = this.store.pipe(select(WorkspaceFeature.selectors.start));
  pipe = this.store.pipe(select(WorkspaceFeature.selectors.pipe));

  constructor(
    private router: Router,
    private store: Store<any>
  ) {   }

  build() {
    this.router.navigateByUrl('/runner');
  }

  sample() {
    this.store.dispatch(WorkspaceFeature.actions.sample());
    this.store.dispatch(WorkspaceFeature.actions.run());
  }

  commit(block: Block) {
    this.store.dispatch(WorkspaceFeature.actions.commit({block: {
      ...block,
      id: block.id || Date.now().toString()
    }}));
  }

  trackBy(block: Block) {
    return block.id + block.tag;
  }

}


