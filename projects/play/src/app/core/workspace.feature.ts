import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createAction, props, StoreModule, createSelector } from '@ngrx/store';
import { addAction, addEffectMap, addSelectableEntity, addState, createEffectProvider, createEntityFeature, NgRxEffectsProvider, addComposedSelector } from 'projects/ngrx-operators/src/public-api';
import { BLOCKS } from './workspace.operators';


export interface Operator {
    id: string;
    name?: string;
    description?: string;
}

export const WorkspaceFeature = createEntityFeature('workpsace', {} as Operator).pipe(
    addSelectableEntity(),
    addState({toolbox: BLOCKS}),
    addAction({commit: createAction('[WORKSPACE] Commit Operator', props<{op: Operator}>())}),
    addComposedSelector(f => ({toolbox: createSelector(f.selectors.featureSelector, (state) => state.toolbox)})),
    addEffectMap(f => f.actions.commit, f => f.actions.addOne, commit => ({item: commit.op}))
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
