import { createAction, props } from '@ngrx/store';
import { Todo } from '../model';

export const addOne = createAction('[TODO] Add One', props<{item: Todo}>());
export const addMany = createAction('[TODO] Add Many', props<{items: Todo[]}>());
export const deleteOne = createAction('[TODO] Delete One', props<{item: Todo}>());
export const deleteMany = createAction('[TODO] Delete Many', props<{items: Todo[]}>());
export const updateOne = createAction('[TODO] Update One', props<{item: Todo}>());
export const updateMany = createAction('[TODO] Update Many', props<{items: Todo[]}>());
export const select = createAction('[TODO] Select', props<{id: string}>());
export const loadTrigger = createAction('[TODO] Load Trigger');
export const loadSuccess = createAction('[TODO] Load Success', props<{result: Todo[]}>());

