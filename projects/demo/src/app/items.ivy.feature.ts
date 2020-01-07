import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { Dictionary } from '@ngrx/entity';
import { StoreModule } from '@ngrx/store';
import { addEffectMap, addSelectableEntity, addSideEffect, createEffectProvider, createEntityFeature, createFeatureModule, createNgRxFeature, addAction, addReducer, addState } from 'projects/ngrx-monad/src/public-api';
import { Todo } from './model';


export const ItemsFeature = createEntityFeature('items', {} as Todo).pipe(
    addSelectableEntity(null),
    addSideEffect('load', (_, i) => i.get(HttpClient).get<Dictionary<Todo>>('https://jsonplaceholder.typicode.com/todos')),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, (todos) => ({items: Object.values(todos)})),
).sample();


export class ItemsEffectsProvider {}
export const { id, providers, imports } = createFeatureModule(ItemsEffectsProvider, ItemsFeature);

@NgModule({
    providers: createEffectProvider(ItemsEffectsProvider, ItemsFeature),
    imports: [
        StoreModule.forFeature(ItemsFeature.key, ItemsFeature.reducer),
        EffectsModule.forFeature([ItemsEffectsProvider])
    ]
})
export class ItemsFeatureModule {}

