import { NgModule, Injector } from '@angular/core';
import { RunnerComponent } from './runner.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule, Actions } from '@ngrx/effects';
import { AppModule } from 'projects/play/src/app/app.module';
import { NgRxEffectsProvider, createEffectProvider, FeatureEffects } from 'projects/ngrx-operators/src/public-api';
import { SharedModule } from '../shared/shared.module';
import { WorkspaceService } from '../core/workspace.builder';


@NgModule({})
export class RunnerModule {}


export class BuildEffectProvider extends NgRxEffectsProvider {}

export const build = () => {
  const feature = WorkspaceService.feature;
  console.log(feature);
  return NgModule({
    providers: [createEffectProvider(BuildEffectProvider, feature)],
    declarations: [RunnerComponent],
    imports: [
      SharedModule,
      StoreModule.forFeature(feature.key, feature.reducer),
      EffectsModule.forFeature([BuildEffectProvider]),
      RouterModule.forChild([{ path: '', component: RunnerComponent}]),
    ]
  })(RunnerModule);
};
