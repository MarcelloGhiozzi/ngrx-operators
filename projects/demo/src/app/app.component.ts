import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TodoFeature } from './todo.feature';
import { UserFeature } from './user.feature';
import { Todo } from './model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  selected = this.store.pipe(select(TodoFeature.selectors.selected));
  all = this.store.pipe(select(TodoFeature.selectors.all));

  constructor(private store: Store<any>) {}


  add() {
    this.store.dispatch(TodoFeature.actions.addOne({item: {
      id: new Date().toISOString(),
      title: 'DEMO!'
    }}));
  }

  delete(item: Todo) {
    this.store.dispatch(TodoFeature.actions.deleteOne({item}));
  }

  select({ id }: Todo) {
    this.store.dispatch(TodoFeature.actions.select({id}));
  }

  load() {
    this.store.dispatch(TodoFeature.actions.load.trigger({}));
  }

  users() {
    this.store.dispatch(UserFeature.actions.load.trigger({}));
  }


}
