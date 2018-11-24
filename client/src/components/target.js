import React, { Component } from 'react';

const toCSS = () => {
	return {
		position: 'absolute',
		top: `${50}%`,
		left: `${50}%`
	};
};

export default function(props) {
	return (
		<button style={toCSS()}>Target</button>
	);
}
