import { Component, OnInit } from '@angular/core';
import { InputArg } from '../input-arg/input-arg.directive';
import { WorkspaceFeature } from '../../core/workspace.feature';
import { WorkspaceService } from '../../core/workspace.builder';

@Component({
  selector: 'app-input-action',
  templateUrl: './input-action.component.html',
  styleUrls: ['./input-action.component.scss']
})
export class InputActionComponent extends InputArg implements OnInit {

  feature = WorkspaceService.feature;
  actions = Object.keys(this.feature.actions).map(action => ({
    name: action,
    value: this.feature.actions[action]
  }));

  ngOnInit() {
  }

}
