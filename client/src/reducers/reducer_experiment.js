import * as actionType from '../actions/constants';

export default function(state = actionType.INTRODUCTION, action) {
	if (action.type === actionType.USER_CHANGE_STATE) {
		return action.payload;
	}
	return state;
}
