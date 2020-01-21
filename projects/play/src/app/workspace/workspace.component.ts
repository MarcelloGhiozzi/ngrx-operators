import { Component, OnInit } from '@angular/core';
import { KeeperService } from '../core/keeper.service';
import { createNgRxFeature, addState, addReducer } from 'projects/ngrx-operators/src/public-api';
import { Router } from '@angular/router';
import { AppModule } from 'projects/play/src/app/app.module';
import { createReducer } from '@ngrx/store';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {

  key = 'build';
  stateJSON: string;

  constructor(
    private router: Router
  ) { }

  build() {
    AppModule.keeper.build = createNgRxFeature(this.key).pipe(
      addReducer(f => (state) => state),
      addState(JSON.parse(this.stateJSON))
    ).sample();
    this.router.navigateByUrl('/runner');
  }

}
