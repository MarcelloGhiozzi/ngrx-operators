import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { User } from './model';
import {
    addEffectMap,
    addSelectableEntity,
    addSideEffect,
    createEffectProvider,
    createEntityFeature,
    NgRxEffectsProvider,
    addSwitchEffect,
} from 'projects/ngrx-operators/src/public-api';
import { map } from 'rxjs/operators';


export const UserFeature = createEntityFeature('users', {} as User).pipe(
    addSelectableEntity(),
    addSwitchEffect('load', (i) => i.get(HttpClient).get<User[]>('https://jsonplaceholder.typicode.com/users').pipe(
        map(result => ({result}))
    )),
    addEffectMap((f) => f.actions.load.success, (f) => f.actions.addMany, ({result}) => ({items: result})),
).sample();


export class UserEffectsProvider extends NgRxEffectsProvider {}
@NgModule({
    providers: createEffectProvider(UserEffectsProvider, UserFeature),
    imports: [
        StoreModule.forFeature(UserFeature.key, UserFeature.reducer),
        EffectsModule.forFeature([UserEffectsProvider])
    ]
})
export class UserFeatureModule {}

