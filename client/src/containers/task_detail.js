import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Target from '../components/target';
import { clickTarget } from '../actions/index';

const TASK_BOARD_WIDTH = screen.width;
const TASK_BOARD_HEIGHT = screen.height;
const ANIMATION_TIME = 1000;  // ms

const toCSS = (task) => {
	return {
		width:'100%',
		height:'100%',
		top: 0,
		left: 0,
		position: 'absolute',
		backgroundImage: `url(${task.img})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center'
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
			animationOn: false,
		};
		this.handleMouseMove = this.handleMouseMove.bind(this);
		this.handlePressSpace = this.handlePressSpace.bind(this);
		this.handlePressCtrl = this.handlePressCtrl.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.resetTaskState = this.resetTaskState.bind(this);
		this.startTask = this.startTask.bind(this);
	}

	componentDidMount() {
		this.resetTaskState();
	}

	resetTaskState() {
		document.addEventListener("keydown", this.handlePressSpace, false);
		document.removeEventListener("keydown", this.handlePressCtrl, false);
		document.onclick = () => {};
		this.setState({
			taskStarted: false,
			animationOn: false,
		});
	}

	startTask() {
		document.removeEventListener("keydown", this.handlePressSpace, false);
		document.addEventListener("keydown", this.handlePressCtrl, false);
		document.onclick = this.handleClick;
		this.setState({
			dummyMouseX: 50,  // TODO: use task settings
			dummyMouseY: 50,
			taskStarted: true,
		});
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
			this.startTask();
			this.lockPointer();
		}
	}

	handlePressCtrl(e) {
		if (e.ctrlKey && !this.state.animationOn) {
			this.setState({
				animationOn: true,
			});
			this.timer = setInterval(() => this.tick(), ANIMATION_TIME);
		}
	}

	tick() {
		if (this.state.animationOn) {
			this.setState({animationOn: false});
			clearInterval(this.timer);
		}
	}

	handleClick() {
		const { dummyMouseX, dummyMouseY } = this.state;
		const targetX = this.props.task.target.left;
		const targetY = this.props.task.target.top;
		const diffX = Math.abs(targetX - dummyMouseX);
		const diffY = Math.abs(targetY - dummyMouseY);
		if (diffX < 50 && diffY < 50) {
			this.props.clickTarget();
			this.resetTaskState();
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
				<Target />
			</div>
		);
	}

	renderTask() {
		return (
			<div style={toCSS(this.props.task)}>
				<div 
					className='dummy-pointer'
					style={{
						position: 'absolute', 
						top: `${this.state.dummyMouseY}px`, 
						left: `${this.state.dummyMouseX}px`,
						width: `${25 * (1 + 3 * this.state.animationOn)}px`,
						height: `${25 * (1 + 3 * this.state.animationOn)}px`}}/>
				<Target />
			</div>
		);
	}

	render() {
		const { dummyMouseX, dummyMouseY } = this.state;
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
