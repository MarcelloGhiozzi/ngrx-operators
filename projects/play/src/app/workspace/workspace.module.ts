import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [WorkspaceComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: WorkspaceComponent}])
  ]
})
export class WorkspaceModule { }
