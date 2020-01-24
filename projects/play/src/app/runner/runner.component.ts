import { Component, OnInit } from '@angular/core';
import { AppModule } from 'projects/play/src/app/app.module';
import { Store } from '@ngrx/store';
import { WorkspaceService } from '../core/workspace.builder';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss']
})
export class RunnerComponent {


  public feature = WorkspaceService.feature;

  public payload: string;

  public actions = Object.keys(this.feature.actions).map(name => ({
    name,
    action: this.feature.actions[name]
  }));

  constructor(private store: Store<any>) {}

  dispatch(action) {
    const trigger = typeof action === 'function' ? action : action.trigger;
    this.store.dispatch(trigger(JSON.parse(this.payload)));
  }

}
