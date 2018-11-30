import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actionType from '../actions/constants';
import { changeExperimentState } from '../actions/index';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Introduction(props) {
	return (
		<Grid
			id='introduction'
			className='introduction'
			container
			spacing={2}
			direction="column"
			alignItems="center"
			style={{ minHeight: '100vh', marginTop:'40px' }}>
			<Paper style={{padding: '30px', width: '600px'}}>
				<h1> Introduction </h1>
				<h3> Welcome to our experiment </h3>
				<p>
					Mouse pointer is one of the most elementary object on a computer screen. 
					But due to its tiny size, a lot of us are bothered by the problem of "losing" the cursor, 
					i.e. we cannot find it on screen. Apple designed the MacOS feature "shake and resize" to help us: 
					we you shake you cursor around, the pointer will expand to a much larger size until you stopped shaking.
				</p>
				<p>
					In this experiment, we aim to test whether this feature help people find 
					their pointer faster. In addition, we also test another setup, where expansion 
					is triggered by pressing Ctrl key instead of shaking.
				</p>
				<p>
					There are 3 different setups in this experiment: normal, shake-and-expand,
					Ctrl-and-expand. In each setup, you will complete a series of 24 pointing tasks.
					In each of these task, we will first show you the target to click. On pressing
					space key, an image in which the pointer is hidden will be unveiled. You need to 
					find your pointer and click on the target. Tasks are timed and recoreded, please
					start a task only when you are ready and stay focused within each task (usually
					complete time &lt; 5 seconds). You may choose to trigger or not to trigger the
					expansion as you wish, when it is available.
				</p>
				<p>
					We recommend using Chrome or Safari to complete this experiment. 
					<ul>
						<li> 
							Please set the page zoom to 100%. In many HD screen laptop, page zoom is set to be larger than 100%. You may press Ctrl and +/- to adjust this ratio.
						</li>
						<li>
							We will disable your pointer and display our pointer during the experiment. If the browser complains, be sure to click "allow"
						</li>
						<li>
							Please run your browser in Fullscreen mode. In most browsers, this can be done by pressing F11 key.
						</li>
					 </ul>
					Press space to start when you are ready
				</p>



				<Button 
					onClick={() => {
						props.changeExperimentState(actionType.EXPERIMENT);
					}}
					variant='contained' 
					color='primary'>Start</Button>
			</Paper>
		</Grid>
	);
}

function mapStateToProps({ experimentState }) {
	return { experimentState };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ changeExperimentState }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Introduction);
