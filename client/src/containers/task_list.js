import React, { Component } from 'react';
import { connect } from 'react-redux';

class TaskList extends Component {
	render() {
		return (
			<div>
				task List
			</div>
		);
	}
};

function mapStateToProps(state) {
	return {
		tasks: state.tasks
	};
}

export default connect(mapStateToProps)(TaskList);
