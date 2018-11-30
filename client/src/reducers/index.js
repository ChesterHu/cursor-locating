import { combineReducers } from 'redux';

import TaskReducer from './reducer_tasks';
import ActiveTaskReducer from './reducer_active_task';

const rootReducer = combineReducers({
	tasks: TaskReducer,
	activeTask: ActiveTaskReducer,
});

export default rootReducer;
