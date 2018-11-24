import { combineReducers } from 'redux';
import tasks from './reducer_tasks';

const rootReducer = combineReducers({
	tasks: tasks
});

export default rootReducer;
