import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Dictionary } from '@ngrx/entity';
import { StoreModule } from '@ngrx/store';
import {
    addSelectableEntity,
    createEntityFeature,
    addEffectMap,
    addSideEffect,
    NgRxEffectsProvider
} from 'projects/ngrx-operators/src/public-api';

export const ItemsKey = 'todo';
export interface Todo {id: string; title: string; }

export const ItemsFeature = createEntityFeature('items', {} as Todo).pipe(
    addSelectableEntity(null),
    addSideEffect('load', (_, i) => i.get(HttpClient).get<Dictionary<Todo>>('https://jsonplaceholder.typicode.com/todos')),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, (todos) => ({items: Object.values(todos)})),
).sample();


export function ItemsReducer(state, action) {
    return ItemsFeature.reducer(state, action);
}

export class ItemsEffects extends NgRxEffectsProvider {}
export class ItemsEffectsProvider {}

export function EffectFactory(i, a) {
    return new ItemsEffects(i, a, ItemsFeature.effects);
}

// @dynamic
@NgModule({
    providers: [{
        provide: ItemsEffectsProvider,
        useFactory: EffectFactory,
        deps: [Injector, Actions],
    }],
    imports: [
        StoreModule.forFeature(ItemsKey, ItemsReducer),
        EffectsModule.forFeature([ItemsEffectsProvider])
    ]
})
export class ItemsFeatureModule {}
