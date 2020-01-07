import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ItemsFeature, Todo } from './items.feature';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  selected = this.store.pipe(select(ItemsFeature.selectors.selected));
  all = this.store.pipe(select(ItemsFeature.selectors.all));

  constructor(private store: Store<any>) {}


  add() {
    this.store.dispatch(ItemsFeature.actions.addOne({item: {
      id: new Date().toISOString(),
      title: 'TEEEST'
    }}));
  }

  delete(item: Todo) {
    this.store.dispatch(ItemsFeature.actions.deleteOne({item}));
  }

  select({ id }: Todo) {
    this.store.dispatch(ItemsFeature.actions.select({id}));
  }

  load() {
    this.store.dispatch(ItemsFeature.actions.load.trigger({}));
  }


}
