import { createEntityAdapter } from '@ngrx/entity';
import { Monad } from '../monad';
import { NgRxFeature, NgRxEntityFeature } from '../types/ngrx.feature';
import { add } from './monad.operators';
import { addComposedSelector, addFeatureSelector } from './ngrx.operators.selector';
import { mutateState } from './ngrx.operators.state';
import { createSelector, createAction, props, createReducer, on } from '@ngrx/store';
import { addComposedActions } from './ngrx.operators.action';
import { addReducer } from './ngrx.operators.reducer';


/**
 * Create and add an entity Adapter using the current State
 */
export function createAdapter() {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            add({adapter: createEntityAdapter<T['state']>()}),
            addComposedSelector(feature => feature.adapter.getSelectors()),
        );
    };
}

/**
 * Make current Feature an Entity Feature using the current State,
 * creating an initial state and an Entity Adapter
 */
export function makeEntity() {
    return <T extends NgRxFeature = NgRxFeature>(source: Monad<T>) => {
        return source.pipe(
            createAdapter(),
            mutateState(createEntityAdapter<T['state']>().getInitialState(({...source.sample().state}))),
        );
    };
}


/**
 * Add a bunch of Utilities to the current Entity Feature including:
 * All & Entities Selectors,
 * Add, Update and Delete Actions and corresponding Reducers
 */
export function addEntityUtilities<S extends {id: string}>() {
    return <T extends NgRxEntityFeature<S>>(source: Monad<T>) => source.pipe(
        addFeatureSelector(),
        addComposedSelector(feature => ({
            all: createSelector(
                feature.selectors.featureSelector,
                (state) => feature.selectors.selectAll(state)
            ),
            entities: createSelector(
                feature.selectors.featureSelector,
                (state) => feature.selectors.selectEntities(state)
            ),
        })),
        addComposedActions(feature => ({
            addOne: createAction(
                `[${feature.key.toUpperCase()}] Add One`,
                props<{item: S}>()
            ),
            addMany: createAction(
                `[${feature.key.toUpperCase()}] Add Many`,
                props<{items: S[]}>()
            ),
            updateOne: createAction(
                `[${feature.key.toUpperCase()}] Update One`,
                props<{item: S}>()
            ),
            updateMany: createAction(
                `[${feature.key.toUpperCase()}] Update Many`,
                props<{items: S[]}>()
            ),
            deleteOne: createAction(
                `[${feature.key.toUpperCase()}] Delete One`,
                props<{item: S}>()
            ),
            deleteMany: createAction(
                `[${feature.key.toUpperCase()}] Delete Many`,
                props<{items: S[]}>()
            ),
        })),
        addReducer(feature => createReducer(feature.state,
            on(feature.actions.addOne,
                (state, {item}) => feature.adapter.addOne(item, state)),
            on(feature.actions.addMany,
                (state, {items}) => feature.adapter.addMany(items, state)),
            on(feature.actions.updateOne,
                (state, {item}) => feature.adapter.updateOne({id: item.id, changes: item}, state)),
            on(feature.actions.updateMany,
                (state, {items}) => feature.adapter.updateMany(items.map(item => ({id: item.id, changes: item})), state)),
            on(feature.actions.deleteOne,
                (state, {item}) => feature.adapter.removeOne(item.id, state)),
            on(feature.actions.deleteMany,
                (state, {items}) => feature.adapter.removeMany(items.map(item => item.id), state)),
        )),
    );
}

