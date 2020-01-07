import { compose } from './monad.pipe';

export class Monad<T> {
  constructor(private value: T) {}

  sample() {
    return this.value;
  }

  pipe(...args) {
    return compose(...args)(this);
  }
}


