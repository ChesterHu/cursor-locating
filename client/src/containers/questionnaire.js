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

const RECEIVER_URL = 'localhost/post_receiver.php';

class Questionnaire extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			device: 'mouse',
			scoreCtrl: 1,
			scoreShake: 1,
			comment: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(e) {
		e.preventDefault();
		let request = new XMLHttpRequest();
		request.open('POST', RECEIVER_URL, true);
		request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		request.send(JSON.stringify(this.state));
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
			<Grid
				container
				spacing={2}
				direction="column"
				alignItems="center"
				style={{ minHeight: '100vh', marginTop:'40px' }}
			>
			<Paper style={{padding:'30px'}}>
				<h3>Final submit form</h3>
				<form onSubmit={this.handleSubmit}>
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
						<FormLabel component="legend">Please rate your experience of Ctrl Key</FormLabel>
						{this.renderLevelSelect(this.state.scoreCtrl, (e)=>this.setState({scoreCtrl: e.target.value}), 5)}
					</div>
					<div className='form-item'>
						<FormLabel component="legend">Please rate your experience of Shake</FormLabel>
						{this.renderLevelSelect(this.state.scoreShake, (e)=>this.setState({scoreShake: e.target.value}), 5)}
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
				</form>
			</Paper>
			</Grid>
		);
	}
}

export default Questionnaire;
