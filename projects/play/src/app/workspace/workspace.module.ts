import { NgModule } from '@angular/core';
import { WorkspaceComponent } from './workspace.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { BlockDirective } from './block/block.directive';
import { BlockComponent } from './block/block.component';
import { CreateFeatureComponent } from './blocks/create-feature/create-feature.component';


export const BLOCKS = [
  CreateFeatureComponent
];

@NgModule({
  declarations: [WorkspaceComponent, BlockDirective, BlockComponent, ...BLOCKS],
  entryComponents: BLOCKS,
  imports: [
    SharedModule,
    RouterModule.forChild([{path: '', component: WorkspaceComponent}])
  ]
})
export class WorkspaceModule { }
