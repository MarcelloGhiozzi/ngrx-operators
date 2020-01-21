import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { createAction, props, StoreModule } from '@ngrx/store';
import { addAction, addEffectMap, addSelectableEntity, addState, createEffectProvider, createEntityFeature, Monad, NgRxEffectsProvider } from 'projects/ngrx-operators/src/public-api';
import { OPERATORS } from './workspace.operators';


export interface Operator {
    id: string;
    name?: string;
    description?: string;
    args?: Array<any>;
    function: ((...args: any) => (source: Monad<any>) => Monad<any>) | ((...args: any) => Monad<any>);
}

export const WorkspaceFeature = createEntityFeature('workpsace', {} as Operator).pipe(
    addSelectableEntity(),
    addAction({commit: createAction('[WORKSPACE] Commit Operator', props<{op: Operator}>())}),
    addState({toolbox: OPERATORS}),
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
