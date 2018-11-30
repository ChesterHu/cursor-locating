import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';


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
		<Button 
			variant='contained'
			color='secondary'
			style={toCSS(props.task)}>
			Target
		</Button>
	);
}

function mapStateToProps({ tasks, activeTask }) {
	return { task: tasks[activeTask] };
}

export default connect(mapStateToProps)(target);
