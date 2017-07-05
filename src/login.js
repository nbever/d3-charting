import React from 'react';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			entry: ''
		};
	}

	numberPressed(num) {
		this.setState({entry: this.state.entry + num.toString()});
	}

	get passwordDisplay() {
		let rtn = '';
		for(let i = 0; i < this.state.entry.length; i++) {
			rtn += String.fromCharCode(10033);
		}

		return rtn;
	}

	get entry() {
		return '';
	}

	clearEntry() {
		this.setState({entry: ''});
	}

	submit() {

	}

	render() {
		return (
			<div className="login">
				<div className="pad">
					<div className="entry-box">{this.passwordDisplay}</div>
					<div className="button-pad">
						<div className="button" onClick={() => this.numberPressed(1)}>1</div>
						<div className="button" onClick={() => this.numberPressed(2)}>2</div>
						<div className="button" onClick={() => this.numberPressed(3)}>3</div>
						<div className="button" onClick={() => this.numberPressed(4)}>4</div>
						<div className="button" onClick={() => this.numberPressed(5)}>5</div>
						<div className="button" onClick={() => this.numberPressed(6)}>6</div>
						<div className="button" onClick={() => this.numberPressed(7)}>7</div>
						<div className="button" onClick={() => this.numberPressed(8)}>8</div>
						<div className="button" onClick={() => this.numberPressed(9)}>9</div>
						<div className="button" onClick={() => this.numberPressed(0)}>#</div>
						<div className="button" onClick={() => this.numberPressed(0)}>0</div>
						<div className="button" onClick={() => this.numberPressed(0)}>&#x2731;</div>
					</div>
				</div>
				<div style={{padding: '12px'}}>
					<div className="button" style={{marginRight: '8px'}} onClick={() => this.submit()}>Enter</div>
					<div className="button" onClick={() => this.clearEntry()}>Clear</div>
				</div>
			</div>
		);
	}
}

export default Login;