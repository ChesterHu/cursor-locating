import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionType from '../actions/constants';
import Ripples from './ripples';
import TaskList from '../containers/task_list';
import TaskDetail from '../containers/task_detail';
import Questionnaire from '../containers/questionnaire';
import Introduction from './introduction';

class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			experimentStarted: false,
		};
	}

	render() {
		const { experimentState } = this.props;
		if (experimentState === actionType.INTRODUCTION) {
			return <Introduction />
		} else if (experimentState === actionType.EXPERIMENT) {
			return this.props.taskComplete ? <Questionnaire /> : <TaskDetail />
		}
	}
}

function mapStateToProps({ tasks, activeTask, experimentState }) {
	return ({
		taskComplete: activeTask >= tasks.length,
		experimentState,
	});
}

export default connect(mapStateToProps)(App);
