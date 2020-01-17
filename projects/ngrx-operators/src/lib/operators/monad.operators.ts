import { Monad } from '../monad';
import { Omit, KeyValue} from '../types/common';

/**
 * Basic monad operator, spread n to the internal State
 * @param v The object to merge in the Monad
 */
export function add<V extends any = any>(v: V) {
    return <T>(source: Monad<T>) => {
        return new Monad<T & V>({
            ...source.sample(),
            ...v
        });
    };
}

/**
 * Set the property with key p to value of v of type V
 * @param p Property key to set
 * @param v Value to set on the property
 */
export function set<K extends string, V extends any = any>(p: K, v: V) {
    return <T>(source: Monad<T>) => {
        const sample: any = {
            ...source.sample(),
            [p]: v
        };
        return new Monad(sample as Omit<T, K> & KeyValue<K, V>);
    };
}


