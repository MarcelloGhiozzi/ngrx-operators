import { Component, OnInit } from '@angular/core';
import { AppModule } from 'projects/play/src/app/app.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-runner',
  templateUrl: './runner.component.html',
  styleUrls: ['./runner.component.scss']
})
export class RunnerComponent {


  public feature = AppModule.keeper.build;

  public payload: string;

  public actions = Object.keys(this.feature.actions).map(name => ({
    name,
    action: this.feature.actions[name]
  }));

  constructor(private store: Store<any>) { }

  dispatch(action) {
    const args = JSON.parse(this.payload);
    this.store.dispatch(action(args));
  }

}
