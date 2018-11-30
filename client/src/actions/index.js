import * as actionType from './constants';

export function clickTarget() {
	return {
		type: actionType.CLICK_TARGET
	}
}

export function completeTask(timeUsed, recordX, recordY) {
	return {
		type: actionType.COMPLETE_TASK,
		payload: { timeUsed, recordX, recordY }
	}
}
