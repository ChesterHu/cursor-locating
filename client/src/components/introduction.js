import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as actionType from '../actions/constants';
import { changeExperimentState } from '../actions/index';
import { slides } from '../resource/slides';

class Introduction extends Component {
	constructor(props) {
		super(props);
		this.state = {
			slides: slides,
			activeSlide: 0,
		};
	}

	renderButton() {
		const { slides, activeSlide } = this.state;
		if (activeSlide < slides.length - 1) {
			return (
				<Button 
					style={{
						backgroundColor: 'lightblue',
						marginTop: '5%',
						marginLeft: '85%'}}
						onClick={()=>this.setState({ activeSlide: activeSlide + 1})}>
					Next
				</Button>);
		} else {
			return (
				<Button 
					onClick={() => {
						this.props.changeExperimentState(actionType.EXPERIMENT);
					}}
					variant='contained' 
					color='secondary'
					style={{marginLeft: '85%'}}>
						Start
				</Button>
			);
		}
	}
	
	render() { 
		return (
			<div className='task-cover' style={{height: screen.height}}>
				<Grid
					id='introduction'
					className='introduction'
					container
					spacing={2}
					direction="column"
					alignItems="center"
					style={{ marginTop:'15%' }}>
					<Paper style={{padding: '30px', width: '600px'}}>
						<Grid>
							{this.state.slides[this.state.activeSlide]()}
						</Grid>
						<Grid>
							{this.renderButton()}
						</Grid>
					</Paper>
				</Grid>
			</div>
		);
	}
}


export default connect(null,{ changeExperimentState })(Introduction);
