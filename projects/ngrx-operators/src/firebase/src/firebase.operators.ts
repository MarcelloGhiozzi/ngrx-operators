import { Monad } from '../../lib/monad';
import { NgRxFeature, NgRxEntityFeature } from '../../lib/types/ngrx.feature';
import { addComposedActions, addEffect, addEffectMap, addReducer, addEntityUtilities, addActionlessEffect } from '../../lib/operators';
import { createAction, props, createReducer, on } from '@ngrx/store';
import { createEffect } from '@ngrx/effects';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';


export function syncWithFirebaseDocument(path: string) {
    return <T extends NgRxFeature>(source: Monad<T>) => source.pipe(
        addComposedActions(f => ({
            sync: createAction(`[${f.key.toUpperCase()}] Sync From Remote`, props<{state: T['state']}>())
        })),
        addReducer(f => createReducer(f.state, on(f.actions.sync, (state, action) => ({
            ...state,
            ...action
        })))),
        addEffect(f => (i, a) => createEffect(() => i.get(AngularFirestore).doc<T['state']>(path).valueChanges().pipe(
            map(state => f.actions.sync({state})))
        )),
    );
}

export function syncWithFirebaseCollection(path: string) {
    return <K extends {id: string}, T extends NgRxEntityFeature<K>>(source: Monad<T>) => source.pipe(
        addEntityUtilities(),
        addComposedActions(f => ({
            upload: createAction(`[${f.key.toUpperCase()}] Firebase Upload`, props<{items: K[]}>()),
            sync: createAction(`[${f.key.toUpperCase()}] Firebase Sync`, props<{items: K[]}>())
        })),
        addEffect(f => (i) => createEffect(() => i.get(AngularFirestore).collection<K>(path).valueChanges().pipe(
            map(items => f.actions.sync({items}))
        ))),
        addEffectMap(f => f.actions.sync, f => f.actions.uspsertMany, (x) => x),
        addActionlessEffect(f => f.actions.upload, f => i => s => s.pipe(
            switchMap(({items}) => {
               const ref = i.get(AngularFirestore).collection<K>(path);
               return merge(items.map(item => ref.add(item)));
            })
        ))
    );
}
