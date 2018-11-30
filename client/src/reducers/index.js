import { combineReducers } from 'redux';

import TaskReducer from './reducer_tasks';
import ImagesReducer from './reducer_images';
import RecordsReducer from './reducer_records';
import ActiveTaskReducer from './reducer_active_task';

const rootReducer = combineReducers({
	tasks: TaskReducer,
	images: ImagesReducer,
	records: RecordsReducer,
	activeTask: ActiveTaskReducer,
});

export default rootReducer;
