import React, { Component } from 'react';
import { connect } from 'react-redux';

import Target from '../components/target';
const MAX_HEIGHT = 400;
const MAX_WIDTH = 600;
const toCSS = (task) => {
	return {
		height: '800px',
		backgroundImage: `url(${task.img})`
	}
}

const requestPointerLock = (element) => {
    element.requestPointerLock =
        element.requestPointerLock || element.mozRequestPointerLock        
    element.requestPointerLock()
}

class TaskDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dummyMouseX: 50,
			dummyMouseY: 50,
			backgroundWidth: 600,
			backgroundHeight: 400,
		};
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	handleMouseMove({ movementX, movementY }) {
		// keep sequential set state
		this.setState(() => {
			let { dummyMouseX, dummyMouseY } = this.state;
			dummyMouseX += movementX;
			dummyMouseY += movementY;
			dummyMouseX = Math.min(Math.max(dummyMouseX, 0), MAX_WIDTH);
			dummyMouseY = Math.min(Math.max(dummyMouseY, 0), MAX_HEIGHT);

			return {
				dummyMouseX: dummyMouseX,
				dummyMouseY: dummyMouseY
			}
		});
	}

	lockPointer() {
		const taskBoard = document.getElementById('task-board');
		requestPointerLock(taskBoard);
	}

	render() {
		return (
			<div 
				id='task-board'
				style={toCSS(this.props.task)}
				onMouseMove={this.handleMouseMove}
				onClick={this.lockPointer}>
				<div style={{position: 'absolute', top: `${this.state.dummyMouseY}px`, left: `${this.state.dummyMouseX}px`}}>dummyPointer</div>
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
