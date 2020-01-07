import { HttpClient } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { Dictionary } from '@ngrx/entity';
import { StoreModule } from '@ngrx/store';
import { addEffectMap, addSideEffect } from 'projects/ngrx-monad/src/lib/operators/ngrx.operators.effect';
import { NgRxEffectsProvider } from 'projects/ngrx-monad/src/lib/types/ngrx.effects';
import { addSelectableEntity, createEntityFeature } from 'projects/ngrx-monad/src/public-api';

export const ItemsKey = 'todo';                                                // TO REMOVE
export interface Todo {id: string; title: string; }                             // TO REMOVE

export const ItemsFeature = createEntityFeature('items', {} as Todo).pipe(
    addSelectableEntity(null),
    addSideEffect('load', (_, i) => i.get(HttpClient).get<Dictionary<Todo>>('https://jsonplaceholder.typicode.com/todos')),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, (todos) => ({items: Object.values(todos)})),
).sample();


export function ItemsReducer(state, action) {                                   // TO REMOVE
    return ItemsFeature.reducer(state, action);                                 // TO REMOVE
}                                                                               // TO REMOVE

export class ItemsEffects extends NgRxEffectsProvider {}                        // TO REMOVE
export class ItemsEffectsProvider {}                                            // TO REMOVE

// @dynamic
@NgModule({
    providers: [{                                                               // TO REMOVE
        provide: ItemsEffectsProvider,                                          // TO REMOVE
        useFactory: (i, a) => new ItemsEffects(i, a, ItemsFeature.effects),     // TO REMOVE
        deps: [Injector, Actions],                                              // TO REMOVE
    }],                                                                         // TO REMOVE
    imports: [
        StoreModule.forFeature(ItemsKey, ItemsReducer),
        EffectsModule.forFeature([ItemsEffectsProvider])
    ]
})
export class ItemsFeatureModule {}
