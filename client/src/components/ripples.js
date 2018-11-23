import React, { Component } from 'react';
import { TransitionMotion, spring } from 'react-motion';

const toCSS = (style) => {
	const { opacity, scale, x, y } = style;
	return {
		opacity: opacity,
		scale: scale,
		transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
		WebkitTransform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
	};
};

const config = { stiffness: 60, damping: 15 };

export default class Ripples extends Component {
	constructor(props) {
		super(props);
		this.state = {
			start: Date.now(),
			mouse: [null, null],
			timeStamp: null
		};
		this.handleMouseMove = this.handleMouseMove.bind(this);
	}

	handleMouseMove({ pageX, pageY }) {
		console.log(pageX, pageY);
		this.setState({
			mouse: [pageX, pageY],
			timeStamp: `${Date.now() - this.state.start}`
		});
	}

	willLeave(styleCell) {
		return {
			opacity: spring(0),
			scale: spring(2)
		};
	}

	render() {
		const { mouse: [mouseX, mouseY], timeStamp } = this.state;
		const styles = mouseX === null ? [] : [{
			key: timeStamp,
			style: {
				opacity: spring(1),
				scale: spring(0),
				x: mouseX,
				y: mouseY
			}
		}];

		return (
			<div
				onMouseMove={this.handleMouseMove}>
				Ripples
			</div>
		);
	}
};
