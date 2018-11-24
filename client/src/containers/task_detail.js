import React, { Component } from 'react';
import { connect } from 'react-redux';

import Target from '../components/target';

class TaskDetail extends Component {
	render() {
		console.log(this.props.task);
		return (
			<div>
				TaskDetail
				<Target />
			</div>
		);
	}
}

function mapStateToProps({ tasks, activeTask }) {
	return {
		task: tasks[activeTask]
	};
}

export default connect(mapStateToProps)(TaskDetail);
