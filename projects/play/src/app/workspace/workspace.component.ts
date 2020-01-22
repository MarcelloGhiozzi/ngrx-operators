import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { createAction } from '@ngrx/store';
import { addAction, addReducer, addState, createNgRxFeature } from 'projects/ngrx-operators/src/public-api';
import { AppModule } from 'projects/play/src/app/app.module';

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

  key = 'build';
  stateJSON: string;
  actionJSON: string;

  constructor(
    private router: Router
  ) { }

  build() {
    AppModule.feature = createNgRxFeature(this.key).pipe(
      addReducer(f => (state) => state),
      addState(JSON.parse(this.stateJSON)),
      addAction(mapObject(JSON.parse(this.actionJSON), type => createAction(type))),
    ).sample();
    this.router.navigateByUrl('/runner');
  }

}


