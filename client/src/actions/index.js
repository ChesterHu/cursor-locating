import * as actionType from './constants';

export function clickTarget() {
	return {
		type: actionType.CLICK_TARGET
	};
}

export function completeTask(timeUsed, recordX, recordY, taskId, isTriggered) {
	return {
		type: actionType.COMPLETE_TASK,
		payload: { timeUsed, recordX, recordY, taskId, isTriggered }
	};
}

export function changeExperimentState(newState) {
	return {
		type: actionType.USER_CHANGE_STATE,
		payload: newState,
	};
}
