import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./workspace/workspace.module').then(m => m.WorkspaceModule)
  },
  {
    path: 'runner',
    loadChildren: () => import('./runner/runner.module').then(m => m.build())
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
