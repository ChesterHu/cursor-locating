import { combineReducers } from 'redux';

import TaskReducer from './reducer_tasks';
import ActiveTaskReducer from './reducer_active_task';
import RecordsReducer from './reducer_records';

const rootReducer = combineReducers({
	tasks: TaskReducer,
	activeTask: ActiveTaskReducer,
	records: RecordsReducer,
});

export default rootReducer;
