import { NgRxFeature } from '../types/ngrx.feature';
import { KeyValue } from '../types/common';
import { Monad } from '../monad';
import { add } from './monad.operators';
import { createFeatureSelector } from '@ngrx/store';


/**
 * Add a named Selectors to the current Feature
 * @param selectors Object containing Selectors names as keys and Selectors functions as values
 */
export function addSelector<V extends any = any>(selectors: V) {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            add({selectors: {
                ...source.sample().selectors as T['selectors'],
                ...selectors
            }})
        );
    };
}

/**
 * Add the Feature Selector to the current Feature, based on its Key
 */
export function addFeatureSelector() {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            addSelector({
                featureSelector: createFeatureSelector<KeyValue<T['key'], T['state']>, T['state']>(
                    source.sample().key as T['key']
                )
            })
        );
    };
}

/**
 * Add a named Selector to the current Feature, given the current Feature
 * @param creator Function that return an Object containing Selectors names as keys and Selectors functions as values,
 * given the current Feature
 */
export function addComposedSelector<
    T extends NgRxFeature = NgRxFeature,
    V extends any = any,
>(creator: (source: T) => V) {
    return (source: Monad<T>) => {
        return source.pipe(
            addSelector(creator(source.sample()))
        );
    };
}
