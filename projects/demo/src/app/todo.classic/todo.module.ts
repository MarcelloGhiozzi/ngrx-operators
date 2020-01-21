import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { TodoClassicReducer } from './todo.state';
import { EffectsModule } from '@ngrx/effects';
import { TodoClassicEffects } from './todo.effects';

@NgModule({
    imports: [
        StoreModule.forFeature('todo', [TodoClassicReducer]),
        EffectsModule.forFeature([TodoClassicEffects])
    ]
})
export class TodoClassicModule {}
