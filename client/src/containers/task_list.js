import React, { Component } from 'react';
import { connect } from 'react-redux';

class TaskList extends Component {
	render() {
		return (
			<div>
			</div>
		);
	}
};

function mapStateToProps({ tasks, activeTask }) {
	return {
		tasks, activeTask
	};
}

export default connect(mapStateToProps)(TaskList);
