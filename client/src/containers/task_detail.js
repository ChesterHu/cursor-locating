import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Target from '../components/target';
import { clickTarget } from '../actions/index';

const TASK_BOARD_WIDTH = screen.width;
const TASK_BOARD_HEIGHT = screen.height;
const ZIGZAG_RECORD_TIME = 100;
const ZIGZAG_DETECT_TIME = 1500;
const ZIGZAG_MAX = 2;
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
			prevX: 50,
			prevY: 50,
			numPoints: 0,
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
		clearInterval(this.zigzagRecordTimer);
		clearInterval(this.zigzagDetectTimer);
		this.setState({
			taskStarted: false,
			animationOn: false,
		});
	}

	startTask() {
		document.removeEventListener("keydown", this.handlePressSpace, false);
		if (true) {
			this.zigzagRecordTimer = setInterval(() => {
				this.setState({
					historyX : [...this.state.historyX, this.state.dummyMouseX],
					historyY : [...this.state.historyY, this.state.dummyMouseY],
				});
			}, ZIGZAG_RECORD_TIME);
			this.zigzagDetectTimer = setInterval(() => {
				this.handleShake();	
			}, ZIGZAG_DETECT_TIME);
		} else {
			document.addEventListener("keydown", this.handlePressCtrl, false);
		}
		document.onclick = this.handleClick;
		this.setState({
			dummyMouseX: 50,  // TODO: use task settings
			dummyMouseY: 50,
			historyX: [],
			historyY: [],
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
			this.setState({ animationOn: true });
			this.animate();
		}
	}

	handleShake() {
		const { historyX, historyY } = this.state;
		if (!this.state.animationOn && this.zigzag(historyX, historyY) > ZIGZAG_MAX) {
			this.animate();
		}
		this.setState({ historyX: [], historyY: [] });
	}

	animate() {
		this.setState({animationOn: true});
		const timer = setInterval(() => {
			if (this.state.animationOn) {
				this.setState({animationOn: false});
				clearInterval(timer);
			}
		}, ANIMATION_TIME); 
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

	zigzag(xs, ys) {
		let dx = [];
		let dy = [];
		for (i = 0; i < xs.length - 1; i++) {
			dx.push(xs[i + 1] - xs[i]);
			dy.push(ys[i + 1] - ys[i]);
		}
		let inner_prod = Array(dx.length);
		for (var i = 0; i < inner_prod.length; i++) {
			inner_prod[i] = new Array(dx.length);
		}

		for (i = 0; i < dx.length; i++) {
			for (j = 0; j < dx.length; j++) {
				inner_prod[i][j] = dx[i] * dx[j] + dy[i] * dy[j];
			}
		}
		var DP = new Array(dx.length);
		DP[0] = 0;
		for (var i = 1; i < dx.length; i++) {
			for (var j = 0; j < i; j++) {
				var max = 0;
				if (inner_prod[i][j] < -1) {
					max = DP[j] + 1;
				} else {
					max = DP[j];
				}
				DP[i] = max;
			}
		}
		return DP[dx.length-1];
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
				<img 
					className='dummy-pointer'
					src={require('../resource/img/cursor-xl.png')}
					style={{
						position: 'absolute', 
						top: `${this.state.dummyMouseY}px`, 
						left: `${this.state.dummyMouseX}px`,
						width: `${20 * (1 + 3 * this.state.animationOn)}px`,
						height: `${20 * (1 + 3 * this.state.animationOn)}px`}}/>
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
	if (activeTask < tasks.length) {
		return {
			task: tasks[activeTask]
		};
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickTarget }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
