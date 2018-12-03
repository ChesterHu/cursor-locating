import React from 'react';

export const slides = [
	() => {
		return (
			<div>
				<h1> Where is my cursor? </h1>
				<h3>HCI experiment on cursor locating techniques</h3>
			</div>
		);
	},

	() => {
		return (
			<div>
				<h2>The problem</h2>
				<ul>
					<li>It is sometimes hard to find you cursor when the screen is light-colored or contain too many visual elements.</li>
					<li>Let’s try this: move your cursor randomly on this (link to next) page, and keep track of your cursor.</li>
				</ul>
			</div>
		);
	},

	(handleClick) => {
		return (
			<p>
				Click
				<button onClick={handleClick}> here </button>
				to continue
			</p>
		);
	},

	() => {
		return (
			<div>
				<h2>Temporary Resizing</h2>
				<h4>MacOS introduced this feature to help with the problem:</h4>
				<p>Shaking and resizing (check it out if you’re using MacOS now.</p>
				<img src={require('./img/slide-img-shake.png')}/>
			</div>
		);
	},

	() => {
		return (
			<div>
				<h2> Our Experiment </h2>
				
			</div>
		);
	},
];
