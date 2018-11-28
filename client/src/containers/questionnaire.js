import React, { Component } from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			device: 'mouse',
			browser: '',
		};
	}
	
	handleSubmit() {
		console.log('submit');
	}

	render() {
		return (
			<Grid
				container
				spacing={0}
				direction="column"
				alignItems="center"
				style={{ minHeight: '100vh' }}
			>
				<form onSubmit={this.handleSubmit}>
					<div className='form-item'>
						<TextField
							id='name'
							label='Name'
							value={this.state.name}
							onChange={e => this.setState({name: e.target.value})}
						/>
					</div>
					<div className='form-item'>
						<FormLabel component="legend">Input Device</FormLabel>
						<RadioGroup 
							aria-label='Device'
							value={this.state.device}
							onChange={e => this.setState({device: e.target.value})}
							row
						>
							<FormControlLabel value='mouse' control={<Radio color='primary' />} label='Mouse'/>
							<FormControlLabel value='touchpad' control={<Radio />} label='Touchpad'/>
						</RadioGroup>
					</div>
					<div classname='form-item'>
						<Button variant='contained' color='secondary'>Submit</Button>
					</div>
				</form>
			</Grid>
		);
	}
}

export default Questionnaire;
