import { EntityState, EntityAdapter } from '@ngrx/entity';

export interface NgRxFeature {
    key: string;
    actions: {};
    state: {};
    adapter: {};
    selectors: {};
    reducer: {};
    effects: [];
}

export interface NgRxEntityFeature<T extends {}> extends NgRxFeature {
    state: EntityState<T>;
    adapter: EntityAdapter<T>;
    selectors: ReturnType<EntityAdapter<T>['getSelectors']>;
}

export type StateFromEntity<T extends NgRxEntityFeature<any>> =
    T['state'] extends NgRxEntityFeature<infer S> ? S : T['state'];

export type SideEffectAction<K extends string, T = any, S = any, F = any> = {
    [P in K]: {
        trigger: T,
        success: S,
        failure: F
    }
};


