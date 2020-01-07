import { Injector, Provider, Type, NgModule } from '@angular/core';
import { Actions, EffectsModule } from '@ngrx/effects';
import { NgRxEffectsProvider } from '../types/ngrx.effects';
import { NgRxFeature } from '../types/ngrx.feature';
import { StoreModule } from '@ngrx/store';

export function createEffectProvider<T extends Type<any>>(
    provide: T,
    feature: NgRxFeature
): Provider[] {
    return [{
        provide,
        useFactory: (i, a) => new NgRxEffectsProvider(i, a, feature.effects),
        deps: [Injector, Actions]
    }];
}

export function createFeatureModule<T extends Type<any>>(
    provide: T,
    feature: NgRxFeature
): NgModule {
    return {
        id: feature.key,
        providers: createEffectProvider(provide, feature),
        imports: [
            StoreModule.forFeature(feature.key, feature.reducer),
            EffectsModule.forFeature([provide])
        ]
    };
}



