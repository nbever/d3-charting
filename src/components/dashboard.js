import React from 'react';
import {
	Link
} from 'react-router-dom';

export default class Dashboard extends React.Component {
	
	render() {
		return(
			<div>
				<div className="button">
					<Link to="/expense/add">Add Expense</Link>
				</div>
			</div>
		);
	}
}