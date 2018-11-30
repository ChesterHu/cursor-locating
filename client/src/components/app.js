import React, { Component } from 'react';
import { connect } from 'react-redux';

import Ripples from './ripples';
import TaskList from '../containers/task_list';
import TaskDetail from '../containers/task_detail';
import Questionnaire from '../containers/questionnaire';

class App extends Component{
	constructor(props) {
		super(props);

		this.state = {
			experimentStarted: false,
		};
	}

	render() {
		return this.props.taskComplete ? <Questionnaire /> : <TaskDetail />
	}
}

function mapStateToProps({ tasks, activeTask }) {
	return ({
		taskComplete: activeTask >= tasks.length
	});
}

export default connect(mapStateToProps)(App);
