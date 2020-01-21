import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { addEffectMap, addSelectableEntity, addSideEffect, createEffectProvider, createEntityFeature, NgRxEffectsProvider } from 'projects/ngrx-operators/src/public-api';
import { map } from 'rxjs/operators';
import { Todo } from '../model';


export const TodoFeature = createEntityFeature('todos', {} as Todo).pipe(
    addSelectableEntity(),
    addSideEffect('load', (_, i) => i.get(HttpClient).get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
        map(result => ({result}))
    )),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, ({result}) => ({items: result})),
).sample();


export class TodoEffectsProvider extends NgRxEffectsProvider {}
@NgModule({
    providers: createEffectProvider(TodoEffectsProvider, TodoFeature),
    imports: [
        StoreModule.forFeature(TodoFeature.key, TodoFeature.reducer),
        EffectsModule.forFeature([TodoEffectsProvider])
    ]
})
export class TodoFeatureModule {}


