import { Injector } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';

export type FeatureEffect = (injector: Injector, actions: Actions) => Observable<any>;

export type FeatureEffects = Array<FeatureEffect>;

export class NgRxEffectsProvider {
    constructor(injector: Injector, actions: Actions, effects: FeatureEffects) {
        effects.forEach((effect, i) => {
            this[i.toString()] = effect(injector, actions);
        });
    }
}
