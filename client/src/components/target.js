import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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
		<button 
			style={toCSS(props.task)}
			onClick={props.clickTarget}>
			Target
		</button>
	);
}

function mapStateToProps({ tasks, activeTask }) {
	return { task: tasks[activeTask] };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickTarget }, dispatch); 
}

export default connect(mapStateToProps, mapDispatchToProps)(target);
