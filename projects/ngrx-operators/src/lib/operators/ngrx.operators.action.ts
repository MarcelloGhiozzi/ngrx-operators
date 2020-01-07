import { ActionCreator, createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Monad } from '../monad';
import { KeyValue } from '../types/common';
import { SideEffectAction } from '../types/ngrx.feature';
import { NgRxFeature } from '../types/ngrx.feature';
import { add } from './monad.operators';



/**
 * Add a named Action to the current Feature
 * @param actions Object containing Action names as keys and Action creators as values
 */
export function addAction<
    T extends NgRxFeature = NgRxFeature,
    V extends any = any
>(actions: V) {
    return (source: Monad<T>) => source.pipe(
        add({actions: {
            ...source.sample().actions as T['actions'],
            ...actions
        }})
    );
}

/**
 * Add a named Action to the current Feature, given the current Feature
 * @param creator Function that return an Object containing Action names as keys and Action creators as values,
 * given the current Feature
 */
export function addComposedActions<
    T extends NgRxFeature = NgRxFeature,
    V extends any = any
>(creator: (feature: T) => V) {
    return (source: Monad<T>) => source.pipe(
        addAction(creator(source.sample()))
    );
}

/**
 * Helper operator used by addSideEffectActions to achieve strict typing
 */
export function addSideEffectAction<
    K extends string,
    V extends SideEffectAction<K>,
    T extends NgRxFeature = NgRxFeature,
>(creator: (feature: T) => V) {
    return (source: Monad<T>) => {
        return source.pipe(
            addComposedActions(creator)
        );
    };
}

/**
 * Create a set of Side Effect Actions given a name.
 * This operator will add Trigger, Success and Failure Action
 * @param name Name of the Side Effect Action
 */
export function addSideEffectActions<
    K extends string,
    T extends {} = {},
    S extends {} = {},
    E extends {} = {},
>(name: K) {
    return <F extends NgRxFeature = NgRxFeature>(source: Monad<F>) => {
        return source.pipe(
            addSideEffectAction(feature => {
                const action = {
                    [name]: {
                        trigger: createAction(
                            `[${feature.key.toUpperCase()}] ${name} Trigger`,
                            props<T>()
                        ),
                        success: createAction(
                            `[${feature.key.toUpperCase()}] ${name} Success`,
                            props<S>()
                        ),
                        failure: createAction(
                            `[${feature.key.toUpperCase()}] ${name} Failure`,
                            props<E>()
                        )
                    }
                };
                return action as KeyValue<K, {
                    trigger: ActionCreator<string, (prop: T) => TypedAction<string> & T>
                    success: ActionCreator<string, (prop: S) => TypedAction<string> & S>
                    failure: ActionCreator<string, (prop: E) => TypedAction<string> & E>
                }>;
            })
        );
    };
}

