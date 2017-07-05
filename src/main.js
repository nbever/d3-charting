import React from 'react';
import {render} from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import MainView from './main_view.js';
import Login from './login.js';

require( './styles/base.scss' );

String.prototype.width = function(font) {
  var o = $('<div>' + this + '</div>')
            .css({'position': 'absolute', 'float': 'left', 'white-space': 'nowrap', 'visibility': 'hidden', 'font': font})
            .appendTo($('body')),
      w = o.width();

  o.remove();

  return w;
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    getVisiblePage() {
        if (_.isUndefined(this.state.token)) {
            return <Login />;
        }

        return <MainView />;
    }

    render(){
        return (
            <div className="main">
                <div className="header">
                    <div>Bever Budget</div>
                </div>
                <div className="view-pane">
                    {this.getVisiblePage()}
                </div>
            </div>
        );
    }
}

render( <Router><App/></Router>, document.getElementById( 'app' ) );