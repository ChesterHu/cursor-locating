import * as actionType from '../actions/constants';

const initState = () => {
	return {
		timeUsed: [],
		recordX: [],
		recordY: [],
		taskIds: [],
		triggerRecord: []
	}	
}

export default function(state = initState(), action) {
	if (action.type === actionType.COMPLETE_TASK) {
		const { timeUsed, recordX, recordY, taskId, isTriggered} = action.payload;
		state.timeUsed = [...state.timeUsed, action.payload.timeUsed];
		state.recordX = [...state.recordX, recordX];
		state.recordY = [...state.recordY, recordY];
		state.taskIds = [...state.taskIds, taskId];
		state.triggerRecord = [...state.triggerRecord, isTriggered];
	}
	return state;
}
