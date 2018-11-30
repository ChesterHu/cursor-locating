import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Fab from '@material-ui/core/Fab';

const TASK_BOARD_WIDTH = screen.width;
const TASK_BOARD_HEIGHT = screen.height;

const toCSS = ({ target }) => {
	return {
		position: 'absolute',
		top: target.y * TASK_BOARD_HEIGHT + 'px',
		left: target.x * TASK_BOARD_WIDTH  + 'px'
	};
};

function target(props) {
	return (
		<Fab color="secondary" aria-label="Add" style={toCSS(props.task)}>
			Target
		</Fab>
	);
}

function mapStateToProps({ tasks, activeTask }) {
	return { task: tasks[activeTask] };
}

export default connect(mapStateToProps)(target);
