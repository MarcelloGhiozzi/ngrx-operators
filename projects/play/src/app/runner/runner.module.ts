import { NgModule } from '@angular/core';
import { RunnerComponent } from './runner.component';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppModule } from 'projects/play/src/app/app.module';
import { NgRxEffectsProvider, createEffectProvider } from 'projects/ngrx-operators/src/public-api';
import { SharedModule } from '../shared/shared.module';


@NgModule({})
export class RunnerModule {}


export class BuildEffectProvider extends NgRxEffectsProvider {}

export const build = () => {
  const feature = AppModule.keeper.build;
  console.log(feature);
  return NgModule({
    providers: [createEffectProvider(BuildEffectProvider, feature)],
    declarations: [RunnerComponent],
    imports: [
      SharedModule,
      RouterModule.forChild([{ path: '', component: RunnerComponent}]),
      StoreModule.forFeature(feature.key, feature.reducer),
      EffectsModule.forFeature([])
    ]
  })(RunnerModule);
};
