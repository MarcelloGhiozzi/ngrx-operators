import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createAction, props, StoreModule, createSelector, Store, select } from '@ngrx/store';
import { addAction, addEffectMap, addSelectableEntity, addState, createEffectProvider, createEntityFeature, NgRxEffectsProvider, addComposedSelector, addActionlessEffect, addHttpEffect } from 'projects/ngrx-operators/src/public-api';
import { BLOCKS, Block } from './workspace.operators';
import { switchMap, take, tap, map } from 'rxjs/operators';
import { sampleFeature, WorkspaceService } from './workspace.builder';
import { Router } from '@angular/router';


export const WorkspaceFeature = createEntityFeature('workpsace', {} as Block).pipe(
    addSelectableEntity(),
    addState({toolbox: BLOCKS}),
    addAction({
        commit: createAction('[WORKSPACE] Commit Block', props<{block: Block}>()),
        sample: createAction('[WORKSPACE] Sample Feature'),
        run: createAction('[WORKSPACE] Run Feature')
    }),
    addComposedSelector(f => ({toolbox: createSelector(f.selectors.featureSelector, (state) => Object.values(state.toolbox))})),
    addEffectMap(f => f.actions.commit, f => f.actions.uspsertOne, commit => ({item: commit.block})),
    addEffectMap(f => f.actions.commit, f => f.actions.sample, commit => ({})),
    addActionlessEffect(f => f.actions.sample, f => (inj) => (obs) => obs.pipe(
        switchMap(() => inj.get(Store).pipe(
            select(f.selectors.all),
            take(1),
            map(blocks => sampleFeature(blocks)),
            tap(feature => inj.get(WorkspaceService).mountFeature(feature)),
        ))
    )),
    addActionlessEffect(f => f.actions.run, () => (inj) => (obs) => obs.pipe(
        tap(() => inj.get(Router).navigateByUrl('/runner'))
    ))
).sample();



export class WorkspaceEffects extends NgRxEffectsProvider {}

@NgModule({
    providers: [createEffectProvider(WorkspaceEffects, WorkspaceFeature)],
    imports: [
        StoreModule.forFeature(WorkspaceFeature.key, WorkspaceFeature.reducer),
        EffectsModule.forFeature([WorkspaceEffects])
    ]
})
export class WorkspaceModule {}
