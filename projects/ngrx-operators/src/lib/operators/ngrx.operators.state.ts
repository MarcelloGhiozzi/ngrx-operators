import { NgRxFeature } from '../types/ngrx.feature';
import { Monad } from '../monad';
import { add, set } from './monad.operators';

/**
 * Add a Key under which the current Feature will be set in the Store
 * @param key String literal of the Key
 */
export function addKey<K extends string = string>(key: K) {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            add({key})
        );
    };
}

/**
 * Augment the current Feature State with the given object
 * @param state Initial state of the new State slice added to the Feature
 */
export function addState<V extends any = any>(state: V) {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            add({state: {
                ...source.sample().state as T['state'],
                ...state
            }})
        );
    };
}

/**
 * Mutate the current state, overriding any previously defined State
 * @param state Initial state of the new State set on the Feature
 */
export function mutateState<V extends any = any>(state: V) {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            set('state', state)
        );
    };
}
