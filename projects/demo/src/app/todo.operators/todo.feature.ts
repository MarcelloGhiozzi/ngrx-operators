import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { addSelectableEntity, addSwitchEffect, createEffectProvider, createEntityFeature, NgRxEffectsProvider, addEffectMap, addHttpEffect, addComposedActions } from 'projects/ngrx-operators/src/public-api';
import { map } from 'rxjs/operators';
import { Todo } from '../model';
import { AngularFireModule } from '@angular/fire';
import { syncWithFirebaseCollection } from 'projects/ngrx-operators/src/firebase/src/public_api';
import { AngularFirestoreModule } from '@angular/fire/firestore';


export const TodoFeature = createEntityFeature('todos', {} as Todo).pipe(
    addSelectableEntity(),
    addSwitchEffect('load', (i) => i.get(HttpClient).get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
        map(result => ({result}))
    )),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, ({result}) => ({items: result})),
    syncWithFirebaseCollection('/todos'),
    addEffectMap(f => f.actions.load.success, (f) => f.actions.upload, ({result}) => ({items: result}))
).sample();


export class TodoEffectsProvider extends NgRxEffectsProvider {}
@NgModule({
    providers: createEffectProvider(TodoEffectsProvider, TodoFeature),
    imports: [
        AngularFireModule,
        AngularFirestoreModule,
        StoreModule.forFeature(TodoFeature.key, TodoFeature.reducer),
        EffectsModule.forFeature([TodoEffectsProvider])
    ]
})
export class TodoFeatureModule {}


