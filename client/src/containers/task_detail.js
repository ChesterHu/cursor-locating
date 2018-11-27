import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

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
    element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock        
    element.requestPointerLock()
}

const exitPointerLock = () => {
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
	document.exitPointerLock();
}

class TaskDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dummyMouseX: 50,
			dummyMouseY: 50,
			taskStarted: false,
		};
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	handleMouseMove({ movementX, movementY }) {
		if (!this.state.taskStarted) return;
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
	
	renderCover() {
		return (
			<div className='task-cover'>
				<Button 
					variant='contained' 
					color='primary'
					style={{left: '50%', top: '50%'}}
					onClick={() => {
						this.setState({ taskStarted: true });
						this.lockPointer();
					}}
				>Start Task</Button>
			</div>
		);
	}

	renderTask() {
		return (
			<div style={toCSS(this.props.task)}>
				<div style={{position: 'absolute', top: `${this.state.dummyMouseY}px`, left: `${this.state.dummyMouseX}px`}}>dummyPointer</div>
				<Target />
			</div>
		);
	}

	render() {
		return ( 
			<div id='task-board'
				onMouseMove={this.handleMouseMove}>
				{this.state.taskStarted ? this.renderTask() : this.renderCover()}
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
