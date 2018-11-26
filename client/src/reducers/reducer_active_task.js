import * as actionType from '../actions/constants';

export default function(state = 0, action) {
	if (action.type == actionType.CLICK_TARGET) {
		if (state < actionType.NUM_TASKS - 1)
			state = state + 1;
	}
	return state;
}
