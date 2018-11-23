import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

const toCSS = (style) => {
	const { opacity, scale, x, y } = style;
	return {
		opacity: opacity,
		scale: scale,
		transform: `translate(${x}px, ${y}px) scale(${scale},${scale})`,
	};
};

const config = { stiffness: 60, damping: 15 };
const triggerTime = { begin: 0, end: 4000 };

export default class Ripples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: Date.now(),
			mouse: [null, null],
			timeStamp: 0,
		};
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}
	
	isTriggered() {
		const timeElapsed = Date.now() - this.state.start;
		if (timeElapsed > triggerTime.begin && timeElapsed < triggerTime.end) {
			return spring(1);
		}
		return 0;
	}

	handleMouseMove({ pageX, pageY }) {
		this.setState(() => {
			return {
			mouse: [pageX - 25, pageY - 25],
			timeStamp: Date.now() - this.state.start
			};
		});
	}

	willLeave(styleCell) {
		return Object.assign({}, styleCell.style, {
			opacity: spring(0, config), 
			scale: spring(1.5, config)});
	}
	
	render() {
		const { mouse, timeStamp, start } = this.state;
		const styles = mouse[0] === null ? [] : [{
			key: timeStamp,
			style: {
				opacity: this.isTriggered(),
				scale: spring(0),
				x: spring(mouse[0]),
				y: spring(mouse[1])
			}
		}];
		return (
			<TransitionMotion willLeave={this.willLeave} styles={styles}>
				{ripples =>
					<div 
						className='background'
						onMouseMove={this.handleMouseMove}>
						{ripples.map(({ key, style }) => 
							<div 
								key={key}
								className='ripple'
								style={toCSS(style)}>
							</div>
						)}
					</div>
				}
			</TransitionMotion>
		);
	}
};
