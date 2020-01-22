import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { WorkspaceFeature, Operator } from '../core/workspace.feature';

export const mapObject = (object: object, f: (value: any) => any) => {
  const r = {};
  Object.keys(object).forEach(key => {
    r[key] = f(object[key]);
  });
  return r;
};

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {


  toolbox = this.store.pipe(select(WorkspaceFeature.selectors.toolbox));
  feature = this.store.pipe(select(WorkspaceFeature.selectors.all));

  constructor(
    private router: Router,
    private store: Store<any>
  ) {   }

  build() {
    this.router.navigateByUrl('/runner');
  }

  commit(op: Operator) {
    this.store.dispatch(WorkspaceFeature.actions.commit({op}));
  }

}


