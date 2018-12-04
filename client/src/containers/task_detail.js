import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import Target from '../components/target';
import { clickTarget, completeTask } from '../actions/index';

import ImageCtrl from '../resource/img/ctrl.png';
import ImageNone from '../resource/img/none.png';
import ImageShake from '../resource/img/shake.png';

const TASK_BOARD_WIDTH = screen.width;
const TASK_BOARD_HEIGHT = screen.height;
const ZIGZAG_RECORD_TIME = 100;
const ZIGZAG_DETECT_TIME = 700;
const ZIGZAG_MAX = 2;
const ANIMATION_TIME = 1000;  // ms
const RECORD_TIME = 20;
const MAX_RECORD = 6000;

const toCSS = (imgUrl) => {
	return {
		width: '100%',
		height: '100%',
		position: 'absolute',
		backgroundImage: `url(${imgUrl})`,
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
			taskStarted: false,
			animationOn: false,
			experimentEnd: false,
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
	
	componentWillUnmount() {
		document.removeEventListener("keydown", this.handlePressSpace, false);
		this.resetTaskState();
	}

	resetTaskState() {
		clearInterval(this.zigzagRecordTimer);
		clearInterval(this.clearRecordCacheTimer);
		clearInterval(this.recordTimer);
		this.setState({
			taskStarted: false,
			animationOn: false,
		});
	}

	startTask() {
		document.removeEventListener("keydown", this.handlePressSpace, false);
		if (this.props.task.setting === 'Shake') {
			this.zigzagRecordTimer = setInterval(() => {
				if (this.state.animationOn) return;
				const { historyX, historyY, dummyMouseX, dummyMouseY } = this.state;
				this.setState({
					historyX: [...historyX, dummyMouseX],
					historyY: [...historyY, dummyMouseY],
				});
				this.handleShake();
			}, ZIGZAG_RECORD_TIME);
			this.clearRecordCacheTimer = setInterval(() => {
				const { historyX, historyY } = this.state;
				if (historyX.length >= 2000) {
					this.setState({historyX: [], historyY: []});
				}
			}, MAX_RECORD);
		} else if (this.props.task.setting === 'Ctrl'){
			document.addEventListener("keydown", this.handlePressCtrl, false);
		}
		document.onclick = this.handleClick;
		const { task } = this.props;
		const startX = Math.floor(task.start.x * TASK_BOARD_WIDTH);
		const startY = Math.floor(task.start.y * TASK_BOARD_HEIGHT);
		const targetX = Math.floor(task.target.x * TASK_BOARD_WIDTH);
		const targetY = Math.floor(task.target.y * TASK_BOARD_HEIGHT);
		
		this.setState(() => {
			return {
				dummyMouseX: startX,
				dummyMouseY: startY,
				targetX: targetX,
				targetY: targetY,
				historyX: [],
				historyY: [],
				recordX: [startX],
				recordY: [startY],
				startTime: Date.now(),
				taskStarted: true,
				isTriggered: false
			}
		});
		this.recordTimer = setInterval(() => this.record(), RECORD_TIME);
	}

	handleMouseMove({ movementX, movementY }) {
		if (!this.state.taskStarted) return;
		// keep sequential set state
		this.setState(() => {
			let { dummyMouseX, dummyMouseY } = this.state;
			dummyMouseX += movementX;
			dummyMouseY += movementY;
			dummyMouseX = Math.min(Math.max(dummyMouseX, 0), TASK_BOARD_WIDTH * 0.97);
			dummyMouseY = Math.min(Math.max(dummyMouseY, 0), TASK_BOARD_HEIGHT * 0.97);
			return {
				dummyMouseX: Math.floor(dummyMouseX),
				dummyMouseY: Math.floor(dummyMouseY)
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
			this.animate();
		}
	}

	handleShake() {
		const { historyX, historyY } = this.state;
		if (!this.state.animationOn && this.zigzag(historyX, historyY) > ZIGZAG_MAX) {
			this.animate();
			this.setState({ historyX: [], historyY: [] });
		}
	}

	animate() {
		this.setState({animationOn: true});
		const timer = setInterval(() => {
			if (this.state.animationOn) {
				this.setState({
					animationOn: false,
					isTriggered: true,
				});
				clearInterval(timer);
			}
		}, ANIMATION_TIME); 
	}

	handleClick() {
		const { dummyMouseX, dummyMouseY, targetX, targetY } = this.state;
		const diffX = Math.abs(targetX - dummyMouseX);
		const diffY = Math.abs(targetY - dummyMouseY);
		if (diffX < 50 && diffY < 50) {
			this.handleTaskComplete();
		}
	}

	handleTaskComplete() {
		document.onclick = null;
		document.removeEventListener("keydown", this.handlePressSpace, false);
		const { startTime, recordX, recordY, isTriggered } = this.state;
		this.props.completeTask(Date.now() - startTime, recordX, recordY, this.props.task.id, isTriggered);
		this.props.clickTarget();
		const { taskIndex, totalTasks, task } = this.props;
		if (taskIndex < totalTasks) {
			this.resetTaskState();
			const idPrefix = task.id.substr(0, 6);
			if (idPrefix != 'sample' && !this.state.experimentEnd) {
				document.addEventListener("keydown", this.handlePressSpace, false);
			}
			if (taskIndex === totalTasks - 1) {
				this.setState({experimentEnd: true});
			}
			document.removeEventListener("keydown", this.handlePressCtrl, false);
		}
	}

	record() {
		const { recordX, recordY, dummyMouseX, dummyMouseY } = this.state;
		if (recordX.length > MAX_RECORD) return;
		this.setState(() => {
			return {
				recordX: [...recordX, dummyMouseX],
				recordY: [...recordY, dummyMouseY],
			}
		});
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
		const { taskIndex, totalTasks, task } = this.props;
		const progress = `${taskIndex + 1} / ${totalTasks}`;
		const idPrefix = task.id.substr(0, 6);
		const idSuffix = task.id.substr(-4);
		if (idPrefix === 'sample') {
			exitPointerLock()
		}
		let image = null;
		if (idSuffix === 'None') {
			image = ImageNone;
		} else if (idSuffix === 'Ctrl') {
			image = ImageCtrl;
		} else {
			image = ImageShake;
		}
		return (
			<div key={progress} className='task-cover'>
				<Paper
					className='task-information'
					alignItems='center'
					style={{		
						margin: '20px',
						padding: '10px',
						width: '600px'}}>
					<div>
						<h3>Task {progress}</h3>
						<p>{this.props.task.info}</p>
						{idPrefix != 'sample' && <p>Please press <Button variant='contained' size='small'>space</Button> to start the task</p> }
						<img 
							align='center'
							src={image} 
							style={{
								marginLeft: '30%',
								width: '30%', 
								height: '30%'}}/>
					</div>
					{idPrefix === 'sample' && 	
						<Button 
							onClick={() => {
								this.startTask();
								this.lockPointer();
							}}
							variant='contained' 
							color='secondary' 
							style={{marginLeft: '85%', marginBottom:'5%'}}>
							GO!
						</Button>
					}
				</Paper>
				<Target />
			</div>
		);
	}

	renderTask() {
		return (
			<div
				key={this.props.taskIndex}
				className='task'
				style={toCSS(this.props.images[this.props.task.image])}>
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
				key='task-board'
				id='task-board'
				onMouseMove={this.handleMouseMove}>
				{this.state.taskStarted ? this.renderTask() : this.renderCover()}
			</div>
		);
	}
}

function mapStateToProps({ tasks, activeTask, images }) {
	return {
		task: activeTask < tasks.length ? tasks[activeTask] : null,
		taskIndex: activeTask,
		totalTasks: tasks.length,
		images,
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ clickTarget, completeTask }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail);
