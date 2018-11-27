import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Target from '../components/target';
import { clickTarget } from '../actions/index';

const TASK_BOARD_WIDTH = screen.width;
const TASK_BOARD_HEIGHT = screen.height;

const toCSS = (task) => {
	return {
		width:'100%',
		height:'100%',
		top: 0,
		left: 0,
		position: 'absolute',
		backgroundImage: `url(${task.img})`
	}
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
		this.handlePressSpace = this.handlePressSpace.bind(this);
	}
	
	handleMouseMove({ movementX, movementY }) {
		if (!this.state.taskStarted) return;
		// keep sequential set state
		this.setState(() => {
			let { dummyMouseX, dummyMouseY } = this.state;
			dummyMouseX += movementX;
			dummyMouseY += movementY;
			dummyMouseX = Math.min(Math.max(dummyMouseX, 0), TASK_BOARD_WIDTH);
			dummyMouseY = Math.min(Math.max(dummyMouseY, 0), TASK_BOARD_HEIGHT);
			return {
				dummyMouseX: dummyMouseX,
				dummyMouseY: dummyMouseY
			}
		});
	}
	
	handlePressSpace(e) {
		if (e.keyCode === 32) {
			this.setState({taskStarted: true});
			this.lockPointer();
		}
	}

	lockPointer() {
		const taskBoard = document.getElementById('task-board');
		taskBoard.requestPointerLock = taskBoard.requestPointerLock || taskBoard.mozRequestPointerLock;
		taskBoard.requestPointerLock();
	}
	
	renderCover() {
		return (
			<div className='task-cover'>
				<Paper> 
					<h3>Task {this.props.task.task_id}</h3>
					<p>Please press space to start the task</p>
				</Paper>
				<Target onClick={() => {}}/>
			</div>
		);
	}

	renderTask() {
		return (
			<div style={toCSS(this.props.task)} onClick={exitPointerLock}>
				<div style={{position: 'absolute', top: `${this.state.dummyMouseY}px`, left: `${this.state.dummyMouseX}px`}}>dummyPointer</div>
				<Target onClick={() => {
					this.props.clickTarget();
					this.setState({ taskStarted: false });
				}}/>
			</div>
		);
	}

	render() {
		if (!this.state.taskStarted) {
			document.addEventListener("keydown", this.handlePressSpace, false);
		} else {
			document.removeEventListener("keydown", this.handlePressSpace, false);
		}
		return ( 
			<div 
				id='task-board'
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

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickTarget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
