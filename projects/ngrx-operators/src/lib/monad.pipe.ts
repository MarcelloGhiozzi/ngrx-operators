import { Monad } from './monad';
export type Operator<T, G> = (source: Monad<T>) => Monad<G>;
declare module './monad' {
    export interface Monad<T> {
        sample(): T;
        pipe<A>(op1: Operator<T, A>): Monad<A>;
        pipe<A, B>(op1: Operator<T, A>, op2: Operator<A, B>): Monad<B>;
        pipe<A, B, C>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>
        ): Monad<C>;
        pipe<A, B, C, D>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>
        ): Monad<D>;
        pipe<A, B, C, D, E>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>,
          op5: Operator<D, E>
        ): Monad<E>;
        pipe<A, B, C, D, E, F>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>,
          op5: Operator<D, E>,
          op6: Operator<E, F>
        ): Monad<F>;
        pipe<A, B, C, D, E, F, G>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>,
          op5: Operator<D, E>,
          op6: Operator<E, F>,
          op7: Operator<F, G>
        ): Monad<G>;
        pipe<A, B, C, D, E, F, G, H>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>,
          op5: Operator<D, E>,
          op6: Operator<E, F>,
          op7: Operator<F, G>,
          op8: Operator<G, H>
        ): Monad<H>;
        pipe<A, B, C, D, E, F, G, H, I>(
          op1: Operator<T, A>,
          op2: Operator<A, B>,
          op3: Operator<B, C>,
          op4: Operator<C, D>,
          op5: Operator<D, E>,
          op6: Operator<E, F>,
          op7: Operator<F, G>,
          op8: Operator<G, H>,
          op9: Operator<H, I>
        ): Monad<I>;
      }
    }
export function compose<T, A>(op1: Operator<T, A>): (start: T) => A;
export function compose<T, A, B>(
        op1: Operator<T, A>,
        op2: Operator<A, B>
      ): (start: T) => B;
export function compose<T, A, B, C>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>
      ): (start: T) => C;
export function compose<T, A, B, C, D>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>
      ): (start: T) => D;
export function compose<T, A, B, C, D, E>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>,
        op5: Operator<D, E>
      ): (start: T) => E;
export function compose<T, A, B, C, D, E, F>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>,
        op5: Operator<D, E>,
        op6: Operator<E, F>
      ): (start: T) => F;
export function compose<T, A, B, C, D, E, F, G>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>,
        op5: Operator<D, E>,
        op6: Operator<E, F>,
        op7: Operator<F, G>
      ): (start: T) => G;
export function compose<T, A, B, C, D, E, F, G, H>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>,
        op5: Operator<D, E>,
        op6: Operator<E, F>,
        op7: Operator<F, G>,
        op8: Operator<G, H>
      ): (start: T) => H;
export function compose<T, A, B, C, D, E, F, G, H, I>(
        op1: Operator<T, A>,
        op2: Operator<A, B>,
        op3: Operator<B, C>,
        op4: Operator<C, D>,
        op5: Operator<D, E>,
        op6: Operator<E, F>,
        op7: Operator<F, G>,
        op8: Operator<G, H>,
        op9: Operator<H, I>
      ): (start: T) => I;
export function compose<T>(...args: any[]): (start: T) => any;
export function compose(...operators: Array<Operator<any, any>>) {
        return operators.reduce(
          (f, operator) => <T>(x: Monad<T>) => operator(f(x)),
          x => x
        );
      }


