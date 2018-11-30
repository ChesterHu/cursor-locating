import * as actionType from '../actions/constants';

const initState = () => {
	return {
		timeUsed: [],
		recordX: [],
		recordY: [],
	}	
}

export default function(state = initState(), action) {
	if (action.type === actionType.COMPLETE_TASK) {
		const { timeUsed, recordX, recordY } = action.payload;
		state.timeUsed = [...state.timeUsed, action.payload.timeUsed];
		state.recordX = [...state.recordX, recordX];
		state.recordY = [...state.recordY, recordY];
	}
	return state;
}
