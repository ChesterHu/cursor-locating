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
			container
			spacing={2}
			direction="column"
			alignItems="center"
			style={{ minHeight: '100vh', marginTop:'40px' }}>
			<Paper style={{padding: '30px'}}>
				<h1> Introduction </h1>
				<h3> Welcome to our experiment </h3>
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
