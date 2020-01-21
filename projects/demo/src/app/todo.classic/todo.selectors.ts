import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TodoAdapter } from './todo.state';

const { selectAll, selectEntities} = TodoAdapter.getSelectors();

export const featureSelector = createFeatureSelector('todo');
export const allSelector = createSelector(featureSelector, selectAll);
export const entitiesSelector = createSelector(featureSelector, selectEntities);

