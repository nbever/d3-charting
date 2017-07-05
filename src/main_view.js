import React from 'react'
import AddExpense from './components/add_expense.js';
import Dashboard from './components/dashboard.js';
import {Switch, Route} from 'react-router-dom';

class MainView extends React.Component {
	
	render() {
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/expense/add" component={AddExpense}/>
        </Switch>
	}
}

export default MainView;