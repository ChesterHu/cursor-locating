import * as actionType from '../actions/constants';

const initState = () => {
	return {
		timeUsed: [],
		recordX: [],
		recordY: [],
		taskIds: [],
	}	
}

export default function(state = initState(), action) {
	if (action.type === actionType.COMPLETE_TASK) {
		const { timeUsed, recordX, recordY, taskId} = action.payload;
		state.timeUsed = [...state.timeUsed, action.payload.timeUsed];
		state.recordX = [...state.recordX, recordX];
		state.recordY = [...state.recordY, recordY];
		state.taskIds = [...state.taskIds, taskId]
	}
	console.log(state.taskIds);
	return state;
}
