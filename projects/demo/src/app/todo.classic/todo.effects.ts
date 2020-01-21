import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTrigger, loadSuccess, addMany } from './todo.actions';
import { exhaustMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../model';

@Injectable()
export class TodoClassicEffects {


    loadTodo$ = createEffect(() =>
        this.actions.pipe(
            ofType(loadTrigger),
            exhaustMap(() => this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos').pipe(
                map(todos => loadSuccess({result: todos}))
            ))
        )
    );

    addTodo$ = createEffect(() =>
        this.actions.pipe(
            ofType(loadSuccess),
            map(({result}) => addMany({items: result}))
        )
    );

    constructor(
        private actions: Actions,
        private http: HttpClient
    ) {}
}
