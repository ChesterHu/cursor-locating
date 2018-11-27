import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';


const toCSS = ({ target }) => {
	return {
		position: 'absolute',
		top: target.top + 'px',
		left: target.left + 'px'
	};
};

function target(props) {
	return (
		<Button 
			variant='contained'
			color='secondary'
			style={toCSS(props.task)}
			onClick={props.onClick}>
			Target
		</Button>
	);
}

function mapStateToProps({ tasks, activeTask }) {
	return { task: tasks[activeTask] };
}

export default connect(mapStateToProps)(target);
