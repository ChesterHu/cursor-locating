import * as actionType from '../actions/constants';

export default function(state = 0, action) {
	if (action.type == actionType.CLICK_TARGET) {
		state = state + 1;
	}
	return state;
}
