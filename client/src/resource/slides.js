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
				<ul>
					<li>We aim to test whether such technique does help people find their cursor faster</li>
					<li>We present one additional settings, where resizing is triggered by pressing Ctrl key</li>
				</ul>
				<img src={require('./img/slide-img-ctrl.png')} />
			</div>
		);
	},

	() => {
		return (
			<div>
				<h2>Experiment Tasks</h2>
				<h4>Our experiment consists of a series of pointing tasks, in each of these task:</h4>
				<ul>
					<li>You are informed about the position of a target</li>
					<li>Press space when you are ready</li>
					<li>A background image will be revealed, your cursor is repositioned to a place that is irrelevant of its previous path</li>
					<li>You need to find your cursor and click on the target shown to you</li>
					<li>One of the two mentioned technique may be there to help</li>
				</ul>
			</div>
		);
	},

	() => {
		return (
			<div>
				<h2>Settings (randomly shuffled)</h2>
				<img src={require('./img/slide-img-task.png')} />
			</div>
		);
	},

	() => {
		return (
			<div>
				<h2>Now Please</h2>
				<ul>
					<li>We recommend using Chrome to run our experiment</li>
					<li>Run you browser in full screen mode. (Press F11 if you are using Chrome)</li>
					<li>Set your page zoom to 100% (Press Ctrl + '+' or '-' to adjust)</li>
					<li>We will disable your “real” cursor during the experiment. If the browser complains, please click “allow”</li>
					<li>Please do not switch task during the experiment, as this will result in multiple cursor on the webpage</li>
					<li>If you set page zoom and full screen mode correctly, you should see four red dots at each corner of your screen. Press space when you are ready</li>
				</ul>
			</div>
		);
	}
];
