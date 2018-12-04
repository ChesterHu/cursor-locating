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

const RECEIVER_URL = '/cs889/cursor-locating/client/dist/post_receiver.php';

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			device: 'mouse',
			scoreCtrl: 1,
			scoreShake: 1,
			comment: '',
			macShake: 'NA',
			submitted: false,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		this.setState({submitted: true});
		e.preventDefault();
		let request = new XMLHttpRequest();
		request.open('POST', RECEIVER_URL, true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		const body = {
			userInfo: this.state,
			userRecords: this.props.records,
		};
		console.log(body);
		request.send(JSON.stringify(body));
	}

	renderLevelSelect(selectedValue, onChange, numLevels, title) {
		const levels = Array.from(Array(numLevels).keys());
		return (
			<RadioGroup 
				value={`${selectedValue}`}
				onChange={onChange}
				row
			>
				{levels.map((level) => <FormControlLabel value={`${level + 1}`} control={<Radio />} label={level + 1} />)}
			</RadioGroup>
		);
	}

	render() {
		return (
			<div className='task-cover' style={{height: screen.height}}>
				<Grid
					container
					spacing={2}
					direction="column"
					alignItems="center"
					style={{ minHeight: '100vh', marginTop:'40px' }}
				>
					<Paper style={{padding:'30px'}}>
						{!this.state.submitted && 	
							<form onSubmit={this.handleSubmit}>
								<h2>Questionnaire</h2>
								<div className='form-item'>
									<TextField
										id='name'
										label='Name'
										value={this.state.name}
										onChange={(e)=> this.setState({name: e.target.value})}
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
								<div className='form-item'>
									<FormLabel component="legend">Do you agree Ctrl Key helped you find the cursor faster?(1: strong disagree, 5: strong agree)</FormLabel>
									{this.renderLevelSelect(this.state.scoreCtrl, (e)=>this.setState({scoreCtrl: e.target.value}), 5)}
								</div>
								<div className='form-item'>
									<FormLabel component="legend">Do you agree Shaking helped you find the cursor faster?(1: strong disagree, 5: strong agree)</FormLabel>
									{this.renderLevelSelect(this.state.scoreShake, (e)=>this.setState({scoreShake: e.target.value}), 5)}
								</div>
								<div className='form-item'>
									<FormLabel component="legend">If you are using macOS, have you ever used the shaking to help you find the cursor?</FormLabel>
									<RadioGroup 
										aria-label='Device'
										value={this.state.macShake}
										onChange={e => this.setState({macShake: e.target.value})}
										row
									>
										<FormControlLabel value='NA' control={<Radio color='primary' />} label='NA'/>
										<FormControlLabel value='No' control={<Radio />} label='No'/>
										<FormControlLabel value='Yes' control={<Radio />} label='Yes'/>
									</RadioGroup>
								</div>

								<div className='form-item'>
									<TextField
										id="outlined-full-width"
										label="Comment"
										value={this.state.comment}
										onChange={(e) => this.setState({comment: e.target.value})}
										placeholder="Your comment"
										helperText="You can write any comment or any issue you have for the experiment"
										fullWidth
										multiline
										rows='2'
										margin="normal"
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</div>
								<div className='form-item'>
									<Button type='submit' variant='contained' color='secondary'>Submit</Button>
								</div>
							</form>}
							{
								this.state.submitted && 
								<div align='center'>
									<h1> Thank You! </h1>
									<p> Your data has been recorded </p>
								</div>
							}
					</Paper>
				</Grid>
			</div>
		);
	}
}

function mapStateToProps({ records }) {
	return { records };
}

export default connect(mapStateToProps)(Questionnaire);
