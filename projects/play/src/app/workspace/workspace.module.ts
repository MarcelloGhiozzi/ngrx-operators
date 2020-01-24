import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlockDirective } from './block/block.directive';
import { BlockComponent } from './block/block.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [WorkspaceComponent, BlockDirective, BlockComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{path: '', component: WorkspaceComponent}])
  ]
})
export class WorkspaceModule { }
