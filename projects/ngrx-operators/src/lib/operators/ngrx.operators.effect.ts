import { NgRxFeature } from '../types/ngrx.feature';
import { Monad } from '../monad';
import { Injector } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, concat } from 'rxjs';
import { switchMap, map, catchError, concatMap, mergeMap, exhaustMap } from 'rxjs/operators';
import { addSideEffectActions } from './ngrx.operators.action';
import { ActionCreator } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { HttpClient } from '@angular/common/http';

/**
 * Add an Effect to the current feature given the current Feature, an Injector and the Actions observable
 * @param creator Function that given the current Feature returns a function that, given Injector and Actions, returns the Effect
 */
export function addEffect<T extends NgRxFeature>(creator: (f: T) => (injector: Injector, actions: Actions) => Observable<any>) {
    return (source: Monad<T>) => new Monad<T>({
        ...source.sample(),
        effects: [...source.sample().effects, creator(source.sample())]
    });
}

/**
 * Add a complete Side Effect to the current Feature, with a Trigger, Success and Failure Actions
 * @param action Name of the Side Effect action
 * @param c Function that given an Injector and Actions returns the Effect
 */
export function addSideEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: Injector) => (source: Observable<TypedAction<string> & T>) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffectActions<K, T, S, {}>(action),
        addEffect(f => (i, a) => createEffect(() => c(i)(a.pipe(
            ofType(f.actions[action].trigger),
        )).pipe(
            map(s => f.actions[action].success(s)),
            catchError(error => of(f.actions[action].failure(error)))
        )))
    );
}

export function addSwitchEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: Injector, t: T) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffect<K, T, S>(action, (i) => obs => obs.pipe(
            switchMap(t => c(i, t))
        ))
    );
}

export function addConcatEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: Injector, t: T) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffect<K, T, S>(action, (i) => obs => obs.pipe(
            concatMap(t => c(i, t))
        ))
    );
}


export function addExhaustEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: Injector, t: T) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffect<K, T, S>(action, (i) => obs => obs.pipe(
            exhaustMap(t => c(i, t))
        ))
    );
}


export function addMergeEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: Injector, t: T) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffect<K, T, S>(action, (i) => obs => obs.pipe(
            mergeMap(t => c(i, t))
        ))
    );
}



/**
 * Add an Effect that maps one Action to another Action
 * @param from Fuction that given the current Feature return the first Action Creator
 * @param to Fuction that given the current Feature return the mapped Action Creator
 * @param mapper Function that specify how to create target Action Props given the trigger Action Props
 */
export function addEffectMap<
    Z extends NgRxFeature,
    F,
    T
>(
    from: (feature: Z) => ActionCreator<string, (props: F) => TypedAction<string> & F>,
    to: (feature: Z) => ActionCreator<string, (props: T) => TypedAction<string> & T>,
    mapper: (from: F) => T
) {
    return (source: Monad<Z>) => source.pipe(
        addEffect(f => (_, a) => createEffect(() => a.pipe(
            ofType(from(f)),
            map(action => to(f)(mapper(action)))
        )))
    );
}

/**
 * Add an effect that start on a target Action but don't dispatch any Action
 * @param from Fuction that given the current Feature return the trigger Action Creator
 * @param pipe Fuction that given that Action observable return the actionless Effect
 */
export function addActionlessEffect<
    Z extends NgRxFeature,
    F
>(
    from: (feature: Z) => ActionCreator<string, (props: F) => TypedAction<string> & F>,
    pipe: (f: Z) => (i: Injector) => (observable: Observable<F>) => Observable<any>
) {
    return (source: Monad<Z>) => source.pipe(
        addEffect(f => (i, a) => createEffect(() => pipe(f)(i)(a.pipe(
            ofType(from(f))
        )), { dispatch: false }))
    );
}


export function addHttpEffect<
    K extends string,
    T extends {} = {},
    S extends {} = {},
>(action: K, c: (i: HttpClient) => (source: Observable<TypedAction<string> & T>) => Observable<S>) {
    return <F extends NgRxFeature>(source: Monad<F>) => source.pipe(
        addSideEffect<K, T, S>(action, i => c(i.get(HttpClient)))
    );
}
