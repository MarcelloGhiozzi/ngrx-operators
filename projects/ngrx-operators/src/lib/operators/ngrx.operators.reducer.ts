import { NgRxFeature } from '../types/ngrx.feature';
import { Monad } from '../monad';
import { add } from './monad.operators';


/**
 * Merge another Reducer to the current Feature
 * @param creator Function that returns a Reducer given the current Feature
 */
export function addReducer<
    T extends NgRxFeature = NgRxFeature,
    V extends any = any
>(creator: (source: T) => V) {
    return (source: Monad<T>) => {
        const reducer = source.sample().reducer;
        const next = creator(source.sample());
        return source.pipe(
            add({
                reducer: typeof reducer === 'function' ? (state, action) =>  {
                    return next(reducer(state, action), action);
                }  : next
            })
        );
    };
}
