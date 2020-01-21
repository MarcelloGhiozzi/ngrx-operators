import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Todo } from '../model';
import { createReducer, on } from '@ngrx/store';
import { addOne, addMany, deleteOne, deleteMany, updateOne, updateMany, select} from './todo.actions';


export interface TodoState extends EntityState<Todo> {
    selected: string;
}
export const TodoAdapter = createEntityAdapter<Todo>();
export function TodoClassicReducer(s, a) {
    return createReducer(
        TodoAdapter.getInitialState({selected: null}),
        on(addOne, (state, {item}) => TodoAdapter.addOne(item, {...state})),
        on(addMany, (state, {items}) => TodoAdapter.addMany(items, {...state})),
        on(deleteOne, (state, {item}) => TodoAdapter.removeOne(item.id, {...state})),
        on(deleteMany, (state, {items}) => TodoAdapter.removeMany(items.map(i => i.id), {...state})),
        on(updateOne, (state, {item}) => TodoAdapter.updateOne({id: item.id, changes: item}, {...state})),
        on(updateMany, (state, {items}) => TodoAdapter.updateMany(items.map(item => ({id: item.id, changes: item})), {...state})),
        on(select, (state, {id}) => ({...state, selected: id}))
    )(s, a);
}
