import React from 'react';
import { connect } from 'react-redux';

import Ripples from './ripples';
import TaskList from '../containers/task_list';
import TaskDetail from '../containers/task_detail';
import Questionnaire from '../containers/questionnaire';

function App(props) {
	return props.taskComplete ? <Questionnaire /> : <TaskDetail />
}

function mapStateToProps({ tasks, activeTask }) {
	return ({
		taskComplete: activeTask >= tasks.length
	});
}

export default connect(mapStateToProps)(App);
