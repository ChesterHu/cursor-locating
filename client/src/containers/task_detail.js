import React, { Component } from 'react';
import { connect } from 'react-redux';

import Target from '../components/target';

const toCSS = (task) => {
	return {
		height: '800px',
		backgroundImage: `url(${task.img})`
	}
}

class TaskDetail extends Component {
	render() {
		console.log(this.props.task);
		return (
			<div style={toCSS(this.props.task)}>
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
