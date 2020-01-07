import { Monad } from '../monad';
import { addEntityUtilities, makeEntity } from '../operators/ngrx.operators.entity';
import { addFeatureSelector } from '../operators/ngrx.operators.selector';
import { addKey, mutateState } from '../operators/ngrx.operators.state';
import { ID } from '../types/common';


export function createNgRxFeature<K extends string>(key: K) {
    return new Monad({
        key: '',
        actions: {},
        state: {},
        adapter: {},
        selectors: {},
        reducer: {},
        effects: [],
    }).pipe(
        addKey(key),
        addFeatureSelector(),
    );
}

export function createEntityFeature<T extends {id: ID}, K extends string>(key: K, state?: T) {
    return createNgRxFeature(key).pipe(
        mutateState({} as T),
        makeEntity(),
        addFeatureSelector(),
        addEntityUtilities()
    );
}


