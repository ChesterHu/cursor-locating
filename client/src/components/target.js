import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';

import { clickTarget } from '../actions/index';

const toCSS = ({ target }) => {
	return {
		position: 'absolute',
		top: target.top,
		left: target.left
	};
};

function target(props) {
	return (
		<Button 
			variant='contained'
			color='secondary'
			style={toCSS(props.task)}
			onClick={props.clickTarget}>
			Target
		</Button>
	);
}

function mapStateToProps({ tasks, activeTask }) {
	return { task: tasks[activeTask] };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickTarget }, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(target);
