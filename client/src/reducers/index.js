import { combineReducers } from 'redux';

import TaskReducer from './reducer_tasks';
import ImagesReducer from './reducer_images';
import RecordsReducer from './reducer_records';
import ActiveTaskReducer from './reducer_active_task';
import ExperimentReducer from './reducer_experiment';

const rootReducer = combineReducers({
	tasks: TaskReducer,
	images: ImagesReducer,
	records: RecordsReducer,
	activeTask: ActiveTaskReducer,
	experimentState: ExperimentReducer,
});

export default rootReducer;
