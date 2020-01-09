import { ActionCreator, createAction, createReducer, createSelector, on, props } from '@ngrx/store';
import { Monad } from '../monad';
import { ID } from '../types/common';
import { NgRxEntityFeature, NgRxFeature } from '../types/ngrx.feature';
import { addComposedActions } from './ngrx.operators.action';
import { addReducer } from './ngrx.operators.reducer';
import { addComposedSelector, addFeatureSelector } from './ngrx.operators.selector';
import { addState } from './ngrx.operators.state';

/**
 * Extends the current Feature with Loading Feature.
 * @param ons Action that turn on the loading
 * @param offs Action that turn off the loading
 */
export function addLoading<T extends NgRxFeature = NgRxFeature>(
    onCreator: (f: T) => ActionCreator,
    offCreator: (f: T) => ActionCreator
) {
    return (source: Monad<T>) => source.pipe(
        addState({loading: false}),
        addFeatureSelector(),
        addComposedSelector(f => ({loading: createSelector(f.selectors.featureSelector, (state) => state.loading)})),
        addReducer((feature) => createReducer(
            feature.state,
            on(onCreator(source.sample()), (state) => ({
                    ...state,
                    loading: true
            })),
            on(offCreator(source.sample()), (state) => ({
                    ...state,
                    loading: false
            }))
        ))
    );
}

/**
 * Extend the current Feature with the Selection Feature.
 * This Operator will add the selected item in the State, the relative Selector and Actions
 * @param selected Default ID for the selected item
 */
export function addSelectableEntity<S>(selected: ID = null) {
    return <T extends NgRxEntityFeature<S>>(source: Monad<T>) => source.pipe(
        addState({selected}),
        addFeatureSelector(),
        addComposedActions(feature => ({
            select: createAction(
                `[${feature.key.toUpperCase()}] Select`,
                props<{id: ID}>()
            )
        })),
        addReducer(feature => createReducer(
            feature.state,
            on(feature.actions.select,
                (state, { id }) => ({
                    ...state,
                    selected: id
                })
            )
        )),
        addComposedSelector(feature => ({
            selected: createSelector(
                feature.selectors.featureSelector,
                (state) => state.entities && state.entities[state.selected]
            )
        }))
    );
}


