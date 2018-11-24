import React, { Component } from 'react';
import { connect } from 'react-redux';

import Target from '../components/target';
import BackGroundImg from '../resource/img/1.jpg';

const toCSS = () => {
	return {
		height: '800px',
		backgroundImage: `url(${BackGroundImg})`
	}
}

class TaskDetail extends Component {
	render() {
		console.log(this.props.task);
		return (
			<div style={toCSS()}>
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
